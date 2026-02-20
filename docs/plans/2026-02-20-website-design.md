# SV de Lekschutters — Website Design

## Overview

A modern, warm, and welcoming website for SV de Lekschutters, a shooting sports club in Nieuwpoort, Netherlands. Replaces the current basic site with a clean 5-page Astro site deployed on Cloudflare Pages.

## Goals

- Modern, professional design with a warm "gezellig" feel
- Same content as current site, better organized
- Dutch only
- Club identity colors: navy blue, red, white (based on existing logo/crest)

## Tech Stack

- **Framework**: Astro (static site)
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages
- **Contact form**: Cloudflare Workers (sends to bestuur@delekschutters.nl)
- **Version control**: Git repository

## Site Structure

### 1. Home (/)

Long-scroll landing page:

- **Hero section**: Full-width warm club photo (bar or kantine), club name + tagline "Schietvereniging in Nieuwpoort sinds 1966"
- **Quick info bar**: Opening hours (Ma 19:30-22:30), location (Singel 5, Nieuwpoort), email
- **Over ons teaser**: Short paragraph about the club with "Lees meer" link
- **Eerstvolgende evenementen**: Next 3 upcoming events from agenda
- **Lid worden? CTA**: Warm invitation section linking to contact page
- **Footer**: Address, email, K.N.S.A. mention, copyright

### 2. Over ons (/over-ons)

- **Onze geschiedenis**: Club history — founded 29 sept 1966, royal approval 26 nov 1977, ~100 active members
- **Wat we doen**: Disciplines (pistool, revolver, karabijn, geweer), klein kaliber & groot kaliber, service pistol, competities
- **Het bestuur**: Board members table (Voorzitter, Vicevoorzitter, Secretaris, Penningmeester, Schietinstructeur, Wedstrijdcommissie)
- **Foto's**: Gallery with club photos (bar mirror, banner, kantine)

### 3. Agenda & Mededelingen (/agenda)

- **Agenda**: Event calendar for current year — competitions, theme nights, BBQ, Nieuwjaarsreceptie
- **Mededelingen**: Announcements section
- Chronological card/list layout

### 4. Reglementen (/reglementen)

- **Lid worden**: Membership process (introduction, VOG, aspirant-lid, etc.)
- **Regels & veiligheid**: Club rules, safety regulations, code of conduct
- **Kosten**: Membership costs overview (K.N.S.A. + club contributions)
- **Wapenbezit**: Own weapon acquisition process
- **Documenten**: Downloadable forms (WM32, VOG)
- Organized with expandable accordion sections to avoid wall of text

### 5. Contact (/contact)

- **Contact formulier**: Name, email, subject, message — powered by Cloudflare Workers, sends to bestuur@delekschutters.nl
- **Adres & kaart**: Singel 5, 2965BC Nieuwpoort with embedded map
- **Openingstijden**: Maandag 19:30 – 22:30 + announced events
- **E-mail**: bestuur@delekschutters.nl

## Visual Design

- **Primary color**: Deep navy blue (#1e3a5f or similar)
- **Accent color**: Red (#c82333 or similar, from club crest)
- **Background**: White with warm off-white sections
- **Text**: Dark gray for readability
- **Typography**: Clean sans-serif (Inter or system fonts)
- **Images**: Club photos used generously — bar mirror, banner, kantine
- **Components**: Rounded corners, card-based layouts, generous whitespace
- **Responsive**: Mobile-first, hamburger nav on small screens

## Navigation

Sticky top nav: Logo + "SV de Lekschutters" | Home | Over ons | Agenda | Reglementen | Contact

## Available Assets

- `bar-spiegel-1536x1015.jpg` — Mirror with club name in gothic lettering
- `de-muur-1536x722.jpg` — Club banner with full coat of arms
- `P1280301-1536x1024.jpg` — Bar/kantine interior
- Club logo (from current site header — small icon with red/blue diagonal)
