const path = require("path");

module.exports = {
    "root": true,
    "extends": [
        "neon/common",
        "neon/node",
        "neon/typescript",
        "neon/prettier"
    ],
    "parserOptions": {
        "project": "./tsconfig.eslint.json"
    },
    "rules": {
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-invalid-this": "off",
        "@typescript-eslint/lines-between-class-members": [
            "warn",
            "always",
            {
                "exceptAfterOverload": true
            }
        ],
        "@typescript-eslint/switch-exhaustiveness-check": "off",
        "array-callback-return": "off",
        "import/extensions": "off",
        "no-param-reassign": "off",
        "promise/prefer-await-to-then": "off",
        "tsdoc/syntax": "off",
        "sonarjs/no-nested-switch": "off",
        "id-length": "off",
        "no-restricted-globals": "off",
        "n/prefer-global/process": "off",
        "no-promise-executor-return": "off"
    },
    "overrides": [
        {
            "files": [
                "apps/**/*.ts",
                "apps/**/*.tsx"
            ],
            "extends": [
                "neon/common",
                "neon/browser",
                "neon/node",
                "neon/typescript",
                "neon/react",
                "neon/next",
                "neon/edge",
                "neon/prettier"
            ],
            "settings": {
                "react": {
                    "version": "detect"
                }
            },
            "parserOptions": {
                "project": "./tsconfig.eslint.json",
								"ecmaFeatures": {
									"jsx": true
								}
            },
            "rules": {
                "react/react-in-jsx-scope": 0,
                "react/jsx-filename-extension": [
                    1,
                    {
                        "extensions": [
                            ".tsx"
                        ]
                    }
                ],
                "@next/next/no-html-link-for-pages": [2, path.join(__dirname, "apps", "docs")]
            }
        }
    ]
}