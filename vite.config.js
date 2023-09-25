import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/Inappapi": {
        target: "https://api.i-screen.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/Inappapi/, "/Inappapi"),
      },
    },
  },
  plugins: [react()],
});
