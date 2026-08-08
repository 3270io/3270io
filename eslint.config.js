import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

// The repository shipped with every ESLint dependency installed and a `lint`
// script, but no config file — so `npm run lint` failed to start rather than
// reporting anything. This is that missing config.
export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
      // Generated from brand/assets by `npm run brand`.
      "public/brand",
    ],
  },

  // Application source.
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },

  // src/components/ui is shadcn/ui scaffolding: vendored, regenerated from
  // upstream rather than hand-maintained, and not something a pull request
  // should be blocked on. Kept in scope so real breakage still shows up, but
  // the stylistic rules that only fire on that generated shape are relaxed.
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "react-refresh/only-export-components": "off",
    },
  },

  // Build and tooling scripts run in Node, not the browser.
  {
    files: ["*.{js,mjs}", "brand/**/*.mjs"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node,
    },
  },

  // Root-level TypeScript config files (vite.config.ts) are Node too, but need
  // the TypeScript parser — the default parser chokes on `as` casts.
  {
    files: ["*.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node,
    },
  },
)
