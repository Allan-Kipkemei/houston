# Gatsby — Website & Application Development
### Portfolio Website

---

## Running Locally

This is a single-file HTML website. No build tools, no npm, no frameworks needed.

### Option 1 — Just double-click (quickest)
1. Download the `gatsby-portfolio` folder to your computer
2. Open the folder
3. Double-click `index.html`
4. It opens in your browser — done ✅

> **Note:** Google Fonts require an internet connection to load. The site still works offline but will fall back to system fonts.

---

### Option 2 — Local server (recommended, fixes any font/CORS issues)

If you have **Python** installed (most Macs and Linux have it by default):

```bash
# Navigate into the folder
cd gatsby-portfolio

# Python 3
python3 -m http.server 3000

# Then open your browser at:
http://localhost:3000
```

If you have **Node.js** installed:
```bash
npx serve .
# Then open http://localhost:3000
```

If you have **VS Code**, install the **Live Server** extension, right-click `index.html` → *Open with Live Server*.

---

## Before You Publish

Update these placeholders in `index.html`:

| What | Where to find it | Replace with |
|------|-----------------|--------------|
| Email | Search `gatsby.techi@gmail.com` | Already set ✅ |
| Phone | Search `+254 102 542 643` | Already set ✅ |
| Calendly link | Search `calendly.com/your-username` | Your real Calendly URL |
| Portfolio images | `assets/images/` | Real client screenshots |
| Stats (28+ sites, etc.) | Hero section | Your real numbers |

---

## Connecting the Contact Form

The form currently shows a success message on submit but doesn't actually send emails. To make it real, sign up free at **[Formspree.io](https://formspree.io)**:

1. Create a free account
2. Create a new form → copy your Form ID (looks like `xpzvkrqb`)
3. In `index.html`, find the `<form>` tag and add:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
   ```
4. Remove the fake submit handler from the `<script>` at the bottom

---

## Calendly Setup

1. Sign up free at [calendly.com](https://calendly.com)
2. Create a **30-minute** event type called "Free Discovery Call"
3. Copy your Calendly link (e.g. `https://calendly.com/gatsby-techi/discovery`)
4. In `index.html`, search for `calendly.com/your-username` and replace with your real link

---

## Folder Structure

```
gatsby-portfolio/
├── index.html          ← The entire website (HTML + CSS + JS)
├── README.md           ← This file
├── netlify.toml        ← Optional config for Netlify static hosting
├── CUSTOM_DOMAIN.txt   ← Placeholder for your custom domain ideas
└── assets/
    ├── images/         ← Add your photos and screenshots here
    ├── css/            ← Reserved for future stylesheet splits
    └── js/             ← Reserved for future script splits
```

---

## Deploying to a Cool Domain

This site is a static HTML portfolio page, so the best way to launch it is with a static host and a custom domain.

### Recommended setup

- Frontend: GitHub Pages, Netlify, Vercel, Cloudflare Pages
- Contact form: use Formspree with `USE_BACKEND = false`, or deploy `backend/server.js` separately
- Custom domain: register a memorable name such as `gatsby.studio`, `gatsby.design`, `gatsby.dev`, `gatsby.rocks`, or `gatsby.site`

### Deploy to GitHub Pages

1. Initialize Git in this folder if you haven't already:
   ```bash
   cd "c:\Users\lenovo\Pictures\GATSBY"
   git init
   git add .
   git commit -m "Initial GitHub Pages deploy"
   ```
2. Push to GitHub on `main` or `master`.
3. GitHub Actions will automatically deploy the site to the `gh-pages` branch using `.github/workflows/gh-pages.yml`.
4. In your repository settings, enable GitHub Pages from the `gh-pages` branch and route it to the root.

### Custom domain with GitHub Pages

1. If you want a custom domain, create a `CNAME` file in the repo root containing only your domain name.
2. Add the same custom domain in your GitHub Pages settings.
3. Point your domain's DNS `A` records to GitHub Pages or follow the instructions GitHub provides.

### Quick static deploy (alternative)

1. Set `USE_BACKEND = false` in `index.html`
2. Replace `FORMSPREE_URL` with your actual Formspree form URL
3. Deploy the site root to Netlify or Vercel instead of GitHub Pages if you prefer

### Backend email server (optional)

1. In `backend/`, install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Copy `backend/.env.example` to `backend/.env` and fill in `GMAIL_USER` and `GMAIL_PASS`
3. Deploy the `backend/` folder to Render, Fly.io, Railway, or another Node host
4. Update `BACKEND_URL` in `index.html` to your deployed backend endpoint, for example:
   ```js
   const BACKEND_URL = 'https://your-backend.onrender.com/api/contact';
   ```

### Custom domain setup

- Use your host's domain management page
- Add your domain and follow DNS instructions
- Choose a brandable name like `gatsby.studio` or `gatsby.rocks`

> The easiest path to a very cool domain is: push to GitHub, enable Pages, and optionally add a `CNAME` for a custom domain.

---

## Contact
**gatsby.techi@gmail.com** · **+254 102 542 643**
