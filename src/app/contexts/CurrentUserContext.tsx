// contexts/CurrentUserContext.js
"use client";

import { User } from "@prisma/client";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

const CurrentUserContext = createContext<User | null>(null);

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const findOrCreateUserByFingerprint = async () => {
      const fingerprint = await getFingerprint();

      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ fingerprint }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const user = data.user as User;

      setCurrentUser(user);
    };

    findOrCreateUserByFingerprint();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
