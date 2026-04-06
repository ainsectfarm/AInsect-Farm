"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const locales = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "pl", label: "PL" },
  { code: "uk", label: "UK" },
];

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex gap-1 text-xs font-mono tracking-widest">
      {locales.map(({ code, label }, i) => (
        <span key={code}>
          {i > 0 && <span className="text-[#333344] mx-0.5">|</span>}
          <button
            onClick={() => switchLocale(code)}
            className={`hover:text-[#00FF88] transition px-0.5 ${
              currentLocale === code
                ? "text-[#00FF88] font-bold"
                : "text-[#666677]"
            }`}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
