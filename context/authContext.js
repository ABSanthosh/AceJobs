import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import { ironOptions } from "../lib/ironOptions";
import { getAuth, signOut } from "firebase/auth";

const fbAuth = getAuth();

export const AuthContext = React.createContext({});

export const getUserFromSession = withIronSessionSsr(async ({ req }) => {
  if (req.session.user === undefined) {
    return null;
  } else {
    const user = req.session.user;
    return user;
  }
}, ironOptions);

export function AuthProvider({ children, ssrUser, ...props }) {
  const [user, setUser] = React.useState(ssrUser);

  async function logout() {
    signOut(fbAuth);
    return fetch("/api/auth/logout", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }

  const auth = {
    user,
    setUser,
    logout,
    ...props,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
