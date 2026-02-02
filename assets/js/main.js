document.addEventListener("submit", (event) => {
  if (event.target && event.target.id === "waitlist-form") {
    // Encharge embed will handle submission; this is for GTM event only.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "waitlist_submit" });
  }
});

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
