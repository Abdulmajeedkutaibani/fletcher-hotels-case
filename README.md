
# Fletcher Front-End Case (Nuxt 3 + TS + Tailwind + Pinia + i18n)

A small hotel listings app with login, built with **Nuxt 3**, **TypeScript**, **Tailwind CSS**, **Pinia**, and **vue-i18n**.

## Quick Start
```bash
pnpm i # or npm i or yarn
pnpm dev
```

Set the API base URL via environment variable if needed:
```bash
NUXT_PUBLIC_API_BASE=https://frontend-case-api.alpha.fletcher.build pnpm dev
```

### Pages
- `/login` — authenticates via `POST /auth/login` (adjust endpoint if different in Swagger)
- `/hotels` — lists hotels and filters with provinces, themes, surroundings
- `/register` (bonus)
- `/forgot` (bonus)

### Where to adapt endpoints
- `stores/auth.ts` — login endpoint/shape
- `stores/hotels.ts` — filters `/provinces`, `/themes`, `/surroundings`, and `/hotels` query params

### Notes
- Graceful loading/empty states and small animations (shake on login error).
- i18n locales: **nl** and **en** with a simple `LanguageSwitcher`.
- Mock data in `/public/mock/hotels.json` is used if the API is unreachable.
- Auth middleware redirects to `/login` when unauthenticated.
- Keep code simple and typed for readability.
