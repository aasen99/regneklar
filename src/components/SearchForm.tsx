export function SearchForm({
  defaultValue = "",
  large = false,
}: {
  defaultValue?: string;
  large?: boolean;
}) {
  return (
    <form action="/sok" className="flex w-full gap-2">
      <label className="sr-only" htmlFor={large ? "q-hero" : "q-box"}>
        Søk
      </label>
      <input
        id={large ? "q-hero" : "q-box"}
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Søk etter lån, BMI, tempo, 400 m, MVA…"
        className={`w-full rounded-full border border-line bg-sand px-5 text-ink outline-none ring-pine/30 placeholder:text-ink-soft/70 focus:ring-2 ${
          large ? "h-14 text-base" : "h-11 text-sm"
        }`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full bg-pine px-6 font-medium text-sand hover:bg-pine-dark ${
          large ? "h-14" : "h-11 text-sm"
        }`}
      >
        Søk
      </button>
    </form>
  );
}
