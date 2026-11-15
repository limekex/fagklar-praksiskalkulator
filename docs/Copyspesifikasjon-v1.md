# Fagklar Praksiskalkulator – UX- og copyspesifikasjon

**Dokument-ID:** FK-PRAKSIS-COPY-001  
**Versjon:** 1.0 – publiseringsklar tekstmal / gjennomleses mot implementasjon  
**Dato:** 15. november 2026  
**Målgruppe:** Innholdsdesigner, fagansvarlig, frontend-utvikler  
**Språk:** Norsk bokmål; lesbar for voksne på omtrent B1-nivå  
**Søsterdokument:** `Fagklar_Praksiskalkulator_Teknisk_spesifikasjon_v1.md`

## 1. Språklig kontrakt

**Hovedbudskap:** «Fra erfaring til fagbrev» – verktøyet hjelper deg å få oversikt over praksisen din, men Fagklar godkjenner ingenting.

### Obligatorisk tekst (eksakt)

**Viktig informasjon om beregningen**

Dette er en veiledende beregning basert på opplysningene du selv har registrert. Fagklar har ikke kontrollert eller godkjent arbeidserfaringen eller dokumentasjonen din.

Beregningen gir ingen garanti for at praksisen blir godkjent. Det er alltid fylkeskommunen der du bor, som vurderer dokumentasjonen din og avgjør om du oppfyller kravene for å melde deg opp til fagprøven.

**Plassering:** Skal stå på landingssiden før startknappen, på resultatsiden ved tallene og i utskrift/PDF. Ikke skjul den kun i tooltip, trekkspill eller vilkår. Må ikke kunne overstyres fra tema/admin.

**Juridisk/brukerrettet tillegg ved fylkesvalg:** «Du skal som hovedregel melde deg opp i fylket der du bor og er folkeregistrert. Er du usikker på hvilket fylke som behandler saken din, må du kontakte fylkeskommunen.»

### Vi skriver slik

- Konkret, varm, rolig, tydelig; bruk **du**, **vi** bare når Fagklar faktisk gjør noe.
- Korte avsnitt, én beskjed per avsnitt, vanlige ord: «arbeidserfaring», «attest», «arbeidsoppgaver», «fylket du bor i».
- Forklar «praksiskandidat», «godskriving», «allsidig praksis» første gang.
- Skill konsekvent mellom **beregnet tid**, **mulig fradrag**, **egen vurdering** og **endelig vurdering hos fylkeskommunen**.
- «Ca.»/«estimert»/«foreløpig» ved resultater, og hva tallet bygger på.
- Forklar både hva kandidaten har oppgitt og hva som mangler.
- Ingen kursreklame før resultat/handlingsplan er ferdig.

### Forbudte formuleringer / korrekte alternativer

| Ikke skriv | Skriv heller |
|---|---|
| «Din praksis er godkjent» | «Du har oppgitt praksis som tilsvarer omtrent …» |
| «Du er kvalifisert til fagprøven» | «Den beregnede praksistiden ser ut til å nå tidskravet» |
| «Du er 100 % klar» | «Beregnet tidskrav: nådd. Faglig innhold og dokumentasjon må fortsatt vurderes» |
| «Du kan melde deg opp nå» | «Se fylkeskommunens krav til oppmelding» |
| «Fagklar har vurdert kompetansen din» | «Dette er din egen beskrivelse av erfaringen din» |
| «Du får 24 måneder fradrag» | «Du kan ha rett til inntil 24 måneders godskriving, dersom vilkårene er oppfylt» |
| «Fem år med jobb er nok» | «Praksisen må være lang nok og dekke sentrale deler av faget» |
| «80 % er alltid heltid» | «Noen fylker regner 80 % stilling som heltid. Vi bruker regelen bare der den er bekreftet» |
| «Bestått teoriprøve gjør deg klar» | «Bestått skriftlig Vg3-eksamen er ett av flere krav» |
| «Avslag» / «ikke kvalifisert» | «Det ser ut til at du mangler …» / «Dette må avklares» |

## 2. Landingsside

**SEO-tittel:** Praksiskalkulator for kokk | Beregn praksistid – Fagklar  
**Meta description:** Har du jobbet på kjøkken og ønsker fagbrev som kokk? Beregn hvor mye praksis du kan ha, se hva som gjenstår, og finn ut hva fylkeskommunen må vurdere.

