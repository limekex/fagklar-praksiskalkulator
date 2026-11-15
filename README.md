# Fagklar praksiskalkulator (MVP 0.1.0)

Selvstendig WordPress-plugin for **veiledende** beregning av arbeidserfaring i kokkfaget (KOK03-02), rettet mot voksne praksiskandidater som tar eller har tatt skriftlig Vg3-eksamen som privatist.

> **Dette er ikke en godkjenning.** Beregningen bygger på det kandidaten selv har oppgitt. Fagklar verifiserer ikke arbeidspraksis, skolegang eller eksamensresultater. Det er fylkeskommunen der kandidaten bor som vurderer dokumentasjonen og avgjør om kandidaten oppfyller kravene for oppmelding til fagprøven.

## Installasjon i WordPress

1. Last ned `fagklar-praksiskalkulator-wordpress.zip` fra leveransen eller pakk mappen `fagklar-praksiskalkulator` som ZIP.
2. I WordPress: **Utvidelser → Legg til ny → Last opp utvidelse**. Installer og aktiver.
3. Opprett en side, for eksempel «Praksiskalkulator».
4. Legg inn kortkoden:

   ```text
   [fagklar_praksiskalkulator]
   ```

5. Publiser siden **først etter faglig kontroll av regelsett, personvern og tema-/mobiltest**.

Det er ingen krav til Sensei LMS, WooCommerce eller ekstern API. Krever WordPress 6.2+, PHP 8.0+ og JavaScript i brukerens nettleser. Kortkoden kan brukes både anonymt og av innloggede brukere.

## Hva MVP-en gjør

- Velger blant alle 15 norske fylker, med offisiell fylkesside og lokal regelstatus.
- Tar imot flere arbeidsperioder, datoer, deltid, timer, pågående arbeid, atteststatus og egenvurdert relevans.
- Summerer overlappende prosentstillinger med maksimum én heltidsekvivalent per kalenderdag.
- Bruker bekreftet 80 %-regel i Akershus, Vestfold, Telemark, Trøndelag og Nordland. For andre fylker brukes oppgitt stillingsprosent uten opprunding, med varsel om ukjent lokal praksis.
- Omregner timetall etter 145 timer per måned og begrenser til faktisk kalenderlengde.
- Holder uklare overlappende timelister, ekstratimer, usikker relevans og tidligere fagbrev utenfor den automatiske summen og forklarer hvorfor.
- Viser mulig godskriving på 12 måneder for bestått relevant Vg1 og 12 måneder for bestått relevant Vg2; ved tidligere fagbrev stoppes denne automatiske summeringen.
- Registrerer egenrapportert erfaring fra syv faglige områder, eksamensstatus (KOK3103) og attester.
- Viser estimat, mulige fradrag, hva som gjenstår, usikkerhet, individuelle neste steg, kilder og utskriftsvisning.
- Viser **nøyaktig samme obligatoriske ansvarsavklaring** ved start, på resultat og i utskrift.

## Hva som *ikke* inngår

- Ingen vedtak, dokumentverifisering, oppmelding, KI-vurdering eller garanti for godkjenning.
- Ingen automatisk beregning av tidligere fagbrev, uklar/ufullført skolegang, kandidats egne opplysninger om fylkesvedtak eller overlappende timelister uten fordeling.
- Ingen automatisk fordeling av ekstratimer på måneder.
- Ingen automatisk lagring, WordPress-brukerprofil, filopplasting, REST-endepunkt, analytics-hendelser eller Sensei-integrasjon.
- Ingen adminside for regelredigering i v0.1 (regelsettet ligger i versjonert JSON og endres gjennom Git og kodegjennomgang).
- Ikke testet i produksjonsmiljøet til fagklar.no. Faglig gjennomgang og ekte WordPress-/mobiltest kreves før publisering.

## Personvern

