module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended", // More comprehensive for Vue 3
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "plugin:@typescript-eslint/recommended", // Adds good TypeScript rules
    "plugin:vuetify/recommended", // Vuetify-specific rules
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-unused-vars": ["warn"], // Optional: More control over unused vars
    "vue/valid-v-slot": "warn", // Warn instead of error if you want flexibility
  },
};
