import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Path to exercise folder
 */
const exercisePath = "src";

/**
 * Don't change those lines below
 */
export default defineConfig({
  root: exercisePath,
  server: {
    port: 3000,
  },
  plugins: [react()],
});
