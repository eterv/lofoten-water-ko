module.exports = {
  // For JavaScript
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    require.resolve('./airbnb'),
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  rules: {
    'class-methods-use-this': 0,
    eqeqeq: 0,
    'func-names': 0,
    'global-require': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/prefer-default-export': 0,
    'lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
    'no-console': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'no-template-curly-in-string': 0, // for yup interpolation
    'no-undef': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,

    'jsx-a11y/anchor-is-valid': [
      2,
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight', 'to'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],

    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,

    'react-hooks/exhaustive-deps': 0,

    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],

    'react/react-in-jsx-scope': 0,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        /* project: ['tsconfig.json', 'packages/ * /tsconfig.json'], */
      },
    },
    react: {
      version: 'detect',
    },
  },

  // For TypeScript
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': [
          1,
          {
            allowArgumentsExplicitlyTypedAsAny: true,
          },
        ],
      },
    },
  ],
};
