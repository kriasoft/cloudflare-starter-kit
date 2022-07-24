/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { type User } from "firebase/auth";
import React from "react";
import { atom, useRecoilState } from "recoil";
import { useFirebase } from "./firebase.js";

export const CurrentUser = atom<User | null | undefined>({
  key: "CurrentUser",
  dangerouslyAllowMutability: true,
  default: undefined,
});

/**
 * The currently logged in (authenticated) user object.
 *
 * @example
 *   function Example(): JSX.Element {
 *     const me = useCurrentUser();
 *     // => { uid: "xxx", email: "me@example.com", ... }
 *     // => Or, `null` when not authenticated
 *     // => Or, `undefined` when
 *   }
 */
export function useCurrentUser() {
  const [value, setValue] = useRecoilState(CurrentUser);
  const fb = useFirebase();

  React.useEffect(() => {
    return fb?.auth.onAuthStateChanged((user) => {
      setValue(user);
    });
  }, [fb?.auth]);

  return value;
}
