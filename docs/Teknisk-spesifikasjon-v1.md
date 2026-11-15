# Fagklar Praksiskalkulator – teknisk spesifikasjon

**Dokument-ID:** FK-PRAKSIS-TECH-001  
**Versjon:** 1.0 – implementeringsgrunnlag  
**Dato:** 15. november 2026  
**Målgruppe:** Utvikler/Codex, produkteier, faglig kvalitetssikrer  
**Faglig omfang:** Vg3 kokkfaget (KOK03-02), praksiskandidatordningen  
**Plattform:** WordPress / fagklar.no  
**Søsterdokument:** `Fagklar_Praksiskalkulator_Copyspesifikasjon_v1.md`

> **Ufravikelig premiss:** Resultatet er et estimat basert på kandidatens egne opplysninger. Fagklar verifiserer ikke praksisen eller dokumentasjonen og tar ingen godkjenningsbeslutning. Fylkeskommunen der kandidaten bor, foretar den endelige vurderingen av praksis og avgjør oppmelding til fagprøven. Dette skal gjelde funksjonelt, visuelt og språklig i alle kanaler.


**Obligatorisk brukerrettet ordlyd (identisk med copyspesifikasjonen):**

> **Viktig informasjon om beregningen**
>
> Dette er en veiledende beregning basert på opplysningene du selv har registrert. Fagklar har ikke kontrollert eller godkjent arbeidserfaringen eller dokumentasjonen din.
>
> Beregningen gir ingen garanti for at praksisen blir godkjent. Det er alltid fylkeskommunen der du bor, som vurderer dokumentasjonen din og avgjør om du oppfyller kravene for å melde deg opp til fagprøven.

## 1. Produktmål og avgrensing

### 1.1 Formål

Hjelpe voksne med arbeidserfaring fra kjøkken og matproduksjon til å:
1. estimere heltidsekvivalent, mulig godskriving og gjenværende praksistid;
2. undersøke om de selv mener praksisen dekker sentrale områder i kokkfagets Vg3-læreplan;
3. avdekke manglende arbeidsgiverattester, utdanningsdokumentasjon og skriftlig Vg3-eksamen;
4. få en konkret handlingsplan med lenke til fylkeskommunens gjeldende oppmeldingsinformasjon.

Verktøyet skal være gratis å bruke uten konto. Det er ikke et søknadssystem, ingen saksbehandler eller automatisk kvalifikasjonsavgjørelse.

### 1.2 Må ikke implementeres som

- Automatisk vedtak / faglig godkjenning / juridisk rådgiver.
- «Godkjent praksis», «du er kvalifisert» eller «klar til fagprøven»-status.
- Erstatning for fylkeskommunens egen kalkulator, dokumentkontroll eller skjønn.
- En eksamenskalkulator: bestått KOK3103 skal ikke gi ekstra praksismåneder.
- En KI-basert vurdering av om egenrapporterte beskrivelser oppfyller læreplanen.
- Betalingsmur eller krav om Fagklar-konto før første beregning.

### 1.3 Leveranseomfang

**MVP (release 1):** Fylkesvalg, anonym beregning av dokumenterbare arbeidsperioder, enkle utdanningsvalg, dokument-/eksamenssjekk, oversiktlig resultat, utskrift/print og offisielle lenker. Syv faglige erfaringsområder kan tas med som en enkel sjekkliste uten automatisk poenggivning.  
**Etappe 2:** Detaljert mapping av alle 25 kompetansemål, personlig handlingsplan, frivillig innlogget lagring, mulighet for historikk.  
**Etappe 3:** Frivillig kobling til Sensei LMS, modul-anbefalinger, planleggings-/prognosefunksjoner og eventuell utvidelse til ernæringskokkfaget (separat regelsett).

Implementer MVP i en arkitektur som støtter de senere fasene, uten å gjøre dem til forutsetninger.

## 2. Kildestyrt domene og juridiske sperrer

### 2.1 Bekreftede nasjonale premisser

