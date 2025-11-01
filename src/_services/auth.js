/**
 * src/_services/auth.js
 *
 * Helper otentikasi yang sudah diperbaiki untuk menangani JSON parse error.
 */

// Mendapatkan data user dari localStorage
export const getUser = () => {
  const userStr = localStorage.getItem("user");

  // Jika tidak ada user, atau string-nya "undefined", return null
  if (!userStr || userStr === "undefined") {
    return null;
  }

  try {
    // Coba parse JSON
    return JSON.parse(userStr);
  } catch (error) {
    // Jika gagal (JSON korup), bersihkan localStorage dan return null
    console.error("Gagal parse user dari localStorage:", error);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

// Mendapatkan token dari localStorage
export const getToken = () => {
  return localStorage.getItem("token") || null;
};

// Cek apakah user sudah login (ada token & data user)
export const isLoggedIn = () => {
  // Cek keduanya, token dan data user
  return getToken() !== null && getUser() !== null;
};

// Cek apakah user adalah admin
export const isAdmin = () => {
  if (!isLoggedIn()) {
    return false;
  }
  const user = getUser();
  // Pastikan 'user' tidak null dan punya properti 'role'
  return user && user.role === "admin";
};

// Cek apakah user adalah user biasa
export const isUser = () => {
  if (!isLoggedIn()) {
    return false;
  }
  const user = getUser();
  return user && user.role === "user";
};