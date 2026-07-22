"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";

export function ThemeScript() {
  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme');
              if (theme === 'light' || theme === 'dark') {
                document.documentElement.setAttribute('data-theme', theme);
              } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } catch (e) {}
          `,
        }}
      />
    );
  });

  return null;
}
