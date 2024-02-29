// contexts/CurrentUserContext.js
"use client";

import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

const CurrentUserContext = createContext(null);

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const findOrCreateUser = async () => {
      const fingerprint = await getFingerprint();

      console.log("Fingerprint:", fingerprint);

      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fingerprint }),
        });
        const data = await response.json();
        setCurrentUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    findOrCreateUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