- Praksiskandidatordningen følger opplæringsloven § 23-2 og Udirs gjeldende veileder.
- For kokkfagets ordinære 2+2-løp brukes fem års allsidig praksis som hovedkrav (60 måneder). Praksisen må dekke de viktigste delene av gjeldende Vg3-læreplan.
- Skriftlig eksamen i kokkfaget: **KOK3103**. Den behandles som separat krav, ikke tidsfradrag.
- Fylkeskommunen vurderer dokumentasjonen, godskriving og oppmelding; Fagklar gjør det ikke.
- Forskriftens §§ 6-5 til 6-11 styrer godskriving. § 6-6 åpner for godskriving av hele beståtte skoleår, ikke enkeltfag/-moduler. Beståtte privatisteksamener eller dokumentert realkompetanse kan i visse tilfeller svare til hele skoleår. Dette må ikke forveksles med at en vanlig realkompetansevurdering automatisk forkorter praksiskravet.
- Godskriving av tidligere fagbrev etter § 6-10/6-11 er en alternativ hjemmel. § 6-5 begrenser kombinering med §§ 6-7 til 6-9. Automatiser derfor ikke summering av tidligere fagbrev + øvrige fradrag uten særskilt fagjuridisk avklaring.
- Udir omtaler minst to sammenhengende måneder og minst 50 % praksis fra siste ti år som **«bør»**-føringer, ikke som automatiske absolutte avslag.

### 2.2 Beregningsnorm og lokal variasjon

- Flere fylker bruker **145 timer/måned, 1 740 timer/år og 8 700 timer/fem år** som beregningsreferanse.
- Flere fylker, bl.a. Vestfold og Akershus, opplyser at **80 % eller mer regnes som heltid**. Dette må være en *eksplisitt verifisert* fylkeskonfigurasjon, ikke en blind nasjonal konstant.
- Uklar fylkespraksis skal representeres som `unverified`, aldri gjettes. Da brukes en forklarbar 100 %-ekvivalent som et konservativt teknisk estimat, tydelig merket med usikkerhet.
- Det må finnes kilde-URL, verifiseringsdato, regelversjon og eventuelt manuell merknad for hver fylkeregel.
- Fylket er som hovedregel fylkeskommunen der kandidaten bor / er folkeregistrert. Konkrete avvik må henvises til fylket; kalkulatoren skal ikke avgjøre bostedstilknytning.

### 2.3 Kilder som skal finnes i administrasjonssystemet

1. Udir veileder: https://www.udir.no/regelverk-og-tilsyn/skole-og-opplaring/veileder-om-praksiskandidatordningen/
2. Gjeldende forskrift kapittel 6: https://lovdata.no/forskrift/2024-06-03-900/kap6
3. Udir læreplan KOK03-02: https://www.udir.no/lk20/kok03-02
4. Udir fagkode KOK3103: https://www.udir.no/lk20/fagkoder/kok3103?lang=nob
5. Udir fag-/svenneprøve: https://www.udir.no/ta-prove/
6. Fylkesspesifikke offisielle praksiskandidat-/oppmeldingssider (15 separate URL-er).

**Kilderegisteret må vedlikeholdes.** En kilde som er gått ut på dato, gjør ikke selve regningen ubrukelig, men lokal spesialregel skal ikke vises som bekreftet etter fastsatt revisjonsfrist uten ny kontroll.

## 3. Brukerflyt og funksjonelle krav

### Steg 0: Landingsside
- H1, 2–3 setningers introduksjon, ansvarsavklaring i synlig tekst, «Start beregningen».
- Forklaring: trenger kun egen kunnskap om arbeidsperioder, stillingsprosenter/timer, skolegang og eksamensstatus.
- Ingen innlogging.

### Steg 1: Fag og fylke
- Fag: kokkfaget (låst i MVP, eksplisitt navn og læreplankode).
- Dropdown med 15 fylker; brukeren velger fylket vedkommende bor/er folkeregistrert i.
- Link til valgt fylkes offisielle informasjon; hvis ingen verifisert lenke, generisk offisiell fylkeslenke med advarsel.
- Historikk for regelsett vises på resultatet.
- Det skal gå an å endre fylke og få rekalkulering uten å miste øvrige inndata.

