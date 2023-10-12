"use client";
import React, { useEffect } from "react";
import "firebaseui/dist/firebaseui.css";
import { auth, firebaseExp, firebaseUI } from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const subscribe = async () => {
      const ui =
        firebaseUI.auth.AuthUI.getInstance() ||
        new firebaseUI.auth.AuthUI(auth);

      ui.start("#firebaseui-auth-container", {
        signInOptions: [
          firebaseExp.auth.FacebookAuthProvider.PROVIDER_ID,
          firebaseExp.auth.GoogleAuthProvider.PROVIDER_ID,
          firebaseExp.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        signInFlow: "popup",
        credentialHelper: firebaseUI.auth.CredentialHelper.NONE,
        callbacks: {
          signInSuccessWithAuthResult: async (currentUser) => {
            if (currentUser) {
              navigate("/admin-panel");
            }
            return false;
          },
        },
      });
    };

    subscribe();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default LoginPage;
