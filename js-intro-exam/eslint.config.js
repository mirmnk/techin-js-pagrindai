// Needs: npm i -D eslint @eslint/js globals
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: { js },
    extends: ["js/recommended"], // no-undef, no-const-assign, no-fallthrough, no-unreachable, use-isnan, valid-typeof, no-unexpected-multiline…
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // import/export ("type": "module" in package.json)
      globals: { ...globals.browser, ...globals.node }, // console, document, prompt, alert… are known
    },
    rules: {
      // course rules
      "no-var": "error", // let/const only
      "prefer-const": "warn", // const by default
      eqeqeq: "error", // === only (no == traps)
      "prefer-arrow-callback": "warn", // arrow functions preferred
      camelcase: "warn", // meaningful camelCase names (exam requirement)

      // my weak spots
      "array-callback-return": "error", // map/filter with { } but no return
      "default-case": "warn", // switch without default
      "no-shadow": "warn", // same name inside a block hides the outer one
      "no-unused-vars": "warn",
    },
  },
]);
