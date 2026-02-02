# Online Community Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Launch a coming-soon waitlist site and automation that delivers Discord + Learn+ access after purchase, using a no-page-builder stack.

**Architecture:** Static HTML/CSS/JS site hosted on GitHub Pages with GTM for tracking. ThriveCart handles checkout. Ottokit automates post-purchase access (Encharge tags + Discord role + Learn+ access). Discord hosts community. Encharge runs email sequences.

**Tech Stack:** HTML/CSS/JS, Google Tag Manager, GitHub Pages, ThriveCart, ThriveCart Learn+, Encharge, Ottokit, Discord

---

### Task 1: Create static site structure + coming-soon page

**Files:**
- Create: `index.html`
- Create: `thank-you.html`
- Create: `assets/css/main.css`
- Create: `assets/js/main.js`

**Step 1: Create base folders and files**
- Create `assets/`, `assets/css/`, `assets/js/` and the files above.

**Step 2: Write minimal `index.html` (coming-soon waitlist)**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Funnels On The Fly - Coming Soon</title>
    <link rel="stylesheet" href="assets/css/main.css" />
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <p class="eyebrow">Coming soon</p>
        <h1>No more dependency on page builders.</h1>
        <p class="subhead">Build sales funnels with clean HTML/CSS/JS and full ownership.</p>
      </section>

      <section class="value">
        <h2>What you get</h2>
        <ul>
          <li>Templates and guidance for code-first funnels</li>
          <li>Discord community and support</li>
          <li>Learn+ lessons and walkthroughs</li>
        </ul>
      </section>

      <section class="waitlist">
        <h2>Join the waitlist</h2>
        <p>Get early access and launch updates.</p>
        <!-- Replace the form below with the Encharge embed code -->
        <form id="waitlist-form">
          <input type="email" name="email" placeholder="you@email.com" required />
          <button type="submit">Join waitlist</button>
        </form>
        <p class="fineprint">Paid access opens after 1,000 waitlist signups.</p>
      </section>
    </main>
    <script src="assets/js/main.js"></script>
  </body>
</html>
```

**Step 3: Write minimal `thank-you.html`**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Welcome to the Community</title>
    <link rel="stylesheet" href="assets/css/main.css" />
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <h1>You're in!</h1>
        <p>Use the links below to get started.</p>
      </section>
      <section class="links">
        <a class="cta" href="{{DISCORD_INVITE_URL}}">Join Discord</a>
        <a class="cta secondary" href="{{LEARN_PLUS_URL}}">Access Learn+</a>
      </section>
    </main>
  </body>
</html>
```

**Step 4: Write minimal CSS and JS**
```css
/* assets/css/main.css */
body { font-family: "Georgia", serif; margin: 0; color: #1f2328; background: #f8f6f1; }
.page { max-width: 840px; margin: 0 auto; padding: 48px 20px; }
.hero h1 { font-size: 44px; margin: 12px 0; }
.cta { display: inline-block; margin: 8px 12px 0 0; padding: 12px 18px; background: #1f2328; color: #fff; text-decoration: none; }
.cta.secondary { background: #6a5d4d; }
```

```js
// assets/js/main.js
document.addEventListener("submit", (event) => {
  if (event.target && event.target.id === "waitlist-form") {
    // Encharge embed will handle submission; this is for GTM event only.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "waitlist_submit" });
  }
});
```

**Step 5: Quick local preview**
Run: `python -m http.server` from project root
Expected: `index.html` loads and shows the coming-soon page.

---

### Task 2: Add GTM container snippets

**Files:**
- Modify: `index.html`
- Modify: `thank-you.html`

**Step 1: Insert GTM in `<head>`**
Paste the GTM head snippet with your container ID (e.g., `GTM-XXXXXXX`).

**Step 2: Insert GTM `<noscript>` after `<body>`**
Paste the GTM body snippet.

**Step 3: Verify GTM loads**
Open the page in browser and use GTM Preview mode to confirm container is detected.

