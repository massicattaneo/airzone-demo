import Unfonts from "unplugin-fonts/vite"
import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST
// @ts-expect-error process is a nodejs global
const base = process.env.BASE || "/"

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  base, // Adjust the base path as needed for your deployment
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    tailwindcss(),
    createHtmlPlugin({ inject: { data: { base } } }),
    tsconfigPaths({
      root: "./",
    }),
    Unfonts({
      google: {
        preconnect: true,
        families: [
          {
            name: "Roboto",
            styles: "ital,wght@0,100..900;1,100..900",
          },
        ],
      },
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    proxy: {
      "/api": "http://localhost:5000", // or your real backend if needed
    },
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}))
