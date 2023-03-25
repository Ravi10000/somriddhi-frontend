import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "http://3.108.161.80:8002",
        target: "http://13.234.49.6:8001",
      },
    },
  },
});
