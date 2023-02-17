/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout.js";

const Home = lazy(() => import("./Home.js"));

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
