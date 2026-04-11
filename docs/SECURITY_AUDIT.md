# AInsekt Farm — Security Audit Report

**Data audytu:** 2026-04-11
**Audytor:** Claude Code (automated)
**Zakres:** Git repo, API, pliki konfiguracyjne, zależności, sieć lokalna

---

## Podsumowanie

| Poziom     | Znalezione | Naprawione |
|------------|------------|------------|
| KRYTYCZNY  | 5          | 4          |
| WYSOKI     | 5          | 5          |
| SREDNI     | 4          | 3          |
| NISKI      | 2          | 2          |

**Pozostaje do naprawy ręcznie:** unieważnienie GitHub PAT, zmiana hasła Postgres, zmiana klucza blockchain

---

## KRYTYCZNE

### 1. GitHub Token w remote URL
**Status:** NAPRAWIONE (token usunięty z URL)
Token PAT usunięty z git remote URL.
**WYMAGA AKCJI RĘCZNEJ:** Unieważnij token na GitHub → Settings → Developer settings → Personal access tokens.

### 2. Klucz prywatny blockchain w plaintext
**Status:** CZĘŚCIOWO NAPRAWIONE
Plik `blockchain/.env` — uprawnienia zmienione na 600 (owner-only).
**WYMAGA AKCJI RĘCZNEJ:** Jeśli klucz kontroluje fundusze na mainnecie — przenieś je na nowy adres.

### 3. SECRET_KEY API = placeholder
**Status:** NAPRAWIONE
Wygenerowano nowy klucz 256-bit (`openssl rand -hex 32`) i zapisano do `apps/api/.env`.
Fallback `"change-me-in-production"` w `config.py` zostanie nadpisany przez .env.

### 4. Endpoint `/greenpoints/earn` BEZ autoryzacji
**Status:** NAPRAWIONE
Dodano `Depends(get_current_user)` + walidacja `current_user.id == tx.user_id`.
Dotyczy endpointów:
- `POST /greenpoints/earn` — wymaga JWT + walidacja user_id
- `POST /greenpoints/convert` — wymaga JWT + walidacja user_id
- `GET /greenpoints/balance/{id}` — wymaga JWT

### 5. Endpoint `/greenpoints/convert` BEZ autoryzacji
**Status:** NAPRAWIONE
Jak wyżej — auth + walidacja ownership.

---

## WYSOKI

### 6. Lista użytkowników bez autoryzacji
**Status:** NAPRAWIONE
`GET /users/` i `GET /users/{id}` wymagają teraz tokenu JWT.

### 7. Hasło DB w plaintext w .env z uprawnieniami 664
**Status:** NAPRAWIONE
Uprawnienia `apps/api/.env` zmienione na 600 (owner-only).

### 8. Docker-compose: hardcoded POSTGRES_PASSWORD
**Status:** NAPRAWIONE
Zmieniono na zmienną `${POSTGRES_PASSWORD}` z `env_file: .env.docker`.
Porty Postgres i Redis ograniczone do `127.0.0.1` (nie wystawione na sieć).

### 9. Pliki .env mają złe uprawnienia (664)
**Status:** NAPRAWIONE (chmod 600)
Wszystkie 5 plików .env ma teraz uprawnienia 600.

### 10. CORS: allow_methods=["*"], allow_headers=["*"]
**Status:** NAPRAWIONE
Zmieniono na:
```python
allow_methods=["GET", "POST", "PUT", "DELETE"]
allow_headers=["Authorization", "Content-Type"]
```

---

## SREDNI

### 11. npm audit: 2 podatności w apps/web
**Status:** NAPRAWIONE
- next-intl: `npm audit fix` → naprawione
- Next.js: `npm audit fix --force` → zaktualizowane do 16.2.3
- Wynik: **0 vulnerabilities**

### 12. Redis bez hasła w docker-compose
**Status:** WYMAGA NAPRAWY
Redis port ograniczony do `127.0.0.1:6379` (poprawa), ale nadal bez `requirepass`.

### 13. Brak rate limiting na API
**Status:** NAPRAWIONE
Dodano `slowapi`:
- Globalny limit: 60 req/min per IP
- `/users/login`: 5 req/min per IP (brute-force protection)

### 14. `__pycache__` .pyc w historii git
**Status:** NAPRAWIONE
Usunięto 5 plików .pyc z git cache. Dodano `**/__pycache__/` i `**/*.pyc` do `.gitignore`.

---

## NISKI

### 15. SSH — OK
**Status:** OK
Poprawne uprawnienia, brak klucza prywatnego w repo.

### 16. .gitignore — OK
**Status:** NAPRAWIONE
Rozszerzono o `**/__pycache__/`, `**/*.pyc`, `.env.docker`.

---

## Podsumowanie napraw

| # | Naprawa | Status |
|---|---------|--------|
| 1 | Usunięto GitHub PAT z remote URL | DONE — **unieważnij token ręcznie!** |
| 2 | chmod 600 na plikach .env i blockchain key | DONE |
| 3 | Wygenerowano nowy SECRET_KEY (256-bit) | DONE |
| 4 | JWT auth na greenpoints endpoints + ownership validation | DONE |
| 5 | JWT auth na GET /users/ i GET /users/{id} | DONE |
| 6 | CORS: jawne methods i headers | DONE |
| 7 | Docker-compose: zmienne środowiskowe, porty na 127.0.0.1 | DONE |
| 8 | Rate limiting: slowapi 60/min global, 5/min login | DONE |
| 9 | npm audit fix: 0 vulnerabilities | DONE |
| 10 | Usunięto __pycache__ z git, rozszerzono .gitignore | DONE |

---

## Wymagane akcje ręczne

1. **Unieważnij GitHub PAT** → github.com → Settings → Developer settings → Revoke token
2. **Zmień hasło Postgres** w `.env.docker` na silne hasło
3. **Klucz blockchain** — jeśli mainnet, przenieś fundusze na nowy adres
4. **Redis** — dodaj `requirepass` w konfiguracji

---

*Raport wygenerowany automatycznie przez Claude Code — 2026-04-11*
*Naprawy zastosowane: 2026-04-11*