### Steg 2: Arbeidserfaring
- Legg til ett eller flere arbeidsforhold. Arbeidsgivernavn valgfritt; alternativt «Arbeidssted 1».
- Felter: fra-dato, til-dato eller «jobber her fortsatt», arbeidstype (ordinær ansatt, timevikar, selvstendig, frivillig/tiltak, annet), stillingsandel **eller** timer, arbeidsoppgavenes relevans (ja/usikker/nei), atteststatus.
- Ved endret stillingsprosent: nytt segment innen samme arbeidssted.
- Timetall skal oppgis som faktiske *relevante* arbeidstimer, ikke automatisk planlagt arbeidstid i et år.
- Skille mellom `fastStillingsprosent`, `dokumenterteEkstratimer` og `totaltRegistrerteTimer`. Brukeren må ikke kunne dobbeltføre samme timer.
- Ved overlapper: vis forklaring. Timer uten tilstrekkelig tidsfordeling må kunne utløse manuell avklaring i stedet for usikker sammenlegging.
- Tillat praksis fra utlandet, men marker dokument-/oversettelsesspørsmål for manuell fylkesvurdering.
- Ikke automatisk avvis relevant praksis fra eldre arbeid eller kortere oppdrag; vis veiledende flagg.

### Steg 3: Utdanning og tidligere fagbrev
- Spør om fullført og bestått Vg1, Vg2, annen opplæring, eldre grunnkurs/VKI/VKII og tidligere fagbrev.
- Felter: utdanningsprogram/programområde, året opplæringen ble fullført, «alle fag bestått» (ja/nei/usikker), dokumentasjon (ja/nei/usikker), eventuelt vedtak fra fylkeskommunen.
- Trygge, klart dokumenterte eksempler kan estimeres etter § 6-7: Vg1 restaurant- og matfag **12 mnd**; Vg2 kokk- og servitørfag **12 mnd**. Andre Vg1/Vg2-kategorier godskrives kun dersom klassifisering og regel er verifisert.
- Ufullført/uklar utdanning, tidligere fagbrev og gammelt læreplanverk flagges for manuell vurdering.
- Hvis brukeren angir tidligere fagbrev, undertrykk automatisk summering av utdanning/fradrag til den aktuelle hjemmelen er vurdert. Gi informasjon om at dette *kan* påvirke praksiskravet.
- Eksamen KOK3103 må aldri behandles som godskrivingspost.

### Steg 4: Faglig bredde og dokumentasjon
- 7 hovedområder i kokkfaget, hver med selvrapportert status: «Ikke erfaring», «Litt erfaring», «Jevnlig erfaring», «Jobber selvstendig», «Usikker».
- Områder: (1) matproduksjon/metoder, (2) råvarer og bærekraft, (3) meny/planlegging, (4) hygiene/IK-mat/allergener, (5) lagring/merking, (6) økonomi/ressursbruk, (7) HMS/samarbeid/service.
- Kort forklaring og eksempler, ikke rangering eller vurdering av formell kompetanse.
- Eksamen KOK3103: `bestått | planlagt | ikke tatt | vet ikke`; evt. dato; ingen automatisk bekreftelse.
- Arbeidsgiverattester: `klar | mangler | usikker`; påminnelse om periode, stillingsprosent/timer og arbeidsoppgaver.
- Valgfritt «Hopp over»: ufullstendig fagkart må ikke blokkere beregningen, men skal påvirke «hva bør du undersøke?» i handlingsplanen.

### Steg 5: Resultat og neste steg
- Vis «**Estimert praksistid**», ikke «godkjent praksis».
- Del opp (a) arbeidspraksis, (b) mulig utdanningsfradrag, (c) totalt beregnet mot tidskravet, (d) anslått rest; hold fram at fradragene er betingede.
- Tydelig status for faglig bredde, dokumentasjon, eksamen og regelusikkerhet.
- Dynamiske handlingspunkter (f.eks. skaff attester; les læreplan; kontakt fylket; ta KOK3103).
- Ufravikelig ansvarsavklaring over/ved resultatet + full tekst i utskrift.
- Vise valgt fylke og kilde-/regelversjon.
- Lenke til offisiell fylkesside, læreplanen og Udirs veileder.
- Eksport via utskriftsvennlig HTML / «Lagre som PDF» i nettleser. Egen PDF-generator ikke nødvendig i MVP.
- «Tilbakestill beregning» skal slette data fra minnet. Ingen skjult innsending.

## 4. Beregningsmotor – krav og kontrakt

### 4.1 Prinsipper

