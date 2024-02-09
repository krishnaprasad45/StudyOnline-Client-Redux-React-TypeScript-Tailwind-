// vite.config.ts
import { defineConfig } from "file:///D:/Typescript/TS-Client-StudyOnline/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Typescript/TS-Client-StudyOnline/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\Typescript\\TS-Client-StudyOnline";
var vite_config_default = defineConfig({
  plugins: [react()],
  define: {
    global: {}
  },
  resolve: {
    alias: {
      "@fortawesome/fontawesome-svg-core": "@fortawesome/fontawesome-svg-core",
      "@mui/material/styles": "@mui/material/styles",
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      util: "@browsery/util",
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      "./runtimeConfig": "./runtimeConfig.browser"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUeXBlc2NyaXB0XFxcXFRTLUNsaWVudC1TdHVkeU9ubGluZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVHlwZXNjcmlwdFxcXFxUUy1DbGllbnQtU3R1ZHlPbmxpbmVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1R5cGVzY3JpcHQvVFMtQ2xpZW50LVN0dWR5T25saW5lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIGRlZmluZToge1xyXG4gICAgZ2xvYmFsOiB7fSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnOiAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJyxcclxuICAgICAgJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJzogJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJyxcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgIHV0aWw6IFwiQGJyb3dzZXJ5L3V0aWxcIixcclxuICAgICAgcHJvY2VzczogXCJwcm9jZXNzL2Jyb3dzZXJcIixcclxuICAgICAgc3RyZWFtOiBcInN0cmVhbS1icm93c2VyaWZ5XCIsXHJcbiAgICAgIHpsaWI6IFwiYnJvd3NlcmlmeS16bGliXCIsXHJcbiAgICAgICcuL3J1bnRpbWVDb25maWcnOiAnLi9ydW50aW1lQ29uZmlnLmJyb3dzZXInLFxyXG5cclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVMsU0FBUyxvQkFBb0I7QUFDOVQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sUUFBUSxDQUFDO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wscUNBQXFDO0FBQUEsTUFDckMsd0JBQXdCO0FBQUEsTUFDeEIsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLG1CQUFtQjtBQUFBLElBRXJCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
