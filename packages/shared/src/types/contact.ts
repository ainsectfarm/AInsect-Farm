export type ContactType = "investor" | "btc" | "grant" | "partner" | "media" | "other"

export interface ContactPayload {
  name: string
  email: string
  type: ContactType
  message: string
}

export interface ContactResult {
  ok: boolean
  error?: string
}