**Ren, deterministisk funksjon** fra validert `AssessmentInput + RuleSet` til `AssessmentResult`. Samme input, regelversjon og evalueringsdato gir samme resultat.

Intern representasjon: heltall timer og tidsintervaller + eksakte rasjonale andeler der mulig; ikke bruk flyttallsavrunding mellom delsteg. Visning avrundes først til slutt (f.eks. en desimal måneder).

- Referansekrav for kokk: `required_months = 60`.
- Omregningsreferanse ved dokumenterte timer der regelen tilsier dette: `hours_per_month = 145`.
- Fylkesregel `fte_threshold_for_full_credit` kan være `0.80` **bare når dokumentert for fylket**, ellers `1.00` med `uncertain_local_policy`-flagg.
- Total praksis som regnes i én kalendertid må aldri overskride 100 % heltidsekvivalent.
- Datoer lagres ISO `YYYY-MM-DD`; intervaller behandles internt som `start` inklusiv og `end` eksklusiv. «Pågår» avgrenses til valgt beregningsdato, aldri til fremtid.
- For stillingsprosenter kan beregningen gjøres per kalenderdag; daglig opptjening er `(effektiv_fte / dager_i_kalendermåneden)`, summert til måneder. En hel kalendermåned i 100 % blir da nøyaktig 1. Helt år i 100 % gir nøyaktig 12.
- Alle samtidige prosentstillinger summeres **før** 100 %-tak og eventuell verifisert 80 %-avrunding. Eksempel: to samtidige 50 %-stillinger over fem kalenderår = 60 mnd, aldri 120.
- En stilling 100 % + ekstravakter kan ikke telle mer enn 100 % for samme tidsrom.
- Timetall tilordnes eksplisitte perioder. `hours / 145` kan brukes når timene ikke overlapper allerede krediterte perioder, med øvre grense tilsvarende 100 % i perioden. Dersom arbeidstimer overlapper en prosentstilling uten sikre månedstall/fordeling, **ikke gjett**: marker delen som uavklart og be om bedre opplysninger. Ikke påstå at den er inkludert i summen.
- Registrert som «ikke relevant» holdes utenfor estimat. «Usikkert relevant» rapporteres separat som *mulig praksis som må avklares*, ikke i et skråsikkert hovedtall.
- Hvis arbeidspraksis er usikkert relevant, skårer kompetansekartet aldri perioden om til godkjent.
- Kandidatens input gir ikke grunnlag for vedtak.

### 4.2 Lærings-/godskrivingslogikk

Opprett **`credit_routes`** i stedet for frie fradrag:
- `school_years`: hele dokumenterte/beståtte Vg1/Vg2 som er klart relevante – grunnlag §§ 6-6, 6-7.
- `other_schooling`: usikker eller annen utdanning – **manuell**.
- `prior_trade_certificate`: tidligere fagbrev – **manuell**, alternativ hjemmel § 6-10/11.
- `existing_county_decision`: kandidaten oppgir dokumentert vedtak – registrer oppgitt antall og marker «kandidatoppgitt vedtak»; aldri hev at Fagklar har kontrollert vedtaket.

Regelmotoren må ikke legge til to alternative godskrivingsveier for samme kvalifikasjon, og må ikke automatisk kombinere godskriving etter § 6-10/11 med § 6-7 til 6-9.

Utdanningsfradrag og praksis fra samtidig periode må håndteres som et eget varsel for kontroll hvis det er mulig dobbelttelling; ingen generisk automatisk «godkjent» summering for tvilstilfeller.

### 4.3 Retningslinjer, ikke absolutte harde sperrer

- Praksis fra ordinært arbeidsforhold under to sammenhengende måneder: `short_period_review`.
- Dersom under halvparten av oppgitt relevant praksis er opparbeidet i siste ti år: `older_practice_review`.
- Egen virksomhet, frivillig/arbeidstrening, utenlandsk praksis: `special_evidence_review`.
- Mangel på attester: `documentation_missing`.
- Faglige hull: `self_reported_competence_gap`.

Ingen av disse flaggene skal automatisk gi juridisk avslag eller endre dokumentert timer til null uten særskilt grunnlag.

### 4.4 Beregningsresultat

