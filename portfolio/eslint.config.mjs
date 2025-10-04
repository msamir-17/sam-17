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


import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

// defineConfig is good practice but not strictly necessary here
// import { defineConfig } from "eslint/config";

export default [
    // Configuration for JS files
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: { globals: globals.browser }
    },
    
    // Recommended rules from plugins
    js.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,

    // --- YEH NAYA OBJECT ADD KAREIN ---
    // Our custom rule overrides go here
    {
        "rules": {
            "react/react-in-jsx-scope": "off"
        }
    }
];