**H1:** Hvor mye praksis har du mot fagbrev som kokk?

**Ingress:** Har du jobbet på kjøkken og vil ta fagbrev som kokk? Her kan du få et overslag over hvor mye relevant praksis du har opparbeidet, og hva du kanskje mangler før du kan melde deg opp til fagprøven.

**Tre korte fordeler:**  
- Regn sammen arbeidserfaring fra flere jobber.  
- Se om tidligere skolegang kan telle med.  
- Få en oversikt over dokumentasjon og neste steg.

**Kort forklaring:** Praksiskandidatordningen er for deg som har lang og allsidig erfaring fra faget. For kokker er hovedregelen fem års relevant praksis i heltid. Deltid kan regnes om. Det er ikke bare antall timer som teller – arbeidsoppgavene dine må også være relevante for kokkfaget.

**Tidsangivelse (kun hvis faktisk testet):** «De fleste bruker noen minutter.» Ikke skriv et konkret minuttall før brukertest.

**Obligatorisk ansvarstekst:** Se punkt 1, vises i full lengde.

**Primærknapp:** Start beregningen  
**Sekundær:** Slik fungerer kalkulatoren

**«Slik fungerer»-innhold:** Du legger inn fylke, arbeidserfaring, eventuell skolegang og litt informasjon om arbeidsoppgavene dine. Du får et estimat og en liste over hva du bør undersøke. Ingen opplysninger sendes til fylkeskommunen.

## 3. Steg 1 – fylke

**Stegtittel:** Hvor bor du?  
**Forklaring:** Fylkeskommunen der du bor, skal vurdere praksisen din når du melder deg opp. Noen fylker bruker litt forskjellige beregningsmåter og skjemaer.

**Feltetikett:** Velg fylke  
**Hjelpetekst:** Velg fylket der du bor og er folkeregistrert.  
**Placeholder:** Velg fylke …  
**Hjelp ved usikkerhet:** Er du ikke folkeregistrert der du jobber, skal du normalt velge fylket der du bor. Kontakt fylkeskommunen hvis situasjonen din er spesiell.

**Vilkår ved uverifisert lokal regel:** Vi har ikke bekreftet alle beregningsreglene for [fylke]. Resultatet er derfor et forsiktig estimat. Spør fylkeskommunen hvordan de vil beregne din praksis.

**Navigasjon:** Neste: Arbeidserfaring / Tilbake

## 4. Steg 2 – arbeidserfaring

**Stegtittel:** Fortell om jobbene dine  
**Forklaring:** Legg inn jobbene der du har hatt arbeidsoppgaver som er relevante for kokkfaget. Du kan legge til flere arbeidssteder og perioder.

**Seksjonsoverskrift:** Arbeidssted [nummer]  
**Feltetiketter og hjelpetekster:**

| Felt | Etikett / hjelpetekst |
|---|---|
| Arbeidssted | «Navn på arbeidssted (valgfritt)» / «Du kan skrive for eksempel Restaurant A.» |
| Fra dato | «Når begynte du?» |
| Til dato | «Når sluttet du?» |
| Pågår | «Jeg jobber her fortsatt» |
| Arbeidsform | «Hvordan jobbet du?» / «Fast stilling, timevikar, egen bedrift eller annet.» |
| Registreringsmåte | «Hvordan vil du oppgi arbeidstiden?» / valg «Stillingsprosent» eller «Timer» |
| Stillingsprosent | «Hvor stor stilling hadde du?» / «Eksempel: 50 hvis du jobbet halv stilling.» |
| Timer | «Hvor mange relevante arbeidstimer har du dokumentasjon på?» |
| Varierende stilling | «Har stillingsprosenten endret seg? Legg inn en ny periode.» |
| Ekstratimer | «Har du jobbet ekstra timer som ikke er med i stillingsprosenten?» |
| Relevans | «Var arbeidsoppgavene relevante for kokkfaget?» / «Ja», «Usikker», «Nei» |
| Attest | «Har du en attest fra arbeidsgiveren?» / «Ja», «Nei», «Vet ikke» |
| Utenlandsk praksis | «Er praksisen fra et annet land?» |

**Hjelpetekst om relevans:** Arbeid på kjøkken kan være relevant, men det kommer an på hvilke arbeidsoppgaver du faktisk har hatt. Fylkeskommunen vurderer dette.