Alle kandidatopplysninger beregnes i nettleseren. Pluginen sender ikke skjemaopplysninger til serveren og bruker ikke cookies, localStorage, eksterne API-er eller telemetri. Innsamling fra andre utvidelser, analyseverktøy eller skjemasporing på WordPress-nettstedet må kontrolleres separat ved installasjon. Unngå automatiske opptak av feltene i eventuelle analytics-/session-recording-verktøy.

## Kilde- og regelvedlikehold

- `data/counties.json`: 15 fylker, offisielle URL-er, `verification`, `fteThreshold`, kildelenker, `verifiedAt` og `nextReviewDue`.
- `data/copy-nb.json`: sentralisert norsk tekst, syv kompetanseområder og juridisk ansvarsavklaring.
- Endre aldri `fteThreshold` fra `null` til `0.8` uten fersk offisiell fylkeskilde og dato.
- Når `nextReviewDue` er passert, faller beregneren automatisk tilbake til oppgitt stillingsprosent og viser varsel.
- Regelsettet bør kontrolleres minst hver sjette måned, og ved lov- eller forvaltningsendringer.

Vesentlige kilder:

- [Udir – praksiskandidatordningen](https://www.udir.no/regelverk-og-tilsyn/skole-og-opplaring/veileder-om-praksiskandidatordningen/)
- [Opplæringsforskriften kapittel 6](https://lovdata.no/forskrift/2024-06-03-900/kap6)
- [Læreplan KOK03-02](https://www.udir.no/lk20/kok03-02)
- [Vestfolds praksiskalkulator](https://skjema.vestfoldfylke.no/skjema/VFK0288/Ny_praksiskalkulator)
- [Akershus' veiledning](https://afk.no/tjenester/skole-og-opplaring/opplaring-i-bedrift/praksiskandidat/)
- [Telemarks praksiskalkulator](https://skjema.telemarkfylke.no/skjema/TFK0219/Praksiskalkulator)
- [Trøndelags veiledning](https://www.trondelagfylke.no/vare-tjenester/utdanning/Opplaering_i_bedrift/Andre-veier-til-fag-svennebrev/Praksiskandidat/)
- [Nordlands veiledning](https://www.nfk.no/tjenester/skole-og-opplaring/opplaring-for-voksne/fagbrev-som-voksen/fagbrev-som-praksiskandidat/)

Kildene er registrert 15. november 2026. Dette dokumenterer ikke fremtidig gyldighet.

## Utvikling og tester

Ingen `npm install` nødvendig. Krever Node.js 20+ til test. GitHub Actions kontrollerer også PHP-syntaks med PHP CLI.

```bash
npm test
```

GitHub-repositoriet inneholder automatiske tester for beregningsmotoren, forbeholdene og viktige grensetilfeller. Den opprinnelige MVP-kildepakken hadde også nettleser- og WordPress-smoketester. Disse er foreløpig ikke importert til GitHub. Dette erstatter ikke installasjonstest på en virkelig WordPress-instans.

## Filer

```text
fagklar-praksiskalkulator.php     Plugin entrypoint
includes/class-fk-praksis-plugin.php
assets/js/engine.js               Ren beregningsmotor (også testbar i Node)
assets/js/app.js                  Trinnvis UI, bare i nettleser
assets/css/app.css                Mobilvennlig, scoped design og print
data/counties.json               Kildestyrte fylkesregler
data/copy-nb.json                Norsk copy og obligatorisk forbehold
tests/engine.test.js              Automatiserte tester av beregningsmotor
docs/                             Tidligere teknisk- og copyspesifikasjon
.github/workflows/ci.yml         CI
```

## Utviklingsretning

**Neste etappe:** bekreft resterende fylkesregler, utvid håndtering av timer fordelt på måneder, kvalitetssikre godskriving og legge til frivillig innlogget lagring etter en egen personverngjennomgang. Senere kan kalkulatoren kobles til Sensei LMS. Se `docs/` for full spesifikasjon.