import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 7500,
    strictPort: true,
    cors: true,
  },
  build: {
    outDir: "dist/assets",
    rollupOptions: {
      output: {
        format: "iife", // ✅ always IIFE instead of ESM
        entryFileNames: "index.js", // output file name
      },
    },
  },
});