**Hjelpetekst om doble timer:** Ikke registrer samme arbeidstid to ganger. Ekstratimer skal bare være timer som kommer i tillegg til den vanlige stillingen.

**Hjelpetekst om overlapp:** Du har lagt inn perioder som overlapper. Vi regner ikke mer enn full praksistid for samme tidsrom. Hvis timene ikke kan fordeles sikkert, ber vi deg kontrollere opplysningene.

**Hjelpetekst for 80 % – bare verifisert fylke:** I [fylke] opplyser fylkeskommunen at stillinger på minst 80 % regnes som heltid. Vi har brukt dette i beregningen. [Se regelen hos fylkeskommunen]

**Hjelpetekst for andre fylker:** Vi har ikke bekreftet at 80 % regnes som heltid i [fylke]. Vi regner derfor stillingsprosenten slik du oppgir den og markerer resultatet som foreløpig.

**Knapp:** Legg til en jobb  
**Knapp for ny periode:** Legg til en periode  
**Slett (med bekreftelse):** Fjern denne perioden  
**Navigasjon:** Neste: Skolegang / Tilbake

## 5. Steg 3 – skolegang og tidligere fagbrev

**Stegtittel:** Har du relevant skolegang fra før?  
**Forklaring:** Tidligere fullført og bestått opplæring kan redusere hvor mye praksis du trenger. Dette kalles godskriving. Det er fylkeskommunen som avgjør hva du kan få godskrevet.

**Spørsmål 1:** Har du fullført og bestått Vg1 restaurant- og matfag?  
Svar: «Ja», «Nei», «Usikker».

**Spørsmål 2:** Har du fullført og bestått Vg2 kokk- og servitørfag?  
Svar: «Ja», «Nei», «Usikker».

**Spørsmål 3:** Har du annen videregående opplæring?  
Hjelp: «Dette kan også være eldre grunnkurs/VKI eller skolegang fra et annet utdanningsprogram.»

**Spørsmål 4:** Har du fagbrev eller svennebrev fra før?  
Hjelp: «Et tidligere fagbrev kan påvirke beregningen. Her må reglene vurderes særskilt, og vi vil ikke automatisk summere alle mulige fradrag.»

**Spørsmål 5:** Har du et vedtak fra fylkeskommunen om godskriving?  
Hjelp: «Du kan registrere det som står i vedtaket, men Fagklar kontrollerer ikke vedtaket.»

**Info ved Vg1/Vg2:** Fullført og bestått Vg1 og Vg2 i riktig utdanningsløp kan gi godskriving. Vi viser et mulig fradrag, ikke et vedtak.

**Info ved bare noen fag bestått:** Vi kan ikke automatisk gi godskriving for enkeltfag. Ta kontakt med fylkeskommunen om hvordan skolegangen din skal vurderes.

**Info om teorieksamen:** Bestått skriftlig Vg3-eksamen (KOK3103) gir ikke ekstra praksistid. Eksamen er et eget krav før fagprøven.

**Navigasjon:** Neste: Erfaring og dokumentasjon / Tilbake

## 6. Steg 4 – hva har du gjort på jobb?

**Stegtittel:** Hvilke arbeidsoppgaver har du erfaring med?  
**Forklaring:** Det er viktig at praksisen er allsidig. Det betyr at du har arbeidet med flere viktige deler av kokkfaget. Her beskriver du din egen erfaring. Fagklar vurderer ikke om kompetansen din er godkjent.

**Svar for hvert område:** Ingen erfaring / Litt erfaring / Gjør dette jevnlig / Kan gjøre dette selvstendig / Usikker.

| Område | Kort tekst med eksempel |
|---|---|
| Tilberedning og matproduksjon | «Lage kalde og varme retter, desserter og tilbehør med ulike metoder.» |
| Råvarer og bærekraft | «Bearbeide kjøtt, fisk og grønnsaker og utnytte råvarer godt.» |
| Meny og planlegging | «Planlegge menyer, mengder, produksjon og måltider.» |
| Mattrygghet og allergener | «Følge rutiner for hygiene, trygg mat og tilpasning ved allergier.» |
| Lagring og merking | «Ta imot varer, lagre riktig, merke og kontrollere råvarer.» |
| Økonomi og ressursbruk | «Beregne mengder, kostnader og arbeide for mindre matsvinn.» |
| HMS og samarbeid | «Bruke utstyr sikkert, samarbeide og følge HMS-rutiner.» |

