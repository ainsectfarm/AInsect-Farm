# AInsekt Farm — Project Status

**Last updated:** 2026-04-06 (final check)
**Version:** 1.2.1

---

## Architecture

```
apps/web/       Next.js 16.2.1 + TypeScript + Tailwind v4     :3000
apps/api/       FastAPI 0.115+ (Python 3.13) + SQLAlchemy     :8001
blockchain/     Hardhat 2.28 + Solidity 0.8.28                Polygon Amoy
database        PostgreSQL 17.9 (LENOVO 192.168.1.109)        :5432
cache           Redis 7 (docker-compose)                      :6379
```

---

## Component Status

### AINS.sol Smart Contract — READY

| Feature | Status | Details |
|---------|--------|---------|
| ERC-20 Token | DONE | AINS, 100M initial supply |
| Ownable | DONE | OpenZeppelin Ownable, deployer = owner |
| ReentrancyGuard | DONE | All external functions protected |
| MAX_SUPPLY | DONE | 200M cap enforced on all mints |
| Staking | DONE | stake/unstake with auto reward claim |
| Rewards | DONE | 5% APY formula, time-based calculation |
| Green Points | DONE | onlyOwner can add, users can claim as tokens |
| Tests | DONE | 17/17 passing (Hardhat + Chai + time helpers) |
| Deployed (testnet) | DONE | Polygon Amoy: `0x3b6675DBF77B60C0dF8678f2a26E5FA39193CBcA` |

**Security fixes applied:**
- `addGreenPoints()` restricted to `onlyOwner`
- `unstake()` — state update before transfer (checks-effects-interactions)
- `_safeMint()` enforces MAX_SUPPLY on every mint path
- `nonReentrant` on all state-changing external functions

### FastAPI Backend (FLIK API v1.2.0) — READY

| Endpoint | Method | Auth | Status |
|----------|--------|------|--------|
| `/` | GET | public | WORKING |
| `/health` | GET | public | WORKING |
| `/users/register` | POST | public | WORKING (bcrypt + JWT) |
| `/users/login` | POST | public | WORKING (OAuth2 form) |
| `/users/me` | GET | JWT | WORKING |
| `/users/` | GET | public | WORKING |
| `/users/{id}` | GET | public | WORKING |
| `/waste/report` | POST | public | WORKING |
| `/waste/` | GET | public | WORKING |
| `/waste/stats` | GET | public | WORKING |
| `/marketplace/products` | GET | public | WORKING |
| `/marketplace/products` | POST | public | WORKING |
| `/marketplace/reserve` | POST | public | WORKING |
| `/marketplace/map` | GET | public | WORKING |
| `/marketplace/stats` | GET | public | WORKING |
| `/greenpoints/earn` | POST | public | WORKING |
| `/greenpoints/balance/{id}` | GET | public | WORKING |
| `/greenpoints/convert` | POST | public | WORKING |
| `/greenpoints/leaderboard` | GET | public | WORKING |
| `/greenpoints/stats` | GET | public | WORKING |
| `/contact` | POST | public | STUB (no email) |

**Auth stack:** passlib (bcrypt) + python-jose (JWT HS256) + OAuth2PasswordBearer
**Database:** PostgreSQL 17.9 via SQLAlchemy 2.0 (sync)
**CORS:** restricted to localhost:3000 + 192.168.1.108:3000

### Next.js Frontend — READY (build passing)

| Page | Status | Details |
|------|--------|---------|
| `/` (Landing) | DONE | Investor pitch, roadmap, token info, contact |
| `/flik` (FLIK App) | 60% MVP | Dashboard, BTC counter, Waste AI, Marketplace, Wallet, Map |

**Build:** Next.js 16.2.1 (Turbopack) — compiles without errors
**Static pages:** `/` and `/flik` generated as static content

FLIK App sub-components:
- Dashboard: partial (API-connected + mock fallback)
- BTC Counter: mock (hardcoded value)
- Waste AI: partial (API POST connected)
- Marketplace: partial (mock data, no checkout)
- Wallet: demo only (no blockchain integration)
- Map: placeholder ("Mapbox coming soon")

### PostgreSQL — CONNECTED

- **Host:** 192.168.1.109 (LENOVO)
- **Version:** PostgreSQL 17.9
- **Database:** flik_db
- **Tables:** users, waste_reports, products, reservations, greenpoints_transactions
- **Column `password_hash`:** PRESENT in users table

### Vercel Deployment — FIXED

- `packageManager` downgraded to `pnpm@9.15.4` (Vercel-compatible)
- `engines.node >= 20.0.0` enforced
- `.npmrc` with `node-linker=hoisted` for monorepo compatibility
- `pnpm-lock.yaml` regenerated (lockfileVersion 9.0)

### Git Repository — CLEAN

- 12 commits on `main`, pushed to GitHub
- Working tree clean
- `.env` files removed from history (filter-branch applied)
- `refs/original` backup refs deleted
- Reflog expired, gc pruned

---

## Security Checklist

| Item | Status |
|------|--------|
| Database credentials in .env (not code) | DONE |
| JWT authentication (register/login/me) | DONE |
| CORS restricted origins | DONE |
| AINS.sol access control (Ownable) | DONE |
| AINS.sol reentrancy protection | DONE |
| AINS.sol supply cap (200M) | DONE |
| .env excluded from git | DONE |
| .env removed from git history | DONE |
| bcrypt password hashing | DONE |
| GitHub token in remote URL | NEEDS ROTATION |
| Polygon private key | NEEDS ROTATION |
| SECRET_KEY placeholder | NEEDS REAL VALUE |

---

## Remaining Work (Priority Order)

### Critical (before mainnet)
1. **Rotate compromised keys** — GitHub PAT (ghp_oCq...) and Polygon private key were in git history
2. **Set real SECRET_KEY** — replace placeholder in `apps/api/.env`
3. **Formal audit** of AINS.sol by external security firm

### High Priority
4. Add JWT auth to waste, marketplace, greenpoints endpoints (currently public)
5. Set up Alembic migrations for database schema management
6. Implement Resend email integration for `/contact` endpoint
7. Replace hardcoded API URL in `/flik` page with `NEXT_PUBLIC_API_URL` env var
8. Extract FLIK App into separate components (currently 641 lines in one file)

### Medium Priority
9. Implement Mapbox map in FLIK App
10. Connect wallet to Polygon (wagmi/viem)
11. Add rate limiting to API
12. Write API integration tests (pytest)
13. Set up GitHub Actions CI/CD
14. Add Redis caching for leaderboard/stats

### Nice to Have
15. Real BTC treasury counter (mining API)
16. Marketplace checkout flow
17. Multi-language support (PL/EN/UA)
18. Docker containerization for API
19. Monitoring (Sentry, Grafana)

---

## Versions

| Component | Version |
|-----------|---------|
| Next.js | 16.2.1 |
| React | 19.2.4 |
| Tailwind CSS | 4.x |
| FastAPI | 0.115+ |
| Python | 3.13 |
| SQLAlchemy | 2.0+ |
| Solidity | 0.8.28 |
| OpenZeppelin | 5.6.1 |
| Hardhat | 2.28.6 |
| PostgreSQL | 17.9 |
| Node.js | (system) |

---

## Contract Addresses

| Network | Address |
|---------|---------|
| Polygon Amoy (testnet) | `0x3b6675DBF77B60C0dF8678f2a26E5FA39193CBcA` |
| Polygon Mainnet | not deployed |

## Deployer Wallet

| Network | Address |
|---------|---------|
| Polygon | `0xCb2Eabfb6be080D17253E67930CCdf592d86421D` |
