import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://62c8d468f852.vps.myjino.ru:49196",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