**Hjelp:** Du trenger ikke ha gjort alt på hver arbeidsplass. Det er den samlede praksisen fylkeskommunen vurderer.

**Viktig:** Svarene er bare din egen beskrivelse og gir ikke poeng eller formell godkjenning.

**Mulig varsling:** Du har oppgitt lite erfaring med [område]. Det kan være lurt å undersøke om du trenger mer allsidig praksis. Du kan også snakke med arbeidsgiveren din.

**Navigasjon:** Neste: Eksamen og resultat / Tilbake

## 7. Steg 5 – eksamen og dokumentasjon

**Stegtittel:** Hva har du dokumentasjon på?  
**Forklaring:** Det er ikke nok å ha jobbet lenge. Fylkeskommunen trenger også dokumentasjon som viser hva du har gjort, hvor lenge du har jobbet, og hvor stor stillingen var.

**Spørsmål:** Har du bestått skriftlig Vg3-eksamen i kokkfaget (KOK3103)?  
Svar: «Ja, bestått», «Jeg skal ta den», «Nei», «Usikker».

**Infotekst:** Skriftlig Vg3-eksamen er et eget krav før fagprøven. Fagklar kan ikke se eksamensresultatet ditt.

**Spørsmål:** Har du signerte attester fra arbeidsgiverne dine?  
Svar: «Ja, fra alle», «Fra noen», «Nei», «Usikker».

**Hjelpetekst:** En attest bør beskrive datoene du jobbet, stillingsprosent eller timer, stillingstittel og arbeidsoppgaver. Fylket kan ha egne krav.

**Avklaring:** En arbeidskontrakt eller CV er ikke nødvendigvis nok som dokumentasjon. Se kravene hos fylkeskommunen.

**Knapp:** Se min beregning  
**Sekundær:** Tilbake og endre

## 8. Resultatsiden – felles oppbygning

**H1:** Din foreløpige praksisberegning  
**Innledning:** Dette er et estimat laget ut fra opplysningene du har registrert. Tallene viser beregnet tid, ikke godkjent praksis.

**Talloverskrifter:**
- «Estimert arbeidserfaring»
- «Mulig godskriving av skolegang»
- «Samlet foreløpig beregning»
- «Vanlig tidskrav i kokkfaget»
- «Anslått praksistid som gjenstår»

**Under tallene:** «Vi har brukt beregningsreglene som er registrert for [fylke]. Kontrollert [dato]. [Se hvilke regler som er brukt]»

**Standardforklaring:** «For kokkfaget er hovedregelen fem års allsidig praksis. Det tilsvarer 60 måneder i full stilling. Praksisen må dekke de viktigste delene av Vg3-læreplanen.»

**Viktig – full ansvarstekst (ordrett som punkt 1).**

### 8.1 Variant A – anslått tid under kravet

**Overskrift:** Det ser ut til at du mangler praksistid  
**Tekst:** Du har oppgitt arbeidserfaring og eventuell skolegang som samlet tilsvarer omtrent **[X] av 60 måneder**. Etter denne beregningen gjenstår omtrent **[Y] måneder**.

**Tillegg:** Dette er ikke en vurdering av om erfaringen din er godkjennbar. Arbeidsoppgaver, dokumentasjon og eventuelle fradrag må vurderes av fylkeskommunen.

**Neste steg:** Fortsett å samle relevant praksis, be om attester, og undersøk om tidligere skolegang kan gi godskriving.

### 8.2 Variant B – beregnet tid lik eller over kravet

**Overskrift:** Den beregnede praksistiden ser ut til å nå tidskravet  
**Tekst:** Ut fra opplysningene dine har du oppgitt omtrent **[X] måneder** med arbeidserfaring og mulig godskriving. Hovedkravet for kokkfaget er vanligvis 60 måneder.

**Tillegg (alltid):** Dette betyr **ikke** at praksisen din er godkjent eller at du automatisk kan melde deg opp til fagprøven. Fylkeskommunen må fortsatt vurdere om praksisen er relevant og allsidig, kontrollere dokumentasjonen og se at eksamenskravet er oppfylt.

**Neste steg:** Samle attester, kontroller eksamensstatus og les oppmeldingskravene for [fylke].

