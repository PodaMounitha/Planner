# Frontend (Vite + React)

## Dev
- `npm install`
- `npm run dev`

## API configuration
All API calls go through `src/lib/axios.js`.

- Local dev defaults to `http://localhost:5001/api`
- Production defaults to same-origin `/api` (when the backend serves the frontend)
- If deploying frontend and backend as separate services, set:
	- `VITE_API_URL=https://<your-backend>.onrender.com`
