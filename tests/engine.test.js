'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const E=require('../assets/js/engine.js'),R=require('../data/counties.json');
function job(start,end,p=100,id='a'){return {id,startDate:start,endDate:end,ongoing:false,category:'employment',measure:'percentage',percentage:p,relevance:'yes',evidence:'ready',additionalHours:0,abroad:false};}
function assessment(countyCode='vestfold',work=[],education={},extras={}){return {professionCode:'KOK03-02',countyCode,asOfDate:'2026-11-15',work,education:{vg1:'no',vg2:'no',other:'no',priorTrade:'no',...education},competencyAnswers:{},examStatus:'passed',attestStatus:'all',...extras};}
function months(input){const r=E.estimatePractice(input,R);assert.equal(r.valid,true,JSON.stringify(r.errors));return r;}
function close(actual,expected){assert.ok(Math.abs(actual-expected)<.025,'expected '+actual+' to be '+expected);}
test('valid ISO dates',()=>{assert.equal(E.parseIso('2024-02-29')!==null,true);assert.equal(E.parseIso('2025-02-29'),null);assert.equal(E.parseIso('not-a-date'),null);});
test('reject missing county',()=>assert.equal(E.estimatePractice(assessment('unknown'),R).valid,false));
test('reject invalid date range',()=>assert.equal(E.estimatePractice(assessment('vestfold',[job('2025-05-01','2025-04-01')]),R).valid,false));
test('one year fulltime equals 12 months',()=>close(months(assessment('vestfold',[job('2025-01-01','2025-12-31')])).workEstimatedMonths,12));
test('five fulltime years equals 60 months',()=>close(months(assessment('vestfold',[job('2020-01-01','2024-12-31')])).workEstimatedMonths,60));
test('50 percent over 2 years equals 12 months',()=>close(months(assessment('vestfold',[job('2023-01-01','2024-12-31',50)])).workEstimatedMonths,12));
test('verified county counts 80 percent as fulltime',()=>close(months(assessment('vestfold',[job('2025-01-01','2025-12-31',80)])).workEstimatedMonths,12));
test('unverified county does not round 80 percent to fulltime',()=>close(months(assessment('oslo',[job('2025-01-01','2025-12-31',80)])).workEstimatedMonths,9.6));
test('overlapping percent jobs are capped',()=>close(months(assessment('vestfold',[job('2025-01-01','2025-12-31',50,'a'),job('2025-01-01','2025-12-31',50,'b')])).workEstimatedMonths,12));
test('overlapping fulltime jobs are capped',()=>close(months(assessment('vestfold',[job('2025-01-01','2025-12-31',100,'a'),job('2025-01-01','2025-12-31',100,'b')])).workEstimatedMonths,12));
test('Vg1 and Vg2 credit may total 24 months',()=>assert.equal(months(assessment('vestfold',[],{vg1:'yes',vg2:'yes'})).educationPotentialMonths,24));
test('previous trade certificate prevents automatic school-year credit',()=>assert.equal(months(assessment('vestfold',[],{vg1:'yes',vg2:'yes',priorTrade:'yes'})).educationPotentialMonths,0));
test('uncertain relevance not counted',()=>{const r=job('2025-01-01','2025-12-31');r.relevance='unsure';const x=months(assessment('vestfold',[r]));assert.equal(x.workEstimatedMonths,0);assert.equal(x.status,'requires_review');});
test('irrelevant practice not counted',()=>{const r=job('2025-01-01','2025-12-31');r.relevance='no';assert.equal(months(assessment('vestfold',[r])).workEstimatedMonths,0);});
test('short-term job creates warning',()=>assert.ok(months(assessment('vestfold',[job('2025-01-01','2025-01-31')])).warnings.some(w=>w.code==='short_period_review')));
test('county decisions are not automatically added',()=>assert.equal(months(assessment('vestfold',[],{countyDecisionMonths:40})).educationPotentialMonths,0));
test('exam status separate from practice months',()=>{let a=assessment('vestfold',[job('2025-01-01','2025-12-31')]);let b={...a,examStatus:'not_taken'};close(months(a).totalEstimatedMonths,months(b).totalEstimatedMonths);});
test('no approval field exists in result',()=>{let r=months(assessment('vestfold',[job('2025-01-01','2025-12-31')]));assert.equal(r.approved,undefined);assert.equal(r.qualified,undefined);});
test('legal disclaimer exists in copy data',()=>{const c=require('../data/copy-nb.json');assert.ok(c.legal.p2.includes('fylkeskommunen'));});
