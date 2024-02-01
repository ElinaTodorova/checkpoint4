import React, { createContext, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

// Étape 1 : créer un context "React" basique
const userContext = createContext();

// Étape 2 : créer le provider de mon context
export function UserContextProvider({ children }) {
  const [userData, setUserData] = useLocalStorage("user", null);

  const login = (userInfo) => {
    setUserData(userInfo);
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {
          method: "get",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        setUserData(null);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  useEffect(() => {}, [userData]);

  const contextValue = useMemo(() => {
    return { userData, setUserData, login, logout };
  }, [userData]);

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
}

// Étape 3 : créer un hook pour récupérer les valeurs du context depuis
// n'importe quel composant dans l'application
export const useUserContext = () => useContext(userContext);

UserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
