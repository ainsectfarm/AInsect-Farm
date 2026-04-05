"use client"

import { useState, useTransition } from "react"
import { sendContact } from "../actions/contact"

const TYPES = [
  ["investor", "Inwestor (VC / Angel)"],
  ["btc",      "Web3 / BTC Investor"],
  ["grant",    "Grant / Instytucja"],
  ["partner",  "Współpraca / Partner"],
  ["media",    "Media / Prasa"],
  ["other",    "Inne"],
]

export default function ContactForm() {
  const [pending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await sendContact(fd)
      if (result.ok) {
        setSent(true)
        setError(null)
      } else {
        setError(result.error)
      }
    })
  }

  if (sent) {
    return (
      <div className="border border-[#00ff7f]/30 bg-[#00ff7f]/5 p-8 text-center mt-10">
        <div className="text-[#00ff7f] text-2xl font-black mb-2">Wiadomość wysłana.</div>
        <p className="text-[#8a9a8e] text-sm">Odezwiemy się w ciągu 48h. Pitch deck & model finansowy wysyłamy po NDA.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 text-left space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs text-[#8a9a8e] tracking-widest uppercase mb-1.5" htmlFor="cf-name">
            Imię i nazwisko *
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jan Kowalski"
            className="w-full bg-[#080c0a] border border-[#00ff7f]/20 text-white text-sm px-4 py-3 placeholder:text-[#4a5a4e] focus:outline-none focus:border-[#00ff7f]/60 transition"
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-[#8a9a8e] tracking-widest uppercase mb-1.5" htmlFor="cf-email">
            E-mail *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jan@fundusz.vc"
            className="w-full bg-[#080c0a] border border-[#00ff7f]/20 text-white text-sm px-4 py-3 placeholder:text-[#4a5a4e] focus:outline-none focus:border-[#00ff7f]/60 transition"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs text-[#8a9a8e] tracking-widest uppercase mb-1.5" htmlFor="cf-type">
          Typ kontaktu
        </label>
        <select
          id="cf-type"
          name="type"
          defaultValue="investor"
          className="w-full bg-[#080c0a] border border-[#00ff7f]/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#00ff7f]/60 transition appearance-none"
        >
          {TYPES.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-mono text-xs text-[#8a9a8e] tracking-widest uppercase mb-1.5" htmlFor="cf-message">
          Wiadomość *
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="Krótko o sobie, wolumenie inwestycji lub obszarze współpracy..."
          className="w-full bg-[#080c0a] border border-[#00ff7f]/20 text-white text-sm px-4 py-3 placeholder:text-[#4a5a4e] focus:outline-none focus:border-[#00ff7f]/60 transition resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-xs font-mono">{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#00ff7f] text-[#080c0a] font-bold py-4 tracking-wide hover:bg-[#00cc66] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Wysyłanie…" : "Wyślij wiadomość →"}
      </button>

      <p className="text-[#4a5a4e] text-xs text-center font-mono">
        Pitch deck & model finansowy po NDA · Odpowiadamy w 48h
      </p>
    </form>
  )
}
