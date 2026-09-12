# Rashmika's Portfolio

A single-page portfolio site. No build tools, no installs — just HTML, CSS and a
tiny bit of JavaScript, so it opens straight in a browser and uploads to GitHub
Pages with zero setup.

## Opening it locally

Double-click `index.html` — that's it. It'll open in your default browser.

## Folder guide

```
portfolio/
├── index.html                       ← the whole site (edit text/content here)
├── css/
│   ├── style.css                     ← main site styling
│   └── certs.css                     ← styling for the certificate pages
├── js/
│   └── script.js                     ← nav menu, scroll-reveal, copy buttons, back-to-top
├── certs/                            ← one small page per certificate/degree
│   ├── all.html                       ← "view all certificates" index
│   ├── bsc-honours.html
│   ├── bsc-applied-chemistry.html
│   ├── power-bi-essentials.html
│   ├── power-bi-dashboards.html
│   ├── haccp-training.html
│   ├── iso-22000.html
│   ├── reporting-analytics-guild.html
│   ├── data-science-foundations.html
│   ├── business-analytics-foundations.html
│   ├── microsoft-cloud-fundamentals.html
│   ├── mta-database-fundamentals.html
│   ├── career-skills-data-analytics.html
│   ├── excel-2019.html
│   ├── data-science-analytics-highlights.html
│   └── white-belt.html
└── assets/
    ├── rashmika-photo.jpg             ← hero photo (cropped, centered on her face)
    ├── rashmika-photo-original.jpg    ← the original uncropped photo, kept as a spare
    └── certs/                         ← certificate/CV PDFs (+ generated PNG previews)
```

## Adding or swapping a certificate

Each page in `certs/` is already wired up to look for a specific PDF/PNG filename.
Save a new certificate into `assets/certs/` using the same filename shown on
its page (search the `<img>` and `<a class="dl">` tags in that file) and it'll
appear automatically — no code changes needed. Until a file is added, that
certificate's page shows a friendly "not added yet" placeholder instead of
breaking.

Want a different set of featured certificates on the homepage? In `index.html`,
find the **Certifications** section (search for `id="certifications"`) and
copy/edit one of the `<a class="certcard">` blocks — then use one of the files
in `certs/` as a starting point for the new page, and add a matching card to
`certs/all.html` too.

## The CV download

The "Download CV" button on the homepage links to `assets/certs/rashmika-moodley-cv.pdf`.
That file is intentionally trimmed to just the 3 real CV pages — her degree
certificate, National Senior Certificate, and publication screenshots were
removed from it (those live as their own pages elsewhere on the site, and the
National Senior Certificate shows a South African ID number that should never
be public). If you replace this PDF with a fresh export of her CV, make sure
any ID-bearing pages are stripped out first.

## ⚠️ Before you upload anything publicly

- Her **ID number** must never appear on the public site. It's visible on her
  National Senior Certificate — don't add that document as a downloadable file.
- The site currently shows her **email, phone number and LinkedIn** publicly
  in the Contact section (this was a deliberate choice — no personal reference
  contact details are included). Double-check she's comfortable with the phone
  number being public before this goes live; it's easy to remove one contact
  row in `index.html` if not (search for `id="contact"`).

## Editing content

Everything text-based lives in `index.html` — open it in any text editor
(Notepad, VS Code, etc.) and search for the section you want to change:

- `id="about"` — the bio text, education and publications
- `id="skills"` — skill tags and the career timeline
- `id="work"` — the four project cards
- `id="certifications"` — certificate cards/links
- `id="contact"` — email, phone, LinkedIn, location

Colors and fonts are all defined once at the top of `css/style.css` under `:root`
if you ever want to tweak the palette.

## Uploading to GitHub (so you can publish later)

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Click the **+** in the top right → **New repository**. Name it something like
   `portfolio` and click **Create repository**.
3. On the new repo's page, click **uploading an existing file**.
4. Drag the entire contents of this `portfolio` folder (not the folder itself —
   the files and subfolders inside it) into the upload box.
5. Scroll down and click **Commit changes**.

## Publishing with GitHub Pages (whenever you're ready — not required yet)

1. In your repo, go to **Settings → Pages**.
2. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
3. GitHub will give you a live URL (usually `https://yourusername.github.io/portfolio/`)
   within a minute or two.
4. Once you have that URL, open `index.html` and update the `og:image` /
   `twitter:image` meta tags near the top of the file to use the full URL
   (e.g. `https://yourusername.github.io/portfolio/assets/rashmika-photo.jpg`)
   so link previews on LinkedIn/WhatsApp/Slack pick up the photo correctly.

That's optional and reversible — the site works perfectly well just sitting in
a GitHub repo (or even just as a folder on your computer) until you're ready
for it to be public.