Returner for eksempel:
- `work_estimated_months`, `education_potential_months`, `total_estimated_months`, `remaining_estimated_months`, `required_months`;
- `counted_periods[]`, `excluded_periods[]`, `pending_review_periods[]`;
- `applied_rule_ids[]`, `assumptions[]`, `warnings[]`, `manual_review_reasons[]`;
- `exam_status`, `documentation_status`, `competence_self_report_status`;
- `time_estimate_status`: `incomplete | below_threshold | estimated_at_or_above_threshold | requires_review`;
- `rule_version`, `last_verified`, `evaluation_date`;
- `result_disclaimer_key` (felles, obligatorisk og uforanderlig).

Ingen felter som `approved`, `qualified`, `eligible` eller `fylket_godkjent` i API eller UI. Hvis et offentlig vedtak senere skal registreres, hold det adskilt som *ekstern opplysning* og verifiseringsstatus.

## 5. Datamodell (illustrativ, ikke låst skjema)

```ts
type ReviewState = "yes" | "no" | "unsure";
type WorkMeasure = "percentage" | "hours";
type CountyRuleVerification = "verified" | "unverified" | "expired";

interface CountyRules {
  countyCode: string;                 // ISO-lignende intern kode
  version: string;                    // f.eks. "2026-11-15.1"
  verifiedAt: string | null;          // YYYY-MM-DD
  verification: CountyRuleVerification;
  officialUrl: string;
  hoursPerMonthReference: number;     // 145 når dokumentert
  fulltimeThreshold: number | null;   // 0.80 kun når bekreftet
  sourceUrls: string[];
  effectiveFrom: string;
  exceptions: string[];
}

interface WorkPeriod {
  id: string;
  label?: string;
  startDate: string;                  // inkluderende
  endDate?: string;                   // inkluderende i skjema
  ongoing: boolean;
  category: "employment" | "hourly" | "self_employed" | "voluntary" | "other";
  measure: WorkMeasure;
  percentage?: number;               // 0..100
  hours?: number;                    // konkrete timer for definert periode
  additionalHours?: number;          // bare timer utover fast prosent
  relevance: ReviewState;            // egenrapportert
  evidence: "ready" | "missing" | "unsure";
  abroad?: boolean;
}

interface EducationItem {
  id: string;
  type: "vg1" | "vg2" | "older_curriculum" | "trade_certificate" |
        "county_decision" | "other";
  program?: string;
  passedAll: ReviewState;
  completedYear?: number;
  reportedCreditMonths?: number;     // kun ved kandidatoppgitt vedtak
}

interface AssessmentInput {
  professionCode: "KOK03-02";
  countyCode: string;
  asOfDate: string;
  work: WorkPeriod[];
  education: EducationItem[];
  competencyAnswers: Record<string, "none" | "some" | "regular" |
                                      "independent" | "unsure">;
  examStatus: "passed" | "planned" | "not_taken" | "unsure";
}
```

Lag en ren validator for struktur og en separat faglig validator for motstridende opplysninger. Alle warnings skal ha maskinlesbare koder + oversatt UI-tekstnøkkel.

## 6. Fylkesregister og regeladministrasjon

Opprett `CountyRulesRegistry` for Norges 15 fylker (Østfold, Akershus, Oslo, Buskerud, Innlandet, Vestfold, Telemark, Agder, Rogaland, Vestland, Møre og Romsdal, Trøndelag, Nordland, Troms, Finnmark).

Hvert registerelement:
- fylkesnavn og intern ID;
- offisiell URL for praksiskandidater og søknad, separat URL til kalkulator hvis aktuelt;
- referansetimer, eventuell 80 %-regel, dato og autorisert kilde;
- status `verified/unverified/expired`;
- informasjon om særskilt dokumentasjon;
- `last_reviewed`, `next_review_due`, `reviewed_by` og endringsnotat.

**Admin-sperre:** Feilaktige eller manglende data må ikke tolkes som bekreftet fylkesregel. Endringer i terskel/omregning krever eksplisitt bekreftelse og dokumentert kilde. Bruk revisjonshistorikk og mulighet til å rulle tilbake.

Anbefalt revisjon: minst hvert halvår og ved regelendringer. Varsel til administrator ved overskredet revisjonsdato.

## 7. WordPress-arkitektur

### 7.1 Innkapsling

