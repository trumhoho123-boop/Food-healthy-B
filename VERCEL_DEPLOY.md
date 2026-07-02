# Deploy to Vercel

## Project settings

- Framework Preset: `Vite`
- Root Directory: `Food healthy`
- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json` already rewrites:

- `/api/*` to the Render backend at `https://food-healthy-b.onrender.com`
- all other routes to `index.html`

## Environment variables

Add these variables in Render for the backend service:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key
```

Leave `VITE_API_BASE_URL` empty on Vercel. The frontend will call `/api/...`, and Vercel will forward it to Render.

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
