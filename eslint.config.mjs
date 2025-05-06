import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import prettierPlugin from "eslint-plugin-prettier"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier" // 이 줄 추가!
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "import/order": [
        2,
        {
          alphabetize: { order: "asc" },
        },
      ],
      "prettier/prettier": [
        "error",
        {
          trailingComma: "all",
          endOfLine: "lf",
          semi: false,
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2,
        },
      ],
    },
  },
]

export default eslintConfig
