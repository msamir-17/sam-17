// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ]);

// In eslint.config.mjs

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // --- YEH HUMARA CUSTOM RULES OBJECT HAI ---
  {
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "warn", // Error ki jagah sirf warning dega
      "react/no-unknown-property": "off"
    }
  }
];