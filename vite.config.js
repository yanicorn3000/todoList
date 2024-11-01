import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Path to exercise folder
 */
const exercisePath = "src";

/**
 * Don't change those lines below
 */
export default defineConfig((config) => ({
  base: config.mode === "production" ? "/todoList" : "/",
  root: exercisePath,
  server: {
    port: 3000,
  },
  plugins: [react()],
  build: {
    outDir: "../dist",
  },
}));
