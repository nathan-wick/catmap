module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:all",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "ignorePatterns": ["/lib/**/*"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": [
            "tsconfig.json",
            "tsconfig.dev.json"
        ],
        "sourceType": "module",
        "tsconfigRootDir": __dirname
    },
    "plugins": [
        "@typescript-eslint",
        "import"
    ],
    "root": true,
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
        "no-plusplus": 0,
        "no-ternary": 0,
        "no-undef-init": 0,
        "no-undefined": 0,
        "sort-vars": 0
    }
};
