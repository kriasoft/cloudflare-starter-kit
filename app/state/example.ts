/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { selectorFamily, useRecoilValue } from "recoil";
import { CurrentUser } from "./user.js";

export const Person = selectorFamily<Person, number | string>({
  key: "Person",
  get(id) {
    return async function ({ get }): Promise<Person> {
      const me = get(CurrentUser);
      const headers = new Headers();
      const idToken = await me?.getIdToken();
      if (idToken) headers.set("Authorization", `Bearer ${idToken}`);
      const res = await fetch(`/api/people/${id}`, { headers });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? `${res.status} ${res.statusText}`);
      }

      return await res.json();
    };
  },
});

export function usePerson(id: number | string) {
  return useRecoilValue(Person(id));
}

type Person = Record<string, unknown>;
