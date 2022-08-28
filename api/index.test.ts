/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import worker from "./index.js";

test("GET /api/people/1", async () => {
  const env = await getMiniflareBindings();

  const req = new Request(`https://${env.APP_HOSTNAME}/api/people/1`, {
    headers: { "accept-type": "application/json" },
  });

  const res = await worker.fetch(req, env, {} as ExecutionContext);

  expect({
    status: res.status,
    statusText: res.statusText,
    url: res.url,
  }).toMatchInlineSnapshot(`
    {
      "status": 200,
      "statusText": "OK",
      "url": "https://swapi.dev/api/people/1",
    }
  `);

  const body = await res?.json();
  expect(body).toMatchInlineSnapshot(`
    {
      "birth_year": "19BBY",
      "created": "2014-12-09T13:50:51.644000Z",
      "edited": "2014-12-20T21:17:56.891000Z",
      "eye_color": "blue",
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/",
      ],
      "gender": "male",
      "hair_color": "blond",
      "height": "172",
      "homeworld": "https://swapi.dev/api/planets/1/",
      "mass": "77",
      "name": "Luke Skywalker",
      "skin_color": "fair",
      "species": [],
      "starships": [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/",
      ],
      "url": "https://swapi.dev/api/people/1/",
      "vehicles": [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/",
      ],
    }
  `);
});
