"use client"

import { useState, useTransition } from "react"
import { joinWhitelist } from "../actions/whitelist"

const PHASES = [
  {
    id: "private",
    label: "Private Round",
    status: "closed" as const,
    price: "0.020",
    tokens: "2 000 000",
    pct: 2,
    minBuy: "1 000 USD",
    raise: "40 000 USD",
    trigger: "Friends & family",
    vesting: "3M cliff + 9M linear",
  },
  {
    id: "presale",
    label: "Pre-Sale",
    status: "active" as const,
    price: "0.050",
    tokens: "5 000 000",
    pct: 5,
    minBuy: "500 USD",
    raise: "250 000 USD",
    trigger: "Whitelist otwarty · do ARR ≥ 500k USD",
    vesting: "6M cliff + 12M linear",
  },
  {
    id: "public",
    label: "Public Sale",
    status: "upcoming" as const,
    price: "0.100",
    tokens: "8 000 000",
    pct: 8,
    minBuy: "100 USD",
    raise: "800 000 USD",
    trigger: "Trigger: ARR ≥ 2M USD (est. M19–30)",
    vesting: "3M cliff + 6M linear",
  },
]

const AMOUNTS = ["500–2 000 USD", "2 000–10 000 USD", "10 000–50 000 USD", "50 000+ USD"]

const STATUS_STYLES = {
  closed:   { dot: "bg-[#4a5a4e]",   badge: "bg-[#1a2a1e] text-[#4a5a4e]",   label: "ZAMKNIĘTY" },
  active:   { dot: "bg-[#00ff7f] animate-pulse", badge: "bg-[#00ff7f]/15 text-[#00ff7f]", label: "AKTYWNY" },
  upcoming: { dot: "bg-[#f5a623]",   badge: "bg-[#f5a623]/15 text-[#f5a623]", label: "WKRÓTCE" },
}

