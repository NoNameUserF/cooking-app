module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    ignorePatterns: ['.eslintrc.cjs'],
    settings: {
        react: {version: '18.3.1'},
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    plugins: [
        "react",
        "react-hooks",
        "react-refresh",
        "import",
        "sonarjs",
        "jsx-a11y",
        "@typescript-eslint",
        "prettier",
    ],
    rules: {
        "semi": ["error", "always"],
        "react/display-name": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/react-in-jsx-scope": "off",
        "react/no-unknown-property": "off",
        "react/jsx-no-target-blank": "off",
        "react-hooks/rules-of-hooks": "error",


        "react/jsx-tag-spacing": [
            "error",
            {
                "beforeSelfClosing": "always",
            }
        ],

        "camelcase": "error",
        "spaced-comment": "error",
        "quotes": ["error", "double"],
        "jsx-quotes": ["error", "prefer-double"],
        "no-duplicate-imports": "error",
        "no-console": "warn",
        "no-var": "warn",
        "no-use-before-define": ["error", {"functions": false}],
        "newline-per-chained-call": ["error", {"ignoreChainWithDepth": 2}],
        "prefer-const": "warn",
        "prefer-template": "error",
        "prefer-destructuring": "off",
        "prefer-rest-params": "error",
        "prefer-promise-reject-errors": "error",
        "prefer-numeric-literals": "error",
        "prefer-arrow-callback": "error",
        "no-empty-function": "error",
        "no-useless-return": "error",
        "no-array-constructor": "error",
        "no-new-func": "error",
        "no-await-in-loop": "error",
        "no-prototype-builtins": "error",
        "no-eval": "error",
        "no-useless-catch": "error",
        "no-useless-escape": "error",
        "no-useless-concat": "error",

        "jsx-a11y/anchor-has-content": "warn",
        "jsx-a11y/alt-text": "error",
        "jsx-a11y/img-redundant-alt": "warn",
        "jsx-a11y/no-static-element-interactions": [
            "warn",
            {
                "handlers": [
                    "onClick",
                    "onMouseDown",
                    "onMouseUp",
                    "onKeyPress",
                    "onKeyDown",
                    "onKeyUp"
                ],
                "allowExpressionValues": true
            }
        ],

        "no-magic-numbers": "off",
        "import/no-unresolved": "off",
        "sonarjs/no-duplicate-string": "warn",
        "sonarjs/prefer-immediate-return": "warn",
        "import/prefer-default-export": ["warn", {"target": "single"}],
        "import/order": [
            "error",
            {
                "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
                "newlines-between": "always-and-inside-groups"
            }
        ],

        "react-refresh/only-export-components": "off",


        "prettier/prettier": [
            "error",
            {
                "singleQuote": false,
                "jsxSingleQuote": false,
                "trailingComma": "all",
                "printWidth": 120,
                "tabWidth": 4,
                "semi": true,
                "useTabs": false,
                "bracketSpacing": false,
                "arrowParens": "always",
                "endOfLine": "auto",
                "quoteProps": "as-needed",
                "requirePragma": false,
                "insertPragma": false
            }
        ],


    },
}
