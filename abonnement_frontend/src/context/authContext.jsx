import { createContext, useState, useEffect } from "react";
import API from "../services/api";



// Créer le contexte utilisateur
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Charger les données utilisateur et le token depuis le local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  // Fonction pour gérer la connexion
  const login = (userData, authToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
  };

  // Fonction pour gérer la déconnexion
  const logout = () => {

    try {

      if (token) {
        API.post('/logout', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Nettoyage local
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setToken(null)
        setUser(null)

      }
    } catch (error) {
      console.error('Error logging out:', error.response?.data || error.message);
      alert('An error occurred while logging out.');
    }

  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


