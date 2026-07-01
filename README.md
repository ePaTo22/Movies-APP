# CineStack

A polished movie discovery portfolio project built with Next.js, TypeScript, Tailwind CSS, and TMDb-ready API routes.

## Getting Started

Use Node 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. If that port is busy, Next.js will print the available port.

## TMDb Credentials

The app works without credentials using curated fallback data. To enable live TMDb search and trending movies, add your free TMDb credentials to `.env`:

```bash
# Token de acceso de lectura a la API
TMDB_BEARER_TOKEN=replace_with_your_read_access_token

# Clave de la API
TMDB_API_KEY=replace_with_your_api_key
```

The read access token is preferred. The API key is supported as a fallback.

Never commit `.env`; it is ignored by Git.
