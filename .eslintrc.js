module.exports = {
  root: true,
  extends: [`airbnb-base`, `prettier`],
  parser: `babel-eslint`,
  parserOptions: {
    ecmaFeatures: {
      globalReturn: true,
      generators: false,
      objectLiteralDuplicateProperties: false,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 2020,
    sourceType: `module`,
  },
  settings: {
    'import/core-modules': [],
    'import/ignore': [
      `node_modules`,
      `\\.(coffee|scss|css|less|hbs|svg|json)$`,
    ],
  },
  env: {
    node: true,
    es6: true,
    amd: true,
    browser: true,
  },
  rules: {
    'no-debugger': 0,
    'no-alert': 0,
    'no-await-in-loop': 0,
    'no-return-assign': [`error`, `except-parens`],
    'no-restricted-syntax': [
      2,
      `ForInStatement`,
      `LabeledStatement`,
      `WithStatement`,
    ],
    'prefer-const': [
      `error`,
      {
        destructuring: `all`,
      },
    ],
    'arrow-body-style': [2, `as-needed`],
    'no-unused-expressions': [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-console': 0,
    'import/prefer-default-export': 0,
    import: 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'comma-dangle': [
      `error`,
      {
        arrays: `always-multiline`,
        objects: `always-multiline`,
        imports: `always-multiline`,
        exports: `always-multiline`,
        functions: `ignore`,
      },
    ],
    'max-len': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    radix: 0,
    'no-shadow': [
      2,
      {
        hoist: `all`,
        allow: [`resolve`, `reject`, `done`, `next`, `err`, `error`],
      },
    ],
    quotes: [`error`, `backtick`],
    'prettier/prettier': [
      `error`,
      {
        trailingComma: `es5`,
        singleQuote: true,
        printWidth: 80,
        endOfLine: `auto`,
      },
    ],
  },
  plugins: [`html`, `prettier`, `import`],
}
