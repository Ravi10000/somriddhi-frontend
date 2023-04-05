import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.somriddhi.store:8001"
      },
    },
    // https: {
    //   key: fs.readFileSync("somriddhi_store.key"),
    //   cert: fs.readFileSync("somriddhi_store.crt"),
    //   ca: fs.readFileSync("somriddhi_store.ca-bundle"),
    // },
  },
});
