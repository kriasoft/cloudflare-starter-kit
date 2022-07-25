/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { type User } from "firebase/auth";
import React from "react";
import { atom, selector, useRecoilValue, useRecoilValueLoadable } from "recoil";
import * as firebase from "../core/firebase.js";

/**
 * Firebase Client SDK.
 */
export const Firebase = selector<Firebase>({
  key: "Firebase",
  dangerouslyAllowMutability: true,
  get() {
    return import("../core/firebase.js");
  },
});

/**
 * The currently logged-in (authenticated) user object.
 */
export const CurrentUser = atom<User | null | undefined>({
  key: "CurrentUser",
  dangerouslyAllowMutability: true,
  default: undefined,
  effects: [
    (ctx) => {
      if (ctx.trigger === "get") {
        // Subscribe to the authenticated state changes
        const promise = ctx
          .getPromise(Firebase)
          .then((fb) =>
            fb.auth.onAuthStateChanged((user) => {
              ctx.setSelf(user);
            })
          )
          .catch((err) => ctx.setSelf(Promise.reject(err)));
        return () => promise.then((unsubscribe) => unsubscribe?.());
      }
    },
  ],
});

export function useFirebase(): Firebase {
  return useRecoilValue(Firebase);
}

/**
 * The currently logged-in (authenticated) user object.
 *
 * @example
 *   function Example(): JSX.Element {
 *     const me = useCurrentUser();
 *     // => { uid: "xxx", email: "me@example.com", ... }
 *     // => Or, `null` when not authenticated
 *     // => Or, `undefined` when not initialized
 *   }
 */
export function useCurrentUser() {
  return useRecoilValue(CurrentUser);
}

/**
 * Authentication manager.
 *
 * @example
 *   import { useAuth } from "../state/firebase.js";
 *
 *   function Example(): JSX.Element {
 *     const auth = useAuth();
 *     return (
 *       <Box>
 *         <Button onClick={auth.signIn}>Sign In</Button>
 *         <Button onClick={auth.signOut}>Sign Out</Button>
 *       </Box>
 *     );
 *   }
 */
export function useAuth() {
  const value = useRecoilValueLoadable(Firebase);
  return React.useMemo(
    () => ({
      signIn() {
        return value.toPromise().then((fb) => fb.signIn());
      },
      signOut() {
        return value.toPromise().then((fb) => fb.auth.signOut());
      },
    }),
    [value.toPromise]
  );
}

type Firebase = typeof firebase;
