"use server"

import { Resend } from "resend"

export type WhitelistResult = { ok: true } | { ok: false; error: string }

export async function joinWhitelist(formData: FormData): Promise<WhitelistResult> {
  const name   = (formData.get("name")   as string | null)?.trim()
  const email  = (formData.get("email")  as string | null)?.trim()
  const wallet = (formData.get("wallet") as string | null)?.trim()
  const amount = (formData.get("amount") as string | null)?.trim()

  if (!name || !email) {
    return { ok: false, error: "Wypełnij imię i e-mail." }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return { ok: false, error: "Nieprawidłowy adres e-mail." }
  }

  const apiKey  = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "investor@ainsektfarm.com"

  if (!apiKey || apiKey === "re_TWOJ_KLUCZ_API") {
    console.log("[whitelist]", { name, email, wallet, amount })
    return { ok: true }
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from:    "AInsekt Farm <noreply@ainsektfarm.com>",
    to:      [toEmail],
    replyTo: email,
    subject: `[AINS Whitelist] ${name} — ${amount ?? "nieokreślona kwota"}`,
    html: `
      <div style="font-family:monospace;background:#080c0a;color:#f0f4f0;padding:32px;max-width:600px">
        <div style="color:#00ff7f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:24px">
          // AINS Token — Nowy zapis na whitelist
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="color:#8a9a8e;padding:8px 0;border-bottom:1px solid #1a2a1e">Imię</td>
              <td style="padding:8px 0;border-bottom:1px solid #1a2a1e">${name}</td></tr>
          <tr><td style="color:#8a9a8e;padding:8px 0;border-bottom:1px solid #1a2a1e">E-mail</td>
              <td style="padding:8px 0;border-bottom:1px solid #1a2a1e">
                <a href="mailto:${email}" style="color:#00ff7f">${email}</a></td></tr>
          <tr><td style="color:#8a9a8e;padding:8px 0;border-bottom:1px solid #1a2a1e">Portfel ETH</td>
              <td style="padding:8px 0;border-bottom:1px solid #1a2a1e;font-family:monospace;font-size:12px">${wallet || "—"}</td></tr>
          <tr><td style="color:#8a9a8e;padding:8px 0">Kwota zainteresowania</td>
              <td style="padding:8px 0;color:#00ff7f;font-weight:bold">${amount || "—"}</td></tr>
        </table>
        <div style="margin-top:32px;color:#4a5a4e;font-size:11px">ainsektfarm.com · AINS Token · MiCA-compliant Estonia</div>
      </div>
    `,
  })

  if (error) {
    console.error("[whitelist] Resend error:", error)
    return { ok: false, error: "Błąd zapisu. Spróbuj ponownie lub napisz bezpośrednio." }
  }

  return { ok: true }
}
