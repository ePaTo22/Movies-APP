import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/App.js",
    "src/index.js",
    "src/serviceWorker.js",
    "src/setupTests.js",
    "src/actions/**",
    "src/components/**",
    "src/middleware/**",
    "src/reducers/**",
    "src/store/**"
  ]),
]);

export default eslintConfig;
