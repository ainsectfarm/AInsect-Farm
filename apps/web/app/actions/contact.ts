"use server"

import { Resend } from "resend"

export type ContactResult = { ok: true } | { ok: false; error: string }

const TYPE_LABELS: Record<string, string> = {
  investor: "Inwestor (VC / Angel)",
  btc:      "Web3 / BTC Investor",
  grant:    "Grant / Instytucja",
  partner:  "Współpraca / Partner",
  media:    "Media / Prasa",
  other:    "Inne",
}

export async function sendContact(formData: FormData): Promise<ContactResult> {
  const name    = (formData.get("name")    as string | null)?.trim()
  const email   = (formData.get("email")   as string | null)?.trim()
  const type    = (formData.get("type")    as string | null)?.trim() ?? "other"
  const message = (formData.get("message") as string | null)?.trim()

  if (!name || !email || !message) {
    return { ok: false, error: "Wypełnij wszystkie wymagane pola." }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return { ok: false, error: "Nieprawidłowy adres e-mail." }
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "investor@ainsektfarm.com"

  if (!apiKey || apiKey === "re_TWOJ_KLUCZ_API") {
    console.warn("[contact] Brak RESEND_API_KEY — wiadomość nie wysłana:", { name, email, type, message })
    return { ok: true }
  }

  const resend = new Resend(apiKey)
  const typeLabel = TYPE_LABELS[type] ?? type

  const { error } = await resend.emails.send({
    from:    "AInsekt Farm <noreply@ainsektfarm.com>",
    to:      [toEmail],
    replyTo: email,
    subject: `[AInsekt] Nowy kontakt: ${typeLabel} — ${name}`,
    html: `
      <div style="font-family:monospace;background:#080c0a;color:#f0f4f0;padding:32px;max-width:600px">
        <div style="color:#00ff7f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:24px">
          // AInsekt Farm — Nowy kontakt
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="color:#8a9a8e;padding:8px 0;border-bottom:1px solid #1a2a1e">Imię</td>
              <td style="padding:8px 0;border-bottom:1px solid #1a2a1e">${name}</td></tr>
          <tr><td style="color:#8a9a8e;padding:8px 0;border-bottom:1px solid #1a2a1e">E-mail</td>
              <td style="padding:8px 0;border-bottom:1px solid #1a2a1e">
                <a href="mailto:${email}" style="color:#00ff7f">${email}</a></td></tr>
          <tr><td style="color:#8a9a8e;padding:8px 0;border-bottom:1px solid #1a2a1e">Typ</td>
              <td style="padding:8px 0;border-bottom:1px solid #1a2a1e">${typeLabel}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#0d1410;border-left:2px solid #00ff7f;color:#8a9a8e;font-size:13px;line-height:1.6;white-space:pre-wrap">${message}</div>
        <div style="margin-top:32px;color:#4a5a4e;font-size:11px">ainsektfarm.com · Circular Economy · AI · Blockchain</div>
      </div>
    `,
  })

  if (error) {
    console.error("[contact] Resend error:", error)
    return { ok: false, error: "Błąd wysyłania. Spróbuj ponownie lub napisz bezpośrednio na investor@ainsektfarm.com" }
  }

  return { ok: true }
}
