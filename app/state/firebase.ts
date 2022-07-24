/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { atom, useRecoilState } from "recoil";
import * as React from "react";
import * as firebase from "../core/firebase.js";

type Firebase = typeof firebase;

let promise: Promise<void>;

export const Firebase = atom<Firebase | undefined>({
  key: "Firebase",
  dangerouslyAllowMutability: true,
  default: undefined,
});

export function useFirebase(): Firebase | undefined {
  const [value, set] = useRecoilState(Firebase);

  React.useEffect(() => {
    if (!promise) {
      promise = import("../core/firebase.js").then((module) => {
        set(module);
      });
    }
  }, []);

  return value;
}
