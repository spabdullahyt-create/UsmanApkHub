// -------------------------
// Valid keys for users
// false = not used yet
// Add new keys here
const validKeys = {
  "Usman183": false,
  "NewUser001": false,
  "Hero990": false
};

// Function to verify key
function verifyKey(key) {
  if (validKeys[key] === false) {
    validKeys[key] = true; // mark as used
    return true;
  }
  return false;
}
