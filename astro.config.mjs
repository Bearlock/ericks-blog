import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://erickrdiaz.com",
  integrations: [
    preact(),
    icon({
      include: {
        mdi: ["rss", "linkedin", "github"]
      }
    })
  ],
  markdown: {
    shikiConfig: {
      // theme: 'catppuccin-mocha',
      themes: {
        dark: 'catppuccin-mocha',
        light: 'catppuccin-latte'
      },
      wrap: true,
    }
  }
});
