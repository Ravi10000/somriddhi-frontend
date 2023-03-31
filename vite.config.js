import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from 'fs';

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
    https: {
      key: '/etc/pki/tls/private/somriddhi_store.key',
      cert: '/etc/pki/tls/certs/somriddhi_store.crt',
      ca: '/etc/pki/tls/certs/somriddhi_store.ca-bundle',
    }
  },
});
