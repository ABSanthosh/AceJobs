import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import { ironOptions } from "../lib/ironOptions";
import { loginEndPoint } from "../operations/auth.fetch";

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
