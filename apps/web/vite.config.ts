import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// во время разработки будет стоять прокси

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],

  // прокси для разработки
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
