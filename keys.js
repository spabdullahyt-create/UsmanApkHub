// ================================
//  ONE–TIME USE KEY SYSTEM
// ================================

// Add unlimited keys here:
let validKeys = {
  "Usman786": true,
  "User001": true,
  "User002": true,
  "User003": true,
  "VIPKEY999": false
};

// Validate + lock key
function verifyKey(key) {
  if (validKeys.hasOwnProperty(key) && validKeys[key] === false) {
    validKeys[key] = true;  // Mark as USED
    return true;
  }
  return false; // Invalid or used
}

// For single-app download
function useKeyForSingle(app) {
  const key = document.getElementById("userKey").value.trim();
  if (verifyKey(key)) {
    window.location.href = app.apk_link;
    closeOverlay();
  } else {
    alert("❌ Invalid key OR already used");
  }
}

// For multiple selected apps
function useKeyForMultiple(selectedIds, apps) {
  const key = prompt("Enter download key:");
  if (!verifyKey(key)) {
    alert("❌ Invalid or already used key!");
    return;
  }

  selectedIds.forEach(id => {
    const app = apps.find(a => a.id === id);
    if (app) window.open(app.apk_link, "_blank");
  });
}
