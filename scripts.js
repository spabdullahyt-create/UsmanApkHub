// -------------------------
// APP DATA (your apps)
// -------------------------
const apps = [
  {
    id: 1,
    name: "Instagram Hack Tool",
    category: "Hack",
    size: "16 MB",
    img: "https://i.ibb.co/7YwJ8qR/social-hack.png",
    link: "https://example.com/instagramhack.apk"
  },
  {
    id: 2,
    name: "WhatsApp Analyzer",
    category: "App",
    size: "18 MB",
    img: "https://i.ibb.co/4NTQW3W/whatsapp.png",
    link: "https://example.com/whatsapp.apk"
  },
  {
    id: 3,
    name: "FB Cloner",
    category: "Hack",
    size: "23 MB",
    img: "https://i.ibb.co/pQ1wSTw/fb.png",
    link: "https://example.com/fbclone.apk"
  }
];

// global
let selectedApps = [];
const grid = document.getElementById("grid");

// -------------------------
// RENDER APP GRID
// -------------------------
function renderGrid(list) {
  grid.innerHTML = "";
  list.forEach(app => {
    const item = document.createElement("div");
    item.className = "card";

    item.innerHTML = `
      <img src="${app.img}" class="thumb">
      <div class="title">${app.name}</div>
      <div class="meta">${app.size} • ${app.category}</div>
      <div class="sel-row">
        <input type="checkbox" class="selBox" data-id="${app.id}">
        <label>Select</label>
      </div>
    `;

    grid.appendChild(item);
  });

  // selection event
  document.querySelectorAll(".selBox").forEach(box => {
    box.addEventListener("change", e => {
      const id = Number(e.target.dataset.id);
      if (e.target.checked) {
        if (!selectedApps.includes(id)) selectedApps.push(id);
      } else {
        selectedApps = selectedApps.filter(x => x !== id);
      }
    });
  });
}
renderGrid(apps);

// -------------------------
// CATEGORY FILTER
// -------------------------
document.querySelectorAll("[data-cat]").forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;

    document.querySelectorAll("[data-cat]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (cat === "") renderGrid(apps);
    else renderGrid(apps.filter(a => a.category === cat));
  });
});

// -------------------------
// SEARCH
// -------------------------
document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  renderGrid(apps.filter(a => a.name.toLowerCase().includes(q)));
});

// -------------------------
// SIDEBAR
// -------------------------
const drawer = document.getElementById("sidebarDrawer");
document.getElementById("hambtn").onclick = () => drawer.classList.toggle("open");

// -------------------------
// THEME TOGGLE
// -------------------------
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle("dark");

  document.getElementById("sidebarIcon").className = isDark ? "fa fa-sun" : "fa fa-moon";
  document.getElementById("themeIconTop").className = isDark ? "fa fa-sun" : "fa fa-moon";
}

document.getElementById("sidebarThemeBtn").onclick = toggleTheme;
document.getElementById("themeToggleTop").onclick = toggleTheme;

// -------------------------
// KEY MODAL CONTROLS
// -------------------------
const overlay = document.getElementById("overlay");

function closeOverlay() {
  overlay.style.display = "none";
}

// -------------------------
// DOWNLOAD SELECTED
// -------------------------
document.getElementById("downloadSelected").addEventListener("click", () => {
  if (selectedApps.length === 0) {
    alert("Please select at least 1 app.");
    return;
  }

  overlay.style.display = "flex";
});

// -------------------------
// VERIFY KEY + DOWNLOAD
// -------------------------
document.getElementById("verifyKey").addEventListener("click", () => {
  const key = document.getElementById("userKey").value.trim();

  if (!key) {
    alert("Enter your key!");
    return;
  }

  // verify using keys.js logic
  if (verifyKey(key)) {
    alert("Key verified! Your downloads will start.");

    closeOverlay();

    selectedApps.forEach(id => {
      const app = apps.find(a => a.id === id);
      if (app) window.open(app.link, "_blank");
    });

  } else {
    alert("Invalid or already used key!");
  }
});