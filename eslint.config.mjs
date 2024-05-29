import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import importX from "eslint-plugin-import-x"

export default tseslint.config(
    {
        ignores: ["**/build/**"],
    },
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylistic,
    {
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            "import-x": importX,
            "import-x/recomended": importX.configs.recommended,
            "import-x/typescript": importX.configs.typescript,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: [
                  "./tsconfig.json"
                ] 
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_", varsIgnorePattern: "Html" }
            ],
            "@typescript-eslint/consistent-type-exports": [
                "error",
                { fixMixedExportsWithInlineTypeSpecifier: true }
            ],
            "@typescript-eslint/consistent-type-imports": [
                "error",
                { prefer: "type-imports", fixStyle: "inline-type-imports" }
            ],
            "no-console": 1,
            "no-unreachable": "error",
            "no-unexpected-multiline": "error",
            "require-await": 1,
            "no-await-in-loop": 1,
            quotes: [
                2,
                "double",
                {
                    avoidEscape: true
                }
            ],
            indent: [
                "error",
                4
            ],
            "no-multi-spaces": [
                "error"
            ],
            "max-len": [
                "warn",
                125
            ],
            semi: [
                "error",
                "never"
            ],
            "import-x/consistent-type-specifier-style": ["error", "prefer-inline"],
            "import-x/order": [
                "error",
                {
                    "newlines-between": "always",
                     "groups": [
                         "builtin",
                         "external",
                         "parent",
                         "sibling",
                         "index",
                     ],
                     alphabetize: {
                          order: "asc",
                          caseInsensitive: true
                     }
                 }
            ]
        }
    }
)
