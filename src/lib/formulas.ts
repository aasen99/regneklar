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
    category: "helse",
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
    category: "helse",
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
    category: "helse",
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
    category: "helse",
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
    category: "helse",
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
