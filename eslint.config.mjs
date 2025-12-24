import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
  // глобальные игноры
  { ignores: [".next/**", "node_modules/**", "dist/**", "out/**"] },

  // применяем конфиг к TS/TSX/JS/JSX
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [next],
    rules: {
      // важное для TS проектов:
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
])