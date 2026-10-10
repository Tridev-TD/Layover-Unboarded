# Wander Onward

## Run locally

1. Copy `.env.example` to `.env` and replace `CONTACT_EMAIL` with a real contact address for OpenStreetMap requests.
2. In one terminal run `npm run server`.
3. In another terminal run `npm run dev`.
4. Open the Vite URL. The browser talks only to `/api`; OpenStreetMap and routing calls are made by the server.

For a production-style run, build the frontend with `npm run build`, then run `npm start`. The server serves `dist` as well as the API.

## Data providers

- **Nominatim / OpenStreetMap**: manual location and station geocoding. No key, but a descriptive User-Agent/contact and conservative caching are used.
- **Overpass API / OpenStreetMap**: nearby POIs and source-provided tags such as address and `opening_hours`.
- **OSRM**: walking route duration and distance.

Public endpoints are useful for development and low-volume use. For a production deployment, configure managed/commercial OSM-compatible geocoding, POI and routing services, respecting each provider’s usage policy. The server intentionally does not fabricate results when an upstream service is unavailable.

## Persistence

The current application persists progress, preferences and active quests in browser local storage, which works across refreshes on one device. For a multi-user deployment, apply [`database/schema.sql`](database/schema.sql) in Supabase/Postgres and connect an authenticated profile API using the server-only Supabase variables in `.env.example`. The schema includes row-level security; this repository does not claim that a database is active without those credentials.
