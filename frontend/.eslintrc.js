const ERROR = 'error';
const OFF = 'off';
const WARN = 'warn';

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // prettier extension
    'prettier',
    'prettier/babel',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'graphql',
    'jest',
    'react-hooks',
    'import',
  ],
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': [ERROR],
    /// /////////

    // turn on errors for missing imports
    'import/no-unresolved': 'error',

    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // React Hooks
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,

    // GRAPHQL
    'graphql/template-strings': [
      ERROR,
      {
        // Import default settings for your GraphQL client. Supported values:
        // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
        env: 'apollo',

        // Import your schema JSON here
        // eslint-disable-next-line global-require
        schemaJson: require('./graphql.schema.json'),

        // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
        // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

        // OR provide the schema in the Schema Language format
        // schemaString: printSchema(schema),

        // tagName is gql by default
      },
    ],
    'import/prefer-default-export': OFF,
    'no-unused-vars': WARN,
    'react/jsx-filename-extension': [ERROR, { extensions: ['.jsx', '.tsx'] }],
    'react/no-unescaped-entities': ERROR,
    'consistent-return': OFF,
    'no-unused-expressions': OFF,
    'no-console': [WARN, { allow: ['info', 'warn', 'error'] }],
  },
  overrides: [
    {
      /* Typescript React Components */
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': OFF,
      },
    },
  ],

  settings: {
    // "import/extensions": [
    //   ".js",
    //   ".jsx"
    // ],
    // 'import/parsers': {
    //   '@typescript-eslint/parser': ['.ts', '.tsx'],
    // },
    "import/resolver": {
      "node": {
        "paths": ["src"]
      },
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
