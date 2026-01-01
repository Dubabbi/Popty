/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",

  plugins: ["prettier-plugin-tailwindcss"],

  tailwindFunctions: ["cn", "clsx", "cva"],
};
