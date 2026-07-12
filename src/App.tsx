/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Requested alias — /portfolio redirects to the re-homed portfolio */}
        <Route path="/portfolio" element={<Navigate to="/about" replace />} />
        {/* Unknown routes fall back to the hub */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
