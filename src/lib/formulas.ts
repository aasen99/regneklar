import type { Formula } from "./types";

export const formulas: Formula[] = [
  {
    slug: "annuitetslan",
    title: "Annuitetslån",
    category: "okonomi",
    expression: "M = P · r · (1 + r)ⁿ / ((1 + r)ⁿ − 1)",
    variables: [
      { symbol: "M", meaning: "Terminbeløp" },
      { symbol: "P", meaning: "Lånebeløp" },
      { symbol: "r", meaning: "Rente per termin (årlig rente / 12)" },
      { symbol: "n", meaning: "Antall terminer" },
    ],
    explanation:
      "Et annuitetslån har samme beløp hver måned. Tidlig i perioden er rentene høye og avdragene små; mot slutten er det omvendt.",
    example:
      "1 000 000 kr til 5 % nominell rente over 25 år gir ca. 5 846 kr i månedlig termin (uten gebyrer).",
    prerequisites:
      "Fast nominell rente, like store terminer og ingen gebyrer eller avdragsfrihet.",
    commonMistakes: [
      "Bruke årlig rente direkte uten å dele på antall terminer.",
      "Glemme at gebyrer ikke er med i denne forenklede formelen.",
    ],
    calculatorSlug: "lanekalkulator",
  },
  {
    slug: "rentes-rente",
    title: "Rentes rente",
    category: "okonomi",
    expression: "A = P(1 + r)ⁿ",
    variables: [
      { symbol: "A", meaning: "Sluttverdi" },
      { symbol: "P", meaning: "Startbeløp" },
      { symbol: "r", meaning: "Rente per periode" },
      { symbol: "n", meaning: "Antall perioder" },
    ],
    explanation:
      "Renter blir selv rentebærende. Jo oftere rentene legges til, desto raskere vokser beløpet.",
    example: "100 000 kr til 6 % i ett år gir 106 000 kr uten nye innskudd.",
    prerequisites: "Fast rente og ingen uttak underveis.",
    commonMistakes: [
      "Blande nominell og effektiv rente.",
      "Glemme at sparing med månedlige innskudd krever annuitetsformel.",
    ],
    calculatorSlug: "rentes-rente",
  },
  {
    slug: "mva-formel",
    title: "Merverdiavgift",
    category: "okonomi",
    expression: "inkl. = eks. · (1 + s)     eks. = inkl. / (1 + s)",
    variables: [
      { symbol: "s", meaning: "Sats som desimal, f.eks. 0,25" },
    ],
    explanation:
      "Norge har 25 % alminnelig sats, 15 % på næringsmidler og 12 % på blant annet persontransport.",
    calculatorSlug: "mva",
  },
  {
    slug: "prosentformel",
    title: "Prosent",
    category: "okonomi",
    expression: "andel = del / hele · 100 %     verdi = p/100 · hele",
    variables: [
      { symbol: "p", meaning: "Prosent" },
      { symbol: "del", meaning: "Delen du sammenligner" },
      { symbol: "hele", meaning: "Utgangspunktet (100 %)" },
    ],
    explanation:
      "Prosent betyr hundredeler. Endring måles alltid mot den opprinnelige verdien.",
    example: "15 % av 2 000 kr er 0,15 · 2 000 = 300 kr.",
    prerequisites: "Du må vite om du regner andel, del eller helhet.",
    commonMistakes: [
      "Regne prosentvis endring mot ny verdi i stedet for gammel.",
      "Blande prosentpoeng og prosentvis endring.",
    ],
    calculatorSlug: "prosent",
  },
  {
    slug: "prosentvis-endring",
    title: "Prosentvis endring",
    category: "okonomi",
    expression: "endring = (ny − gammel) / gammel · 100 %",
    variables: [
      { symbol: "ny", meaning: "Ny verdi" },
      { symbol: "gammel", meaning: "Opprinnelig verdi" },
    ],
    explanation:
      "Positivt resultat er økning, negativt er nedgang. Gammel verdi kan ikke være null.",
    calculatorSlug: "prosentvis-endring",
  },
  {
    slug: "bmi-formel",
    title: "Kroppsmasseindeks (BMI)",
    category: "sport",
    expression: "BMI = m / h²",
    variables: [
      { symbol: "m", meaning: "Kroppsvekt i kilogram" },
      { symbol: "h", meaning: "Høyde i meter" },
    ],
    explanation:
      "WHO-klassene for voksne: undervekt under 18,5, normal 18,5–24,9, overvekt 25–29,9, fedme fra 30. BMI skiller ikke muskler fra fett.",
    example: "70 kg og 1,75 m gir BMI = 70 / 1,75² ≈ 22,9 (normalvekt).",
    prerequisites: "Voksne. Høyde i meter, vekt i kilogram.",
    commonMistakes: [
      "Bruke centimeter i stedet for meter i formelen.",
      "Tolke BMI som diagnose uten hensyn til muskelmasse og alder.",
    ],
    calculatorSlug: "bmi",
  },
  {
    slug: "new-bmi-formel",
    title: "New BMI (Trefethen)",
    category: "sport",
    expression: "New BMI = 1,3 · m / h^2,5",
    variables: [
      { symbol: "m", meaning: "Kroppsvekt i kilogram" },
      { symbol: "h", meaning: "Høyde i meter" },
    ],
    explanation:
      "Eksponenten 2,5 treffer voksen kroppsbygning bedre enn 2. 1,3 holder tallet uendret ved ca. 169 cm, slik at WHO-klassene fortsatt kan brukes.",
    calculatorSlug: "new-bmi",
  },
  {
    slug: "mifflin-st-jeor",
    title: "Mifflin–St Jeor (BMR)",
    category: "sport",
    expression: "BMR = 10m + 6,25h − 5a + s",
    variables: [
      { symbol: "m", meaning: "Vekt i kg" },
      { symbol: "h", meaning: "Høyde i cm" },
      { symbol: "a", meaning: "Alder i år" },
      { symbol: "s", meaning: "+5 for menn, −161 for kvinner" },
    ],
    explanation:
      "Formelen anslår hvileforbrenning. Gang med et aktivitetsnivå (1,2–1,9) for daglig kaloribehov (TDEE).",
    calculatorSlug: "kaloribehov",
  },
  {
    slug: "naegele",
    title: "Naegele-regelen",
    category: "sport",
    expression: "termin = LMP + 280 dager + (syklus − 28)",
    variables: [
      { symbol: "LMP", meaning: "Første dag i siste menstruasjon" },
    ],
    explanation:
      "Utgangspunktet er 40 uker fra siste menstruasjon. Ultralyd gir vanligvis mer treffsikker termin.",
    calculatorSlug: "terminkalkulator",
  },
  {
    slug: "mosteller",
    title: "Kroppsoverflate (Mosteller)",
    category: "sport",
    expression: "BSA = √(høyde(cm) · vekt(kg) / 3600)",
    variables: [
      { symbol: "BSA", meaning: "Body surface area i m²" },
    ],
    explanation:
      "Brukes ofte i medisin. Dette er ikke en doseringskalkulator.",
    calculatorSlug: "kroppsoverflate",
  },
  {
    slug: "pythagoras-formel",
    title: "Pythagoras’ læresetning",
    category: "matematikk",
    expression: "a² + b² = c²",
    variables: [
      { symbol: "a, b", meaning: "Katetene (sidene som danner den rette vinkelen)" },
      { symbol: "c", meaning: "Hypotenusen" },
    ],
    explanation:
      "Gjelder bare rettvinklede trekanter. Hypotenusen er alltid lengst.",
    example: "Kateter 3 og 4 gir hypotenus c = √(3² + 4²) = 5.",
    prerequisites: "Trekanten må ha en rett vinkel.",
    commonMistakes: [
      "Bruke formelen på trekanter uten rett vinkel.",
      "Bytte om på hypotenus og katet.",
    ],
    calculatorSlug: "pythagoras",
  },
  {
    slug: "areal-sirkel",
    title: "Areal av sirkel",
    category: "matematikk",
    expression: "A = πr²",
    variables: [
      { symbol: "r", meaning: "Radius" },
      { symbol: "π", meaning: "Pi ≈ 3,14159" },
    ],
    explanation: "Diameteren er 2r, omkretsen er 2πr.",
    example: "Radius 2 m gir areal A = π · 2² ≈ 12,57 m².",
    prerequisites: "Radius og areal i samme enhet.",
    commonMistakes: ["Bruke diameter i stedet for radius i formelen."],
    calculatorSlug: "areal",
  },
  {
    slug: "areal-trekant",
    title: "Areal av trekant",
    category: "matematikk",
    expression: "A = (g · h) / 2",
    variables: [
      { symbol: "g", meaning: "Grunnlinje" },
      { symbol: "h", meaning: "Høyde på grunnlinjen" },
    ],
    explanation:
      "Høyden står vinkelrett på grunnlinjen. Herons formel brukes når du kjenner tre sider.",
    calculatorSlug: "areal",
  },
  {
    slug: "volum-kule",
    title: "Volum av kule",
    category: "matematikk",
    expression: "V = ⁴⁄₃ πr³",
    variables: [{ symbol: "r", meaning: "Radius" }],
    explanation: "Overflatearealet av en kule er 4πr².",
    example: "Radius 3 cm gir volum V = ⁴⁄₃ π · 3³ ≈ 113 cm³.",
    prerequisites: "Radius i samme enhet som volumet skal uttrykkes i.",
    commonMistakes: ["Glemme faktor ⁴⁄₃ foran πr³."],
    calculatorSlug: "volum-kule",
  },
  {
    slug: "abc-formelen",
    title: "ABC-formelen",
    category: "matematikk",
    expression: "x = (−b ± √(b² − 4ac)) / (2a)",
    variables: [
      { symbol: "a, b, c", meaning: "Koeffisienter i ax² + bx + c = 0" },
      { symbol: "D", meaning: "Diskriminant b² − 4ac" },
    ],
    explanation:
      "To reelle løsninger når D > 0, én når D = 0, ingen når D < 0.",
    calculatorSlug: "andregrad",
  },
  {
    slug: "stigningstall-formel",
    title: "Stigningstall",
    category: "matematikk",
    expression: "a = (y₂ − y₁) / (x₂ − x₁)",
    variables: [
      { symbol: "a", meaning: "Stigningstall" },
      { symbol: "(x, y)", meaning: "To punkter på linjen" },
    ],
    explanation:
      "a forteller hvor mye y øker når x øker med 1. Loddrett linje har udefinert stigning.",
    calculatorSlug: "stigningstall",
  },
  {
    slug: "reguladetri",
    title: "Reguladetri",
    category: "matematikk",
    expression: "x = C · B / A",
    variables: [
      { symbol: "A", meaning: "Første mengde" },
      { symbol: "B", meaning: "Det A svarer til" },
      { symbol: "C", meaning: "Ny mengde" },
      { symbol: "x", meaning: "Det C svarer til" },
    ],
    explanation:
      "Når to størrelser er proporsjonale, holder forholdet. Klassisk brukt i prosent, oppskrifter og priser.",
    calculatorSlug: "regel-av-tre",
  },
  {
    slug: "celsius-fahrenheit",
    title: "Celsius og Fahrenheit",
    category: "enheter",
    expression: "F = C · 9/5 + 32     C = (F − 32) · 5/9",
    variables: [
      { symbol: "C", meaning: "Temperatur i Celsius" },
      { symbol: "F", meaning: "Temperatur i Fahrenheit" },
    ],
    explanation: "Kelvin: K = C + 273,15. Absolutt nullpunkt er 0 K.",
    calculatorSlug: "temperatur",
  },
  {
    slug: "maal-dekar",
    title: "Mål og dekar",
    category: "enheter",
    expression: "1 mål = 1 dekar = 1000 m²     1 ha = 10 mål",
    variables: [{ symbol: "ha", meaning: "Hektar = 10 000 m²" }],
    explanation:
      "I Norge er mål og dekar det samme. Tomter og jordbruk oppgis ofte i mål.",
    calculatorSlug: "areal-enheter",
  },
  {
    slug: "strekning-fart-tid",
    title: "Strekning, fart og tid",
    category: "fysikk",
    expression: "s = v · t",
    variables: [
      { symbol: "s", meaning: "Strekning" },
      { symbol: "v", meaning: "Konstant hastighet" },
      { symbol: "t", meaning: "Tid" },
    ],
    explanation:
      "Hold enhetene samsvarende: km og km/t, eller meter og m/s. 1 m/s = 3,6 km/t.",
    calculatorSlug: "hastighet-strekning-tid",
  },
  {
    slug: "ohms-lov",
    title: "Ohms lov",
    category: "elektro",
    expression: "U = R · I     P = U · I = R · I² = U² / R",
    variables: [
      { symbol: "U", meaning: "Spenning i volt" },
      { symbol: "R", meaning: "Resistans i ohm" },
      { symbol: "I", meaning: "Strøm i ampere" },
      { symbol: "P", meaning: "Effekt i watt" },
    ],
    explanation:
      "Gjelder for ohmske motstander der strøm og spenning er proporsjonale. De tre effektformlene er likeverdige når Ohms lov holder.",
    example: "12 V over 6 Ω gir strøm I = 2 A og effekt P = 24 W.",
    prerequisites: "Stabil temperatur og lineært forhold mellom U og I.",
    commonMistakes: [
      "Blande milliampere og ampere.",
      "Bruke Ohms lov på LED og motorer uten hensyn til ikke-lineært oppførsel.",
    ],
    calculatorSlug: "ohms-lov",
  },
  {
    slug: "newtons-andre",
    title: "Newtons 2. lov",
    category: "fysikk",
    expression: "F = m · a",
    variables: [
      { symbol: "F", meaning: "Kraft i newton" },
      { symbol: "m", meaning: "Masse i kg" },
      { symbol: "a", meaning: "Akselerasjon i m/s²" },
    ],
    explanation: "Tyngden nær bakken er F = mg med g ≈ 9,81 m/s².",
    calculatorSlug: "kraft",
  },
  {
    slug: "kinetisk-energi",
    title: "Kinetisk energi",
    category: "fysikk",
    expression: "Eₖ = ½mv²",
    variables: [
      { symbol: "m", meaning: "Masse" },
      { symbol: "v", meaning: "Hastighet" },
    ],
    explanation:
      "Dobbelt så høy fart gir fire ganger så høy bevegelsesenergi. Stillingsenergi nær bakken: Eₚ = mgh.",
    calculatorSlug: "kinetisk-energi",
  },
  {
    slug: "tetthet-formel",
    title: "Tetthet",
    category: "fysikk",
    expression: "ρ = m / V",
    variables: [
      { symbol: "ρ", meaning: "Tetthet" },
      { symbol: "m", meaning: "Masse" },
      { symbol: "V", meaning: "Volum" },
    ],
    explanation: "Vann har tetthet nær 1000 kg/m³ eller 1 g/ml.",
    calculatorSlug: "tetthet",
  },
  {
    slug: "trykk-formel",
    title: "Trykk",
    category: "fysikk",
    expression: "p = F / A",
    variables: [
      { symbol: "p", meaning: "Trykk i pascal" },
      { symbol: "F", meaning: "Kraft" },
      { symbol: "A", meaning: "Areal" },
    ],
    explanation: "1 Pa = 1 N/m². 1 bar = 100 000 Pa. Atmosfæretrykk ≈ 1013 hPa.",
    calculatorSlug: "trykk",
  },
  {
    slug: "maling-formel",
    title: "Malingsmengde",
    category: "bygg",
    expression: "liter = (areal · strøk / dekning) · (1 + svinn)",
    variables: [
      { symbol: "dekning", meaning: "m² per liter, står på spannet" },
      { symbol: "svinn", meaning: "Reserve som desimal, f.eks. 0,10" },
    ],
    explanation: "Mørke farger og sugende underlag krever mer. Kjøp gjerne samme batch.",
    calculatorSlug: "maling",
  },
  {
    slug: "betong-formel",
    title: "Betongvolum",
    category: "bygg",
    expression: "V = l · b · h",
    variables: [
      { symbol: "l, b, h", meaning: "Lengde, bredde og tykkelse i samme enhet" },
    ],
    explanation: "1 m³ = 1000 liter. Husk forskaling og svinn ved støp.",
    calculatorSlug: "betong",
  },
  {
    slug: "kwh-formel",
    title: "Kilowattime",
    category: "hverdag",
    expression: "kWh = (W · timer) / 1000",
    variables: [
      { symbol: "W", meaning: "Effekt i watt" },
    ],
    explanation:
      "En 60 W-pære i 5 timer bruker 0,3 kWh. Kostnad = kWh · kr/kWh.",
    calculatorSlug: "stromkostnad",
  },
  {
    slug: "drivstoff-formel",
    title: "Drivstofforbruk",
    category: "hverdag",
    expression: "liter = (km / 100) · l/100 km",
    variables: [
      { symbol: "l/100 km", meaning: "Forbruk. 0,65 l/mil = 6,5 l/100 km" },
    ],
    explanation: "Kostnad = liter · pris. Elbil: bruk kWh/100 km og strømpris.",
    calculatorSlug: "drivstoff",
  },
  {
    slug: "tempo-km-t",
    title: "Løpetempo",
    category: "sport",
    expression: "min/km = 60 / km/t     km/t = 60 / min/km",
    variables: [
      { symbol: "min/km", meaning: "Tempo, minutter per kilometer" },
      { symbol: "km/t", meaning: "Fart i kilometer per time" },
    ],
    explanation:
      "12 km/t er 5:00 per km. 15 km/t er 4:00 per km. Tempo er den vanlige måten løpere snakker om fart.",
    example: "10 km/t tilsvarer 6:00 min/km.",
    prerequisites: "Jevn fart over hele distansen.",
    commonMistakes: [
      "Blande min/km og min/mile uten omregning.",
      "Glemme at sluttid = tempo · distanse.",
    ],
    calculatorSlug: "km-t-min-km",
  },
  {
    slug: "rundetid-formel",
    title: "Rundetid på bane",
    category: "sport",
    expression: "t₄₀₀ = tempo · 0,4     t = tempo · (m / 1000)",
    variables: [
      { symbol: "tempo", meaning: "Minutter per km" },
      { symbol: "t₄₀₀", meaning: "Tid på én 400 m-runde" },
      { symbol: "m", meaning: "Distanse i meter" },
    ],
    explanation:
      "400 m er 0,4 km, så rundetiden er 40 % av kilometertempoet. 4:00 /km gir 1:36 per runde. 5 km er 12,5 runder på standardbane.",
    calculatorSlug: "rundetid-400m",
  },
  {
    slug: "sluttid-loping-formel",
    title: "Sluttid løping",
    category: "sport",
    expression: "sluttid = tempo · distanse",
    variables: [
      { symbol: "tempo", meaning: "Minutter per kilometer" },
      { symbol: "distanse", meaning: "Kilometer" },
    ],
    explanation:
      "Hold enhetene like: tempo i min/km og distanse i km gir sluttid i minutter. 5:30 /km på 10 km er 55 minutter.",
    calculatorSlug: "sluttid-loping",
  },
  {
    slug: "riegel",
    title: "Riegels formel",
    category: "sport",
    expression: "T₂ = T₁ · (D₂ / D₁)^1,06",
    variables: [
      { symbol: "T₁", meaning: "Tid på kjent distanse" },
      { symbol: "D₁", meaning: "Kjent distanse" },
      { symbol: "T₂, D₂", meaning: "Tid og distanse du vil estimere" },
    ],
    explanation:
      "Formelen anslår hvordan sluttiden vokser når distansen øker. Den forutsetter lik form, og at du har trent på den nye distansen. Brukes ofte fra 5 km eller 10 km til halvmaraton og maraton.",
    calculatorSlug: "predikert-lopsid",
  },
  {
    slug: "cooper-formel",
    title: "Cooper-testen",
    category: "sport",
    expression: "VO₂-maks ≈ (d − 504,9) / 44,73",
    variables: [
      { symbol: "d", meaning: "Distanse i meter på 12 minutter" },
      { symbol: "VO₂-maks", meaning: "ml oksygen per kg per minutt" },
    ],
    explanation:
      "Kenneth Coopers 12-minutterstest. Lengre distanse betyr høyere estimert oksygenopptak. Formelen er et grovt estimat for voksne.",
    calculatorSlug: "cooper-test",
  },
  {
    slug: "steglengde-formel",
    title: "Steglengde",
    category: "sport",
    expression: "steglengde = v / (kadens / 60)",
    variables: [
      { symbol: "v", meaning: "Fart i m/s (km/t ÷ 3,6)" },
      { symbol: "kadens", meaning: "Steg per minutt" },
    ],
    explanation:
      "Fart er steglengde ganger stegfrekvens. Øker du kadensen uten å øke farten, blir stegene kortere.",
    calculatorSlug: "kadens-steglengde",
  },
  {
    slug: "egenkapital-formel",
    title: "Egenkapitalkrav",
    category: "okonomi",
    expression: "EK = pris · 0,10     dokumentavgift = 0,025 · avgiftsgrunnlag",
    variables: [
      { symbol: "EK", meaning: "Egenkapital" },
      { symbol: "pris", meaning: "Kjøpesum" },
    ],
    explanation:
      "Hovedregel er 10 % egenkapital på boliglån. Banken kan kreve mer. Dokumentavgift beregnes av avgiftsgrunnlaget ved overføring av hjemmel – ikke alltid lik kjøpesummen.",
    example:
      "Kjøpesum 4 500 000 kr med 10 % egenkapital gir 450 000 kr i egenkapital og 4 050 000 kr i lånebehov før øvrige kostnader.",
    prerequisites: "Kjøpesum og valgt egenkapitalkrav. Eget avgiftsgrunnlag ved nybygg.",
    commonMistakes: [
      "Anta at dokumentavgift alltid er 2,5 % av kjøpesummen.",
      "Tro at kjøpesum minus egenkapital er bankens maks lån.",
    ],
    source: {
      label: "Regjeringen – utlånsforskriften",
      url: "https://www.regjeringen.no/no/aktuelt/utlansforskriften-senker-kravet-til-egenkapital-for-boliglan/id3077641/",
      reviewedAt: "2026-08-28",
    },
    calculatorSlug: "egenkapital-bolig",
  },
  {
    slug: "serielan-formel",
    title: "Serielån",
    category: "okonomi",
    expression: "avdrag = P / n     termin_k = avdrag + restgjeld_k · r",
    variables: [
      { symbol: "P", meaning: "Lånebeløp" },
      { symbol: "n", meaning: "Antall terminer" },
      { symbol: "r", meaning: "Rente per termin" },
    ],
    explanation:
      "Avdraget er fast. Rentene synker med restgjelden, så første termin er høyest.",
    calculatorSlug: "serielan",
  },
  {
    slug: "regel-72-formel",
    title: "Regel 72",
    category: "okonomi",
    expression: "år ≈ 72 / r",
    variables: [
      { symbol: "r", meaning: "Årlig avkastning i prosent" },
    ],
    explanation:
      "Tommelfingerregel for doblingstid. Nøyaktig: ln(2)/ln(1+r/100).",
    calculatorSlug: "regel-72",
  },
  {
    slug: "bsu-formel",
    title: "BSU-sparing",
    category: "okonomi",
    expression: "skattefordel = innskudd · sats     FV = innskudd · ((1+r)ⁿ − 1) / r",
    variables: [
      { symbol: "sats", meaning: "Skattefradragsprosent" },
      { symbol: "r", meaning: "Årlig rente" },
      { symbol: "n", meaning: "Antall år" },
    ],
    explanation:
      "BSU har årlige og totale innskuddstak. Skattefradraget beregnes av årets innskudd.",
    calculatorSlug: "bsu",
  },
  {
    slug: "million-sparing-formel",
    title: "Sparing til målbeløp",
    category: "okonomi",
    expression: "FV = P(1+r)ⁿ + PMT · ((1+r)ⁿ − 1) / r",
    variables: [
      { symbol: "P", meaning: "Startbeløp" },
      { symbol: "PMT", meaning: "Fast innskudd per periode" },
      { symbol: "r", meaning: "Rente per periode" },
      { symbol: "n", meaning: "Antall perioder" },
    ],
    explanation:
      "Løses for n når du kjenner sparemål, start, månedlig sparing og avkastning.",
    calculatorSlug: "million-sparing",
  },
  {
    slug: "effektiv-rente-formel",
    title: "Effektiv rente",
    category: "okonomi",
    expression: "IRR fra kontantstrømmer → effektiv årsrente",
    variables: [
      { symbol: "P", meaning: "Lånebeløp" },
      { symbol: "r", meaning: "Nominell årsrente" },
      { symbol: "m", meaning: "Terminer per år" },
    ],
    explanation:
      "Effektiv rente finnes ved å løse for renten som gjør at nåverdien av alle kontantstrømmer (utbetaling, terminer med gebyrer) blir null. Dette er nærmere bankens oppgitte effektive rente enn bare omregning av nominell rente.",
    example:
      "2 000 000 kr til 5,5 % nominell over 25 år med 3 000 kr i etableringsgebyr og 70 kr i termingebyr gir effektiv rente noe over nominell.",
    prerequisites:
      "Annuitetslån med faste terminer, gebyrer og nominell rente. Ingen renteendringer eller avdragsfrihet.",
    commonMistakes: [
      "Blande effektiv rente med bare (1 + r/m)ᵐ − 1 uten gebyrer.",
      "Glemme at bankens effektive rente kan inkludere flere kostnader enn kalkulatoren.",
    ],
    source: {
      label: "Forbrukerrådet",
      url: "https://storage02.forbrukerradet.no/media/2025/03/forbrukerradet-pakket-og-uklart.pdf",
      reviewedAt: "2026-08-28",
    },
    calculatorSlug: "effektiv-rente",
  },
  {
    slug: "cagr-formel",
    title: "CAGR",
    category: "okonomi",
    expression: "CAGR = (slutt / start)^(1/n) − 1",
    variables: [
      { symbol: "start", meaning: "Startverdi" },
      { symbol: "slutt", meaning: "Sluttverdi" },
      { symbol: "n", meaning: "Antall år" },
    ],
    explanation:
      "Den jevne årlige vekstraten som tar deg fra start til slutt på n år.",
    calculatorSlug: "cagr",
  },
  {
    slug: "leieavkastning-formel",
    title: "Leieavkastning",
    category: "okonomi",
    expression: "brutto = 12 · leie / pris     netto = (12 · leie − kostnader) / pris",
    variables: [
      { symbol: "leie", meaning: "Månedlig leie" },
      { symbol: "pris", meaning: "Boligverdi" },
    ],
    explanation:
      "Netto yield trekker driftskostnader. Skatt og finansiering er ikke med.",
    calculatorSlug: "leieavkastning",
  },
  {
    slug: "laneramme-formel",
    title: "Låneramme",
    category: "okonomi",
    expression: "lån ≤ min(k · inntekt, verdi · LTV)",
    variables: [
      { symbol: "k", meaning: "Gjeldsgrad, f.eks. 5" },
      { symbol: "LTV", meaning: "Belåningsgrad, f.eks. 0,90" },
    ],
    explanation:
      "Inntektstak og belåningsgrad setter ofte hver sin øvre grense. Den laveste gjelder.",
    calculatorSlug: "laneramme",
  },
  {
    slug: "pris-per-kvm-formel",
    title: "Pris per kvadratmeter",
    category: "okonomi",
    expression: "kr/m² = pris / areal",
    variables: [
      { symbol: "pris", meaning: "Totalpris" },
      { symbol: "areal", meaning: "Areal i m²" },
    ],
    explanation: "Nyttig for sammenligning, men ikke det eneste som teller ved boligkjøp.",
    calculatorSlug: "pris-per-kvm",
  },
  {
    slug: "reallonn-formel",
    title: "Reallønn / reell økning",
    category: "okonomi",
    expression: "reell = (1 + p) / (1 + i) − 1",
    variables: [
      { symbol: "p", meaning: "Nominell lønnsøkning" },
      { symbol: "i", meaning: "Inflasjon" },
    ],
    explanation:
      "Reell økning viser endring i kjøpekraft etter at prisstigning er trukket fra.",
    calculatorSlug: "lonnsokning",
  },
  {
    slug: "epley",
    title: "Epley 1RM",
    category: "sport",
    expression: "1RM ≈ w · (1 + reps / 30)",
    variables: [
      { symbol: "w", meaning: "Løftet vekt" },
      { symbol: "reps", meaning: "Antall repetisjoner til utmattelse" },
    ],
    explanation:
      "En vanlig estimeringsformel for maksvekt. Passer best for få repetisjoner.",
    calculatorSlug: "enrm",
  },
  {
    slug: "vo2max-formel",
    title: "VO₂-max (Cooper)",
    category: "sport",
    expression: "VO₂ ≈ (d₁₂ / 1000) · 22,351 − 11,288",
    variables: [
      { symbol: "d₁₂", meaning: "Meter på 12 minutter" },
    ],
    explanation: "Klassisk felttest. Andre metoder bruker løpstid eller hvilepuls.",
    calculatorSlug: "vo2max",
  },
  {
    slug: "treningsvolum-formel",
    title: "Treningsvolum",
    category: "sport",
    expression: "volum = sett · reps · vekt",
    variables: [
      { symbol: "volum", meaning: "Tonnasje i kg" },
    ],
    explanation: "Enkelt mål på treningsmengde i styrketrening.",
    calculatorSlug: "treningsvolum",
  },
  {
    slug: "opptrapping-loping-formel",
    title: "Opptrapping av løpsmengde",
    category: "sport",
    expression: "kmₙ = nå · (1 + r)ⁿ",
    variables: [
      { symbol: "nå", meaning: "Nåværende km per uke" },
      { symbol: "r", meaning: "Økning som desimal, f.eks. 0,10" },
      { symbol: "n", meaning: "Antall uker med økning" },
      { symbol: "kmₙ", meaning: "Mengde i uke n" },
    ],
    explanation:
      "Ukentlig mengde vokser eksponentielt med valgt prosent. Antall uker er det minste n der kmₙ ≥ målet. 10 % er en vanlig tommelfingerregel.",
    example:
      "Fra 25 km/uke mot 50 km/uke med 10 %: uke 1 ≈ 27,5 km, uke 2 ≈ 30,3 km, … til målet er nådd.",
    prerequisites: "Startmengde større enn null. Økningen er prosent av forrige uke, ikke av startmengden.",
    commonMistakes: [
      "Øke med 10 % av startmengden hver uke i stedet for 10 % av forrige uke.",
      "Ignorere skadesignaler fordi planen sier at mengden skal opp.",
    ],
    calculatorSlug: "opptrapping-loping",
  },
  {
    slug: "met-formel",
    title: "MET-kalorier",
    category: "sport",
    expression: "kcal ≈ MET · kroppsvekt · timer",
    variables: [
      { symbol: "MET", meaning: "Metabolic equivalent of task" },
    ],
    explanation: "1 MET ≈ hvileforbrenning. Jogging ligger typisk rundt 7–10 MET.",
    calculatorSlug: "met-kalorier",
  },
  {
    slug: "kritisk-hastighet-formel",
    title: "Kritisk hastighet",
    category: "sport",
    expression: "d = CV · t + D′",
    variables: [
      { symbol: "CV", meaning: "Kritisk hastighet" },
      { symbol: "D′", meaning: "Anaerob distansereserve" },
    ],
    explanation: "To løpsresultater gir CV (stigningstall) og D′ (skjæring).",
    calculatorSlug: "kritisk-hastighet",
  },
  {
    slug: "dots-formel",
    title: "DOTS",
    category: "sport",
    expression: "DOTS = total · 500 / (a + b·bw + c·bw² + d·bw³ + e·bw⁴)",
    variables: [
      { symbol: "total", meaning: "Sammenlagt løft i kg" },
      { symbol: "bw", meaning: "Kroppsvekt i kg" },
    ],
    explanation: "IPF-standard for å sammenligne styrkeløft på tvers av vekt.",
    calculatorSlug: "dots-styrkeloft",
  },
  {
    slug: "navy-kroppsfett-formel",
    title: "Kroppsfett (Navy)",
    category: "sport",
    expression: "BF% = 495 / (c₀ − c₁·log₁₀(mål) + c₂·log₁₀(høyde)) − 450",
    variables: [
      { symbol: "mål", meaning: "Midje − nakke (menn) eller midje+hofte−nakke (kvinner)" },
    ],
    explanation: "US Navy-metoden. Praktisk med målebånd, men ikke like nøyaktig som lab.",
    calculatorSlug: "kroppsfett-navy",
  },
  {
    slug: "bakerprosent-formel",
    title: "Bakerprosent",
    category: "mat",
    expression: "ingrediens = mel · % / 100     (mel = 100 %)",
    variables: [
      { symbol: "mel", meaning: "Mel i gram, definert som 100 %" },
      { symbol: "%", meaning: "Bakerprosent for vann, salt eller gjær" },
    ],
    explanation:
      "Alle andre ingredienser uttrykkes som prosent av melet. Da kan deigen skaleres uten å miste forholdene.",
    calculatorSlug: "bakerprosent",
  },
  {
    slug: "varme-formel",
    title: "Spesifikk varme",
    category: "fysikk",
    expression: "Q = m · c · ΔT",
    variables: [
      { symbol: "Q", meaning: "Varmeenergi i joule" },
      { symbol: "m", meaning: "Masse i kilogram" },
      { symbol: "c", meaning: "Spesifikk varmekapasitet i J/kg·K" },
      { symbol: "ΔT", meaning: "Temperaturendring i K eller °C" },
    ],
    explanation:
      "Energien som trengs for å endre temperaturen, er masse ganger stoffets varmekapasitet ganger temperaturendringen.",
    calculatorSlug: "varmeenergi",
  },
  {
    slug: "akselerasjon-formel",
    title: "Akselerasjon",
    category: "fysikk",
    expression: "a = Δv / Δt",
    variables: [
      { symbol: "a", meaning: "Akselerasjon i m/s²" },
      { symbol: "Δv", meaning: "Endring i fart" },
      { symbol: "Δt", meaning: "Tidsintervall" },
    ],
    explanation:
      "Positiv akselerasjon øker farten i bevegelsesretningen. Negativ akselerasjon (retardasjon) bremser. g ≈ 9,81 m/s² nær bakken.",
    calculatorSlug: "bevegelse",
  },
  {
    slug: "bevegelsesligning-v",
    title: "Fart ved konstant akselerasjon",
    category: "fysikk",
    expression: "v = v₀ + a · t",
    variables: [
      { symbol: "v", meaning: "Sluttfart" },
      { symbol: "v₀", meaning: "Startfart" },
      { symbol: "a", meaning: "Konstant akselerasjon" },
      { symbol: "t", meaning: "Tid" },
    ],
    explanation: "Gjelder når akselerasjonen er konstant. Bruk samme enheter, f.eks. m/s og m/s².",
    calculatorSlug: "bevegelse",
  },
  {
    slug: "bevegelsesligning-s",
    title: "Strekning ved konstant akselerasjon",
    category: "fysikk",
    expression: "s = v₀ · t + ½ a · t²",
    variables: [
      { symbol: "s", meaning: "Strekning" },
      { symbol: "v₀", meaning: "Startfart" },
      { symbol: "a", meaning: "Akselerasjon" },
      { symbol: "t", meaning: "Tid" },
    ],
    explanation:
      "Utgangspunkt i hvile: s = ½at². Alternativ form uten tid: v² = v₀² + 2as.",
    calculatorSlug: "bevegelse",
  },
  {
    slug: "bevegelsesligning-v2",
    title: "Fart uten tid",
    category: "fysikk",
    expression: "v² = v₀² + 2 · a · s",
    variables: [
      { symbol: "v", meaning: "Sluttfart" },
      { symbol: "v₀", meaning: "Startfart" },
      { symbol: "a", meaning: "Akselerasjon" },
      { symbol: "s", meaning: "Strekning" },
    ],
    explanation: "Nyttig når du kjenner strekning, men ikke tid – for eksempel bremselengde.",
    calculatorSlug: "bevegelse",
  },
  {
    slug: "tyngdekraft",
    title: "Tyngdekraft",
    category: "fysikk",
    expression: "G = m · g",
    variables: [
      { symbol: "G", meaning: "Tyngde i newton" },
      { symbol: "m", meaning: "Masse i kg" },
      { symbol: "g", meaning: "Tyngdeakselerasjon ≈ 9,81 m/s²" },
    ],
    explanation:
      "Tyngden er jordas tiltrekning på massen. På månen er g mindre, så samme masse veier mindre.",
    calculatorSlug: "kraft",
  },
  {
    slug: "newtons-gravitasjon",
    title: "Newtons gravitasjonslov",
    category: "fysikk",
    expression: "F = G · m₁ m₂ / r²",
    variables: [
      { symbol: "F", meaning: "Tiltrekningskraft" },
      { symbol: "G", meaning: "6,67·10⁻¹¹ N·m²/kg²" },
      { symbol: "m₁, m₂", meaning: "Massene" },
      { symbol: "r", meaning: "Avstand mellom massesentrene" },
    ],
    explanation:
      "Kraften avtar med kvadratet av avstanden. Nær jordoverflaten forenkles dette til mg.",
  },
  {
    slug: "bevegelsesmengde",
    title: "Bevegelsesmengde (impuls)",
    category: "fysikk",
    expression: "p = m · v     I = F · Δt = Δp",
    variables: [
      { symbol: "p", meaning: "Bevegelsesmengde i kg·m/s" },
      { symbol: "I", meaning: "Impuls" },
      { symbol: "Δp", meaning: "Endring i bevegelsesmengde" },
    ],
    explanation:
      "Impuls er kraft ganger tid og lik endringen i bevegelsesmengde. I støt bevares ofte total p når ytre krefter er små.",
    calculatorSlug: "impuls",
  },
  {
    slug: "arbeid-formel",
    title: "Arbeid",
    category: "fysikk",
    expression: "W = F · s · cos θ",
    variables: [
      { symbol: "W", meaning: "Arbeid i joule" },
      { symbol: "F", meaning: "Kraft" },
      { symbol: "s", meaning: "Strekning" },
      { symbol: "θ", meaning: "Vinkel mellom kraft og bevegelse" },
    ],
    explanation:
      "Når kraften er parallell med bevegelsen, er cos θ = 1 og W = F·s. Arbeid endrer mekanisk energi.",
    calculatorSlug: "arbeid-effekt",
  },
  {
    slug: "mekanisk-effekt",
    title: "Mekanisk effekt",
    category: "fysikk",
    expression: "P = W / t = F · v",
    variables: [
      { symbol: "P", meaning: "Effekt i watt" },
      { symbol: "W", meaning: "Arbeid" },
      { symbol: "t", meaning: "Tid" },
    ],
    explanation: "1 W = 1 J/s. Ved konstant fart er P = F·v når kraften er parallell med farten.",
    calculatorSlug: "arbeid-effekt",
  },
  {
    slug: "potensiell-energi",
    title: "Potensiell energi",
    category: "fysikk",
    expression: "Eₚ = m · g · h",
    variables: [
      { symbol: "Eₚ", meaning: "Stillingsenergi" },
      { symbol: "h", meaning: "Høyde over referansenivå" },
    ],
    explanation:
      "Referansenivået kan velges fritt, men må være det samme gjennom hele regnestykket. Faller noe fritt, blir Eₚ til Eₖ.",
    calculatorSlug: "kinetisk-energi",
  },
  {
    slug: "mekanisk-energi",
    title: "Bevaring av mekanisk energi",
    category: "fysikk",
    expression: "Eₖ + Eₚ = konstant     (uten friksjon)",
    variables: [
      { symbol: "Eₖ", meaning: "½mv²" },
      { symbol: "Eₚ", meaning: "mgh" },
    ],
    explanation:
      "Uten luftmotstand og friksjon er summen av kinetisk og potensiell energi konstant. Med friksjon blir noe til varme.",
  },
  {
    slug: "friksjon",
    title: "Friksjon",
    category: "fysikk",
    expression: "R = μ · N",
    variables: [
      { symbol: "R", meaning: "Friksjonskraft" },
      { symbol: "μ", meaning: "Friksjonstall" },
      { symbol: "N", meaning: "Normalkraft, ofte mg på vannrett flate" },
    ],
    explanation:
      "μₛ er statisk (før glidning), μₖ er kinetisk (under glidning). μₖ er vanligvis litt lavere.",
    calculatorSlug: "friksjon",
  },
  {
    slug: "hooke",
    title: "Hookes lov",
    category: "fysikk",
    expression: "F = k · x     E = ½ k · x²",
    variables: [
      { symbol: "k", meaning: "Fjærkonstant i N/m" },
      { symbol: "x", meaning: "Forlengelse eller sammentrykking" },
      { symbol: "E", meaning: "Elastisk energi i fjæra" },
    ],
    explanation:
      "Kraften er proporsjonal med forskyvningen innenfor det elastiske området. Stivere fjær har større k.",
    calculatorSlug: "hooke",
  },
  {
    slug: "sentripetal",
    title: "Sentripetalkraft",
    category: "fysikk",
    expression: "F = m · v² / r = m · ω² · r",
    variables: [
      { symbol: "v", meaning: "Banefart" },
      { symbol: "r", meaning: "Radius" },
      { symbol: "ω", meaning: "Vinkelhastighet i rad/s" },
    ],
    explanation:
      "Kraften peker inn mot sentrum og holder gjenstanden i sirkelbevegelse. Uten den fortsetter den rett fram.",
    calculatorSlug: "sentripetal",
  },
  {
    slug: "dreiemoment",
    title: "Dreiemoment",
    category: "fysikk",
    expression: "M = F · r · sin θ",
    variables: [
      { symbol: "M", meaning: "Moment i N·m" },
      { symbol: "r", meaning: "Arm / avstand til dreieakse" },
      { symbol: "θ", meaning: "Vinkel mellom kraft og arm" },
    ],
    explanation:
      "Størst moment når kraften står vinkelrett på armen (sin 90° = 1). Likevekt: summen av momentene er null.",
  },
  {
    slug: "trykk-vaeske",
    title: "Hydrostatisk trykk",
    category: "fysikk",
    expression: "p = ρ · g · h",
    variables: [
      { symbol: "p", meaning: "Trykkøkning med dyp" },
      { symbol: "ρ", meaning: "Tetthet av væsken" },
      { symbol: "h", meaning: "Dyp under overflaten" },
    ],
    explanation:
      "Trykket øker lineært med dypet. I 10 m vann er økningen omtrent 1 atm (ca. 100 kPa).",
    calculatorSlug: "hydrostatisk",
  },
  {
    slug: "archimedes",
    title: "Archimedes’ lov (oppdrift)",
    category: "fysikk",
    expression: "F_opp = ρ_væske · V_fordrengt · g",
    variables: [
      { symbol: "F_opp", meaning: "Oppdrift" },
      { symbol: "V_fordrengt", meaning: "Volum av fortrengt væske" },
    ],
    explanation:
      "Oppdriften er lik tyngden av den fortrengte væsken. Flyter når oppdrift = tyngde, synker når tyngde er større.",
    calculatorSlug: "oppdrift",
  },
  {
    slug: "bolgelengde",
    title: "Bølgefart",
    category: "fysikk",
    expression: "v = f · λ",
    variables: [
      { symbol: "v", meaning: "Bølgefart" },
      { symbol: "f", meaning: "Frekvens" },
      { symbol: "λ", meaning: "Bølgelengde" },
    ],
    explanation:
      "Gjelder for lyd, lys og vannbølger. Lyd i luft ≈ 340 m/s. Lys i vakuum = 3,00·10⁸ m/s.",
    calculatorSlug: "bolge",
  },
  {
    slug: "periode-frekvens-fysikk",
    title: "Periode og frekvens",
    category: "fysikk",
    expression: "T = 1 / f     f = 1 / T",
    variables: [
      { symbol: "T", meaning: "Periode i sekunder" },
      { symbol: "f", meaning: "Frekvens i hertz" },
    ],
    explanation: "En svingning per sekund er 1 Hz. Perioden er tiden for én full svingning.",
    calculatorSlug: "bolge",
  },
  {
    slug: "lydintensitet",
    title: "Lydnivå (desibel)",
    category: "fysikk",
    expression: "L = 10 · log₁₀(I / I₀)",
    variables: [
      { symbol: "L", meaning: "Lydnivå i dB" },
      { symbol: "I", meaning: "Intensitet i W/m²" },
      { symbol: "I₀", meaning: "10⁻¹² W/m² (høreterskel)" },
    ],
    explanation:
      "En økning på 10 dB er ti ganger så høy intensitet. 0 dB er høreterskelen, 120 dB er smertegrensen.",
    calculatorSlug: "desibel",
  },
  {
    slug: "snells-lov",
    title: "Snells lov (bryting)",
    category: "fysikk",
    expression: "n₁ · sin θ₁ = n₂ · sin θ₂",
    variables: [
      { symbol: "n", meaning: "Brytningsindeks" },
      { symbol: "θ₁", meaning: "Innfallsvinkel" },
      { symbol: "θ₂", meaning: "Brytningsvinkel" },
    ],
    explanation:
      "Lys brytes mot normalen når det går inn i et tettere medium (høyere n). Totalrefleksjon kan skje den andre veien.",
    calculatorSlug: "snell",
  },
  {
    slug: "brytningsindeks",
    title: "Brytningsindeks",
    category: "fysikk",
    expression: "n = c / v",
    variables: [
      { symbol: "c", meaning: "Lysfart i vakuum" },
      { symbol: "v", meaning: "Lysfart i mediet" },
    ],
    explanation: "Luft ≈ 1,00, vann ≈ 1,33, glass typisk 1,5. Høyere n betyr lavere fart i stoffet.",
  },
  {
    slug: "linseformel",
    title: "Linseformelen",
    category: "fysikk",
    expression: "1/f = 1/a + 1/b",
    variables: [
      { symbol: "f", meaning: "Brennvidde" },
      { symbol: "a", meaning: "Gjenstandsavstand" },
      { symbol: "b", meaning: "Bildavstand" },
    ],
    explanation:
      "For konveks linse er f positiv. Forstørrelse m = −b/a. Negativt bilde betyr omvendt bilde.",
    calculatorSlug: "linse",
  },
  {
    slug: "speillov",
    title: "Refleksjonsloven",
    category: "fysikk",
    expression: "θᵢ = θᵣ",
    variables: [
      { symbol: "θᵢ", meaning: "Innfallsvinkel mot normalen" },
      { symbol: "θᵣ", meaning: "Refleksjonsvinkel" },
    ],
    explanation:
      "Innfallende og reflektert stråle ligger i samme plan som normalen. Gjelder speil og glatte flater.",
  },
  {
    slug: "ideell-gass",
    title: "Ideell gasslov",
    category: "fysikk",
    expression: "p · V = n · R · T",
    variables: [
      { symbol: "p", meaning: "Trykk i pascal" },
      { symbol: "V", meaning: "Volum i m³" },
      { symbol: "n", meaning: "Stoffmengde i mol" },
      { symbol: "R", meaning: "8,314 J/(mol·K)" },
      { symbol: "T", meaning: "Absolutt temperatur i kelvin" },
    ],
    explanation:
      "T = t(°C) + 273,15. God tilnærming for mange gasser ved romtemperatur og lavt trykk.",
    calculatorSlug: "ideell-gass",
  },
  {
    slug: "celsius-kelvin",
    title: "Celsius og kelvin",
    category: "fysikk",
    expression: "T(K) = t(°C) + 273,15",
    variables: [
      { symbol: "T", meaning: "Absolutt temperatur" },
      { symbol: "t", meaning: "Celsius-temperatur" },
    ],
    explanation:
      "Kelvin og Celsius har like store grader. Absolutt nullpunkt er 0 K = −273,15 °C.",
    calculatorSlug: "ideell-gass",
  },
  {
    slug: "fasovergang",
    title: "Smelte- og fordampningsvarme",
    category: "fysikk",
    expression: "Q = m · L",
    variables: [
      { symbol: "Q", meaning: "Energi til faseovergang" },
      { symbol: "L", meaning: "Spesifikk smelte- eller fordampningsvarme" },
    ],
    explanation:
      "Temperaturen er konstant under smelting/fordamping. For vann: L_smelte ≈ 334 kJ/kg, L_fordamp ≈ 2260 kJ/kg.",
    calculatorSlug: "faseovergang",
  },
  {
    slug: "termisk-utvidelse",
    title: "Lengdeutvidelse",
    category: "fysikk",
    expression: "Δℓ = α · ℓ₀ · ΔT",
    variables: [
      { symbol: "α", meaning: "Lengdeutvidelseskoeffisient" },
      { symbol: "ℓ₀", meaning: "Opprinnelig lengde" },
      { symbol: "ΔT", meaning: "Temperaturendring" },
    ],
    explanation:
      "Metaller utvider seg mer enn glass. Broer og skinner har ekspansjonsfuger av den grunn.",
  },
  {
    slug: "virkningsgrad",
    title: "Virkningsgrad",
    category: "fysikk",
    expression: "η = E_nyttig / E_tilført     (eller P_nyttig / P_tilført)",
    variables: [
      { symbol: "η", meaning: "Virkningsgrad, ofte i prosent" },
    ],
    explanation:
      "Alltid mellom 0 og 1 (0–100 %). Resten går til tap, typisk varme. En elmotor kan ha η over 90 %.",
    calculatorSlug: "virkningsgrad",
  },
  {
    slug: "stoffmengde",
    title: "Stoffmengde",
    category: "fysikk",
    expression: "n = m / M",
    variables: [
      { symbol: "n", meaning: "Stoffmengde i mol" },
      { symbol: "m", meaning: "Masse i gram" },
      { symbol: "M", meaning: "Molar masse i g/mol" },
    ],
    explanation:
      "1 mol inneholder N_A ≈ 6,022·10²³ partikler. M for vann er 18 g/mol, for O₂ 32 g/mol.",
    calculatorSlug: "stoffmengde",
  },
  {
    slug: "konsentrasjon",
    title: "Konsentrasjon (molaritet)",
    category: "fysikk",
    expression: "c = n / V",
    variables: [
      { symbol: "c", meaning: "Konsentrasjon i mol/L" },
      { symbol: "n", meaning: "Stoffmengde i mol" },
      { symbol: "V", meaning: "Volum av løsningen i liter" },
    ],
    explanation:
      "Fortyynning: c₁V₁ = c₂V₂ når stoffmengden er den samme før og etter.",
    calculatorSlug: "konsentrasjon",
  },
  {
    slug: "fortynning",
    title: "Fortyynning",
    category: "fysikk",
    expression: "c₁ · V₁ = c₂ · V₂",
    variables: [
      { symbol: "c₁, V₁", meaning: "Konsentrasjon og volum før" },
      { symbol: "c₂, V₂", meaning: "Konsentrasjon og volum etter" },
    ],
    explanation:
      "Stoffmengden er konstant. Tilsett løsemiddel for å øke V og senke c.",
    calculatorSlug: "konsentrasjon",
  },
  {
    slug: "avogadro",
    title: "Avogadros tall",
    category: "fysikk",
    expression: "N = n · N_A     N_A ≈ 6,022·10²³ mol⁻¹",
    variables: [
      { symbol: "N", meaning: "Antall partikler" },
      { symbol: "n", meaning: "Stoffmengde i mol" },
    ],
    explanation: "Binder sammen makroskopisk stoffmengde og antall atomer eller molekyler.",
    calculatorSlug: "stoffmengde",
  },
  {
    slug: "fotonenergi",
    title: "Fotonenergi",
    category: "fysikk",
    expression: "E = h · f = h · c / λ",
    variables: [
      { symbol: "h", meaning: "6,626·10⁻³⁴ J·s (Plancks konstant)" },
      { symbol: "f", meaning: "Frekvens" },
      { symbol: "λ", meaning: "Bølgelengde" },
    ],
    explanation:
      "Kortere bølgelengde gir høyere energi. UV og røntgen har mer energi per foton enn synlig lys.",
    calculatorSlug: "foton",
  },
  {
    slug: "einstein-masse-energi",
    title: "Masse–energi (Einstein)",
    category: "fysikk",
    expression: "E = m · c²",
    variables: [
      { symbol: "E", meaning: "Hvileenergi" },
      { symbol: "m", meaning: "Masse" },
      { symbol: "c", meaning: "3,00·10⁸ m/s" },
    ],
    explanation:
      "Svært liten massedefekt i kjernereaksjoner frigjør enorm energi. 1 u tilsvarer ca. 931 MeV.",
  },
  {
    slug: "halvveringstid",
    title: "Halvveringstid",
    category: "fysikk",
    expression: "N = N₀ · (½)^(t / T½)     A = A₀ · (½)^(t / T½)",
    variables: [
      { symbol: "T½", meaning: "Halvveringstid" },
      { symbol: "N₀", meaning: "Startantall kjerner" },
      { symbol: "A", meaning: "Aktivitet" },
    ],
    explanation:
      "Etter én halvveringstid er halvparten igjen, etter to er en firedel igjen. Aktiviteten følger samme lov.",
    calculatorSlug: "halvveringstid",
  },
  {
    slug: "aktivitet",
    title: "Radioaktiv aktivitet",
    category: "fysikk",
    expression: "A = λ · N     λ = ln 2 / T½",
    variables: [
      { symbol: "A", meaning: "Aktivitet i becquerel (Bq)" },
      { symbol: "λ", meaning: "Henfallskonstant" },
    ],
    explanation: "1 Bq = ett henfall per sekund. λ er større når halvveringstiden er kort.",
    calculatorSlug: "halvveringstid",
  },
  {
    slug: "pendel",
    title: "Matematisk pendel",
    category: "fysikk",
    expression: "T ≈ 2π · √(ℓ / g)",
    variables: [
      { symbol: "T", meaning: "Svingetid" },
      { symbol: "ℓ", meaning: "Pendellengde" },
    ],
    explanation:
      "Gjelder for små utslag. Perioden avhenger ikke av massen, bare av lengden og g.",
  },
  {
    slug: "fjarsvingning",
    title: "Fjærpendel (masse–fjær)",
    category: "fysikk",
    expression: "T = 2π · √(m / k)",
    variables: [
      { symbol: "m", meaning: "Masse" },
      { symbol: "k", meaning: "Fjærkonstant" },
    ],
    explanation: "Stivere fjær eller mindre masse gir raskere svingninger (kortere T).",
    calculatorSlug: "hooke",
  },
  {
    slug: "doppler",
    title: "Dopplereffekt (lyd)",
    category: "fysikk",
    expression: "f' = f · (v ± v_obs) / (v ± v_kilde)",
    variables: [
      { symbol: "f'", meaning: "Oppfattet frekvens" },
      { symbol: "v", meaning: "Lydfart" },
      { symbol: "v_obs, v_kilde", meaning: "Fart for observatør og kilde" },
    ],
    explanation:
      "Sirenen høres høyere når den nærmer seg. Bruk +/− etter om bevegelsen er mot eller fra.",
  },
  {
    slug: "effekt-energi-fysikk",
    title: "Effekt og energi",
    category: "fysikk",
    expression: "E = P · t",
    variables: [
      { symbol: "E", meaning: "Energi" },
      { symbol: "P", meaning: "Effekt" },
      { symbol: "t", meaning: "Tid" },
    ],
    explanation: "1 kWh = 3,6·10⁶ J. Brukes både for mekanikk og elektrisitet.",
    calculatorSlug: "effekt-kalkulator",
  },
  {
    slug: "seriekopling",
    title: "Seriekopling av motstander",
    category: "elektro",
    expression: "R = R₁ + R₂ + R₃ + …",
    variables: [{ symbol: "R", meaning: "Erstatningsresistans" }],
    explanation:
      "Samme strøm gjennom alle. Spenningene summeres. Erstatningsresistansen er alltid større enn den største enkeltmotstanden.",
    calculatorSlug: "serie-parallell",
  },
  {
    slug: "parallellkopling",
    title: "Parallellkopling av motstander",
    category: "elektro",
    expression: "1/R = 1/R₁ + 1/R₂ + 1/R₃ + …",
    variables: [{ symbol: "R", meaning: "Erstatningsresistans" }],
    explanation:
      "Samme spenning over alle. Strømmene summeres. For to motstander: R = (R₁·R₂)/(R₁+R₂). Erstatningsresistansen er lavere enn den minste.",
    calculatorSlug: "serie-parallell",
  },
  {
    slug: "resistivitet-formel",
    title: "Ledermotstand",
    category: "elektro",
    expression: "R = ℓ / (κ · A)",
    variables: [
      { symbol: "ℓ", meaning: "Lengde i meter" },
      { symbol: "κ", meaning: "Ledningsevne, 56 for Cu og 35 for Al (m/(Ω·mm²))" },
      { symbol: "A", meaning: "Tverrsnitt i mm²" },
    ],
    explanation:
      "SI-formen er R = ρ·ℓ/A med resistivitet ρ. I el-fag brukes oftere ledningsevne κ. Kobber leder bedre enn aluminium ved samme tverrsnitt.",
    calculatorSlug: "resistivitet",
  },
  {
    slug: "spenningsfall-formel",
    title: "Spenningsfall i kabel",
    category: "elektro",
    expression: "énfase: ΔU = 2·I·ℓ/(κ·A)     trefase: ΔU = √3·I·ℓ/(κ·A)",
    variables: [
      { symbol: "I", meaning: "Strøm i ampere" },
      { symbol: "ℓ", meaning: "Kabellengde én vei i meter" },
      { symbol: "A", meaning: "Tverrsnitt i mm²" },
    ],
    explanation:
      "Énfase teller tur og retur. Trefase bruker √3. Krav til maksimalt spenningsfall står i NEK 400, ofte 4 % fram til uttak.",
    calculatorSlug: "spenningsfall",
  },
  {
    slug: "spenningsdeler-formel",
    title: "Spenningsdeler",
    category: "elektro",
    expression: "U_ut = U_inn · R₂ / (R₁ + R₂)",
    variables: [
      { symbol: "R₁", meaning: "Øvre motstand" },
      { symbol: "R₂", meaning: "Nedre motstand, der utgangen tas" },
    ],
    explanation:
      "Gjelder uten last på utgangen. En last parallelt med R₂ virker som en lavere R₂ og senker U_ut.",
    calculatorSlug: "spenningsdeler",
  },
  {
    slug: "kirchhoff-strom",
    title: "Kirchhoffs strømlov (KCL)",
    category: "elektro",
    expression: "Σ I_inn = Σ I_ut",
    variables: [{ symbol: "I", meaning: "Strøm til eller fra et knutepunkt" }],
    explanation:
      "Ladning hoper seg ikke opp i et knutepunkt. Summen av strømmene inn er lik summen ut. Fortegnskonvensjon: inn positiv, ut negativ, da er summen null.",
  },
  {
    slug: "kirchhoff-spenning",
    title: "Kirchhoffs spenningslov (KVL)",
    category: "elektro",
    expression: "Σ U = 0 rundt en sløyfe",
    variables: [{ symbol: "U", meaning: "Spenning over hvert element i sløyfen" }],
    explanation:
      "Å gå en runde i en krets og tilbake til start gir null netto spenning. Spenningene over kilder og motstander tar hverandre ut.",
  },
  {
    slug: "joule-lov",
    title: "Joules lov",
    category: "elektro",
    expression: "Q = R · I² · t     P = R · I²",
    variables: [
      { symbol: "Q", meaning: "Varmeenergi i joule" },
      { symbol: "t", meaning: "Tid i sekunder" },
    ],
    explanation:
      "Varmen i en leder er effekten ganger tiden. Strømmen går i annen, derfor varmer overbelastning raskt.",
    calculatorSlug: "joule-varme",
  },
  {
    slug: "kapasitans-formel",
    title: "Kapasitans og ladning",
    category: "elektro",
    expression: "C = Q / U     Q = C · U     E = ½ C U²",
    variables: [
      { symbol: "C", meaning: "Kapasitans i farad" },
      { symbol: "Q", meaning: "Ladning i coulomb" },
      { symbol: "U", meaning: "Spenning i volt" },
      { symbol: "E", meaning: "Lagret energi i joule" },
    ],
    explanation:
      "1 µF = 10⁻⁶ F. Energien vokser med U². Serie: 1/C = 1/C₁ + 1/C₂. Parallell: C = C₁ + C₂ (motsatt av motstander).",
    calculatorSlug: "kondensator",
  },
  {
    slug: "rc-tidskonstant-formel",
    title: "RC-tidskonstant",
    category: "elektro",
    expression: "τ = R · C",
    variables: [
      { symbol: "τ", meaning: "Tidskonstant i sekunder" },
      { symbol: "R", meaning: "Resistans i ohm" },
      { symbol: "C", meaning: "Kapasitans i farad" },
    ],
    explanation:
      "Etter 1τ er kondensatoren på ca. 63 % ved lading (eller 37 % ved utlading). Etter 5τ er den praktisk talt ferdig.",
    calculatorSlug: "rc-tidskonstant",
  },
  {
    slug: "frekvens-formel",
    title: "Frekvens og periode",
    category: "elektro",
    expression: "f = 1 / T     ω = 2πf",
    variables: [
      { symbol: "f", meaning: "Frekvens i hertz" },
      { symbol: "T", meaning: "Periode i sekunder" },
      { symbol: "ω", meaning: "Vinkelfrekvens i rad/s" },
    ],
    explanation: "50 Hz gir T = 20 ms. ω brukes i reaktans: X_L = ωL og X_C = 1/(ωC).",
    calculatorSlug: "frekvens-periode",
  },
  {
    slug: "reaktans-formel",
    title: "Reaktans og impedans",
    category: "elektro",
    expression: "X_L = 2πfL     X_C = 1/(2πfC)     Z = √(R² + (X_L − X_C)²)",
    variables: [
      { symbol: "X_L", meaning: "Induktiv reaktans i ohm" },
      { symbol: "X_C", meaning: "Kapasitiv reaktans i ohm" },
      { symbol: "Z", meaning: "Impedans i ohm" },
    ],
    explanation:
      "Spoler motsetter seg raske strømendringer, kondensatorer motsetter seg raske spenningsendringer. Ved 50 Hz og rene R er Z = R.",
    calculatorSlug: "reaktans-impedans",
  },
  {
    slug: "transformator-formel",
    title: "Transformator",
    category: "elektro",
    expression: "U₁/U₂ = N₁/N₂ = I₂/I₁     S = U · I",
    variables: [
      { symbol: "U", meaning: "Spenning" },
      { symbol: "N", meaning: "Vindingstall" },
      { symbol: "I", meaning: "Strøm" },
      { symbol: "S", meaning: "Tilsynelatende effekt i VA" },
    ],
    explanation:
      "Ideell transformator uten tap: effekten er den samme på begge sider. Høyere spenning gir lavere strøm. Virkningsgrad i praksis er ofte 90–98 %.",
    calculatorSlug: "transformator",
  },
  {
    slug: "rms-formel",
    title: "Effektivverdi (RMS)",
    category: "elektro",
    expression: "U_eff = U_maks / √2     U_maks = U_eff · √2",
    variables: [
      { symbol: "U_eff", meaning: "Effektivverdi, det tallet vi oppgir (230 V)" },
      { symbol: "U_maks", meaning: "Toppverdi / amplitude" },
    ],
    explanation:
      "Gjelder sinus. 230 V effektivverdi har toppverdi ≈ 325 V. RMS betyr rot-middel-kvadrat: verdien som gir samme effekt i en motstand som likespenning av samme tall.",
    calculatorSlug: "rms-verdi",
  },
  {
    slug: "effektfaktor-formel",
    title: "Effektfaktor",
    category: "elektro",
    expression: "P = U · I · cos φ     (énfase)",
    variables: [
      { symbol: "P", meaning: "Aktiv effekt i watt" },
      { symbol: "cos φ", meaning: "Effektfaktor, mellom 0 og 1" },
    ],
    explanation:
      "cos φ = 1 for ren motstand. Induktive laster (motorer) gir cos φ under 1, så strømmen er høyere enn P/U. Kompensering med kondensatorer hever cos φ.",
    calculatorSlug: "trefase-effekt",
  },
  {
    slug: "trefase-formel",
    title: "Trefaseeffekt",
    category: "elektro",
    expression: "P = √3 · U · I · cos φ     S = √3 · U · I",
    variables: [
      { symbol: "U", meaning: "Linjespenning (hovedspenning), 400 V i Norge" },
      { symbol: "I", meaning: "Linjestrøm" },
      { symbol: "S", meaning: "Tilsynelatende effekt i VA" },
    ],
    explanation:
      "U er spenningen mellom to faser, ikke fase-til-null. Reaktiv effekt Q = √3 · U · I · sin φ, enhet var.",
    calculatorSlug: "trefase-effekt",
  },
  {
    slug: "coulomb-lov",
    title: "Coulombs lov",
    category: "elektro",
    expression: "F = k · q₁ q₂ / r²",
    variables: [
      { symbol: "F", meaning: "Kraft mellom ladningene" },
      { symbol: "q", meaning: "Ladning i coulomb" },
      { symbol: "r", meaning: "Avstand" },
      { symbol: "k", meaning: "8,99·10⁹ N·m²/C²" },
    ],
    explanation:
      "Like ladninger frastøter, ulike tiltrekker. Kraften avtar med kvadratet av avstanden. Elektrisk felt: E = F/q = U/d mellom parallelle plater.",
  },
  {
    slug: "induktor-energi",
    title: "Energi i en spole",
    category: "elektro",
    expression: "E = ½ L I²     u = L · di/dt",
    variables: [
      { symbol: "L", meaning: "Induktans i henry" },
      { symbol: "I", meaning: "Strøm i ampere" },
    ],
    explanation:
      "Spolen lagrer energi i magnetfeltet. Bryter du strømmen brått, kan u = L·di/dt gi høye spenningstopper – derfor friløpsdiode over reléspoler.",
  },
  {
    slug: "led-motstand-formel",
    title: "LED-seriemotstand",
    category: "elektro",
    expression: "R = (Vs − Vf) / I",
    variables: [
      { symbol: "Vs", meaning: "Forsyningsspenning" },
      { symbol: "Vf", meaning: "LED-ens fremspenning" },
      { symbol: "I", meaning: "Ønsket LED-strøm i ampere" },
      { symbol: "R", meaning: "Seriemotstand" },
    ],
    explanation:
      "Motstanden tar restspenningen. Velg nærmeste høyere standardverdi (E24). Effekt i motstanden: P = (Vs − Vf)·I.",
    example: "5 V, Vf 2,1 V og 20 mA gir R = (5 − 2,1) / 0,02 = 145 Ω → bruk 150 Ω.",
    commonMistakes: [
      "Glemme å dele milliampere på 1000.",
      "Koble LED uten motstand på mer enn Vf.",
    ],
    calculatorSlug: "led-motstand",
  },
  {
    slug: "batteri-wh-ah-formel",
    title: "Batteri Wh og Ah",
    category: "elektro",
    expression: "Wh = V · Ah     Ah = Wh / V",
    variables: [
      { symbol: "Wh", meaning: "Energi i wattimer" },
      { symbol: "Ah", meaning: "Kapasitet i amperetimer" },
      { symbol: "V", meaning: "Nominell spenning" },
    ],
    explanation:
      "Wh forteller hvor mye energi batteriet lagrer. Ah alene sier lite uten spenning. Driftstid ≈ Ah / forbruksstrøm (grovt).",
    calculatorSlug: "batteri-wh-ah",
  },
  {
    slug: "stromdeler-formel",
    title: "Strømdeler",
    category: "elektro",
    expression: "I₁ = I · R₂ / (R₁ + R₂)",
    variables: [
      { symbol: "I", meaning: "Total strøm inn i parallellkoplingen" },
      { symbol: "I₁", meaning: "Strøm gjennom R₁" },
      { symbol: "R₁, R₂", meaning: "Parallellkoplede motstander" },
    ],
    explanation:
      "Minst motstand får mest strøm. Motsatt av spenningsdeleren. Gjelder bare to grener uten ekstra kilder.",
    calculatorSlug: "stromdeler",
  },
  {
    slug: "ledningsevne-formel",
    title: "Ledningsevne",
    category: "elektro",
    expression: "G = 1 / R     I = G · U",
    variables: [
      { symbol: "G", meaning: "Ledningsevne i siemens (S)" },
      { symbol: "R", meaning: "Resistans i ohm" },
    ],
    explanation:
      "Høy G betyr lett strømvei. Parallelle ledningsevner summeres direkte: G = G₁ + G₂.",
  },
  {
    slug: "ladning-strom-tid",
    title: "Ladning, strøm og tid",
    category: "elektro",
    expression: "Q = I · t",
    variables: [
      { symbol: "Q", meaning: "Ladning i coulomb (C)" },
      { symbol: "I", meaning: "Strøm i ampere" },
      { symbol: "t", meaning: "Tid i sekunder" },
    ],
    explanation:
      "1 Ah = 3600 C. Batterikapasitet i Ah er ladning delt på 3600. Konstant strøm forutsatt.",
    calculatorSlug: "ladning-q",
  },
  {
    slug: "kondensator-serie-parallell",
    title: "Kondensatorer i serie og parallell",
    category: "elektro",
    expression: "parallell: C = C₁ + C₂     serie: 1/C = 1/C₁ + 1/C₂",
    variables: [{ symbol: "C", meaning: "Erstatningskapasitans" }],
    explanation:
      "Motsatt av motstander: parallell øker C, serie senker C. I serie er den minste C den som begrenser mest.",
    calculatorSlug: "kondensator-kopling",
  },
  {
    slug: "spole-serie-parallell",
    title: "Spoler i serie og parallell",
    category: "elektro",
    expression: "serie: L = L₁ + L₂     parallell: 1/L = 1/L₁ + 1/L₂",
    variables: [{ symbol: "L", meaning: "Erstatningsinduktans" }],
    explanation:
      "Samme regneregel som for motstander, dersom spolene ikke påvirker hverandre magnetisk (ingen gjensidig induktans).",
  },
  {
    slug: "rl-tidskonstant-formel",
    title: "RL-tidskonstant",
    category: "elektro",
    expression: "τ = L / R",
    variables: [
      { symbol: "τ", meaning: "Tidskonstant i sekunder" },
      { symbol: "L", meaning: "Induktans i henry" },
      { symbol: "R", meaning: "Resistans i ohm" },
    ],
    explanation:
      "Etter 1τ har strømmen nådd ca. 63 % av sluttverdien ved innkobling. Etter 5τ er den praktisk talt stabil.",
    calculatorSlug: "rl-tidskonstant",
  },
  {
    slug: "resonans-formel",
    title: "Resonansfrekvens LC",
    category: "elektro",
    expression: "f₀ = 1 / (2π √(L C))",
    variables: [
      { symbol: "f₀", meaning: "Resonansfrekvens i hertz" },
      { symbol: "L", meaning: "Induktans i henry" },
      { symbol: "C", meaning: "Kapasitans i farad" },
    ],
    explanation:
      "Ved resonans er X_L = X_C. Serie-LC gir lav impedans, parallell-LC gir høy impedans ved f₀.",
    example: "L = 10 mH og C = 100 nF gir f₀ ≈ 5,03 kHz.",
    calculatorSlug: "resonans",
  },
  {
    slug: "rc-filter-formel",
    title: "RC-filter (grensefrekvens)",
    category: "elektro",
    expression: "f_c = 1 / (2π R C)",
    variables: [
      { symbol: "f_c", meaning: "Grensefrekvens (−3 dB)" },
      { symbol: "R", meaning: "Resistans i ohm" },
      { symbol: "C", meaning: "Kapasitans i farad" },
    ],
    explanation:
      "Lavpass: utgang over C. Høypass: utgang over R. Ved f_c er amplituden ca. 70,7 % (−3 dB).",
    calculatorSlug: "rc-filter",
  },
  {
    slug: "effekttrekant-formel",
    title: "Effekttrekant (P, Q, S)",
    category: "elektro",
    expression: "S² = P² + Q²     cos φ = P / S",
    variables: [
      { symbol: "P", meaning: "Aktiv effekt (W)" },
      { symbol: "Q", meaning: "Reaktiv effekt (var)" },
      { symbol: "S", meaning: "Tilsynelatende effekt (VA)" },
    ],
    explanation:
      "P gjør arbeid, Q svinger mellom kilde og last, S er det nettet må levere. cos φ = P/S er effektfaktoren.",
    calculatorSlug: "effekttrekant",
  },
  {
    slug: "fase-linje-spenning",
    title: "Fase- og linjespenning",
    category: "elektro",
    expression: "U_L = √3 · U_f     I_L = I_f (stjerne)",
    variables: [
      { symbol: "U_L", meaning: "Linjespenning mellom to faser (400 V)" },
      { symbol: "U_f", meaning: "Fasespenning fase–null (230 V)" },
    ],
    explanation:
      "I Norge er U_L typisk 400 V og U_f 230 V. I stjerne er linjestrøm = fasestrøm. I trekant er I_L = √3 · I_f.",
  },
  {
    slug: "elektrisk-felt-formel",
    title: "Elektrisk felt",
    category: "elektro",
    expression: "E = F / q     E = U / d",
    variables: [
      { symbol: "E", meaning: "Elektrisk feltstyrke i V/m" },
      { symbol: "U", meaning: "Spenning mellom platene" },
      { symbol: "d", meaning: "Avstand mellom platene" },
    ],
    explanation:
      "Mellom parallelle plater er feltet jevnt. Kraften på en ladning er F = q·E.",
  },
  {
    slug: "parallellplate-kondensator",
    title: "Parallellplatekondensator",
    category: "elektro",
    expression: "C = ε₀ ε_r A / d",
    variables: [
      { symbol: "ε₀", meaning: "8,85·10⁻¹² F/m" },
      { symbol: "ε_r", meaning: "Relativ dielektrisitetskonstant" },
      { symbol: "A", meaning: "Plateareal i m²" },
      { symbol: "d", meaning: "Avstand mellom platene" },
    ],
    explanation:
      "Større areal eller tynnere gap øker C. Dielektrikum (ε_r > 1) øker kapasitansen ytterligere.",
  },
  {
    slug: "faraday-lov",
    title: "Faradays induksjonslov",
    category: "elektro",
    expression: "ε = −N · dΦ / dt",
    variables: [
      { symbol: "ε", meaning: "Indusert elektromotorisk spenning" },
      { symbol: "N", meaning: "Antall vindinger" },
      { symbol: "Φ", meaning: "Magnetisk fluks" },
    ],
    explanation:
      "Endring i fluks gjennom en spole gir spenning. Minustegnet er Lenz’ lov: induksjon motvirker endringen.",
  },
  {
    slug: "magnetisk-fluks",
    title: "Magnetisk fluks",
    category: "elektro",
    expression: "Φ = B · A · cos θ",
    variables: [
      { symbol: "Φ", meaning: "Fluks i weber (Wb)" },
      { symbol: "B", meaning: "Magnetisk flukstetthet i tesla" },
      { symbol: "A", meaning: "Areal" },
      { symbol: "θ", meaning: "Vinkel mellom B og normalen til flaten" },
    ],
    explanation:
      "Maks fluks når feltet står vinkelrett på flaten (θ = 0). Enhet: 1 Wb = 1 T·m².",
  },
  {
    slug: "biot-savart-leder",
    title: "Magnetfelt rundt rett leder",
    category: "elektro",
    expression: "B = μ₀ I / (2π r)",
    variables: [
      { symbol: "B", meaning: "Flukstetthet i tesla" },
      { symbol: "μ₀", meaning: "4π·10⁻⁷ T·m/A" },
      { symbol: "I", meaning: "Strøm i ampere" },
      { symbol: "r", meaning: "Avstand fra lederen" },
    ],
    explanation:
      "Feltet går i sirkler rundt lederen (høyrehåndsregelen). Dobbel strøm → dobbel B. Dobbel avstand → halv B.",
  },
  {
    slug: "virkningsgrad-elektro",
    title: "Virkningsgrad",
    category: "elektro",
    expression: "η = P_ut / P_inn · 100 %",
    variables: [
      { symbol: "η", meaning: "Virkningsgrad" },
      { symbol: "P_ut", meaning: "Nytteeffekt" },
      { symbol: "P_inn", meaning: "Tilført effekt" },
    ],
    explanation:
      "Tap = P_inn − P_ut. Motorer, transformatorer og ladere oppgir ofte η. Kan aldri overstige 100 %.",
    calculatorSlug: "virkningsgrad-elektro",
  },
  {
    slug: "desibel-elektro",
    title: "Desibel (spenning og effekt)",
    category: "elektro",
    expression: "dB = 20 log₁₀(U₂/U₁)     dB = 10 log₁₀(P₂/P₁)",
    variables: [
      { symbol: "U", meaning: "Spenning" },
      { symbol: "P", meaning: "Effekt" },
    ],
    explanation:
      "Dobling av spenning er +6 dB. Dobling av effekt er +3 dB. Bruk 20-regelen for U og I, 10-regelen for P.",
    calculatorSlug: "desibel-elektro",
  },
  {
    slug: "indre-motstand-batteri",
    title: "Indre motstand i batteri",
    category: "elektro",
    expression: "U = E − I · r     r = (E − U) / I",
    variables: [
      { symbol: "E", meaning: "Elektromotorisk spenning (tomgang)" },
      { symbol: "U", meaning: "Klemmespenning under last" },
      { symbol: "r", meaning: "Indre motstand" },
      { symbol: "I", meaning: "Laststrøm" },
    ],
    explanation:
      "Klemmespenningen faller når strømmen øker. Høy indre motstand gir mer fall og mer tap i batteriet.",
    calculatorSlug: "indre-motstand",
  },
  {
    slug: "maksimal-effektoverforing",
    title: "Maksimal effektoverføring",
    category: "elektro",
    expression: "R_last = R_kilde     P_maks = E² / (4 R_kilde)",
    variables: [
      { symbol: "R_last", meaning: "Lastresistans" },
      { symbol: "R_kilde", meaning: "Kildens indre resistans" },
      { symbol: "E", meaning: "Tomgangsspenning" },
    ],
    explanation:
      "Mest effekt til lasten når R_last = R_kilde. Da er virkningsgraden bare 50 % – ofte uaktuelt i kraftnett, mer relevant i signaler.",
  },
  {
    slug: "wheatstone-bro",
    title: "Wheatstone-bro",
    category: "elektro",
    expression: "balanse: R₁/R₂ = R₃/R₄",
    variables: [
      { symbol: "R₁, R₂", meaning: "Den ene spenningsdeleren" },
      { symbol: "R₃, R₄", meaning: "Den andre spenningsdeleren" },
    ],
    explanation:
      "Ved balanse er midtpunktene på samme potensial, og ingen strøm går gjennom galvanometeret. Brukes til å måle ukjent R.",
  },
  {
    slug: "pwm-duty-cycle",
    title: "PWM og duty cycle",
    category: "elektro",
    expression: "D = t_på / T     U_snitt = D · U_forsyning",
    variables: [
      { symbol: "D", meaning: "Duty cycle (0–1)" },
      { symbol: "t_på", meaning: "Tid på i hver periode" },
      { symbol: "T", meaning: "Periode" },
    ],
    explanation:
      "Pulsbreddemodulasjon styrer gjennomsnittsspenning uten lineær effektregulering. 50 % duty cycle ≈ halv snittspenning.",
    calculatorSlug: "pwm-duty",
  },
  {
    slug: "stjerne-trekant",
    title: "Stjerne–trekant-omregning",
    category: "elektro",
    expression: "R_Δ = 3 R_Y     (like motstander)",
    variables: [
      { symbol: "R_Y", meaning: "Motstand i stjerne (hver gren)" },
      { symbol: "R_Δ", meaning: "Motstand i trekant (hver side)" },
    ],
    explanation:
      "For like verdier er trekantmotstanden tre ganger stjernemotstanden. Generell omregning bruker produkt-over-sum for ulik R.",
  },
  {
    slug: "gjennomsnitt-formel",
    title: "Gjennomsnitt",
    category: "statistikk",
    expression: "x̄ = (Σ xᵢ) / n",
    variables: [
      { symbol: "xᵢ", meaning: "Observasjon i" },
      { symbol: "n", meaning: "Antall observasjoner" },
    ],
    explanation:
      "Aritmetisk gjennomsnitt trekker alle observasjoner likt. Median er mer robust mot ekstremverdier.",
    calculatorSlug: "deskriptiv-statistikk",
  },
  {
    slug: "varians-standardavvik",
    title: "Varians og standardavvik",
    category: "statistikk",
    expression: "s² = Σ(x − x̄)² / (n − 1)     s = √s²",
    variables: [
      { symbol: "s", meaning: "Utvalgsstandardavvik" },
      { symbol: "σ", meaning: "Populasjonsstandardavvik (nevner n)" },
    ],
    explanation:
      "Utvalg bruker n − 1 i nevneren. Standardavviket har samme enhet som dataene; variansen er enheten i annen.",
    example: "Dataene 2, 4, 6 har snitt 4 og utvalgsstandardavvik s ≈ 2.",
    prerequisites: "Velg utvalg (n − 1) eller populasjon (n) bevisst.",
    commonMistakes: [
      "Bruke n i nevneren når dataene er et utvalg.",
      "Tolke standardavvik uten å se på enheten.",
    ],
    calculatorSlug: "standardavvik",
  },
  {
    slug: "z-verdi-formel",
    title: "z-verdi",
    category: "statistikk",
    expression: "z = (x − μ) / σ",
    variables: [
      { symbol: "x", meaning: "Observasjon" },
      { symbol: "μ", meaning: "Forventning / snitt" },
      { symbol: "σ", meaning: "Standardavvik" },
    ],
    explanation:
      "z forteller hvor mange standardavvik x ligger fra snittet. Under standardnormalfordeling er P(|Z| < 1) ≈ 68 %.",
    calculatorSlug: "z-verdi",
  },
  {
    slug: "normalfordeling-formel",
    title: "Normalfordeling",
    category: "statistikk",
    expression: "X ~ N(μ, σ²)     φ(z) = (1/√(2π)) e^(−z²/2)",
    variables: [
      { symbol: "μ", meaning: "Forventningsverdi" },
      { symbol: "σ", meaning: "Standardavvik" },
    ],
    explanation:
      "Klokkekurven er symmetrisk om μ. Ca. 95 % av sannsynlighetsmassen ligger innenfor μ ± 2σ.",
    calculatorSlug: "normalfordeling",
  },
  {
    slug: "konfidensintervall-formel",
    title: "Konfidensintervall for snitt",
    category: "statistikk",
    expression: "x̄ ± z · (s / √n)",
    variables: [
      { symbol: "x̄", meaning: "Utvalgssnitt" },
      { symbol: "z", meaning: "Kritisk verdi fra standardnormal" },
      { symbol: "s", meaning: "Standardavvik" },
      { symbol: "n", meaning: "Utvalgsstørrelse" },
    ],
    explanation:
      "For 95 % konfidensnivå er z ≈ 1,96. Små utvalg med ukjent σ bør bruke t-fordeling.",
    calculatorSlug: "konfidensintervall",
  },
  {
    slug: "kombinasjoner-permutasjoner",
    title: "Kombinasjoner og permutasjoner",
    category: "statistikk",
    expression: "nPr = n!/(n−k)!     nCr = n!/(k!(n−k)!)",
    variables: [
      { symbol: "n", meaning: "Totalt antall elementer" },
      { symbol: "k", meaning: "Antall som trekkes" },
    ],
    explanation:
      "Permutasjoner teller rekkefølge. Kombinasjoner teller utvalg der rekkefølge ikke betyr noe.",
    calculatorSlug: "kombinatorikk",
  },
  {
    slug: "binomialfordeling",
    title: "Binomialfordeling",
    category: "statistikk",
    expression: "P(X = k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ",
    variables: [
      { symbol: "n", meaning: "Antall uavhengige forsøk" },
      { symbol: "p", meaning: "Sannsynlighet for treff per forsøk" },
      { symbol: "k", meaning: "Antall treff" },
    ],
    explanation: "Forventning μ = np. Varians σ² = np(1−p).",
    calculatorSlug: "binomialsannsynlighet",
  },
  {
    slug: "klassisk-sannsynlighet",
    title: "Klassisk sannsynlighet",
    category: "statistikk",
    expression: "P(A) = |A| / |Ω|",
    variables: [
      { symbol: "|A|", meaning: "Antall gunstige utfall" },
      { symbol: "|Ω|", meaning: "Antall mulige utfall" },
    ],
    explanation:
      "Forutsetter like sannsynlige utfall. For uavhengige hendelser: P(A∩B) = P(A)·P(B).",
    calculatorSlug: "sannsynlighet-enkel",
  },
  {
    slug: "pearson-korrelasjon",
    title: "Pearsons korrelasjonskoeffisient",
    category: "statistikk",
    expression: "r = Σ((x−x̄)(y−ȳ)) / √(Σ(x−x̄)² · Σ(y−ȳ)²)",
    variables: [
      { symbol: "r", meaning: "Korrelasjonskoeffisient (−1 til 1)" },
    ],
    explanation:
      "r nær ±1 betyr sterk lineær sammenheng. Korrelasjon er ikke det samme som årsakssammenheng.",
    calculatorSlug: "korrelasjon",
  },
  {
    slug: "lineaer-regresjon-formel",
    title: "Lineær regresjon",
    category: "statistikk",
    expression: "y = a + bx     b = Σ((x−x̄)(y−ȳ))/Σ(x−x̄)²     a = ȳ − b·x̄",
    variables: [
      { symbol: "b", meaning: "Stigningstall" },
      { symbol: "a", meaning: "Skjæringspunkt med y-aksen" },
    ],
    explanation:
      "Minste kvadraters metode minimerer summen av kvadrerte avvik mellom observerte y og linjen.",
    calculatorSlug: "lineaer-regresjon",
  },
  {
    slug: "relativ-frekvens-formel",
    title: "Relativ frekvens",
    category: "statistikk",
    expression: "f_rel = f / n",
    variables: [
      { symbol: "f", meaning: "Absolutte frekvens" },
      { symbol: "n", meaning: "Totalt antall observasjoner" },
    ],
    explanation: "Summen av relative frekvenser er 1. Ofte oppgitt i prosent.",
    calculatorSlug: "relativ-frekvens",
  },
  {
    slug: "utvalgsstorrelse-formel",
    title: "Utvalgsstørrelse for snitt",
    category: "statistikk",
    expression: "n = (z · σ / E)²",
    variables: [
      { symbol: "E", meaning: "Ønsket feilmargin" },
      { symbol: "z", meaning: "Kritisk verdi for valgt konfidensnivå" },
      { symbol: "σ", meaning: "Estimert standardavvik" },
    ],
    explanation:
      "Rund alltid opp til nærmeste hele tall. Mindre E eller høyere konfidens krever større n.",
    calculatorSlug: "utvalgsstorrelse",
  },
  {
    slug: "kaffe-ratio-formel",
    title: "Kaffe-ratio",
    category: "mat",
    expression: "vann = kaffe · ratio",
    variables: [
      { symbol: "ratio", meaning: "Deler vann per del kaffe, f.eks. 16" },
    ],
    explanation: "1:16 er et vanlig utgangspunkt for filterkaffe.",
    calculatorSlug: "kaffe-ratio",
  },
  {
    slug: "saltlake-formel",
    title: "Saltlake",
    category: "mat",
    expression: "salt = væske · % / 100",
    variables: [
      { symbol: "%", meaning: "Vektprosent salt av væsken" },
    ],
    explanation: "Typisk lake ligger ofte rundt 3–6 % salt.",
    calculatorSlug: "saltlake",
  },
  {
    slug: "matsvinn-formel",
    title: "Matsvinn",
    category: "mat",
    expression: "spiselig = rå · (1 − svinn)",
    variables: [
      { symbol: "svinn", meaning: "Andel som kuttes bort" },
    ],
    explanation: "Brukes for å beregne innkjøp fra ønsket spiselig mengde.",
    calculatorSlug: "matsvinn",
  },
  {
    slug: "studiepoeng-formel",
    title: "Studiepoeng og timer",
    category: "skole",
    expression: "timer ≈ sp · 25 til 30",
    variables: [
      { symbol: "sp", meaning: "Studiepoeng / ECTS" },
    ],
    explanation: "ECTS anslår arbeidsmengde per studiepoeng.",
    calculatorSlug: "studiepoeng-timer",
  },
  {
    slug: "fravaer-formel",
    title: "Fraværsprosent",
    category: "skole",
    expression: "fravær % = fraværstimer / undervisningstimer · 100",
    variables: [
      { symbol: "fravær", meaning: "Timer borte" },
    ],
    explanation: "Skolens regler for dokumentert fravær kan avvike.",
    calculatorSlug: "fravaer",
  },
  {
    slug: "sin-cos-tan",
    title: "Sinus, cosinus og tangens",
    category: "matematikk",
    expression: "sin²θ + cos²θ = 1     tan θ = sin θ / cos θ",
    variables: [
      { symbol: "θ", meaning: "Vinkel" },
    ],
    explanation: "Grunnleggende trigonometriske identiteter.",
    calculatorSlug: "trigonometri",
  },
  {
    slug: "prosentpoeng-formel",
    title: "Prosentpoeng",
    category: "matematikk",
    expression: "pp = ny − gammel     relativ = pp / gammel",
    variables: [
      { symbol: "pp", meaning: "Endring i prosentpoeng" },
    ],
    explanation: "Prosentpoeng er differanse; relativ prosent er forhold.",
    calculatorSlug: "prosentpoeng",
  },
  {
    slug: "sirkelbue-formel",
    title: "Sirkelbue og sektor",
    category: "matematikk",
    expression: "bue = 2πr · θ/360     A = πr² · θ/360",
    variables: [
      { symbol: "θ", meaning: "Sentrvinkel i grader" },
      { symbol: "r", meaning: "Radius" },
    ],
    explanation: "Andelen av hele sirkelen er θ/360.",
    calculatorSlug: "sirkelbue",
  },
  {
    slug: "heron-formel",
    title: "Herons formel",
    category: "matematikk",
    expression: "A = √(s(s−a)(s−b)(s−c))",
    variables: [
      { symbol: "s", meaning: "(a+b+c)/2" },
      { symbol: "a,b,c", meaning: "Sidene" },
    ],
    explanation: "Areal når bare sidene er kjent.",
    calculatorSlug: "heron",
  },
  {
    slug: "vektor-formel",
    title: "Prikkprodukt",
    category: "matematikk",
    expression: "a·b = |a||b| cos θ = aₓbₓ + aᵧbᵧ",
    variables: [
      { symbol: "θ", meaning: "Vinkel mellom vektorene" },
    ],
    explanation: "Prikkprodukt null betyr at vektorene står vinkelrett på hverandre.",
    calculatorSlug: "vektor-2d",
  },
  {
    slug: "bpm-formel",
    title: "BPM og tid",
    category: "musikk",
    expression: "tid = takter · slag/takt · 60 / BPM",
    variables: [
      { symbol: "BPM", meaning: "Slag per minutt" },
    ],
    explanation: "Flere slag eller lavere tempo gir lengre varighet.",
    calculatorSlug: "bpm-tid",
  },
  {
    slug: "note-frekvens-formel",
    title: "Note og frekvens",
    category: "musikk",
    expression: "f = 440 · 2^((n − 69)/12)",
    variables: [
      { symbol: "n", meaning: "MIDI-notennummer (69 = A4)" },
      { symbol: "f", meaning: "Frekvens i Hz" },
    ],
    explanation: "Likestemt temperering med tolv like store halvtoner per oktav.",
    calculatorSlug: "note-frekvens",
  },
  {
    slug: "capo-formel",
    title: "Capo",
    category: "musikk",
    expression: "klingende = (form + capo) mod 12",
    variables: [
      { symbol: "form", meaning: "Grepsform som halvtonenummer" },
      { symbol: "capo", meaning: "Båndnummer" },
    ],
    explanation: "Capo flytter alle grepsformer opp like mange halvtoner.",
    calculatorSlug: "capo",
  },
  {
    slug: "ev-formel",
    title: "Eksponeringsverdi (EV)",
    category: "foto",
    expression: "EV ≈ log₂(N² / t) − log₂(ISO/100)",
    variables: [
      { symbol: "N", meaning: "Blenderåpning (f-tall)" },
      { symbol: "t", meaning: "Lukkertid i sekunder" },
    ],
    explanation: "Ett stopp tilsvarer dobling eller halvering av lysmengde.",
    calculatorSlug: "eksponeringstrekant",
  },
  {
    slug: "crop-formel",
    title: "Crop-faktor",
    category: "foto",
    expression: "FF-ekvivalent = f · crop",
    variables: [
      { symbol: "f", meaning: "Faktisk brennvidde" },
      { symbol: "crop", meaning: "Crop-faktor" },
    ],
    explanation: "Gir omtrent samme synsfelt som angitt fullformat-brennvidde.",
    calculatorSlug: "crop-faktor",
  },
  {
    slug: "dpi-formel",
    title: "Utskrift og DPI",
    category: "foto",
    expression: "tommer = piksler / DPI",
    variables: [
      { symbol: "DPI", meaning: "Dots per inch" },
    ],
    explanation: "300 dpi er vanlig mål for skarp foto på nært hold.",
    calculatorSlug: "utskriftsstorrelse",
  },
  {
    slug: "hundealder-formel",
    title: "Hundealder",
    category: "dyr",
    expression: "1. år ≈ 15     2. år ≈ 24     deretter +5–7 / år",
    variables: [
      { symbol: "år", meaning: "Hundens alder" },
    ],
    explanation: "Store hunder får flere menneskeår per kalenderår enn små etter år 2.",
    calculatorSlug: "hundealder",
  },
  {
    slug: "akvarium-formel",
    title: "Akvarievolum",
    category: "dyr",
    expression: "V = L · B · H / 1000",
    variables: [
      { symbol: "L,B,H", meaning: "Mål i cm" },
      { symbol: "V", meaning: "Volum i liter" },
    ],
    explanation: "1000 cm³ = 1 liter. Juster for fyllingsgrad og dekor.",
    calculatorSlug: "akvarium-volum",
  },

  // —— Matematikk ——
  {
    slug: "omkrets-sirkel",
    title: "Omkrets av sirkel",
    category: "matematikk",
    expression: "O = 2πr = πd",
    variables: [
      { symbol: "r", meaning: "Radius" },
      { symbol: "d", meaning: "Diameter (= 2r)" },
    ],
    explanation: "Omkretsen er lengden rundt sirkelen. π ≈ 3,14159.",
    example: "Radius 5 cm gir O = 2π·5 ≈ 31,4 cm.",
    calculatorSlug: "omkrets",
  },
  {
    slug: "areal-rektangel",
    title: "Areal av rektangel",
    category: "matematikk",
    expression: "A = l · b",
    variables: [
      { symbol: "l", meaning: "Lengde" },
      { symbol: "b", meaning: "Bredde" },
    ],
    explanation: "Kvadrat er spesialtilfellet l = b, da A = s².",
    calculatorSlug: "areal",
  },
  {
    slug: "areal-parallellogram",
    title: "Areal av parallellogram",
    category: "matematikk",
    expression: "A = g · h",
    variables: [
      { symbol: "g", meaning: "Grunnlinje" },
      { symbol: "h", meaning: "Høyde vinkelrett på grunnlinjen" },
    ],
    explanation: "Ikke bruk skrå siden som høyde – høyden står alltid vinkelrett.",
    calculatorSlug: "areal",
  },
  {
    slug: "areal-trapes",
    title: "Areal av trapes",
    category: "matematikk",
    expression: "A = (a + b) · h / 2",
    variables: [
      { symbol: "a, b", meaning: "De to parallelle sidene" },
      { symbol: "h", meaning: "Høyde mellom dem" },
    ],
    explanation: "Gjennomsnittet av parallelle sider ganget med høyden.",
    calculatorSlug: "areal",
  },
  {
    slug: "herons-formel",
    title: "Herons formel",
    category: "matematikk",
    expression: "A = √(s(s−a)(s−b)(s−c))     s = (a+b+c)/2",
    variables: [
      { symbol: "a,b,c", meaning: "Sidene i trekanten" },
      { symbol: "s", meaning: "Halvomkrets" },
    ],
    explanation: "Areal når du kjenner tre sider, uten høyde. Trekanten må oppfylle triangelulikheten.",
    calculatorSlug: "heron",
  },
  {
    slug: "volum-sylinder",
    title: "Volum av sylinder",
    category: "matematikk",
    expression: "V = πr²h",
    variables: [
      { symbol: "r", meaning: "Radius i grunnflaten" },
      { symbol: "h", meaning: "Høyde" },
    ],
    explanation: "Grunnflateareal ganger høyde. Overflate (lukket): 2πr² + 2πrh.",
    calculatorSlug: "volum",
  },
  {
    slug: "volum-kjegle",
    title: "Volum av kjegle",
    category: "matematikk",
    expression: "V = (1/3) πr²h",
    variables: [
      { symbol: "r", meaning: "Radius i grunnflaten" },
      { symbol: "h", meaning: "Høyde" },
    ],
    explanation: "En kjegle har en tredjedel av volumet til en sylinder med samme r og h.",
    calculatorSlug: "volum",
  },
  {
    slug: "volum-prisme",
    title: "Volum av prisme",
    category: "matematikk",
    expression: "V = A_grunn · h",
    variables: [
      { symbol: "A_grunn", meaning: "Arealet av grunnflaten" },
      { symbol: "h", meaning: "Høyde" },
    ],
    explanation: "Gjelder rett prisme. For skjevt prisme brukes den vinkelrette høyden.",
    calculatorSlug: "volum",
  },
  {
    slug: "sohcahtoa",
    title: "Sinus, cosinus og tangens i rettvinklet trekant",
    category: "matematikk",
    expression: "sin = mot / hyp     cos = hos / hyp     tan = mot / hos",
    variables: [
      { symbol: "mot", meaning: "Motstående katet til vinkelen" },
      { symbol: "hos", meaning: "Hosliggende katet" },
      { symbol: "hyp", meaning: "Hypotenus" },
    ],
    explanation:
      "Gjelder i rettvinklede trekanter. Husk: tan θ = sin θ / cos θ.",
    example: "I en 30–60–90-trekant er sin 30° = 1/2 og cos 30° = √3/2.",
    calculatorSlug: "trigonometri",
  },
  {
    slug: "sinussetningen",
    title: "Sinussetningen",
    category: "matematikk",
    expression: "a / sin A = b / sin B = c / sin C = 2R",
    variables: [
      { symbol: "a,b,c", meaning: "Sider" },
      { symbol: "A,B,C", meaning: "Motstående vinkler" },
      { symbol: "R", meaning: "Radius i omskrevet sirkel" },
    ],
    explanation: "Brukes når du kjenner en side og dens motstående vinkel, pluss én størrelse til.",
    calculatorSlug: "trigonometri",
  },
  {
    slug: "cosinussetningen",
    title: "Cosinussetningen",
    category: "matematikk",
    expression: "c² = a² + b² − 2ab cos C",
    variables: [
      { symbol: "a,b", meaning: "Sider som danner vinkel C" },
      { symbol: "c", meaning: "Side mot C" },
    ],
    explanation: "Generalisering av Pythagoras. Når C = 90° er cos C = 0 og du får a² + b² = c².",
    calculatorSlug: "trigonometri",
  },
  {
    slug: "logaritme-formel",
    title: "Logaritme",
    category: "matematikk",
    expression: "log_b a = c  ⇔  b^c = a",
    variables: [
      { symbol: "b", meaning: "Grunntall (base)" },
      { symbol: "a", meaning: "Argument" },
      { symbol: "c", meaning: "Eksponent / logaritmeverdi" },
    ],
    explanation:
      "log(xy) = log x + log y. log(x/y) = log x − log y. log(x^n) = n log x. ln er naturlig log (base e).",
    calculatorSlug: "logaritme",
  },
  {
    slug: "potensregler",
    title: "Potensregler",
    category: "matematikk",
    expression: "a^m · a^n = a^(m+n)     (a^m)^n = a^(mn)     a^(−n) = 1/a^n",
    variables: [
      { symbol: "a", meaning: "Grunntall" },
      { symbol: "m,n", meaning: "Eksponenter" },
    ],
    explanation: "Samme grunntall ved multiplikasjon: legg sammen eksponentene. a^0 = 1 (a ≠ 0).",
    calculatorSlug: "potens-rot",
  },
  {
    slug: "forstegardsligning",
    title: "Førstegradsligning",
    category: "matematikk",
    expression: "ax + b = 0  ⇒  x = −b / a",
    variables: [
      { symbol: "a", meaning: "Koeffisient foran x (a ≠ 0)" },
      { symbol: "b", meaning: "Konstantledd" },
    ],
    explanation: "Flytt konstantleddet og del på a. Grafen er en rett linje.",
    calculatorSlug: "forstegard",
  },
  {
    slug: "avstand-to-punkt",
    title: "Avstand mellom to punkt",
    category: "matematikk",
    expression: "d = √((x₂−x₁)² + (y₂−y₁)²)",
    variables: [
      { symbol: "(x₁,y₁)", meaning: "Første punkt" },
      { symbol: "(x₂,y₂)", meaning: "Andre punkt" },
    ],
    explanation: "Pythagoras i koordinatsystemet. I 3D legges (z₂−z₁)² under roten også.",
    calculatorSlug: "avstand-punkt",
  },
  {
    slug: "midtpunkt-formel",
    title: "Midtpunkt",
    category: "matematikk",
    expression: "M = ((x₁+x₂)/2 , (y₁+y₂)/2)",
    variables: [
      { symbol: "M", meaning: "Midtpunktet mellom to punkt" },
    ],
    explanation: "Gjennomsnittet av x-koordinatene og av y-koordinatene.",
  },
  {
    slug: "vektor-lengde",
    title: "Vektorlengde og prikkprodukt",
    category: "matematikk",
    expression: "|v| = √(x²+y²)     u·v = |u||v| cos θ = x₁x₂ + y₁y₂",
    variables: [
      { symbol: "v", meaning: "Vektor (x, y)" },
      { symbol: "θ", meaning: "Vinkel mellom u og v" },
    ],
    explanation: "Prikkprodukt null betyr at vektorene står vinkelrett på hverandre.",
    calculatorSlug: "vektor-2d",
  },

  // —— Bygg ——
  {
    slug: "fliser-formel",
    title: "Antall fliser",
    category: "bygg",
    expression: "antall ≈ (areal / flisareal) · (1 + svinn)",
    variables: [
      { symbol: "areal", meaning: "Gulv- eller veggareal" },
      { symbol: "svinn", meaning: "Kapp og reservedel, f.eks. 0,10" },
    ],
    explanation: "Rund opp til hele esker. Mønster og kapp øker svinnet.",
    calculatorSlug: "fliser",
  },
  {
    slug: "gulvbelegg-formel",
    title: "Gulvbelegg",
    category: "bygg",
    expression: "m² = lengde · bredde · (1 + svinn)",
    variables: [
      { symbol: "svinn", meaning: "Typisk 5–15 % til kapp" },
    ],
    explanation: "Mål rommet, ikke bare fri gulvflate hvis lister og dører krever ekstra.",
    calculatorSlug: "gulvbelegg",
  },
  {
    slug: "tapet-formel",
    title: "Tapetmengde",
    category: "bygg",
    expression: "baner = takhøyde / rapporthøyde     ruller ≈ omkrets / banebredde",
    variables: [
      { symbol: "rapport", meaning: "Mønsterets gjentakelse i høyden" },
    ],
    explanation: "Mønster med rapport gir mer svinn enn ensfarget tapet. Trekk fra vinduer og dører grovt.",
    calculatorSlug: "tapet",
  },
  {
    slug: "u-verdi-formel",
    title: "U-verdi (isolasjon)",
    category: "bygg",
    expression: "U = 1 / Σ R     R = d / λ",
    variables: [
      { symbol: "U", meaning: "Varmegjennomgangstall i W/(m²·K)" },
      { symbol: "R", meaning: "Varmemotstand" },
      { symbol: "d", meaning: "Tykkelse" },
      { symbol: "λ", meaning: "Varmekonduktivitet" },
    ],
    explanation: "Lavere U betyr bedre isolasjon. Lagene summeres som R-verdier i serie.",
    calculatorSlug: "isolasjon-uverdi",
  },
  {
    slug: "gipsplater-formel",
    title: "Gipsplater",
    category: "bygg",
    expression: "plater = areal / plateareal · (1 + svinn)",
    variables: [
      { symbol: "plateareal", meaning: "Ofte 0,6 · 2,4 = 1,44 m²" },
    ],
    explanation: "Standard norsk plate er ofte 60×240 cm. Legg til ekstra til kapp.",
    calculatorSlug: "gipsplater",
  },
  {
    slug: "grus-sand-formel",
    title: "Grus og sand",
    category: "bygg",
    expression: "V = l · b · tykkelse",
    variables: [
      { symbol: "V", meaning: "Volum i m³" },
    ],
    explanation: "Bestill gjerne litt ekstra. 1 m³ veier ulikt etter materialtype – spør leverandør.",
    calculatorSlug: "grus-sand",
  },
  {
    slug: "gjerde-formel",
    title: "Gjerdestolper",
    category: "bygg",
    expression: "stolper = lengde / avstand + 1",
    variables: [
      { symbol: "lengde", meaning: "Gjerdelengde" },
      { symbol: "avstand", meaning: "Senteravstand mellom stolper" },
    ],
    explanation: "Pluss 1 fordi du trenger stolpe i begge ender. Hjørner og porter krever ekstra.",
    calculatorSlug: "gjerde",
  },
  {
    slug: "takstein-formel",
    title: "Takstein",
    category: "bygg",
    expression: "stein = takareal · stein/m² · (1 + svinn)",
    variables: [
      { symbol: "stein/m²", meaning: "Oppgis av produsenten" },
    ],
    explanation: "Takareal er skrått areal, ikke grunnflate. Møne, piper og kapp øker behovet.",
    calculatorSlug: "takstein",
  },

  // —— Hverdag ——
  {
    slug: "reisetid-formel",
    title: "Reisetid",
    category: "hverdag",
    expression: "tid = distanse / fart",
    variables: [
      { symbol: "distanse", meaning: "km" },
      { symbol: "fart", meaning: "km/t" },
    ],
    explanation: "Gjennomsnittsfart, ikke toppfart. Pause og kø kommer i tillegg.",
    calculatorSlug: "reisetid",
  },
  {
    slug: "nedlasting-formel",
    title: "Nedlastingstid",
    category: "hverdag",
    expression: "tid = filstørrelse / hastighet",
    variables: [
      { symbol: "filstørrelse", meaning: "I bit (byte · 8)" },
      { symbol: "hastighet", meaning: "bit/s (Mbps · 10⁶)" },
    ],
    explanation: "Pass på bit vs. byte. 100 Mbps er teoretisk maks – faktisk hastighet er ofte lavere.",
    calculatorSlug: "nedlasting",
  },
  {
    slug: "arbeidstid-formel",
    title: "Arbeidstid og overtid",
    category: "hverdag",
    expression: "timer = slutt − start − pause",
    variables: [
      { symbol: "pause", meaning: "Ulønnet pause trekkes fra" },
    ],
    explanation: "Overtid beregnes etter avtale/tariff når du overstiger avtalt arbeidstid.",
    calculatorSlug: "arbeidstid",
  },
  {
    slug: "abonnement-arspris",
    title: "Abonnement årspris",
    category: "hverdag",
    expression: "år = måned · 12     eller     måned = år / 12",
    variables: [
      { symbol: "år", meaning: "Årlig kostnad" },
      { symbol: "måned", meaning: "Månedlig kostnad" },
    ],
    explanation: "Sammenlign abonnement på samme tidsenhet. Bindingstid og oppstartgebyr påvirker totalkostnaden.",
    calculatorSlug: "abonnement",
  },
  {
    slug: "vaskemaskin-formel",
    title: "Vaskemaskinkostnad",
    category: "hverdag",
    expression: "kostnad = (kWh · strømpris) + (vann · vannpris)",
    variables: [
      { symbol: "kWh", meaning: "Energibruk per vask" },
    ],
    explanation: "Eco-program bruker ofte mindre energi, men tar lengre tid. Vannpris varierer mellom kommuner.",
    calculatorSlug: "vaskemaskin-kostnad",
  },
  {
    slug: "alder-formel",
    title: "Alder",
    category: "hverdag",
    expression: "alder = i dag − fødselsdato",
    variables: [
      { symbol: "alder", meaning: "Hele år, eller år/måned/dag" },
    ],
    explanation: "Du fyller år på fødselsdagen. Før den dagen er alderen fortsatt forrige hele år.",
    calculatorSlug: "alder",
  },

  // —— Mat ——
  {
    slug: "oppskrift-skalering",
    title: "Oppskriftskalering",
    category: "mat",
    expression: "ny mengde = gammel · (nye porsjoner / gamle porsjoner)",
    variables: [
      { symbol: "porsjoner", meaning: "Antall personer eller enheter" },
    ],
    explanation: "Fungerer best lineært. Bakepulver, gjær og krydder kan trenge skjønn ved store sprang.",
    calculatorSlug: "oppskrift",
  },
  {
    slug: "gjaer-formel",
    title: "Gjæromregning",
    category: "mat",
    expression: "tørr ≈ 1/3 av fersk (vekt)",
    variables: [
      { symbol: "fersk", meaning: "Fersk gjær i gram" },
      { symbol: "tørr", meaning: "Tørrgjær i gram" },
    ],
    explanation: "Tommelfingerregel: 50 g fersk ≈ 17 g tørr. Følg alltid pakkens anbefaling ved tvil.",
    calculatorSlug: "gjaer",
  },
  {
    slug: "steketid-formel",
    title: "Steketid",
    category: "mat",
    expression: "tid ≈ minutter_per_kg · vekt",
    variables: [
      { symbol: "minutter_per_kg", meaning: "Oppgis i oppskrift eller tabell" },
    ],
    explanation: "Kjernetemperatur er sikrere enn klokke. Tykkelse betyr mer enn totalvekt for biffer.",
    calculatorSlug: "steketid",
  },
  {
    slug: "ovn-omregning",
    title: "Ovnstemperatur over/under",
    category: "mat",
    expression: "overvarm ≈ under · 0,85 til 0,90 (tommelfinger)",
    variables: [
      { symbol: "under", meaning: "Temperatur ved undervarme" },
    ],
    explanation: "Over- og undervarme bruner annerledes. Konveksjon (varmluft) krever ofte 10–20 °C lavere.",
    calculatorSlug: "ovn-temperatur",
  },

  // —— Skole ——
  {
    slug: "karaktersnitt-formel",
    title: "Karaktersnitt",
    category: "skole",
    expression: "snitt = (Σ karakter) / n",
    variables: [
      { symbol: "n", meaning: "Antall karakterer" },
    ],
    explanation: "Uvektet snitt. Noen skoler bruker vekting – da er det Σ(karakter·vekt) / Σ vekt.",
    calculatorSlug: "karakterkalkulator",
  },
  {
    slug: "karakterbehov-formel",
    title: "Karakterbehov",
    category: "skole",
    expression: "trengt = mål · n − sum_så_langt",
    variables: [
      { symbol: "mål", meaning: "Ønsket snitt" },
      { symbol: "n", meaning: "Totalt antall karakterer til slutt" },
    ],
    explanation: "Sier hvilken karakter du trenger på det som gjenstår for å treffe snittet.",
    calculatorSlug: "karakterbehov",
  },
  {
    slug: "vekttall-formel",
    title: "Vekttall / vektet snitt",
    category: "skole",
    expression: "snitt = Σ(karakter · stp) / Σ stp",
    variables: [
      { symbol: "stp", meaning: "Studiepoeng / vekttall for emnet" },
    ],
    explanation: "Emner med flere studiepoeng teller mer. Brukes ofte i høyere utdanning.",
    calculatorSlug: "vekttall-snitt",
  },
  {
    slug: "lesetid-formel",
    title: "Lesetid",
    category: "skole",
    expression: "tid = sider / (sider per time)",
    variables: [
      { symbol: "sider per time", meaning: "Din faktiske lesefart for denne teksten" },
    ],
    explanation: "Fagtekst går saktere enn roman. Legg inn tid til notater.",
    calculatorSlug: "lesetid",
  },

  // —— Sport / helse ——
  {
    slug: "makspuls-formel",
    title: "Makspuls",
    category: "sport",
    expression: "HF_maks ≈ 220 − alder",
    variables: [
      { symbol: "alder", meaning: "Alder i år" },
    ],
    explanation:
      "Grov tommelfingerregel. Tanaka: 208 − 0,7·alder. Individuell makspuls kan avvike mye.",
    calculatorSlug: "makspuls",
  },
  {
    slug: "pulssoner-formel",
    title: "Pulssoner",
    category: "sport",
    expression: "sone = HF_hvile + intensitet · (HF_maks − HF_hvile)",
    variables: [
      { symbol: "intensitet", meaning: "Andel av hjertefrekvensreserve (Karvonen)" },
    ],
    explanation: "Karvonen-metoden bruker reserve, ikke bare prosent av makspuls. Mer treffsikkert for mange.",
    calculatorSlug: "pulssoner-sport",
  },
  {
    slug: "kalorier-loping-formel",
    title: "Kalorier ved løping",
    category: "sport",
    expression: "kcal ≈ 1,036 · kg · km",
    variables: [
      { symbol: "kg", meaning: "Kroppsvekt" },
      { symbol: "km", meaning: "Distanse" },
    ],
    explanation: "Grov tommelfingerregel. Fart, underlag og vind påvirker. Ofte ca. 1 kcal per kg per km.",
    calculatorSlug: "kalorier-loping",
  },
  {
    slug: "ideell-vekt-formel",
    title: "Ideell vekt (BMI-basert)",
    category: "sport",
    expression: "vekt = BMI · høyde²",
    variables: [
      { symbol: "BMI", meaning: "Valgt mål-BMI, f.eks. 22" },
      { symbol: "høyde", meaning: "I meter" },
    ],
    explanation: "Gir vekt som treffer valgt BMI. Ideell vekt er ikke medisinsk fasit – muskelmasse betyr mye.",
    calculatorSlug: "ideell-vekt",
  },
  {
    slug: "midje-hoyde-formel",
    title: "Midje–høyde-forhold",
    category: "sport",
    expression: "forhold = midje / høyde",
    variables: [
      { symbol: "midje, høyde", meaning: "Samme enhet (cm)" },
    ],
    explanation: "Under ca. 0,5 brukes ofte som et enkelt helsemål for voksne. Ikke diagnostisk alene.",
    calculatorSlug: "midje-hoyde",
  },
  {
    slug: "ftp-soner-formel",
    title: "FTP-soner (sykling)",
    category: "sport",
    expression: "soneeffekt = andel · FTP",
    variables: [
      { symbol: "FTP", meaning: "Functional Threshold Power" },
    ],
    explanation: "Sonene er prosent av FTP (f.eks. tempo 76–90 %). FTP anslås ofte fra 20 min-test · 0,95.",
    calculatorSlug: "ftp-soner",
  },
  {
    slug: "watt-per-kg-formel",
    title: "Watt per kilogram",
    category: "sport",
    expression: "W/kg = effekt / kroppsvekt",
    variables: [
      { symbol: "effekt", meaning: "Watt" },
      { symbol: "kroppsvekt", meaning: "kg" },
    ],
    explanation: "Viktig mål i sykling, særlig i stigning. Høy W/kg betyr mer fart oppover.",
    calculatorSlug: "watt-per-kg",
  },
  {
    slug: "negativ-split-formel",
    title: "Negativ split",
    category: "sport",
    expression: "andre halvdel raskere enn første",
    variables: [
      { symbol: "split", meaning: "Tid på hver halvdel av løpet" },
    ],
    explanation: "Mange løpere åpner for hardt. Negativ split betyr kontrollert start og sterkere avslutning.",
    calculatorSlug: "negativ-split",
  },

  // —— Musikk ——
  {
    slug: "bpm-tid-formel",
    title: "BPM og tid",
    category: "musikk",
    expression: "tid = slag / BPM · 60     slag = BPM · tid / 60",
    variables: [
      { symbol: "BPM", meaning: "Beats per minute" },
      { symbol: "slag", meaning: "Antall taktslag" },
    ],
    explanation: "120 BPM: hvert slag er 0,5 s. En 4/4-takt tar da 2 sekunder.",
    calculatorSlug: "bpm-tid",
  },
  {
    slug: "delay-bpm-formel",
    title: "Delay-tid fra BPM",
    category: "musikk",
    expression: "delay_ms = 60000 / BPM · notelengde",
    variables: [
      { symbol: "notelengde", meaning: "1 for kvartnote, 0,5 for åttendedel" },
    ],
    explanation: "Synker delay til tempoet. Ved 120 BPM er kvartnote-delay 500 ms.",
    calculatorSlug: "delay-bpm",
  },

  // —— Foto ——
  {
    slug: "eksponeringstrekant-formel",
    title: "Eksponeringstrekanten",
    category: "foto",
    expression: "eksponering styres av blender · lukker · ISO",
    variables: [
      { symbol: "blender", meaning: "f-tall (lysåpning)" },
      { symbol: "lukker", meaning: "Tid i sekunder" },
      { symbol: "ISO", meaning: "Sensorens lysfølsomhet" },
    ],
    explanation:
      "Ett stopp mer lys: åpne blender ett trinn, doble tiden, eller doble ISO. Balanser etter dybdeskarphet og bevegelse.",
    calculatorSlug: "eksponeringstrekant",
  },
  {
    slug: "crop-faktor-formel",
    title: "Crop-faktor",
    category: "foto",
    expression: "ekvivalent = brennvidde · crop",
    variables: [
      { symbol: "crop", meaning: "f.eks. 1,5 (APS-C) eller 2 (Micro Four Thirds)" },
    ],
    explanation: "50 mm på APS-C med crop 1,5 tilsvarer 75 mm synsfelt på fullformat.",
    calculatorSlug: "crop-faktor",
  },
  {
    slug: "nd-filter-formel",
    title: "ND-filter og lukkertid",
    category: "foto",
    expression: "ny tid = tid · 2^(stop)",
    variables: [
      { symbol: "stop", meaning: "ND-styrke i stopp (ND8 ≈ 3 stop)" },
    ],
    explanation: "ND-filter slipper inn mindre lys slik at du kan bruke lengre lukkertid i dagslys.",
    calculatorSlug: "nd-filter",
  },
  {
    slug: "fov-formel",
    title: "Synsfelt (FOV)",
    category: "foto",
    expression: "FOV ≈ 2 arctan(sensor / (2 · f))",
    variables: [
      { symbol: "f", meaning: "Brennvidde" },
      { symbol: "sensor", meaning: "Sensorbredde eller -høyde" },
    ],
    explanation: "Vidvinkel (kort f) gir stort synsfelt. Tele (lang f) gir smalt.",
    calculatorSlug: "synsfelt-fov",
  },
  {
    slug: "megapiksel-formel",
    title: "Megapiksel og utskrift",
    category: "foto",
    expression: "MP = (bredde_px · høyde_px) / 10^6",
    variables: [
      { symbol: "px", meaning: "Piksler" },
    ],
    explanation: "Til utskrift betyr oppløsning i ppi også mye. Flere MP hjelper ved beskæring.",
    calculatorSlug: "megapiksel",
  },

  // —— Dyr ——
  {
    slug: "kattealder-formel",
    title: "Kattealder",
    category: "dyr",
    expression: "grovt: første år ≈ 15 menneskeår, deretter +4 per år",
    variables: [
      { symbol: "år", meaning: "Kattens alder" },
    ],
    explanation: "Tommelfingerregler varierer. Veterinær vurderer biologisk alder bedre enn formler.",
    calculatorSlug: "kattealder",
  },
  {
    slug: "for-kjaledyr-formel",
    title: "Fôrmengde kjæledyr",
    category: "dyr",
    expression: "dagsrase ≈ anbefaling per kg · vekt",
    variables: [
      { symbol: "anbefaling", meaning: "Fra fôrprodusent" },
    ],
    explanation: "Start med pakkens tabell og juster etter hold. Valper og drektige dyr har andre behov.",
    calculatorSlug: "for-kjaledyr",
  },

  // —— Enheter ——
  {
    slug: "hastighet-omregning",
    title: "Hastighetsomregning",
    category: "enheter",
    expression: "1 m/s = 3,6 km/t     1 mph ≈ 1,609 km/t",
    variables: [
      { symbol: "m/s", meaning: "Meter per sekund" },
      { symbol: "km/t", meaning: "Kilometer per time" },
    ],
    explanation: "Del km/t på 3,6 for å få m/s. Omvendt: gange med 3,6.",
    calculatorSlug: "hastighet-enheter",
  },
  {
    slug: "dataenheter-formel",
    title: "Dataenheter",
    category: "enheter",
    expression: "1 byte = 8 bit     1 KiB = 1024 byte     1 KB ≈ 1000 byte",
    variables: [
      { symbol: "bit", meaning: "Minst enhet (0 eller 1)" },
    ],
    explanation: "Nettverk bruker ofte desimale SI-prefiks (MB = 10⁶). Operativsystemer viser ofte binære (MiB = 2²⁰).",
    calculatorSlug: "data-enheter",
  },
  {
    slug: "grader-radianer-formel",
    title: "Grader og radianer",
    category: "enheter",
    expression: "rad = grader · π/180     grader = rad · 180/π",
    variables: [
      { symbol: "π", meaning: "≈ 3,14159" },
    ],
    explanation: "Full sirkel: 360° = 2π rad. 180° = π rad. 90° = π/2 rad.",
    calculatorSlug: "grader-radianer",
  },

  // —— Økonomi (flere) ——
  {
    slug: "inflasjon-formel",
    title: "Inflasjon og realverdi",
    category: "okonomi",
    expression: "real = nominell / (1 + i)^n",
    variables: [
      { symbol: "i", meaning: "Inflasjon per år som desimal" },
      { symbol: "n", meaning: "Antall år" },
    ],
    explanation: "Viser hva et beløp er verdt i dagens kjøpekraft etter n år med inflasjon.",
    calculatorSlug: "inflasjon",
  },
  {
    slug: "tips-formel",
    title: "Tips",
    category: "okonomi",
    expression: "tips = regning · sats     total = regning + tips",
    variables: [
      { symbol: "sats", meaning: "F.eks. 0,10 for 10 %" },
    ],
    explanation: "I Norge er tips frivillig. Noen steder er service inkludert.",
    calculatorSlug: "tips",
  },
  {
    slug: "budsjett-50-30-20-formel",
    title: "Budsjett 50/30/20",
    category: "okonomi",
    expression: "behov 50 % · inntekt     ønsker 30 %     sparing 20 %",
    variables: [
      { symbol: "inntekt", meaning: "Netto inntekt" },
    ],
    explanation: "Enkel tommelfingerregel. Tilpass til boligkostnader og livssituasjon i Norge.",
    calculatorSlug: "budsjett-50-30-20",
  },
  {
    slug: "feriepenger-formel",
    title: "Feriepenger",
    category: "okonomi",
    expression: "feriepenger = grunnlag · sats",
    variables: [
      { symbol: "sats", meaning: "10,2 %, 12 %, 12,5 % eller 14,3 %" },
    ],
    explanation: "Satsen avhenger av ferielengde og alder. Opptjenes året før utbetaling.",
    calculatorSlug: "feriepenger",
  },
  {
    slug: "lonnsomregning-formel",
    title: "Lønn år / måned / time",
    category: "okonomi",
    expression: "år ≈ måned · 12     time ≈ år / (52 · uketimer)",
    variables: [
      { symbol: "uketimer", meaning: "Avtalt arbeidstid, ofte 37,5" },
    ],
    explanation: "Forenklet omregning. Ferie, helligdager og overtidsregler påvirker reell timelønn.",
    calculatorSlug: "lonn-omregning",
  },

  // —— Statistikk ——
  {
    slug: "bayes-formel",
    title: "Bayes’ setning",
    category: "statistikk",
    expression: "P(A|B) = P(B|A) · P(A) / P(B)",
    variables: [
      { symbol: "P(A|B)", meaning: "Sannsynlighet for A gitt B" },
      { symbol: "P(A)", meaning: "Prior for A" },
    ],
    explanation: "Oppdaterer sannsynlighet når ny informasjon (B) kommer. Grunnlag for mye moderne statistikk.",
    calculatorSlug: "bayes-enkel",
  },
  {
    slug: "median-formel",
    title: "Median",
    category: "statistikk",
    expression: "midterste verdi når data er sortert",
    variables: [
      { symbol: "n", meaning: "Antall observasjoner" },
    ],
    explanation: "Ved partall n er medianen ofte snittet av de to midterste. Robust mot ekstremverdier.",
    calculatorSlug: "median-percentil",
  },
  {
    slug: "binomial-formel",
    title: "Binomialsannsynlighet",
    category: "statistikk",
    expression: "P(X=k) = C(n,k) · p^k · (1−p)^(n−k)",
    variables: [
      { symbol: "n", meaning: "Antall forsøk" },
      { symbol: "k", meaning: "Antall suksesser" },
      { symbol: "p", meaning: "Sannsynlighet per forsøk" },
    ],
    explanation: "Uavhengige ja/nei-forsøk med lik p. C(n,k) er antall kombinasjoner.",
    calculatorSlug: "binomialsannsynlighet",
  },
  {
    slug: "korrelasjon-formel",
    title: "Korrelasjon (Pearson)",
    category: "statistikk",
    expression: "r = Σ((x−x̄)(y−ȳ)) / (s_x s_y (n−1))",
    variables: [
      { symbol: "r", meaning: "Korrelasjonskoeffisient mellom −1 og 1" },
    ],
    explanation: "r nær 1: sterk positiv samvariasjon. Korrelasjon er ikke årsak.",
    calculatorSlug: "korrelasjon",
  },
];

export function getFormula(slug: string): Formula | undefined {
  return formulas.find((f) => f.slug === slug);
}

export function formulasInCategory(id: string): Formula[] {
  return formulas.filter((f) => f.category === id);
}

export const formulasByCategory = formulasInCategory;

export function searchFormulas(query: string): Formula[] {
  const q = query.trim().toLowerCase();
  if (!q) return formulas;
  return formulas.filter((f) => {
    const hay = [
      f.title,
      f.expression,
      f.explanation,
      f.slug,
      ...f.variables.map((v) => `${v.symbol} ${v.meaning}`),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
