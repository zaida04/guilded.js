const path = require("path");

module.exports = {
    extends: ["neon/common", "neon/browser", "neon/node", "neon/typescript", "neon/react", "neon/next", "neon/edge", "neon/prettier"],
    settings: {
        react: {
            version: "detect",
        },
    },
    parserOptions: {
        project: "../../tsconfig.eslint.json",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        "react/react-in-jsx-scope": 0,
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [".tsx"],
            },
        ],
        "react/prop-types": 0,
        "@next/next/no-html-link-for-pages": [2, path.join(__dirname, "apps", "docs")],
    },
};
