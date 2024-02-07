import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      '@fortawesome/fontawesome-svg-core': '@fortawesome/fontawesome-svg-core',
      "@": path.resolve(__dirname, "./src"),
      util: "@browsery/util",
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      './runtimeConfig': './runtimeConfig.browser',

    },
  },
});
