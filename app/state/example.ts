/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { selectorFamily, useRecoilValue } from "recoil";

export const Person = selectorFamily<Person, number | string>({
  key: "Person",
  get(id) {
    return async function (): Promise<Person> {
      // const me = get(CurrentUser);
      // const idToken = await me?.getIdToken();
      const res = await fetch(`/api/people/${id}`);

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
