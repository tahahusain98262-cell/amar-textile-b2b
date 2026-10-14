# Antigravity Master Prompt — Amar Textile B2B Website

Act as a senior UI/UX designer, React engineer, asset-recovery specialist, and deployment QA engineer.

## Goal
Recreate and modernize https://www.amartextilesurat.com/ as a polished, mobile-first B2B textile and event-fabric catalogue, using the editorial polish, spacing, typography, and responsive quality of my previous Suratloom website as inspiration. This is a separate brand and project: do not copy Suratloom branding, logo, copy, assets, or business identity.

The original website has a wide catalogue that includes categories such as ceiling/samiyana designs, parda/sidewall designs, chair/table covers, jalar designs, Taiwan printed fabrics, embroidery fabrics, panel designs, tent fabrics, tikli fabrics, artificial flowers, canopy/wedlock, shade cards, sarees, readymade blouse pieces, entry gates and related event-decoration products. Inspect the actual live site and its product pages to verify the relevant catalogue and avoid inventing categories or claims.

## Must-follow workflow
1. Inspect the entire current project before changing anything. Preserve this project as a separate Amar Textile codebase.
2. Inspect the reference homepage, product listing pages, company profile, contact page, logo, navigation, category names, actual images, and any visible inquiry interactions.
3. Create a short audit report of the existing design and assets, then implement the finished site. Do not stop at a plan.
4. Keep the original Amar Textile logo from the official website if it can be retrieved and reused appropriately. Download it into the local project asset directory, preserve its aspect ratio, and use it in the header and footer. Do not redraw or substitute another brand logo. If it cannot be recovered, keep a clean text-based logo fallback and clearly report that manual logo upload is needed.
5. Recover original product images from the official site when technically possible and permitted. Save them locally in `public/images/products/` or `public/images/categories/` with descriptive filenames. Do not hotlink temporary/external image URLs.
6. Do not claim that generated or stock imagery is an original product photo. If original imagery is unavailable, use relevant legally usable placeholder visuals and mark them clearly for replacement by the owner.

## Design direction
Create a premium, editorial B2B experience inspired by the visual quality of Suratloom:
- Forest-green / deep-ink brand surfaces, warm ivory backgrounds, restrained brass accents.
- Refined serif display headings and readable modern sans-serif body text.
- Strong product photography, clear category hierarchy, consistent spacing, subtle borders and restrained motion.
- The website should feel like a real established textile supplier, not a generic template.
- Mobile-first: prioritize attractive product imagery, clear category browsing, and fast enquiry actions.

## Suggested homepage structure
- Announcement strip with a factual wholesale / bulk enquiry message.
- Responsive header using the original Amar Textile logo.
- Hero with a relevant textile/event-fabric image, clear headline, short factual supporting copy, and “Explore Collections” / “Request a Quote” actions.
- Featured categories using verified categories from the reference site.
- Best-selling / featured product grid using actual product names and images where available.
- About section using only verified facts from the official website.
- Quality / capabilities section only for claims confirmed on the official site.
- Strong bulk-enquiry callout.
- Contact panel with verified address and phone, map link if available, and inquiry form.
- Premium footer with logo, useful links, product categories and contact actions.
- Mobile sticky bottom actions for Call and WhatsApp only if a verified WhatsApp destination exists; do not fabricate one.

## Product catalogue requirements
- Centralize product/category data in `src/data/`.
- Add category filtering and search.
- Product cards must have accurate names and locally stored images.
- Use a product detail modal/page only if it improves the experience.
- Quote / enquiry actions should carry the selected product name into the message or form.
- Do not invent product prices, stock, MOQ, ratings, reviews, testimonials, production capacity, export markets, or certificates.
- Preserve spelling and meaning from the source while cleaning obvious presentation typos.

## No-broken-images policy — critical
- Never leave broken image icons in the final result.
- Use local image paths only for the final catalogue and hero.
- Check every image reference against the actual files on disk.
- For files in `public/`, reference them with root-relative paths such as `/images/products/example.jpg`.
- For imported files inside `src/`, use valid imports.
- Check filename capitalization exactly; deployment runs on a case-sensitive filesystem.
- Never use a developer's local absolute filesystem path.
- Add meaningful alt text.
- Use `object-fit: cover` or `contain` as appropriate.
- Lazy-load below-the-fold images, but do not lazy-load the main hero image unnecessarily.
- Add an image fallback that cannot loop or repeatedly trigger errors.
- If an original asset cannot be obtained, use the included local SVG placeholders from `public/images/` or add a relevant local placeholder. Never reference a nonexistent image.
- Create an asset manifest that maps every product/category to an existing local file.
- Before finishing, run a script or equivalent audit to verify every referenced local image exists.

## Technical requirements
- Use the existing React + Vite setup in this starter unless there is a clear blocker.
- Keep reusable components in `src/components/`, product data in `src/data/`, and CSS in `src/styles/`.
- No backend is required for the initial catalogue unless a real integration already exists.
- An inquiry form must not pretend to submit if there is no backend. Provide a working call/email or verified messaging fallback.
- Keep secrets out of source code.
- Use semantic HTML, accessible labels, keyboard-friendly controls, proper focus states, SEO title/description, and social metadata.
- Keep dependencies minimal.

## Mobile QA
Test 320, 360, 375, 390, and 430 px widths plus tablet and desktop.
Fix horizontal overflow, clipped headings, overlapping buttons, image distortion, tiny touch targets, modal overflow, and sticky CTA overlap with page content.

## Required checks before completion
1. Run `npm install` if necessary.
2. Run `npm run build` and fix every build error.
3. If browser preview is available, visually test desktop and mobile.
4. Verify hero, logo, every category/product image, contact links, search, filters, and enquiry actions.
5. Verify no image URL points to a missing file and no image relies on an external host.
6. Give a final report of files changed, asset sources, any original images/logo still needing manual input, build result, and deployment instructions.

## GitHub and Vercel instructions
Do not attempt to access my accounts or push changes without my action. Prepare the project so it is ready to push to a NEW repository named `amar-textile-b2b` (or another name I specify). Ensure `.gitignore` excludes `node_modules`, `dist`, and environment secrets. Do not put GitHub tokens or Vercel credentials in files. Explain the exact commands only after the project is ready:
- `git init`
- `git add .`
- `git commit -m "Initial Amar Textile website"`
- `git branch -M main`
- `git remote add origin <NEW_REPOSITORY_URL>`
- `git push -u origin main`
If Git is already initialized, inspect `git status` and `git remote -v` first; do not overwrite an existing remote blindly.
Then import the new repository into Vercel. Confirm Vite build command `npm run build` and output directory `dist`. Test the production URL in a private browser session. Keep deployment protection configured so the public production domain does not require Vercel login.

## Definition of done
A working, production-buildable, premium Amar Textile B2B website with the correct official logo where recoverable, locally stored image assets, responsive catalogue, functional inquiry paths, and no broken images. Do not claim success for any test not actually performed.