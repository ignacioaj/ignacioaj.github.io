import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  vite: {
    plugins: [tailwind()],
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      MY_EMAIL: envField.string({ context: "server", access: "secret" }),
    },
  },
  site: "https://ignacioaj.github.io",
  output: "static",
});