Lever som separat plugin: `fagklar-praksiskalkulator/`. Ikke bygg kjerneberegningen inn i Avada/custom theme eller Sensei. Temaet får ansvar for visuell tilpasning.

Forslått struktur:

```text
fagklar-praksiskalkulator/
  fagklar-praksiskalkulator.php
  includes/
    class-plugin.php
    class-rules-registry.php
    class-admin-settings.php
    class-shortcode.php
    class-rest.php                 # etappe 2
    class-privacy.php              # etappe 2
  src/
    components/
    steps/
    calculation/
      engine.ts
      normalize-periods.ts
      education-credits.ts
      county-rules.ts
      warnings.ts
    content/
      nb-NO.json
      county-links.json
  tests/
    unit/
    integration/
    e2e/
  assets/
    dist/
  README.md
  CHANGELOG.md
```

- Gjør plugin tilgjengelig via shortcode `[fagklar_praksiskalkulator]` og eventuelt et senere Gutenberg-blokk-innstikk.
- Én JS/TS-bundle lastes **kun** på sider der kalkulatoren er montert; cache/minify-robust i WordPress.
- CSS med `fk-praksis-` prefix og scoped container: ingen globale konflikt med Fagklar-tema, WooCommerce eller Sensei.
- Server gjengir H1, introduksjon, ansvarsavklaring og no-JS-fallback. JavaScript aktiverer skjemaet.
- WCAG 2.2 AA som mål; mobil først; tastatur, fokusindikator, tastaturnavigasjon, tilgjengelige feil, `aria-live` for resultat.
- Tekststrenger fra copyspesifikasjonen; ingen tekster hardkodet spredt i komponentene.
- Bruk eksisterende typografi/farger/logo; verktøyet må fungere i et annet WordPress-tema.

### 7.2 Personvern og lagring

**MVP – anonymt:**
- Ingen automatisk serverlagring av brukeropplysninger.
- Ingen innlogging, navne-/personnummer-/fødselsdatofelt eller opplasting av attester.
- Skjema behandles i nettleserens minne. Ved navigering/lukking uten eksport slettes opplysningene.
- Valgfri lokal «Lagre utkast i denne nettleseren» kan komme senere, men krever tydelig informasjon og slettemulighet.
- Ikke send registrerte arbeidsforhold til Google Analytics, Meta-piksel, feillogger eller tredjepart.
- Eventuell anonym analyse teller kun generelle hendelser (åpnet, fullført, skrevet ut), ikke fylke+arbeidsdata i kombinasjon hvis det kan identifisere person.

**Etappe 2 – frivillig Fagklar-konto:**
- Egen autentisert REST-lagring via WordPress; bruker skal bare kunne lese/endre egne oppføringer.
- WP REST-permission callbacks, autentisering og CSRF-beskyttelse; servervalidering og tillatte felter.
- Tydelig opt-in, lagringsstatus, sletting/eksport, formål, oppbevaringsperiode og GDPR-eksport/sletting.
- Fagkart og arbeidsperioder er personopplysninger; de skal ikke eksponeres i offentlig REST API.
- Ingen filopplasting eller OCR i MVP; eventuelle vedlegg krever separat sikkerhets-/personvernarbeid.

## 8. Beregnings-API og UI

MVP-kjernen bør kunne brukes slik:

```ts
function estimatePractice(
  input: AssessmentInput,
  rules: CountyRules
): AssessmentResult;
```

Ikke opprett en åpen REST-endepunkt som sender rå brukerdata til serveren uten et klart behov. Regelsett og offisielle lenker kan serveres som offentlige statiske, ikke-personlige data. Etappe 2 kan innføre autentiserte endepunkter (`/wp-json/fagklar-praksis/v1/assessments`) for lagring.

**Resultatkomponenter:**
1. Tallrad: ca. X / 60 mnd, Y mnd anslått rest.
2. Forklaringsrad: arbeid, mulig utdanningsfradrag, usikker/ikke medregnet praksis.
3. Fagkart: selvrapportert status, uten formell kompetanseskår.
4. Sjekkliste: teorieksamen, attester, dokumentasjon, fylkeskontakt.
5. Uforanderlig ansvarsavklaring.
6. Utskrift, endre svar, tilbakestill.

