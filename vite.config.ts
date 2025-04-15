import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],

  resolve: {
    alias: {
      src: path.resolve("src/"),
      "@src": path.resolve("src"),
      "@src/assets": path.resolve("src/assets"),
      "@src/common": path.resolve("src/common"),
      "@src/constant": path.resolve("src/constant"),
      "@src/hooks": path.resolve("src/hooks"),
      "@src/components": path.resolve("src/components"),
      "@src/pages": path.resolve("src/pages"),
      "@src/providers": path.resolve("src/providers"),
      "@src/routes": path.resolve("src/routes"),
      "@src/service": path.resolve("src/service"),
      "@src/theme": path.resolve("src/theme"),
      "@src/translations": path.resolve("src/translations"),
      "@src/interface": path.resolve("src/interface"),
      "@src/utility": path.resolve("src/utility"),
      "@src/userPages": path.resolve("src/userPages"),
      "@src/@types": path.resolve("src/@types"),
      "@src/schema": path.resolve("src/schema"),
    },
  },
  server: {
    open: true,
  },
});
