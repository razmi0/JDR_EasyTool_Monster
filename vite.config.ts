/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Data": path.resolve(__dirname, "./src/raw_data.json"),
      "@Components": path.resolve(__dirname, "./src/components"),
      "@Helpers": path.resolve(__dirname, "./src/helpers"),
      "@Hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});
