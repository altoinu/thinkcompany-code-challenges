import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Browserlist configuration for modern browsers
  browserslist: [
    "last 2 versions", // Last 2 versions of each browser
    "Edge >= 80", // Microsoft Edge version 80 and above
    "Chrome >= 80", // Google Chrome version 80 and above
    "Firefox >= 70", // Firefox version 70 and above
    "Safari >= 13", // Safari version 13 and above (covers iOS)
    "Android >= 80", // Chrome for Android (approximated using Android version)
  ],
});
