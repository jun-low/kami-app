import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": 0,
      "no-empty": 0,
      "--no-warn-ignored": 0,
      "no-irregular-whitespace": 0,
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];