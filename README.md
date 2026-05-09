# PhotoProjects

Piattaforma per l'ideazione, pianificazione e gestione di progetti fotografici.

## Stack

- **Frontend**: Vue 3 + Vite + TypeScript
- **Backend / DB**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: OpenAI GPT-4o
- **Moodboard**: Pinterest API v5
- **i18n**: vue-i18n (IT + EN)

## Moduli

| Modulo | Percorso |
|---|---|
| Dashboard | `/dashboard` |
| Progetti | `/projects` |
| Moodboard | `/projects/:id/moodboard` |
| Brief & Offerta | `/projects/:id/brief` |
| Budget | `/projects/:id/budget` |
| Contatti | `/contacts` |

## Setup

```bash
cp .env.example .env
# Compila le variabili in .env con le tue credenziali

npm install
npm run dev
```

## Database

Esegui `supabase/schema.sql` nel SQL Editor di Supabase per inizializzare lo schema.

## Variabili d'ambiente richieste

| Variabile | Descrizione |
|---|---|
| `VITE_SUPABASE_URL` | URL del progetto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Anon key Supabase |
| `VITE_OPENAI_API_KEY` | API key OpenAI |
| `VITE_PINTEREST_CLIENT_ID` | App ID Pinterest |
| `VITE_PINTEREST_REDIRECT_URI` | Redirect URI per OAuth Pinterest |

## Comandi

```bash
npm run dev       # Dev server (http://localhost:5173)
npm run build     # Build produzione
npm run lint      # ESLint
npm run format    # Prettier
```
