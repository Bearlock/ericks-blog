import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";
import icon from "astro-icon";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://erickrdiaz.com",
  integrations: [
    preact(),
    icon({
      include: {
        mdi: ["rss", "linkedin", "github"]
      }
    }),
    expressiveCode({
      themes: ["catppuccin-latte", "catppuccin-macchiato"],
      styleOverrides: {
        codeBackground: ({ theme }) => theme.name === "catppuccin-latte" ? "#ecedee" : theme.colors['editor.background'],
        codeFontSize: "1rem"
      }
    })
  ]
});
