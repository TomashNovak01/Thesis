// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// const path = require("path");
// // https://vitejs.dev/config/
// export default defineConfig({
//   base: path.resolve(__dirname, "./dist/"),
//   plugins: [vue()],
// });

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

//

export default defineConfig({
  root: path.join(__dirname, "src", "renderer"),
  publicDir: "public",
  server: {
    port: 5173,
  },
  build: {
    outDir: path.join(__dirname, "build", "renderer"),
    emptyOutDir: true,
  },
  plugins: [vue()],
});
