module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended"
  ],
  rules: {
    // Allow console logs in API + server files
    "no-console": "off",

    // Prevent build from failing due to unused vars
    "no-unused-vars": "warn",

    // Fix "React is not defined"
    "react/react-in-jsx-scope": "off",

    // Prevent errors caused by undefined React in TSX
    "no-undef": "off"
  }
};
