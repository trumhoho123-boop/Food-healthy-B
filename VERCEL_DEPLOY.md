# Deploy to Vercel

## Project settings

- Framework Preset: `Vite`
- Root Directory: `Food healthy`
- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json` already rewrites:

- `/api/*` to the Express serverless function in `api/index.js`
- all other routes to `index.html`

## Environment variables

Add these variables in Vercel Project Settings -> Environment Variables:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key
```

Leave `VITE_API_BASE_URL` empty when deploying frontend and API in the same Vercel project. The frontend will call `/api/...` automatically.

## Local development

Run the backend:

```bash
cd backend
npm install
npm run dev
```

Run the frontend in another terminal:

```bash
npm install
npm run dev
```

Vite proxies `/api` to `http://localhost:5000` locally.

## Note about `db.json`

`backend/db.json` is fine for local demo data. On Vercel, file writes are not persistent, so use Supabase for login, contacts, and product management data.
