export const getUser = () => {
  const userStr = localStorage.getItem("user");

  if (!userStr || userStr === "undefined") {
    return null;
  }

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error("Gagal parse user dari localStorage:", error);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const isLoggedIn = () => {
  return getToken() !== null && getUser() !== null;
};

export const isAdmin = () => {
  if (!isLoggedIn()) {
    return false;
  }
  const user = getUser();
  return user && user.role === "admin";
};

export const isUser = () => {
  if (!isLoggedIn()) {
    return false;
  }
  const user = getUser();
  return user && user.role === "user";
};