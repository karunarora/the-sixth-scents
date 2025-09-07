import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSourceLocator } from "@metagptx/vite-plugin-source-locator";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [
    viteSourceLocator({
      prefix: "mgx",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/apps-script": {
        target:
          "https://script.google.com/macros/s/AKfycbxqmwugZ9S7Dw3ig0a-c_nKlS-9p2VjkawtDLmoFhzGgUNKY8UKdz0p_q1JKeFSWZIb",
        changeOrigin: true,
        secure: true,
        rewrite: (pathStr) => pathStr.replace(/^\/apps-script/, ""),
      },
    },
  },
}));
