# Planner

## Local development

### Backend
- From repo root: `npm run start` (starts backend)
- Or: `cd backend && npm run dev`

Backend env (local): create `backend/.env` with:
- `MONGO_URI=...`
- `PORT=5001`

### Frontend
- `cd frontend && npm run dev`

The frontend uses a shared axios client in `frontend/src/lib/axios.js`.

## Render deployment

### Option A (single Render Web Service: backend serves frontend)
This repo is set up to deploy as one service (API + static frontend).

- Build Command: `npm run build`
- Start Command: `npm start`

Render env vars:
- `MONGO_URI` (required)
- `NODE_ENV=production`
- `PORT` is provided by Render automatically

### Option B (separate services: Static Site frontend + Web Service backend)

Backend (Web Service):
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

Set backend env vars:
- `MONGO_URI` (required)
- `NODE_ENV=production`
- `CORS_ORIGIN=https://<your-frontend>.onrender.com` (required for cross-origin calls)

Frontend (Static Site):
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

Set frontend env vars (build-time):
- `VITE_API_URL=https://<your-backend>.onrender.com`