### 8.3 Variant C – kan ikke beregnes trygt

**Overskrift:** Noen opplysninger må avklares først  
**Tekst:** Vi kan beregne deler av praksisen din, men vi kan ikke gi et pålitelig samlet estimat ennå. Det skyldes [kort automatisk forklaring: overlappende timelister / tidligere fagbrev / uklar utdanning / uklar fylkesregel].

**Neste steg:** Kontroller de markerte periodene eller spør fylkeskommunen hvordan de skal regnes. Vi viser bare de delene som kan beregnes på en forklarbar måte.

### 8.4 Variant D – ingen eller mangelfulle perioder

**Overskrift:** Vi trenger litt mer informasjon  
**Tekst:** Legg inn minst én arbeidsperiode, eller registrer relevant skolegang, så kan vi vise et foreløpig regnestykke.

**Knapp:** Legg til arbeidserfaring

## 9. Dynamiske forklaringer og handlingsplan

Vis kun relevante elementer, men behold alltid lenken til fylket og ansvarsavklaringen.

| Situasjon | Tekst |
|---|---|
| Skriftlig eksamen bestått | «Du har oppgitt at du har bestått skriftlig Vg3-eksamen i kokkfaget (KOK3103). Fylkeskommunen kontrollerer eksamenskravet.» |
| Eksamen ikke bestått/ikke tatt | «Du må også bestå skriftlig Vg3-eksamen i kokkfaget (KOK3103) før fagprøven.» |
| Attester mangler | «Be arbeidsgiveren din om en signert attest som beskriver tidsrom, stilling og arbeidsoppgaver.» |
| Ikke alle kompetanseområder dekket | «Du har oppgitt begrenset erfaring med [område]. Snakk med arbeidsgiveren din om muligheter for mer variert praksis.» |
| Tidligere fagbrev | «Tidligere fagbrev kan gi godskriving, men vi kan ikke regne dette automatisk sammen med andre fradrag. Ta kontakt med fylkeskommunen.» |
| Utenlandsk praksis | «Arbeidserfaring fra utlandet kan være relevant. Fylkeskommunen avgjør hvilke attester og oversettelser du trenger.» |
| Egen virksomhet | «Praksis fra egen virksomhet kan kreve andre typer dokumentasjon. Spør fylkeskommunen hva de trenger.» |
| Nyere praksis under 50 % | «Udir anbefaler at minst halvparten av praksisen normalt er fra de siste ti årene. Dette er et forhold fylkeskommunen må vurdere.» |
| Kort arbeidsperiode | «Kortere arbeidsforhold kan kreve nærmere vurdering. Ta med dokumentasjon på oppgavene og timene.» |
| Uklar 80 %-regel | «Vi har ikke bekreftet om [fylke] regner 80 % stilling som heltid. Estimatet kan derfor avvike fra fylkets beregning.» |
| Høyt timeantall | «Vi regner ikke mer enn full praksistid for samme tidsrom, selv om du har jobbet flere steder.» |
| Praktisk prøve | «Undersøk også om du må ordne prøvested, råvarer og utstyr selv. Reglene kan variere.» |

**Handlingsplanens faste overskrift:** Dette kan du gjøre videre  
**Faste handlinger:**  
1. Se over opplysningene du har lagt inn.  
2. Skaff attester og dokumentasjon.  
3. Les kravene hos fylkeskommunen.  
4. Kontroller om skriftlig Vg3-eksamen er bestått.  

**Knapp:** Se oppmelding i [fylke]  
**Knapp:** Se læreplanen for kokkfaget  
**Knapp:** Skriv ut oppsummering  
**Knapp:** Endre opplysningene mine  
**Knapp:** Start på nytt

**Etter resultat – frivillig Fagklar-lenke:** «Vil du ha hjelp til å forberede deg til skriftlig Vg3-eksamen? Se kursene våre i kokkfaget.» Ikke bland dette med statusen på praksis.

## 10. Feilmeldinger og tomtilstander

