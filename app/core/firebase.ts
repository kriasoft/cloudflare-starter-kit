/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

// -----------------------------------------------------------------------------
// NOTE: This file is intended to be loaded asynchronously, on-demand
//       in order not to affect the initial page rendering.
//       See `useFirebase()` React hook found in `/state/firebase.ts`.
// -----------------------------------------------------------------------------

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const app = initializeApp({
  projectId: import.meta.env.VITE_GOOGLE_CLOUD_PROJECT,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_GOOGLE_CLOUD_PROJECT}.web.app`,
});

export const auth = getAuth(app);

export function signIn(): ReturnType<typeof signInWithPopup> {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
