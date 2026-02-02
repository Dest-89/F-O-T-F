# Draft: Online Community Plan

## Requirements (confirmed)
- Build an online community with an easy-to-maintain environment.
- Use HTML/CSS/JS for the marketing site.
- Use GTM for tracking.
- Host on GitHub (GitHub Pages).
- Use ThriveCart as cart processor.
- Use ThriveCart Learn+ for content hosting.
- Use Encharge for email marketing.
- Community platform: Discord.
- Automation tool: Ottokit.
- Membership tiers: single paid tier.
- Onboarding: provide both Discord and Learn+ links after purchase.
- Community promise: no more dependency on page builders for entrepreneur sales-funnel building tasks.
- Pricing: coming-soon style; deliver value first before paid launch.
- Value-first offer: waitlist only (email collection with early access updates).
- Paid pricing starts after 1000 waitlist signups.

## Technical Decisions
- Static marketing site with GTM embedded; ThriveCart handles checkout.
- Post-purchase automation handled via Ottokit.
- Ottokit automates full access (Encharge tags, Discord role/invite, Learn+ access delivery).

## Research Findings
- None yet.

## Open Questions
- None.

## Scope Boundaries
- INCLUDE: marketing site, checkout flow, automation for access, email onboarding.
- EXCLUDE: custom backend (unless required for Ottokit limitations).
