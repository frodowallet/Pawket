module.exports = {
    root: true,
    env: {
      es2022: true,
    },
    extends: [
      "plugin:vue/essential",
      "eslint:recommended",
      "@vue/typescript/recommended",
      "@vue/prettier/@typescript-eslint",
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "vue/valid-v-if": "off",
      "valid-v-if": "off",
    },
  };