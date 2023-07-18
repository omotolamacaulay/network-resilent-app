import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import Login from "./auth/Login";

const AuthDetails = ({ children }: { children: React.ReactElement }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => setAuthUser(null))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {authUser ? (
        <div>
          <button onClick={userSignOut}>Signout</button>
          {children}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default AuthDetails;
