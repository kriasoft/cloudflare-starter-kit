/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CssBaseline } from "@mui/material";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AppRoutes } from "./routes/index.js";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <CssBaseline />
        <AppRoutes />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
