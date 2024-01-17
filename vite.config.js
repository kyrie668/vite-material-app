import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.exr", "**/*.hdr"],
  plugins: [react(), commonjs()],
  base: "./",
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
