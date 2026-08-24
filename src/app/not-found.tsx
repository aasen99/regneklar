import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-pine">404</p>
      <h1 className="mt-3 font-serif text-4xl">Siden finnes ikke</h1>
      <p className="mt-3 text-ink-soft">
        Kanskje formelen flyttet på seg. Prøv søk, eller gå til forsiden.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-pine px-5 py-2.5 text-sm text-sand"
      >
        Til forsiden
      </Link>
    </div>
  );
}
