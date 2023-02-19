/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

// -----------------------------------------------------------------------------
// NOTE: This file is intended to be loaded asynchronously, on-demand
//       in order not to affect the initial page rendering.
//       See `useFirebase()` React hook found in `/state/firebase.ts`.
// -----------------------------------------------------------------------------

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithPopup,
} from "firebase/auth";

export const app = initializeApp({
  projectId: import.meta.env.VITE_GOOGLE_CLOUD_PROJECT,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
});

export const auth = getAuth(app);

let loggedIn = false;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loggedIn = true;
    const idToken = await user.getIdToken();
    await fetch("https://auth-example.chainfuse.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      credentials: "include",
      mode: "cors",
    });
  } else {
    const res = await fetch("https://auth-example.chainfuse.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: loggedIn ? false : null }),
      credentials: "include",
      mode: "cors",
    });
    const data = await res.json();
    loggedIn = false;

    if (data.token) {
      signInWithCustomToken(auth, data.token);
    }
  }
});

export function signIn(): ReturnType<typeof signInWithPopup> {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