| Nøkkel | Tekst |
|---|---|
| `validation.county.required` | «Velg fylket der du bor.» |
| `validation.date.startRequired` | «Velg datoen du startet.» |
| `validation.date.endBeforeStart` | «Sluttdatoen kan ikke være før startdatoen.» |
| `validation.date.futureStart` | «Startdatoen kan ikke være senere enn i dag.» |
| `validation.percentage.range` | «Skriv en stillingsprosent fra 1 til 100.» |
| `validation.hours.positive` | «Skriv inn et timetall som er større enn 0.» |
| `validation.measure.required` | «Velg om du vil oppgi stillingsprosent eller timer.» |
| `validation.duplicateHours` | «Kontroller at du ikke har lagt inn de samme timene to ganger.» |
| `warning.overlap` | «Noen arbeidsperioder overlapper. Vi har satt et tak på full praksistid for samme tidsrom.» |
| `warning.overlapUnknown` | «Disse timene overlapper andre perioder. Vi trenger flere opplysninger før vi kan regne dem sammen.» |
| `warning.schoolUnclear` | «Vi kan ikke beregne godskriving for denne skolegangen automatisk.» |
| `warning.priorTrade` | «Et tidligere fagbrev må vurderes særskilt av fylkeskommunen.» |
| `warning.ruleUnverified` | «Noen regler for fylket ditt er ikke bekreftet. Resultatet er derfor ekstra usikkert.» |
| `error.generic` | «Noe gikk galt med beregningen. Opplysningene dine er ikke sendt inn. Prøv igjen eller se fylkeskommunens egen veiledning.» |
| `empty.work` | «Du har ikke lagt inn noen arbeidsperioder ennå.» |
| `confirm.reset` | «Vil du starte på nytt? Opplysningene du har skrevet inn i denne beregningen blir borte.» |
| `print.title` | «Foreløpig praksisoversikt – Fagklar» |
| `print.footer` | «Beregningen bygger på egenrapporterte opplysninger og er ikke et vedtak eller en godkjenning fra fylkeskommunen.» |

Feil må alltid vises ved feltet, ikke bare som rød ramme. Vis aldri personvern-/nettverksfeil som «søknaden er sendt».

## 11. Utskrift og rapport

**Tittel:** Foreløpig praksisoversikt – kokkfaget  
**Metadata:** Beregnet [dato]. Valgt fylke: [fylke]. Regelversjon: [versjon].  
**Ingress:** «Denne oversikten er laget fra opplysningene du selv har lagt inn. Den kan brukes når du skal få oversikt eller snakke med arbeidsgiver eller fylkeskommunen.»

**Oppbygning:**
1. Anslått tidskrav og beregnet tid (med eventuell usikkerhet).
2. Registrerte arbeidsperioder og hvordan de er regnet om.
3. Mulig utdanningsfradrag, egne vurderingsforbehold.
4. Kandidatens egen oversikt over arbeidsoppgaver.
5. Status for attest og skriftlig eksamen.
6. Punkter som bør avklares.
7. Offisielle kilder og fylkeslenke.
8. **Full ansvarsavklaring ordrett fra punkt 1**, på siste side eller umiddelbart under resultatet – helst begge steder hvis rapporten er lengre.

**Viktig:** Ikke skriv «attest», «bekreftelse» eller «sertifikat» som rapporttype. Rapporten må ikke ligne et offentlig vedtak, og skal ikke ha et offisielt fylkeskommunalt emblem.

## 12. Vanlige spørsmål (FAQ)

**Må jeg ha jobbet i fem år for å ta fagbrev som kokk?**  
Hovedregelen for praksiskandidater i kokkfaget er fem års allsidig praksis i heltid. Tidligere relevant og fullført skolegang kan gi godskriving. Deltid kan regnes om. Fylkeskommunen vurderer hva som kan godkjennes.

**Hva betyr allsidig praksis?**  
Det betyr at du har erfaring med flere viktige arbeidsoppgaver i kokkfaget. Du trenger ikke ha gjort alt på én arbeidsplass. Praksisen må samlet dekke de viktigste delene av Vg3-læreplanen.

**Teller deltid?**  
Ja, deltid kan regnes om til praksistid i heltid. Noen fylker regner også stillinger på minst 80 % som heltid. Hvordan dette brukes i din sak, må du kontrollere hos fylkeskommunen.

**Teller jobb i kantine, på institusjon eller i restaurant?**  
Arbeidsstedet alene avgjør ikke. Det er arbeidsoppgavene dine og hvor godt de dekker kokkfaget som er viktig.

**Teller skolegang fra før?**  
Fullført og bestått relevant Vg1 og Vg2 kan gi godskriving. Eldre skolegang, andre utdanningsprogram og tidligere fagbrev må ofte vurderes nærmere.

