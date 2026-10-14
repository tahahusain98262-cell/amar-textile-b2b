# Amar Textile B2B Portal & Event Fabric Catalogue

A modernized, editorial B2B textile and event-fabric catalogue for **Amar Textile (Surat, Gujarat)**, inspired by the high-craft typography, spacing, and mobile-first experience of modern editorial trade portals.

---

## 1. Verified Business Profile

All facts and identities are verified directly against official corporate records and the reference website ([https://www.amartextilesurat.com/](https://www.amartextilesurat.com/)):

- **Business Name:** Amar Textile (Tent Clothes Manufacturer)
- **Proprietor:** Mr. Amar Sewani
- **Year of Establishment:** 1992
- **Headquarters / Showroom:** Shop No. 2073, 2nd Floor, Lift No. 4, Shree Kuberji World Market, Near Bharat Cancer Hospital, Surat - 395010, Gujarat, India
- **Direct Sales / Helpline:** `08045802154` (`+918045802154`)
- **Nature of Business:** Manufacturer, Supplier, Wholesaler/Distributor, Trader & OEM Partner
- **Affiliation:** Life Member of Southern Gujarat Chamber of Commerce and Industry (SGCCI)
- **Specializations:** Premium Lycra (22 & 26 Gauge), Taiwan digital print fabrics, Roto fabrics, readymade samiyana ceilings, parda / sidewall backdrops, 4-way stretch chair covers, banquet round table linens, jhalar borders, velvet mirror embroidery, decorative panels, tikli sparkle textiles, artificial flowers, canopy/wedlock entry gates, and sarees. Ready stock for pan-India bulk dispatch.

---

## 2. Key Architecture & Features

- **Official Brand Identity:** Official Amar Textile logo recovered, downloaded locally (`/images/amar-textile-logo.jpg`), and rendered with aspect-ratio preservation in header and footer.
- **Editorial Design System:** Forest green (`#0d211a`), warm ivory (`#fbf8f2`), and restrained brass (`#b89146`) accents, paired with *Playfair Display*, *Cinzel*, and *Plus Jakarta Sans*.
- **Interactive Catalogue:** 16 verified event-decor categories and 51 authentic products with instant keyword search and category filtering.
- **Product Details Modal:** Full product specifications, origin badges, and quick-enquire triggers.
- **Wholesale Quotation System:** Interactive quote modal pre-filling selected products and categories with validated submission receipt and direct one-tap call/email fallback channels.
- **Mobile-First Responsiveness:** Optimized for 320px–430px mobile viewports with collapsible navigation drawer and persistent bottom action bar (`Call Amar Textile` + `Request Quote`).
- **No-Broken-Images Policy:** 100% locally stored images in `public/images/`. Every reference verified against files on disk with zero broken images and non-looping fallback handlers.

---

## 3. Asset Inventory

- `public/images/amar-textile-logo.jpg` — Official company logo
- `public/images/hero-banner-1.jpg` to `hero-banner-4.jpg` — Authentic mill showcase banners
- `public/images/categories/*.jpg` — 16 category cover photos
- `public/images/products/*.jpg` — 48 authentic product photos
- `public/images/*.svg` — Vector fallback placeholders
- `src/data/assetManifest.json` — Complete asset verification registry

---

## 4. Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 5. Deployment Instructions (GitHub & Vercel)

### Push to a New GitHub Repository

```bash
# 1. Initialize git (if not already done)
git init

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "Initial Amar Textile B2B portal release"

# 4. Rename default branch to main
git branch -M main

# 5. Add your new GitHub repository remote (replace <NEW_REPOSITORY_URL>)
git remote add origin <NEW_REPOSITORY_URL>

# 6. Push to GitHub
git push -u origin main
```

### Deploy on Vercel

1. Log in to [Vercel](https://vercel.com/) and click **"Add New..." > "Project"**.
2. Select your newly pushed `amar-textile-b2b` repository.
3. In **Build and Output Settings**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**.
5. Once deployed, open the public production URL in a private browser window to confirm everything loads instantly. Ensure Vercel Deployment Protection does not require a login for the public production domain.
