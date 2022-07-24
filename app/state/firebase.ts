/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { atom, useRecoilState } from "recoil";
import * as React from "react";
import * as firebase from "../core/firebase.js";

export const Firebase = atom<Firebase | undefined>({
  key: "Firebase",
  dangerouslyAllowMutability: true,
  default: undefined,
});

export function useFirebase(): Firebase | undefined {
  const [value, set] = useRecoilState(Firebase);

  React.useEffect(() => {
    import("../core/firebase.js").then((module) => {
      set((prevValue) => (prevValue ? prevValue : module));
    });
  }, []);

  return value;
}

type Firebase = typeof firebase;