**Har jeg nok praksis når jeg har bestått teoriprøven?**  
Nei, ikke automatisk. Skriftlig Vg3-eksamen i kokkfaget (KOK3103) er ett krav. I tillegg må fylkeskommunen godkjenne praksisen og dokumentasjonen din før fagprøven.

**Kan jeg melde meg opp når kalkulatoren viser 60 måneder?**  
Ikke nødvendigvis. Kalkulatoren viser et estimat fra dine egne opplysninger. Fylkeskommunen avgjør om praksisen er relevant, allsidig og godt nok dokumentert, og om du oppfyller kravene for oppmelding.

**Hva slags attest trenger jeg?**  
Be arbeidsgiveren beskrive hvor lenge du jobbet, hvor stor stilling du hadde eller hvor mange timer du jobbet, og hvilke arbeidsoppgaver du utførte. Attesten bør være signert. Se fylkets egne krav.

**Blir opplysningene mine sendt til fylkeskommunen?**  
Nei. Når du bruker den anonyme kalkulatoren, sendes ikke disse opplysningene til fylkeskommunen. Du må selv melde deg opp og sende inn dokumentasjon etter fylkets rutiner.

**Kan jeg bruke resultatet som dokumentasjon?**  
Du kan bruke utskriften som en personlig oversikt. Den erstatter ikke arbeidsgiverattester, vitnemål eller fylkeskommunens vurdering.

## 13. Personvern- og tillitstekster

**Ved start:** Du trenger ikke opprette konto. I denne versjonen beregnes opplysningene i nettleseren. Vi sender dem ikke til fylkeskommunen.

**Ved arbeidssted:** Ikke skriv inn fødselsnummer eller annen sensitiv informasjon. Det holder med perioder, stillingsstørrelse og hvilken type jobb du har hatt.

**Ved utskrift:** Oppsummeringen inneholder det du selv har registrert. Kontroller opplysningene før du deler den.

**Ved senere frivillig lagring (ikke aktiver før funksjonen finnes):** «Vil du lagre beregningen på Fagklar-kontoen din og fortsette senere? Dette er frivillig. Du kan se, eksportere og slette opplysningene dine.»

## 14. Tekstnøkler og komponentansvar

- Alle tekster legges i et sentralt `nb-NO`-ressursregister.
- `legal.disclaimer.title`, `legal.disclaimer.p1`, `legal.disclaimer.p2` er immutable og delte mellom start, resultat og rapport.
- `result.status.below`, `.met`, `.review`, `.incomplete` brukes fra resultatmotorens status, **ikke** med tilfeldig boolsk «approved».
- `county.warning.unverified` skal vises automatisk ved lokal regelusikkerhet.
- Variable strenger skal få korrekt norsk bøying og formatering: «1 måned», «2 måneder», «50 %», «[fylke]».
- Endringer i fakta om regelverk krever kildekontroll og faglig gjennomlesning.
- Kontroller at tekst gir mening alene i VoiceOver og ved 200 % zoom.

## 15. Copy-akseptansetest

En gjennomgang skal bekrefte:

- Ansvarsavklaringen står synlig, ordrett, på **start, resultat og utskrift**.
- Et resultat på 60/60 måneder utløser aldri «godkjent», «klar», «kvalifisert» eller «kan melde deg opp».
- Tid fra arbeid, skolegang, attest og eksamen holdes fra hverandre.
- Ubekreftet lokal 80 %-regel får et forståelig forbehold.
- Tidligere fagbrev/ufullført skolegang utløser ikke udokumentert fradrag.
- Alle forklaringer er forståelige for en voksen som lærer norsk på B1-nivå.
- Fagklar-kurs omtales som støtte for eksamensforberedelse, ikke som garanti for godkjenning.

---

## Referanser for innholdsvedlikehold

- Udir: https://www.udir.no/regelverk-og-tilsyn/skole-og-opplaring/veileder-om-praksiskandidatordningen/
- Udir, Vg3 kokkfaget: https://www.udir.no/lk20/kok03-02
- Udir, KOK3103: https://www.udir.no/lk20/fagkoder/kok3103?lang=nob
- Opplæringsforskriften, godskriving: https://lovdata.no/forskrift/2024-06-03-900/kap6
- Udir, fag-/svenneprøve: https://www.udir.no/ta-prove/