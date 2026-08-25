# Netlify deployment

Netlify hosts the static shell only. The full Kryzonix's Playground application also requires the FastAPI backend because chat, authentication, model discovery, uploads, and settings use `/api/*` routes.

1. Deploy the repository's FastAPI app to a Python-capable host (Docker, Render, Railway, Fly.io, or a VPS). Keep authentication enabled and configure its environment variables there.
2. In Netlify, set `BACKEND_URL` to the HTTPS URL of that backend.
3. Add an API proxy redirect before the catch-all rule in `netlify.toml`:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend.example.com/api/:splat"
  status = 200
  force = true
```

Replace the example hostname with the backend URL. Do not put provider API keys in Netlify frontend code or committed files. Add the OpenRouter/Oxalpha endpoint from the app's admin model settings after the backend is reachable.
