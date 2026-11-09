import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  build: {
    outDir: "./build",
  },
  server: {
    proxy: {
        "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }
  },
  resolve: {
    alias: {
      "~": "/src",
      "@/components": "/src/components",
      "@/hooks": "/src/hooks",
      "@/lib": "/src/lib",
      "@/ui": "/src/components/ui",
      "@/api": "/src/api",
    },
  },
});
