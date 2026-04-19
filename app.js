const ENDPOINTS = {
  development: "http://localhost:3000/api/links",
  production: "https://REPLACE_WITH_PROD_DOMAIN/api/links",
};

const isLocal = ["localhost", "127.0.0.1", ""].includes(location.hostname);
const LINKS_ENDPOINT = isLocal ? ENDPOINTS.development : ENDPOINTS.production;

async function loadLinks() {
  const statusEl = document.getElementById("status");
  const listEl = document.getElementById("links");

  try {
    const res = await fetch(LINKS_ENDPOINT, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const links = Array.isArray(data?.links) ? data.links : [];
    const visible = links
      .filter((l) => l && l.isActive && l.url && l.label)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

    if (visible.length === 0) {
      statusEl.textContent = "אין קישורים זמינים";
      return;
    }

    listEl.innerHTML = "";
    for (const link of visible) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.label;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
      listEl.appendChild(li);
    }

    statusEl.hidden = true;
    listEl.hidden = false;
  } catch (err) {
    statusEl.textContent = "שגיאה בטעינת הקישורים";
    statusEl.classList.add("error");
    console.error("Failed to load links:", err);
  }
}

loadLinks();
