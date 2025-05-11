import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import prettierPlugin from "eslint-plugin-prettier"
import importPlugin from 'eslint-plugin-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },

    settings: {
      'import/resolver': {
        // 1) TypeScript 경로(alias) 인식
        typescript: {
          project: './tsconfig.json',
        },
        // 2) node 기본 해석도 (src/ 를 base 경로로)
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
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
        "warn",
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