Ikke bruk en samlet grønn «100 % klar»-badge eller et «godkjent»-stempel, selv om beregnet tid er >= 60 måneder.

## 9. Testspesifikasjon og akseptansekriterier

### 9.1 Enhetstester (må passere)

| ID | Scenario | Forventet teknisk utfall |
|---|---|---|
| T01 | 5 hele kalenderår, 100 %, relevant | 60 estimerte arbeidsmåneder |
| T02 | 10 hele kalenderår, 50 %, relevant | 60 estimerte arbeidsmåneder |
| T03 | 3 hele år 100 % + 2 hele år 50 % | 48 estimerte arbeidsmåneder |
| T04 | 5 år 80 % i verifisert Vestfold-regel | 60 estimerte arbeidsmåneder |
| T05 | 5 år 80 % i fylke uten verifisert 80 %-regel | 48 mnd konservativt estimat + lokalt forbehold |
| T06 | To samtidige 50 %-jobber i fem år | 60 mnd, ikke 120 |
| T07 | 100 % pluss 10 relevante ekstratimer samme måned | Maks 1 mnd for måneden |
| T08 | 2,5 år relevant praksis + dokumentert relevant Vg1 og Vg2 | 30 + 24 = 54 mnd potensielt; 6 mnd rest |
| T09 | Skriftlig eksamen KOK3103 = bestått | Ingen endring i praksismåneder |
| T10 | Tidligere fagbrev + tidligere skolegang | Manuell godskrivingsvurdering; aldri automatisk dobbel sum |
| T11 | Ufullført Vg1, bare enkeltfag bestått | 0 automatisk skolefradrag + vurderingsflagg |
| T12 | Timeliste overlapper deltidsansettelse uten månedsfordeling | Varsel/avklaring; ikke skjult dobbelttelling |
| T13 | 01.01–31.12 i skuddår, 100 % | 12 mnd, ingen skuddårsfeil |
| T14 | 01.02–28.02, 100 % i normalår | 1 kalendermåned |
| T15 | 3 måneders praksis 11 år tilbake | Beregn, men flagg gammel praksis ved relevante terskler |
| T16 | Ingen arbeidsforhold | Hjelpsom tomtilstand, aldri «underkjent» |
| T17 | Bytt fylke etter registrering | Rekalkuler uten datatap; vis ny regelstatus |
| T18 | «Usikker relevans» | Hold adskilt fra beregnet relevant sum og vis usikkerhet |
| T19 | Resultat/utskrift | Obligatorisk, eksakt ansvarsavklaring vises |
| T20 | Nåværende jobb | Stopp opptjening ved beregningsdato, ikke fremtidige dager |

**T04/T05 er produktets konfigurasjonstest, ikke en påstand om juridisk forskjell mellom alle fylker.**

### 9.2 E2E

- Mobil 320–430 px, nettbrett, desktop; Safari/iOS, Chrome/Android, Firefox/desktop.
- Tastatur + skjermleser: hopp mellom steg, feilbeskjeder, resultatrad.
- Dobbelklikk på «legg til», side refresh, tilbakeknapp, feilverdi, nettfrakobling.
- Test med Fagklars aktive WordPress-tema, caching- og optimaliseringsplugins.
- No-JS-fallback informerer og lenker til fylkeskommunens egne ressurser.
- GDPR-test: ingen rå arbeidsdata i network requests uten uttrykkelig lagringsvalg.
- Sikkerhetstest: inputvalidering, escaping, ikke-kjørbare felt, XSS-forsøk og autentisering i etappe 2.

### 9.3 Innholds-/godkjenningsporter

MVP skal ikke publiseres før:
1. Faglig eier har bekreftet kilderegistrering og kategorisering av godskrivingsregler.
2. Verifisert lokal 80 %-regel har eksplisitt kilde og dato.
3. Ingen UI-streng sier «godkjent», «rett til oppmelding» eller «fagbrevklart» om kalkulatorens resultat.
4. Alle usikre tilfeller får en tydelig vurderings-/kontaktmelding.
5. Ansvarsavklaringen er synlig på landingsside, resultat og utskrift.
6. Alle automatiserte tester og manuell tilgjengelighetstest er bestått.
7. Fagklar har lagt inn eier for årlig regelkontroll og endringslogg.

