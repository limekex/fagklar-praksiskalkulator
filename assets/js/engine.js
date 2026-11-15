/* Fagklar Praksiskalkulator -- dependency-free, deterministic calculation core.
 * This module contains no browser, network, WordPress or storage operations.
 */
(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FagklarPraksisEngine = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const MS_PER_DAY = 86400000;
  const MONTHS_REQUIRED = 60;
  const HOURS_PER_MONTH = 145;
  const EPSILON = 0.0000001;

  function parseIso(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const time = Date.parse(value + 'T00:00:00.000Z');
    if (!Number.isFinite(time)) return null;
    return new Date(time).toISOString().slice(0, 10) === value ? time : null;
  }
  function iso(time) { return new Date(time).toISOString().slice(0, 10); }
  function daysInMonth(time) {
    const d = new Date(time);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  }
  function dateMinusYears(time, years) {
    const d = new Date(time);
    const y = d.getUTCFullYear() - years;
    const m = d.getUTCMonth();
    const day = Math.min(d.getUTCDate(), new Date(Date.UTC(y, m + 1, 0)).getUTCDate());
    return Date.UTC(y, m, day);
  }
  function calendarMonths(start, endExclusive) {
    let sum = 0;
    for (let t = start; t < endExclusive; t += MS_PER_DAY) sum += 1 / daysInMonth(t);
    return sum;
  }
  function addWarning(list, code, details) {
    if (!list.some(x => x.code === code && x.periodId === (details && details.periodId))) {
      list.push(Object.assign({ code }, details || {}));
    }
  }
  function isVerifiedCounty(county, onDate) {
    return county && county.verification === 'verified' &&
      Number.isFinite(Number(county.fteThreshold)) && county.fteThreshold > 0 &&
      county.fteThreshold <= 1 &&
      (!county.nextReviewDue || onDate <= county.nextReviewDue) &&
      Array.isArray(county.sources) && county.sources.length > 0;
  }

  function validateAssessment(input, registry) {
    const errors = [];
    const counties = registry && Array.isArray(registry.counties) ? registry.counties : [];
    if (!counties.some(c => c.code === input.countyCode)) errors.push({ path: 'countyCode', code: 'county_required', message: 'Velg fylket der du bor.' });
    const asOf = parseIso(input.asOfDate);
    if (asOf === null) errors.push({ path: 'asOfDate', code: 'invalid_as_of', message: 'Ugyldig beregningsdato.' });
    const rows = Array.isArray(input.work) ? input.work : [];
    if (rows.length > 100) errors.push({ path: 'work', code: 'too_many', message: 'Du kan legge inn maksimalt 100 arbeidsperioder.' });
    for (const [index, row] of rows.entries()) {
      const path = 'work.' + index;
      const start = parseIso(row.startDate);
      const end = parseIso(row.ongoing ? input.asOfDate : row.endDate);
      if (start === null) errors.push({ path: path + '.startDate', code: 'invalid_start', message: 'Velg en gyldig startdato.' });
      if (end === null) errors.push({ path: path + '.endDate', code: 'invalid_end', message: 'Velg en gyldig sluttdato.' });
      if (start !== null && end !== null && end < start) errors.push({ path: path + '.endDate', code: 'end_before_start', message: 'Sluttdatoen kan ikke være før startdatoen.' });
      if (start !== null && asOf !== null && start > asOf) errors.push({ path: path + '.startDate', code: 'future_start', message: 'Startdatoen kan ikke være senere enn beregningsdatoen.' });
      if (start !== null && end !== null && end - start > 85 * 366 * MS_PER_DAY) errors.push({ path: path + '.endDate', code: 'span_too_large', message: 'Perioden er for lang.' });
      if (!['yes', 'no', 'unsure'].includes(row.relevance)) errors.push({ path: path + '.relevance', code: 'invalid_relevance', message: 'Velg om praksisen er relevant.' });
      if (row.measure === 'percentage') {
        if (!Number.isFinite(Number(row.percentage)) || Number(row.percentage) <= 0 || Number(row.percentage) > 100) errors.push({ path: path + '.percentage', code: 'invalid_percentage', message: 'Skriv en stillingsprosent fra 1 til 100.' });
        if (row.additionalHours !== '' && row.additionalHours != null && (!Number.isFinite(Number(row.additionalHours)) || Number(row.additionalHours) < 0 || Number(row.additionalHours) > 100000)) errors.push({ path: path + '.additionalHours', code: 'invalid_extra', message: 'Skriv inn et gyldig tall for ekstratimer.' });
      } else if (row.measure === 'hours') {
        if (!Number.isFinite(Number(row.hours)) || Number(row.hours) <= 0 || Number(row.hours) > 100000) errors.push({ path: path + '.hours', code: 'invalid_hours', message: 'Skriv inn et positivt timetall.' });
      } else errors.push({ path: path + '.measure', code: 'invalid_measure', message: 'Velg stillingsprosent eller timer.' });
    }
    return errors;
  }

  function estimatePractice(input, registry) {
    const errors = validateAssessment(input, registry);
    if (errors.length) return { valid: false, errors, status: 'incomplete' };
    const asOf = parseIso(input.asOfDate);
    const county = registry.counties.find(c => c.code === input.countyCode);
    const verified = isVerifiedCounty(county, input.asOfDate);
    const threshold = verified ? county.fteThreshold : 1;
    const warnings = [];
    const manualReviewReasons = [];
    const countedPeriods = [];
    const excludedPeriods = [];
    const pendingReviewPeriods = [];
    const percentRows = [];
    const hourRows = [];
    const rows = input.work || [];

    if (!verified) addWarning(warnings, county.verification === 'verified' ? 'county_expired' : 'county_unverified');

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const start = parseIso(row.startDate);
      // Both the entered end date and the calculation date are inclusive.
      const endInclusive = row.ongoing ? asOf : Math.min(parseIso(row.endDate), asOf);
      if (endInclusive < start) { excludedPeriods.push({ periodId: row.id, reason: 'after_as_of' }); continue; }
      const period = { row, start, end: endInclusive + MS_PER_DAY, id: row.id || String(i) };
      if (row.relevance === 'no') {
        excludedPeriods.push({ periodId: period.id, reason: 'not_relevant' });
        addWarning(warnings, 'ignored_irrelevant');
        continue;
      }
      if (row.relevance === 'unsure') {
        pendingReviewPeriods.push({ periodId: period.id, reason: 'unknown_relevance' });
        addWarning(warnings, 'unknown_relevance');
        manualReviewReasons.push('unknown_relevance');
        continue;
      }
      if (row.category !== 'employment' && row.category !== 'hourly') addWarning(warnings, 'special_evidence_review', { periodId: period.id });
      if (row.abroad) addWarning(warnings, 'special_evidence_review', { periodId: period.id });
      if (row.evidence !== 'ready') addWarning(warnings, 'documentation_missing');
      if (calendarMonths(period.start, period.end) < 2 - EPSILON) addWarning(warnings, 'short_period_review', { periodId: period.id });
      if (row.measure === 'percentage') {
        percentRows.push(period);
        if (Number(row.additionalHours) > 0) {
          addWarning(warnings, 'extra_hours_review', { periodId: period.id });
          pendingReviewPeriods.push({ periodId: period.id, reason: 'extra_hours_review', hours: Number(row.additionalHours) });
          manualReviewReasons.push('extra_hours_review');
        }
      } else hourRows.push(period);
    }

    // Aggregate all percentage jobs by calendar day, then apply the 100% cap.
    // Verified county-specific 80% uplift is applied once, to the daily total.
    const dailyFte = new Map();
    for (const p of percentRows) {
      const fte = Number(p.row.percentage) / 100;
      for (let t = p.start; t < p.end; t += MS_PER_DAY) {
        dailyFte.set(t, (dailyFte.get(t) || 0) + fte);
      }
    }
    let percentMonths = 0;
    let percentRecentMonths = 0;
    const cutoff = dateMinusYears(asOf, 10);
    let overlappingPercentDays = 0;
    for (const [t, rawFte] of dailyFte) {
      if (rawFte > 1 + EPSILON) overlappingPercentDays++;
      const capped = Math.min(rawFte, 1);
      const creditedFte = capped + EPSILON >= threshold ? 1 : capped;
      const credit = creditedFte / daysInMonth(t);
      percentMonths += credit;
      if (t >= cutoff) percentRecentMonths += credit;
    }
    if (overlappingPercentDays) addWarning(warnings, 'overlap_capped');
    for (const p of percentRows) countedPeriods.push({ periodId: p.id, method: 'percentage', percent: Number(p.row.percentage), startDate: iso(p.start), endDate: iso(p.end - MS_PER_DAY) });

    // Hour-only rows with ambiguous overlaps are deliberately NOT credited.
    // A single hour count for a whole period gives no safe month-by-month split.
    let hourMonths = 0;
    const hourAmbiguous = new Set();
    for (let i = 0; i < hourRows.length; i++) {
      const p = hourRows[i];
      if (percentRows.some(q => p.start < q.end && q.start < p.end) ||
        hourRows.some((q, j) => j !== i && p.start < q.end && q.start < p.end)) {
        hourAmbiguous.add(p.id);
      }
    }
    for (const p of hourRows) {
      if (hourAmbiguous.has(p.id)) {
        addWarning(warnings, 'hour_overlap_review', { periodId: p.id });
        pendingReviewPeriods.push({ periodId: p.id, reason: 'hour_overlap_review' });
        manualReviewReasons.push('hour_overlap_review');
        continue;
      }
      const rawMonths = Number(p.row.hours) / (Number(registry.hoursPerMonth) || HOURS_PER_MONTH);
      const cappedMonths = Math.min(rawMonths, calendarMonths(p.start, p.end));
      if (rawMonths > cappedMonths + EPSILON) addWarning(warnings, 'hour_period_capped', { periodId: p.id });
      hourMonths += cappedMonths;
      countedPeriods.push({ periodId: p.id, method: 'hours', hours: Number(p.row.hours), months: cappedMonths, startDate: iso(p.start), endDate: iso(p.end - MS_PER_DAY) });
    }
    const workMonths = percentMonths + hourMonths;
    if (workMonths > EPSILON) {
      if (hourRows.length) addWarning(warnings, 'recentness_uncertain');
      else if (percentRecentMonths / workMonths < 0.5 - EPSILON) addWarning(warnings, 'older_practice_review');
    }

    const edu = input.education || {};
    let educationMonths = 0;
    if (edu.priorTrade === 'yes') {
      addWarning(warnings, 'prior_trade_review');
      manualReviewReasons.push('prior_trade_review');
    } else {
      if (edu.vg1 === 'yes') educationMonths += 12;
      if (edu.vg2 === 'yes') educationMonths += 12;
    }
    if (edu.vg1 === 'unsure' || edu.vg2 === 'unsure' || edu.other === 'yes') {
      addWarning(warnings, 'other_school_review');
      manualReviewReasons.push('other_school_review');
    }
    if (edu.vg1 === 'yes' || edu.vg2 === 'yes') {
      addWarning(warnings, 'education_not_documented');
      if (rows.length) addWarning(warnings, 'school_overlap_review');
    }
    if (edu.countyDecisionMonths != null && edu.countyDecisionMonths !== '' && Number(edu.countyDecisionMonths) > 0) {
      addWarning(warnings, 'county_decision_review');
      manualReviewReasons.push('county_decision_review');
    }
    if (input.examStatus !== 'passed') addWarning(warnings, 'exam_not_passed');
    if (input.attestStatus && input.attestStatus !== 'all') addWarning(warnings, 'documentation_missing');
    if (Object.values(input.competencyAnswers || {}).some(x => x === 'none' || x === 'some')) addWarning(warnings, 'competence_gap');

    const totalMonths = workMonths + educationMonths;
    const remaining = Math.max(0, MONTHS_REQUIRED - totalMonths);
    let status = 'below_threshold';
    if (!rows.length && educationMonths === 0 && !manualReviewReasons.length) status = 'incomplete';
    else if (manualReviewReasons.length) status = 'requires_review';
    else if (totalMonths + EPSILON >= MONTHS_REQUIRED) status = 'estimated_at_or_above_threshold';

    return {
      valid: true,
      status,
      county: county.name,
      countyUrl: county.officialUrl,
      countyVerified: verified,
      countyThreshold: threshold,
      requiredMonths: MONTHS_REQUIRED,
      workEstimatedMonths: workMonths,
      educationPotentialMonths: educationMonths,
      totalEstimatedMonths: totalMonths,
      remainingEstimatedMonths: remaining,
      excludedPeriods, countedPeriods, pendingReviewPeriods, warnings,
      manualReviewReasons: [...new Set(manualReviewReasons)],
      examStatus: input.examStatus || 'unsure',
      attestStatus: input.attestStatus || 'unsure',
      competenceSelfReportStatus: input.competencyAnswers || {},
      ruleVersion: registry.ruleVersion,
      lastVerified: verified ? county.verifiedAt : null,
      evaluationDate: input.asOfDate,
      resultDisclaimerKey: 'legal'
    };
  }

  return { estimatePractice, validateAssessment, parseIso, calendarMonths, isVerifiedCounty, MONTHS_REQUIRED, HOURS_PER_MONTH };
});
