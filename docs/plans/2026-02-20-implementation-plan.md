# SV de Lekschutters — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 5-page Astro website for SV de Lekschutters shooting club, deployed on Cloudflare Pages with a Cloudflare Workers contact form.

**Architecture:** Static Astro site with Tailwind CSS 4.x theming via `@theme` directive. Component-based layout with shared header/footer. Contact form posts to a Cloudflare Workers function that sends email via MailChannels.

**Tech Stack:** Astro 5.x, Tailwind CSS 4.x (`@tailwindcss/vite`), Cloudflare Pages (static), Cloudflare Workers (contact form)

---

## Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/styles/global.css`

**Step 1: Initialize Astro project**

Run from `/Users/martinbal/svdelekschutters`:

```bash
npm create astro@latest . -- --template minimal --no-install --no-git
```

If it complains about existing files, accept overwrite for config files only. The existing `docs/` and images should remain.

**Step 2: Install dependencies**

```bash
npm install astro @tailwindcss/vite tailwindcss @astrojs/sitemap
```

**Step 3: Configure Astro**

Update `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://delekschutters.nl',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 4: Create global.css with theme**

Create `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --color-navy-50: #f0f4f8;
  --color-navy-100: #d9e2ec;
  --color-navy-200: #bcccdc;
  --color-navy-300: #9fb3c8;
  --color-navy-400: #829ab1;
  --color-navy-500: #627d98;
  --color-navy-600: #486581;
  --color-navy-700: #334e68;
  --color-navy-800: #243b53;
  --color-navy-900: #102a43;

  --color-red-500: #c82333;
  --color-red-600: #a71d2a;
  --color-red-700: #85182a;

  --color-warm-50: #faf8f5;
  --color-warm-100: #f5f0eb;
  --color-warm-200: #e8ddd3;

  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-sans);
    color: #1a202c;
    background-color: #ffffff;
  }
}
```

**Step 5: Move images to public directory**

```bash
mkdir -p public/images
cp bar-spiegel-1536x1015.jpg public/images/
cp de-muur-1536x722.jpg public/images/
cp P1280301-1536x1024.jpg public/images/
```

**Step 6: Update .gitignore**

Ensure `.gitignore` includes:

```
node_modules/
dist/
.astro/
.wrangler/
.DS_Store
Scherm*
```

**Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: Astro dev server starts at localhost:4321.

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Tailwind CSS theme"
```

---

## Task 2: Base layout + header + footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/pages/index.astro` (placeholder)

**Step 1: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>

<style>
  @import '../styles/global.css';
</style>
```

Note: Import Header and Footer components at the top of the frontmatter.

**Step 2: Create Header component**

Create `src/components/Header.astro` with:
- Sticky nav bar with white background and subtle shadow
- Left: club logo placeholder + "SV de Lekschutters"
- Right: nav links (Home, Over ons, Agenda, Reglementen, Contact)
- Mobile: hamburger button that toggles a slide-down menu
- Active page highlighting using `Astro.url.pathname`

**Step 3: Create Footer component**

Create `src/components/Footer.astro` with:
- Navy-900 background, white text
- Three columns: Contact info (address, email), Openingstijden, Links (nav + K.N.S.A.)
- Copyright line at bottom: "© 2026 SV de Lekschutters. Alle rechten voorbehouden."

**Step 4: Create placeholder index page**

Create `src/pages/index.astro` that uses BaseLayout with title "SV de Lekschutters" and a simple heading.

**Step 5: Verify in browser**

```bash
npm run dev
```

Check: header renders with nav, footer renders, page is responsive.

**Step 6: Commit**

```bash
git add src/
git commit -m "feat: add base layout with header and footer"
```

---

## Task 3: Homepage

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/InfoBar.astro`
- Create: `src/components/AboutTeaser.astro`
- Create: `src/components/UpcomingEvents.astro`
- Create: `src/components/CtaBanner.astro`
- Modify: `src/pages/index.astro`

**Step 1: Build Hero section**

Create `src/components/Hero.astro`:
- Full-width section with `P1280301-1536x1024.jpg` as background (kantine photo — warm, inviting)
- Dark overlay for text readability
- Large white heading: "SV de Lekschutters"
- Subtitle: "Schietvereniging in Nieuwpoort sinds 1966"
- CTA button: "Meer over onze vereniging" linking to /over-ons

**Step 2: Build InfoBar**

