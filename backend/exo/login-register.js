function generateToken(user) {
  const userString = JSON.stringify(user);
  return btoa(userString);
}

function verifyToken(token) {
  try {
    const jsonString = atob(token);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Token invalide !");
    return null;
  }
}

const user = { id: 1, username: "JohnDoe", role: "admin" };
const token = generateToken(user);
console.log("Token:", token);

const decodedUser = verifyToken(token);
console.log("Utilisateur décodé:", decodedUser);