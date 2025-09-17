import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "", // <- vide pour que les assets pointent correctement
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [
    react(),
    mode === "development" ? expressPlugin() : undefined
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));
;

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // uniquement en dev
    configureServer(server) {
      const { createServer } = require("./server");
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