## 10. Fremtidig progresjonsestimat (etappe 3)

Valgfritt: Vis prognose for når den beregnede praksistiden *kan* nå 60 måneder, forutsatt samme stillingsandel og at praksisen er relevant. Kun når aktuelle data og fylkesregel er tilstrekkelig sikre. Tekst skal være «Hvis du fortsetter i samme arbeidssituasjon, kan du etter beregningen nå tidskravet omtrent ...». Aldri «du kan melde deg opp fra ...». Behold eksamens- og dokumentasjonsstatus uavhengig.

## 11. Ikke-funksjonelle krav

- God opplevd ytelse på mobil; lazylast JS/CSS, ingen tunge UI-biblioteker uten behov.
- Norske B1-vennlige tekster; visning `nb-NO`, støtte for senere `nn-NO` via WordPress i18n.
- Desimaltall og datoer lokalisert til norsk; interne tall og datoer språkagnostiske.
- Ingen persondata i feillogger; teknisk telemetry med anonym, grov statuskode.
- Testbare feature-flags for tilleggskompetansekart, lagring og eventuell Sensei-integrasjon.
- Sikker administrasjon av offisielle lenker, ingen vilkårlige URL-er i felter uten URL-validering.
- Print-stiler skal ha kildeversjon, beregningsdato, premisser og ansvarsavklaring.

## 12. Konkrete leveranser fra kodingagent

1. Kildekode til selvstendig WordPress-plugin med installasjonsinstruksjoner.
2. Typescript-beregner med testfiksturer, formattering og komplett lokaliserbar copy.
3. Fylkesregister med dokumenterte kilder og usikkerhetsstatus per regel.
4. Shortcode/ev. blokk, mobiltilpasset stegvis UI og utskrift.
5. Automatisk testpakke: enhetstester, minst én WordPress-integrasjonstest og E2E-kjernetest.
6. README for administrator, kilderegler, fremtidige vedlikeholdsrutiner og known limitations.
7. Bevis på at alle UI-flater, inkl. print, viser obligatorisk ansvarsavklaring.

### Definisjon av ferdig

En anonym bruker kan legge inn to deltidsjobber og bestått Vg1/Vg2, se et reproducerbart og forståelig **estimert** tidsregnestykke, få faglig/dokumentasjonsmessig handlingsplan, skrive ut rapport og følge offisiell fylkeslenke – uten at systemet på noe tidspunkt hevder å ha godkjent praksisen.

---

## Kildereferanser (kontrollert 15.11.2026)

- Udir, veileder om praksiskandidatordningen: https://www.udir.no/regelverk-og-tilsyn/skole-og-opplaring/veileder-om-praksiskandidatordningen/
- Opplæringsforskriften, kapittel 6: https://lovdata.no/forskrift/2024-06-03-900/kap6
- Udir, § 6-5 godskriving: https://www.udir.no/regelverkstolkninger/opplaring/forskrift-om-grunnskoleopplaringa-og-den-vidaregaande-opplaringa-opplaringsforskrifta/andre-delen--vidaregaande-opplaring/kapittel-6-fag--og-yrkesopplaringa/ii.-godskriving-av-gjennomgatt-opplaring-eller-praksis/-6-5-kven-godskrivingsreglane-gjeld-for-og-nar-godskrivingsreglane-gjeld/
- Udir, § 6-9 om allsidig praksis: https://www.udir.no/regelverkstolkninger/opplaring/forskrift-om-grunnskoleopplaringa-og-den-vidaregaande-opplaringa-opplaringsforskrifta/andre-delen--vidaregaande-opplaring/kapittel-6-fag--og-yrkesopplaringa/ii.-godskriving-av-gjennomgatt-opplaring-eller-praksis/-6-9-godskriving-av-tidlegare-laeretid-eller-praksis/
- Vestfolds praksiskalkulator: https://skjema.vestfoldfylke.no/skjema/VFK0288/Ny_praksiskalkulator
- Akershus praksiskandidat: https://afk.no/tjenester/skole-og-opplaring/opplaring-i-bedrift/praksiskandidat/
- KOK03-02: https://www.udir.no/lk20/kok03-02
- KOK3103: https://www.udir.no/lk20/fagkoder/kok3103?lang=nob