export default function PresaleSection() {
  const [pending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState("presale")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await joinWhitelist(fd)
      if (result.ok) { setSent(true); setError(null) }
      else setError(result.error ?? "Błąd")
    })
  }

  return (
    <section id="presale" className="bg-[#060e09] py-20 px-8 border-y border-[#00ff7f]/20 relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00ff7f]/4 blur-[120px] rounded-full"/>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-[#00ff7f] font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
          <span className="w-8 h-px bg-[#00ff7f]"/>Token AINS — Pre-Sale
        </div>
        <h2 className="text-4xl font-black tracking-tight mb-3">Dołącz wcześnie.<br/>Warunki rosną z każdą fazą.</h2>
        <p className="text-[#8a9a8e] mb-2 max-w-xl">100M AINS · Fixed supply · Polygon → AgroAI Chain · MiCA-compliant Estonia OÜ</p>
        <p className="text-[#8a9a8e] text-sm mb-12 max-w-xl">
          Launch trigger: ARR ≥ 2M USD. Nie sprzedajemy tokenów przed osiągnięciem realnych przychodów.
        </p>

        {/* Fazy */}
        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {PHASES.map((phase) => {
            const s = STATUS_STYLES[phase.status]
            const isActive = phase.status === "active"
            return (
              <div
                key={phase.id}
                className={`relative border p-6 transition ${
                  isActive
                    ? "border-[#00ff7f]/50 bg-[#0d1410]"
                    : "border-[#00ff7f]/12 bg-[#080c0a] opacity-70"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00ff7f] to-transparent"/>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-sm">{phase.label}</span>
                  <span className={`flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase px-2 py-1 ${s.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}/>
                    {s.label}
                  </span>
                </div>

                <div className="font-black text-3xl text-[#00ff7f] mb-1">${phase.price}</div>
                <div className="text-[#8a9a8e] text-xs mb-4">za 1 AINS</div>

                <div className="space-y-2 text-xs">
                  {[
                    ["Tokeny", `${phase.tokens} (${phase.pct}%)`],
                    ["Target raise", phase.raise],
                    ["Min zakup", phase.minBuy],
                    ["Vesting", phase.vesting],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-[#00ff7f]/8 pb-2 last:border-0">
                      <span className="text-[#8a9a8e]">{k}</span>
                      <span className="font-mono">{v}</span>
                    </div>
                  ))}
                </div>

                <div className={`mt-4 text-[10px] font-mono px-2 py-1.5 ${s.badge}`}>
                  {phase.trigger}
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats pasek */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#00ff7f]/10 border border-[#00ff7f]/10 mb-14">
          {[
            ["15 000 000", "Tokenów w sprzedaży", "15% supply"],
            ["1 090 000 USD", "Łączny target raise", "wszystkie fazy"],
            ["0.050 USD", "Cena Pre-Sale", "faza aktywna"],
            ["0.100 USD", "Cena docelowa", "public launch"],
          ].map(([val, label, sub]) => (
            <div key={label} className="bg-[#0d1410] px-6 py-5">
              <div className="font-black text-xl text-[#00ff7f] mb-1">{val}</div>
              <div className="text-sm font-bold mb-0.5">{label}</div>
              <div className="text-[#8a9a8e] text-xs">{sub}</div>
            </div>
          ))}
        </div>

        {/* Warunki + formularz */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Warunki */}
          <div>
            <div className="font-mono text-xs text-[#00ff7f] tracking-widest uppercase mb-5">// Kluczowe warunki</div>
            <div className="space-y-4">
              {[
                ["🔒","Vesting",
                  "Private: 3M cliff + 9M linear. Pre-Sale: 6M cliff + 12M linear. Public: 3M cliff + 6M linear. Brak dumpingu od inwestorów pre-launch."],
                ["⚖️","Compliance",
                  "Estonia OÜ · MiCA utility token design · Legal opinion przed każdym etapem · Przedsprzedaż min. 18M przed public launch."],
                ["₿","BTC Backing",
                  "Skarbiec BTC farmy stanowi dodatkowy backing ekosystemu. Widoczny on-chain. BTC nie jest sprzedawany — strategiczny HODL."],
                ["🗳️","Governance",
                  "Posiadacze AINS głosują nad treasury, rozwojem No-Waste App i ekspansją. Quorum: 10% supply. 1 token = 1 głos."],
                ["💰","Staking",
                  "Revenue sharing kwartalny z farmy: mining + mączka + energia. APY zależy od produkcji — brak syntetycznego yield."],
              ].map(([icon, title, desc]) => (
                <div key={title as string} className="flex gap-3">
                  <span className="text-lg mt-0.5">{icon}</span>
                  <div>
                    <div className="font-bold text-sm mb-1">{title as string}</div>
                    <div className="text-[#8a9a8e] text-xs leading-relaxed">{desc as string}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formularz whitelist */}
          <div>
            <div className="font-mono text-xs text-[#00ff7f] tracking-widest uppercase mb-5">// Zapisz się na whitelist</div>

            {sent ? (
              <div className="border border-[#00ff7f]/30 bg-[#00ff7f]/5 p-8">
                <div className="text-[#00ff7f] text-xl font-black mb-2">Zapisano.</div>
                <p className="text-[#8a9a8e] text-sm">
                  Odezwiemy się z detalami Pre-Sale i instrukcją zakupu. Dokładne warunki po NDA.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-[#8a9a8e] tracking-widest uppercase mb-1.5" htmlFor="wl-name">
                    Imię i nazwisko *
                  </label>
                  <input
                    id="wl-name" name="name" type="text" required autoComplete="name"
                    placeholder="Jan Kowalski"
                    className="w-full bg-[#080c0a] border border-[#00ff7f]/20 text-white text-sm px-4 py-3 placeholder:text-[#4a5a4e] focus:outline-none focus:border-[#00ff7f]/60 transition"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#8a9a8e] tracking-widest uppercase mb-1.5" htmlFor="wl-email">
                    E-mail *
                  </label>
                  <input
                    id="wl-email" name="email" type="email" required autoComplete="email"
                    placeholder="jan@fundusz.vc"
                    className="w-full bg-[#080c0a] border border-[#00ff7f]/20 text-white text-sm px-4 py-3 placeholder:text-[#4a5a4e] focus:outline-none focus:border-[#00ff7f]/60 transition"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#8a9a8e] tracking-widest uppercase mb-1.5" htmlFor="wl-wallet">
                    Adres portfela ETH/Polygon <span className="normal-case text-[10px]">(opcjonalnie)</span>
                  </label>
                  <input
                    id="wl-wallet" name="wallet" type="text"
                    placeholder="0x..."
                    className="w-full bg-[#080c0a] border border-[#00ff7f]/20 text-white text-sm px-4 py-3 font-mono placeholder:text-[#4a5a4e] focus:outline-none focus:border-[#00ff7f]/60 transition"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#8a9a8e] tracking-widest uppercase mb-1.5" htmlFor="wl-amount">
                    Orientacyjna kwota zakupu
                  </label>
                  <select
                    id="wl-amount" name="amount"
                    className="w-full bg-[#080c0a] border border-[#00ff7f]/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#00ff7f]/60 transition appearance-none"
                  >
                    <option value="">— wybierz —</option>
                    {AMOUNTS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

                <button
                  type="submit" disabled={pending}
                  className="w-full bg-[#00ff7f] text-[#080c0a] font-bold py-4 tracking-wide hover:bg-[#00cc66] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pending ? "Zapisywanie…" : "Dołącz do whitelist →"}
                </button>

                <p className="text-[#4a5a4e] text-xs text-center font-mono">
                  Brak spamu · Tylko informacje o Pre-Sale · Możesz zrezygnować w każdej chwili
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
