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
    calculatorSlug: "termin",
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
    calculatorSlug: "volum",
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
    expression: "EK = pris · 0,15     dokumentavgift = 0,025 · pris",
    variables: [
      { symbol: "EK", meaning: "Egenkapital" },
      { symbol: "pris", meaning: "Kjøpesum" },
    ],
    explanation:
      "Normalt boliglånskrav er 15 % egenkapital. Dokumentavgift på 2,5 % gjelder vanligvis bruktbolig, ikke nybygg.",
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
    expression: "effektiv = (1 + r/m)ᵐ − 1",
    variables: [
      { symbol: "r", meaning: "Nominell årsrente" },
      { symbol: "m", meaning: "Antall terminer per år" },
    ],
    explanation:
      "Hyppigere rentetillegg gir høyere effektiv rente. Gebyrer kommer i tillegg i bankens oppgitte effektive rente.",
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
      { symbol: "LTV", meaning: "Belåningsgrad, f.eks. 0,85" },
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
    calculatorSlug: "effekt",
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
