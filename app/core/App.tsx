/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import * as React from "react";

export function App(): JSX.Element {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    (async () => {
      const res = await fetch("/api/people/1");
      const body = await res.json();
      setData(body);
    })();
  }, []);

  return (
    <React.Fragment>
      <h2>Welcome to Cloudflare Starter Kit!</h2>

      <p>
        <a href="https://github.com/kriasoft/cloudflare-starter-kit">
          https://github.com/kriasoft/cloudflare-starter-kit
        </a>
      </p>

      <p>
        Fetching <code>/api/people/1</code> (as an example):
      </p>

      <pre>
        <code>{data && JSON.stringify(data, null, "  ")}</code>
      </pre>
    </React.Fragment>
  );
}
