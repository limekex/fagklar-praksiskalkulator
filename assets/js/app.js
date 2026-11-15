/* Fagklar Praksiskalkulator v0.1.0 – browser-only interface */
(function () {
  'use strict';
  var Engine=window.FagklarPraksisEngine, cfg=window.FKPR_DATA;
  if(!Engine || !cfg || !cfg.registry || !cfg.copy)return;
  var countyList=cfg.registry.counties, copy=cfg.copy;
  function h(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});}
  function num(x){return new Intl.NumberFormat('nb-NO',{maximumFractionDigits:1,minimumFractionDigits:1}).format(x||0);}
  function today(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function opts(items,selected){return items.map(function(o){return '<option value="'+h(o[0])+'"'+(String(o[0])===String(selected)?' selected':'')+'>'+h(o[1])+'</option>'}).join('');}
  function pick(label,items,v,attr){return '<label class="fk-praksis__field"><span>'+h(label)+'</span><select '+attr+'>'+opts(items,v)+'</select></label>';}
  function text(label,value,attrs,help){return '<label class="fk-praksis__field"><span>'+h(label)+'</span><input '+attrs+' value="'+h(value)+'">'+(help?'<small>'+h(help)+'</small>':'')+'</label>';}
  var yn=[['no','Nei'],['yes','Ja'],['unsure','Usikker']];
  var statuses=[['unsure','Usikker'],['none','Ingen erfaring'],['some','Litt erfaring'],['regular','Gjør dette jevnlig'],['independent','Kan gjøre dette selvstendig']];
  function legal(){return '<aside class="fk-praksis__legal"><h3>'+h(copy.legal.title)+'</h3><p>'+h(copy.legal.p1)+'</p><p>'+h(copy.legal.p2)+'</p></aside>';}
  function link(url,label){return /^https:\/\//.test(url||'')?'<a target="_blank" rel="noopener noreferrer" href="'+h(url)+'">'+h(label)+'</a>':'';}
  function nav(step){return '<nav class="fk-praksis__actions">'+(step?'<button type="button" class="fk-praksis__button fk-praksis__button--secondary" data-action="back">Tilbake</button>':'')+'<button type="button" class="fk-praksis__button" data-action="next">'+(step===4?'Se min beregning':step===0?'Start beregningen':'Neste')+'</button></nav>';}
  function newJob(id){return {id:'job-'+id,label:'',startDate:'',endDate:'',ongoing:false,category:'employment',measure:'percentage',percentage:'100',hours:'',additionalHours:'',relevance:'yes',evidence:'missing',abroad:false};}
  function jobCard(r,i){return '<section class="fk-praksis__job" data-job="'+h(r.id)+'"><div class="fk-praksis__job-head"><h3>Arbeidsperiode '+(i+1)+'</h3><button type="button" class="fk-praksis__remove" data-action="remove" data-id="'+h(r.id)+'">Fjern</button></div><div class="fk-praksis__fields">'+
    text('Arbeidssted (valgfritt)',r.label,'type="text" maxlength="120" data-key="label"')+
    pick('Hvordan jobbet du?',[['employment','Ansatt'],['hourly','Timevikar'],['self_employed','Egen virksomhet'],['voluntary','Arbeidstrening eller frivillig'],['other','Annet']],r.category,'data-key="category"')+
    text('Fra dato',r.startDate,'type="date" data-key="startDate"')+
    (r.ongoing?'':text('Til dato',r.endDate,'type="date" data-key="endDate"'))+
    '</div><label class="fk-praksis__check"><input type="checkbox" data-key="ongoing"'+(r.ongoing?' checked':'')+'> Jeg jobber her fortsatt</label>'+
    '<div class="fk-praksis__fields">'+pick('Oppgi arbeidstid som',[['percentage','Stillingsprosent'],['hours','Dokumenterte timer']],r.measure,'data-key="measure"')+
    (r.measure==='percentage'?text('Stillingsprosent',r.percentage,'type="number" min="1" max="100" step="0.1" data-key="percentage"', 'Registrer ny periode hvis stillingsprosenten endret seg.')+
      text('Ekstratimer (valgfritt)',r.additionalHours,'type="number" min="0" step="0.5" data-key="additionalHours"','Ekstratimer uten månedsfordeling beregnes ikke automatisk.'):
      text('Antall relevante arbeidstimer',r.hours,'type="number" min="1" step="0.5" data-key="hours"','Registrer ikke de samme timene i flere perioder.'))+
    pick('Var arbeidsoppgavene relevante for kokkfaget?',[['yes','Ja'],['unsure','Usikker'],['no','Nei']],r.relevance,'data-key="relevance"')+
    pick('Har du attest?', [['ready','Ja'],['missing','Nei'],['unsure','Usikker']],r.evidence,'data-key="evidence"')+
    '</div><label class="fk-praksis__check"><input type="checkbox" data-key="abroad"'+(r.abroad?' checked':'')+'> Praksisen er fra utlandet</label></section>';}
  function input(s){return {professionCode:'KOK03-02',countyCode:s.countyCode,asOfDate:s.asOfDate,work:s.work,education:s.education,competencyAnswers:s.competencyAnswers,examStatus:s.examStatus,attestStatus:s.attestStatus};}
  function render(root,s,focus){
    var html='', county=countyList.find(function(c){return c.code===s.countyCode;});
    if(s.step===0){html='<div class="fk-praksis__hero"><p class="fk-praksis__eyebrow">FAGKLAR · KOKKFAGET (KOK03-02)</p><h2>'+h(copy.product.title)+'</h2><p class="fk-praksis__lead">'+h(copy.product.intro)+'</p></div><p>Beregn et estimat for din egen arbeidserfaring og tidligere skolegang. Det kreves ingen innlogging, og opplysningene blir i nettleseren din.</p>'+legal()+nav(0);}
    if(s.step===1){html='<h2>Hvilket fylke bor du i?</h2><p>Velg fylket der du er folkeregistrert. Fylkeskommunen vurderer praksisen og dokumentasjonen din.</p>'+pick('Fylke',[['','Velg fylke']].concat(countyList.map(function(c){return [c.code,c.name]})),s.countyCode,'data-field="countyCode" required')+(county?'<p class="fk-praksis__hint">'+(Engine.isVerifiedCounty(county,s.asOfDate)?'Fylkets bekreftede regel for beregning av stillingsprosent blir brukt.':'80-prosentregelen er ikke bekreftet for dette fylket. Oppgitt stillingsprosent brukes som et forsiktig estimat.')+'</p><p>'+link(county.officialUrl,'Informasjon fra fylkeskommunen')+'</p>':'')+nav(1);}
    if(s.step===2){html='<h2>Fortell om jobbene dine</h2><p>Registrer arbeidserfaring som du mener er relevant for kokkfaget. Deltid og overlappende perioder blir beregnet med et øvre tak på fulltid.</p>'+s.work.map(jobCard).join('')+'<button type="button" class="fk-praksis__button fk-praksis__button--secondary" data-action="add">+ Legg til arbeidsperiode</button>'+nav(2);}
    if(s.step===3){html='<h2>Har du relevant skolegang?</h2><p>Bestått Vg1 eller Vg2 kan gi mulig godskriving, men fylkeskommunen avgjør hva som faktisk godkjennes.</p><div class="fk-praksis__fields">'+
      pick('Bestått Vg1 restaurant- og matfag?',yn,s.education.vg1,'data-edu="vg1"')+
      pick('Bestått Vg2 kokk- og servitørfag?',yn,s.education.vg2,'data-edu="vg2"')+
      pick('Annen eller ufullført skolegang?',yn,s.education.other,'data-edu="other"')+
      pick('Tidligere fagbrev eller svennebrev?',yn,s.education.priorTrade,'data-edu="priorTrade"')+
      text('Eget vedtak om godskriving (måneder, valgfritt)',s.education.countyDecisionMonths,'type="number" min="0" max="60" data-edu="countyDecisionMonths"','Registrert vedtak er ikke verifisert og blir ikke lagt til automatisk.')+
      '</div><p>Bestått skriftlig Vg3-eksamen (KOK3103) gir ikke praksismåneder.</p>'+nav(3);}
    if(s.step===4){html='<h2>Erfaring, eksamen og dokumentasjon</h2><p>Beskriv arbeidsoppgavene du har erfaring med. Dette er en egenvurdering, ikke en formell godkjenning.</p><div class="fk-praksis__fields">'+copy.competencies.map(function(c){return pick(c.label,statuses,s.competencyAnswers[c.key]||'unsure','data-competency="'+h(c.key)+'"')+'<small>'+h(c.example)+'</small>';}).join('')+
      pick('Har du bestått skriftlig Vg3-eksamen KOK3103?',[['unsure','Usikker'],['passed','Ja, bestått'],['planned','Planlagt'],['not_taken','Ikke tatt']],s.examStatus,'data-field="examStatus"')+
      pick('Har du signerte arbeidsgiverattester?',[['unsure','Usikker'],['all','Ja, fra alle'],['some','Fra noen'],['none','Nei']],s.attestStatus,'data-field="attestStatus"')+'</div>'+nav(4);}
    if(s.step===5){
      var result=Engine.estimatePractice(input(s),cfg.registry);
      if(!result.valid){html='<h2>Kontroller opplysningene</h2><ul>'+result.errors.map(function(e){return '<li>'+h(e.message)+'</li>'}).join('')+'</ul><button class="fk-praksis__button" type="button" data-action="back">Tilbake</button>';}
      else {
        var actions=[],progress=Math.min(100,100*result.totalEstimatedMonths/60);
        if(result.remainingEstimatedMonths>0)actions.push('Fortsett å samle relevant arbeidserfaring.');
        if(result.examStatus!=='passed')actions.push('Undersøk oppmelding til skriftlig Vg3-eksamen (KOK3103).');
        if(result.attestStatus!=='all')actions.push('Be arbeidsgivere om signerte attester som viser perioder, arbeidstid og arbeidsoppgaver.');
        if(result.manualReviewReasons.length)actions.push('Avklar usikre opplysninger og mulig godskriving med fylkeskommunen.');
        actions.push('Kontakt fylkeskommunen der du bor for endelig vurdering.');
        html='<div class="fk-praksis__result-heading"><p class="fk-praksis__eyebrow">DIN FORELØPIGE PRAKSISBEREGNING</p><h2>'+h(copy.status[result.status])+'</h2><p>Dette er beregnet tid, ikke godkjent praksis.</p></div>'+
        '<div class="fk-praksis__result-grid"><div><span>Estimert tid fra arbeid</span><strong>'+num(result.workEstimatedMonths)+'</strong></div><div><span>Mulig godskriving fra skolegang</span><strong>'+num(result.educationPotentialMonths)+'</strong></div>'+
        '<div class="fk-praksis__result-primary"><span>Samlet foreløpig beregning</span><strong>'+num(result.totalEstimatedMonths)+' / 60 mnd.</strong></div>'+
        '<div><span>Anslått praksistid som gjenstår</span><strong>'+num(result.remainingEstimatedMonths)+'</strong></div></div>'+
        '<div class="fk-praksis__progress" role="progressbar" aria-label="Beregnet praksistid" aria-valuemin="0" aria-valuemax="60" aria-valuenow="'+h(Math.min(60,result.totalEstimatedMonths).toFixed(1))+'"><div style="width:'+progress+'%"></div></div>'+legal()+
        '<section class="fk-praksis__section"><h3>Dette bør du være oppmerksom på</h3><ul class="fk-praksis__notes">'+result.warnings.map(function(w){return '<li>'+h(copy.warnings[w.code]||w.code)+'</li>'}).join('')+'</ul></section>'+
        '<section class="fk-praksis__section"><h3>Dette kan du gjøre videre</h3><ol class="fk-praksis__notes">'+actions.map(function(a){return '<li>'+h(a)+'</li>'}).join('')+'</ol></section>'+
        '<section class="fk-praksis__section"><h3>Registrerte arbeidsperioder</h3><ul>'+s.work.map(function(w){return '<li>'+h(w.label||'Arbeidssted')+': '+h(w.startDate)+' – '+h(w.ongoing?'pågår':w.endDate)+', '+h(w.measure==='percentage'?w.percentage+' %':w.hours+' timer')+'</li>'}).join('')+'</ul>'+
        '<p><strong>Fylke:</strong> '+h(result.county)+' · <strong>Regelversjon:</strong> '+h(result.ruleVersion)+' · <strong>Dato:</strong> '+h(result.evaluationDate)+'</p>'+
        '<p>'+link(result.countyUrl,'Se fylkeskommunens informasjon')+' · '+link(copy.links.curriculum,'Se læreplanen')+'</p></section>'+
        '<nav class="fk-praksis__actions fk-praksis__no-print"><button type="button" class="fk-praksis__button" data-action="print">Skriv ut oppsummering</button><button type="button" class="fk-praksis__button fk-praksis__button--secondary" data-action="back">Endre opplysningene</button><button type="button" class="fk-praksis__button fk-praksis__button--quiet" data-action="reset">Start på nytt</button></nav>';
      }
    }
    root.innerHTML='<div class="fk-praksis__inner"><div class="fk-praksis__stepper"><p>Steg '+(s.step+1)+' av 6</p></div><div class="fk-praksis__body">'+(s.errors.length?'<div role="alert" class="fk-praksis__validation">'+s.errors.map(function(e){return '<p>'+h(e.message)+'</p>'}).join('')+'</div>':'')+html+'</div></div>';
    if(focus){var heading=root.querySelector('h2');if(heading){heading.tabIndex=-1;heading.focus();}}
  }
  function mount(root){
    var nextId=0, s={step:0,countyCode:'',asOfDate:today(),work:[],education:{vg1:'no',vg2:'no',other:'no',priorTrade:'no',countyDecisionMonths:''},competencyAnswers:{},examStatus:'unsure',attestStatus:'unsure',errors:[]};
    function change(e){var el=e.target, j=el.closest('[data-job]');if(j&&el.dataset.key){var row=s.work.find(function(r){return r.id===j.dataset.job});if(row)row[el.dataset.key]=el.type==='checkbox'?el.checked:el.value;}else if(el.dataset.edu)s.education[el.dataset.edu]=el.value;else if(el.dataset.competency)s.competencyAnswers[el.dataset.competency]=el.value;else if(el.dataset.field)s[el.dataset.field]=el.value;}
    root.addEventListener('input',change);
    root.addEventListener('change',function(e){change(e);if(e.target.dataset.key==='ongoing'||e.target.dataset.key==='measure'||e.target.dataset.field==='countyCode'){s.errors=[];render(root,s);}});
    root.addEventListener('click',function(e){var btn=e.target.closest('button[data-action]');if(!btn)return;var a=btn.dataset.action;e.preventDefault();
      if(a==='add'){s.work.push(newJob(++nextId));s.errors=[];render(root,s);}
      if(a==='remove'){s.work=s.work.filter(function(r){return r.id!==btn.dataset.id});s.errors=[];render(root,s);}
      if(a==='back'){s.step=Math.max(0,s.step-1);s.errors=[];render(root,s,true);}
      if(a==='next'){s.errors=(s.step===1&&!s.countyCode?[{message:'Velg fylket der du bor.'}]:s.step===2?Engine.validateAssessment(input(s),cfg.registry).filter(function(e){return e.path.indexOf('work.')===0;}):[]);if(!s.errors.length)s.step=Math.min(5,s.step+1);render(root,s,true);}
      if(a==='print')window.print();
      if(a==='reset'&&window.confirm('Vil du starte på nytt? Opplysningene du har registrert blir borte.')){s.step=0;s.countyCode='';s.work=[];s.education={vg1:'no',vg2:'no',other:'no',priorTrade:'no',countyDecisionMonths:''};s.competencyAnswers={};s.examStatus='unsure';s.attestStatus='unsure';s.errors=[];render(root,s,true);}
    });
    render(root,s);
  }
  function start(){document.querySelectorAll('[data-fk-praksis]').forEach(mount);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
