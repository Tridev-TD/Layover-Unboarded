# Wander Onward

## Run locally

1. Copy `.env.example` to `.env` and replace `CONTACT_EMAIL` with a real contact address for OpenStreetMap requests.
2. Run `npm run dev`. This now starts both the backend and Vite together.
3. Open the Vite URL. The browser talks only to `/api`; providers are called only by the server.

For a production-style run, build the frontend with `npm run build`, then run `npm start`. The server serves `dist` as well as the API.

## Recommended test setup

For the most reliable initial test, enter **Delhi** in both the **Departure Details** location field and the **Starting Point** field. Using the same city in both fields helps the app resolve locations and return valid nearby-place and quest results while testing. Once the flow works, try other locations.

## Data providers

- **Nominatim / OpenStreetMap**: manual location and station geocoding. No key, but a descriptive User-Agent/contact and conservative caching are used.
- **Overpass API / OpenStreetMap**: nearby POIs and source-provided tags such as address and `opening_hours`.
- **OSRM**: walking route duration and distance.
- **Google Maps (optional)**: set `PLACES_PROVIDER=google` and add `GOOGLE_MAPS_API_KEY` for Google place names, addresses, ratings, rating counts and photos. Google requires a Cloud project, Places API (New), Geocoding API, and billing; it is not an anonymous/free API.

Public endpoints are useful for development and low-volume use. For a production deployment, configure managed/commercial OSM-compatible geocoding, POI and routing services, respecting each provider’s usage policy. The server intentionally does not fabricate results when an upstream service is unavailable.

## Persistence

The current application persists progress, preferences and active quests in browser local storage, which works across refreshes on one device. For a multi-user deployment, apply [`database/schema.sql`](database/schema.sql) in Supabase/Postgres and connect an authenticated profile API using the server-only Supabase variables in `.env.example`. The schema includes row-level security; this repository does not claim that a database is active without those credentials.
