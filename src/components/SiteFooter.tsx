import Link from "next/link";
import { categories } from "@/lib/categories";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-pine-dark text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="[&_span]:text-sand">
            <Logo />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand/75">
            Kalkulatorer og formler for alle – økonomi, helse, skole, bygg og
            hverdag. På norsk, uten støy.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-sand/50">
            Kategorier
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link className="text-sand/80 hover:text-sand" href={`/kategori/${c.id}`}>
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-sand/50">
            Nettstedet
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-sand/80">
            <li>
              <Link href="/formler" className="hover:text-sand">
                Formelsamling
              </Link>
            </li>
            <li>
              <Link href="/om" className="hover:text-sand">
                Om REGNEKLAR
              </Link>
            </li>
            <li>
              <Link href="/sok" className="hover:text-sand">
                Søk
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-sand/50">
        Kalkulatorene er til hjelp og læring, ikke offisiell rådgivning.
      </div>
    </footer>
  );
}