Create `src/components/InfoBar.astro`:
- Navy background strip with 3 items in a row
- Clock icon + "Maandag 19:30 - 22:30"
- Map pin icon + "Singel 5, Nieuwpoort"
- Mail icon + "bestuur@delekschutters.nl"
- Use simple inline SVG icons or Unicode symbols

**Step 3: Build AboutTeaser**

Create `src/components/AboutTeaser.astro`:
- White background section with warm-50 accent
- Two columns: text left, `bar-spiegel-1536x1015.jpg` right
- Short paragraph about the club (from "Onze Vereniging" content)
- "Lees meer over ons" link to /over-ons

**Step 4: Build UpcomingEvents**

Create `src/components/UpcomingEvents.astro`:
- Section title: "Agenda"
- Show next 3-4 events as cards (date badge + event name)
- Events hardcoded from 2025 agenda data
- "Bekijk volledige agenda" link to /agenda

**Step 5: Build CtaBanner**

Create `src/components/CtaBanner.astro`:
- Warm background section (warm-100 or navy-50)
- Heading: "Interesse in de schietsport?"
- Short welcoming text about trying the sport
- Button: "Neem contact op" linking to /contact

**Step 6: Assemble homepage**

Update `src/pages/index.astro` to compose all sections: Hero, InfoBar, AboutTeaser, UpcomingEvents, CtaBanner.

**Step 7: Verify in browser**

Check all sections render, images load, responsive layout works.

**Step 8: Commit**

```bash
git add src/
git commit -m "feat: build homepage with hero, info bar, about teaser, events, CTA"
```

---

## Task 4: Over ons page

**Files:**
- Create: `src/pages/over-ons.astro`

**Step 1: Build Over ons page**

Create `src/pages/over-ons.astro` with BaseLayout, containing these sections:

1. **Page header**: "Over ons" heading with subtle navy background
2. **Onze geschiedenis**: Founded 29 sept 1966, royal approval 26 nov 1977, history text from Nostalgie page. Include `de-muur-1536x722.jpg` (club banner photo).
3. **Wat we doen**: Disciplines — pistool, revolver, karabijn, geweer. Klein kaliber (.22) and groot kaliber. Service pistol competitions. Internal club competition. ~100 active members.
4. **Het bestuur**: Table/card layout with board members:
   - Voorzitter: Geert-Jan Hultermans
   - Vicevoorzitter: Cornel v/d Vlist
   - Secretaris: Melanie Scheurwater
   - Penningmeester: Leon van Gelder
   - Schietinstructeur: Arend Ommering
   - Wedstrijdcommissie: Pascal Scheurwater / Arend Ommering
   - Email: bestuur@delekschutters.nl
5. **Foto's**: Simple image gallery with the 3 club photos

**Step 2: Verify in browser**

Navigate to /over-ons, check all sections, images, responsive.

**Step 3: Commit**

```bash
git add src/pages/over-ons.astro
git commit -m "feat: add Over ons page with history, disciplines, board, photos"
```

---

## Task 5: Agenda page

**Files:**
- Create: `src/pages/agenda.astro`

**Step 1: Build Agenda page**

Create `src/pages/agenda.astro` with BaseLayout, containing:

1. **Page header**: "Agenda & Mededelingen"
2. **Agenda 2025**: Event list as cards with date and event name:
   - 14 feb — Service pistool competitie
   - 14 mrt — Thema wedstrijd
   - 11 apr — Service pistool competitie
   - 16 mei — Thema wedstrijd
   - 13 jun — Service pistool competitie
   - 1 aug — BBQ
   - 4 aug t/m 1 sep — Vereniging gesloten
   - 12 sep — Service pistool competitie
   - 17 okt — Service pistool competitie
   - 14 nov — Thema wedstrijd
   - 12 dec — Thema wedstrijd
   - 9 jan 2026 — Nieuwjaarsreceptie
3. **Info section**: "Alle wedstrijden beginnen om 19.30 uur. Service pistool wedstrijden worden geschoten in klein en groot kaliber."
4. **Mededelingen**: Placeholder section for announcements

