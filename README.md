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

## Persistence and Supabase setup status

**Supabase is not set up or connected yet.** The app currently saves progress, preferences and active quests in browser local storage, which works across refreshes on the same device. The database schema at [`database/schema.sql`](database/schema.sql) is provided as a starting point, but it has not been applied to a Supabase project and no live Supabase database should be assumed.

To enable Supabase later:
1. Create a Supabase project.
2. Apply `database/schema.sql` to its database.
3. Add the required Supabase settings to `.env` using the names documented in `.env.example`.
4. Implement and connect the authenticated profile/API flow.
5. Test authentication, data access and row-level security before deployment.

Until these steps are completed, the application uses local storage only; data is not synced between users or devices through Supabase.