---

### Task 3: Configure Encharge waitlist + emails

**Files:**
- Modify: `index.html` (replace placeholder form)

**Step 1: Create Encharge list/tag**
- Create a tag: `waitlist`.
- Create a basic confirmation email: "You're on the waitlist".

**Step 2: Create Encharge waitlist form**
- Build a simple form in Encharge and copy the embed code.

**Step 3: Replace placeholder form**
- Replace the `#waitlist-form` with Encharge embed code in `index.html`.

**Step 4: Verify capture**
- Submit a test email; confirm the contact appears in Encharge with the `waitlist` tag.

---

### Task 4: Configure Discord community structure

**Files:**
- None (platform setup)

**Step 1: Create server and roles**
- Create server: `Funnels On The Fly`.
- Create role: `Member`.

**Step 2: Create channels**
- `#announcements` (read-only)
- `#introductions`
- `#wins`
- `#ask-for-help`
- `#content-drops`

**Step 3: Create an invite link**
- Generate an invite link for members (store for `thank-you.html`).

---

### Task 5: Configure ThriveCart product + Learn+

**Files:**
- Modify: `thank-you.html`

**Step 1: Create ThriveCart product**
- Single paid tier with access to Discord and Learn+.
- Set the success/thank-you URL to `thank-you.html` on GitHub Pages.

**Step 2: Configure Learn+**
- Create course shell and modules.
- Generate the Learn+ access URL (store for `thank-you.html`).

**Step 3: Update `thank-you.html` URLs**
- Replace `{{DISCORD_INVITE_URL}}` and `{{LEARN_PLUS_URL}}`.

---

### Task 6: Configure Ottokit automations

**Files:**
- None (platform setup)

**Step 1: Purchase automation**
- Trigger: ThriveCart purchase event.
- Actions:
  - Add Encharge tags: `member`, `paid`.
  - Grant Discord role: `Member`.
  - Send Learn+ access email (or confirm access link).

**Step 2: Refund/cancel automation**
- Trigger: ThriveCart refund/cancel event.
- Actions:
  - Remove Encharge tags: `member`, `paid`.
  - Remove Discord role: `Member`.

**Step 3: Verify automations**
- Run a test purchase in ThriveCart sandbox; confirm Discord role, Encharge tags, and Learn+ email.

---

### Task 7: Tracking events + conversions

**Files:**
- Modify: `assets/js/main.js`

**Step 1: Add click tracking**
```js
document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href") || "";
  if (href.includes("discord")) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "discord_click" });
  }
  if (href.includes("learn")) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "learn_click" });
  }
});
```

**Step 2: Configure GTM triggers**
- Create triggers for `waitlist_submit`, `discord_click`, `learn_click`.

**Step 3: Verify in GTM Preview**
- Confirm events fire when submitting the form and clicking links.

---

### Task 8: Deploy to GitHub Pages

**Files:**
- All site files

**Step 1: Initialize git repo and push**
Run:
```bash
git init
git add .
git commit -m "chore: initial community landing"
```

**Step 2: Create GitHub repo + enable Pages**
- Push to GitHub.
- Enable Pages from the `main` branch.

**Step 3: Verify live site**
- Visit the GitHub Pages URL and confirm `index.html` renders.

---

### Task 9: Launch switch after 1,000 waitlist signups

**Files:**
- Modify: `index.html`

**Step 1: Monitor waitlist count**
- In Encharge, monitor contacts tagged `waitlist`.

**Step 2: Switch CTA to ThriveCart**
- Replace waitlist section with a “Join Now” CTA linking to ThriveCart checkout.

**Step 3: Notify the waitlist**
- Send launch email sequence from Encharge.

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-02-02-online-community.md`.

Two execution options:

1. Subagent-Driven (this session) — I dispatch a fresh subagent per task and review between tasks.
2. Parallel Session (separate) — Open a new session and execute with superpowers:executing-plans.

Which approach?
