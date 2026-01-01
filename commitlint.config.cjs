module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "init",
        "docs",
        "style",
        "test",
        "chore",
        "build",
        "refactor",
      ],
    ],
    "subject-case": [0],
  },
};
