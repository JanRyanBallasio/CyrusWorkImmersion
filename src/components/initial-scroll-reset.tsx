"use client";

import * as React from "react";

export function InitialScrollReset() {
  React.useEffect(() => {
    if (!window.location.hash) return;

    const cleanUrl = `${window.location.pathname}${window.location.search}`;

    window.history.replaceState(null, "", cleanUrl);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, []);

  return null;
}
