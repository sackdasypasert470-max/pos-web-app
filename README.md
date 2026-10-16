# POS Web App (MVP)

This is a simple demo POS web app (Next.js) scaffold created for sackdasypasert470-max/pos-web-app.

Features included in this initial commit:
- Customer-facing product listing, product detail, cart, checkout
- Checkout supports COD and Bank QR option (QR image placeholder + slip upload field)
- Simple Geolocation "Get My Location" that fills the address/lat-lng and shows a Google Maps link (placeholder API key)
- Admin area (login: admin / admin) with product list + add/delete via JSON file backend
- Simple API routes that read/write JSON files in /data for demo persistence

How to run locally
1. Install dependencies: npm install
2. Run dev server: npm run dev
3. Open http://localhost:3000

Notes and next steps
- This is a demo scaffold. Image uploads and production-ready authentication are not implemented yet.
- To use the Phetsarath OT font, upload the font files to public/fonts/ and follow the README in that folder.
- To enable Google Maps embed with a real API key, add the key to the Google Maps iframe in pages/checkout.js.

