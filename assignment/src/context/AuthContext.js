import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const API = "http://localhost:5000";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState("/");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("authUser"));
    if (stored) setUser(stored);
  }, []);

  // login using /accounts?email=...&password=...
  const login = async (email, password) => {
    try {
      const res = await fetch(
        `${API}/accounts?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setUser(data[0]);
        localStorage.setItem("authUser", JSON.stringify(data[0]));
        return true;
      }
      return false;
    } catch (err) {
      console.error("login error", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const register = async (payload) => {
    try {
      // payload should include wishlist: []
      const res = await fetch(`${API}/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setUser(data);
      localStorage.setItem("authUser", JSON.stringify(data));
      return data;
    } catch (err) {
      console.error("register error", err);
      throw err;
    }
  };

  // update user fields on server and locally (used to update wishlist)
  const updateUser = async (updatedFields) => {
    if (!user?.id) throw new Error("No authenticated user");
    try {
      const res = await fetch(`${API}/accounts/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const updated = await res.json();
      setUser(updated);
      localStorage.setItem("authUser", JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error("updateUser error", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateUser,
        redirectAfterLogin,
        setRedirectAfterLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;