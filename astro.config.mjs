import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  integrations: [react(), sitemap()],
  trailingSlash: "ignore",
  redirects: {
    '/': '/it',
  },
});