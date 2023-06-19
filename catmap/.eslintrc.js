module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:all",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [],
    "rules": {
        "implicit-arrow-linebreak": 0,
        "max-len": [
            2,
            {"code": 140}
        ],
        "max-lines": 0,
        "max-lines-per-function": 0,
        "max-statements": 0,
        "no-magic-numbers": 0,
        "no-nested-ternary": 0,
        "no-ternary": 0,
        "no-undef-init": 0,
        "no-undefined": 0,
        "sort-vars": 0
    }
};