Events data should be a simple array at the top of the frontmatter for easy editing by the club.

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add src/pages/agenda.astro
git commit -m "feat: add Agenda page with 2025 event calendar"
```

---

## Task 6: Reglementen page

**Files:**
- Create: `src/pages/reglementen.astro`
- Create: `src/components/Accordion.astro`

**Step 1: Build Accordion component**

Create `src/components/Accordion.astro`:
- Accepts `title` prop
- Uses `<details>/<summary>` HTML elements (no JS needed)
- Styled with Tailwind: border, rounded, padding, chevron indicator
- Slot for content

**Step 2: Build Reglementen page**

Create `src/pages/reglementen.astro` with BaseLayout, containing accordion sections:

1. **Lid worden** — The membership process: introduction (3x per 12 months), VOG application, board interview, K.N.S.A. registration, aspirant-lid period, training
2. **De opleiding** — Training with instructor, .22 weapons, 6-month evaluation, groot kaliber training
3. **Regels & veiligheid** — Safety rules, code of conduct, no alcohol before shooting, instructor supervision
4. **Kosten** — Cost overview table:
   - Inschrijfgeld K.N.S.A.: €42,50
   - Contributie K.N.S.A.: €42,50/jaar
   - Inschrijfgeld Lekschutters: €45,00
   - Contributie Lekschutters: €131,50/jaar
   - Transponder: €10,00 (eenmalig)
5. **Eigen wapen aanschaffen** — Requirements (1 year member, 18 shooting sessions, board approval, weapon safe), WM3 process, WM4 permit
6. **Documenten** — Download links for WM32 form and VOG form (as PDF files in `/public/documents/`)

Content is sourced from the "Woord Vooraf" PDF.

**Step 3: Verify in browser**

Check accordions open/close, content is readable, responsive.

**Step 4: Commit**

```bash
git add src/
git commit -m "feat: add Reglementen page with accordion sections"
```

---

## Task 7: Contact page with form

**Files:**
- Create: `src/pages/contact.astro`

**Step 1: Build Contact page**

Create `src/pages/contact.astro` with BaseLayout, containing:

1. **Page header**: "Contact"
2. **Two-column layout**:
   - Left: Contact form (naam, e-mail, onderwerp, bericht, verzend button)
   - Right: Contact info (address, email, opening hours) + embedded OpenStreetMap iframe for Singel 5, 2965BC Nieuwpoort
3. Form `action` points to `/api/contact` (Cloudflare Workers function, built in Task 8)
4. Form uses `method="POST"` with basic client-side validation (required fields)
5. Success/error state shown after submission (client-side JS: fetch POST, show message)

**Step 2: Verify in browser**

Check form renders, validation works, map displays, responsive layout.

**Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add Contact page with form and map"
```

---

## Task 8: Cloudflare Workers contact form handler

**Files:**
- Create: `functions/api/contact.js`

**Step 1: Create Cloudflare Pages Function**

Cloudflare Pages supports file-based routing for serverless functions in the `functions/` directory.

Create `functions/api/contact.js`:

```js
export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [
          { to: [{ email: 'bestuur@delekschutters.nl', name: 'SV de Lekschutters' }] },
        ],
        from: { email: 'noreply@delekschutters.nl', name: `${name} via website` },
        reply_to: { email: email, name: name },
        subject: subject || `Contactformulier: bericht van ${name}`,
        content: [
          {
            type: 'text/plain',
            value: `Naam: ${name}\nE-mail: ${email}\nOnderwerp: ${subject || '(geen)'}\n\nBericht:\n${message}`,
          },
        ],
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Er ging iets mis. Probeer het later opnieuw.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

Note: MailChannels free tier requires DNS SPF record setup for the domain. Alternative: use Cloudflare Email Workers or a simple email forwarding service. This can be configured after deployment.

**Step 2: Commit**

```bash
git add functions/
git commit -m "feat: add Cloudflare Workers contact form handler"
```

---

## Task 9: Cloudflare Pages setup + deploy

**Step 1: Create Cloudflare Pages project**

```bash
npx wrangler pages project create svdelekschutters
```

**Step 2: Test local build**

```bash
npm run build
```

Expected: Static files in `dist/` directory.

**Step 3: Test with Wrangler locally**

```bash
npx wrangler pages dev dist
```

Verify all pages work, contact form function responds.

**Step 4: Create GitHub repo and push**

```bash
gh repo create svdelekschutters --public --source=. --remote=origin --push
```

Or connect to Cloudflare Pages via dashboard for automatic deploys from git.

**Step 5: Commit any remaining config**

```bash
git add -A
git commit -m "chore: finalize build and deployment config"
```

---

## Task 10: Polish and final review

**Step 1: Cross-browser check**

Open in Safari, Chrome, Firefox. Check mobile responsiveness.

**Step 2: Lighthouse audit**

Run Lighthouse in Chrome DevTools. Target 90+ on Performance, Accessibility, SEO.

**Step 3: Content review**

- All Dutch text proofread
- All links work
- Images optimized and loading
- Contact form submits correctly
- Map shows correct location

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: polish and final adjustments"
```
