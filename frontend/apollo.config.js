module.exports = {
  client: {
    service: {
      name: 'backend',
      url: 'http://localhost:8000/graphql/',
      // optional headers
      // headers: {
      //   authorization: 'Bearer lkjfalkfjadkfjeopknavadf'
      // },
      // optional disable SSL validation check
      skipSSLValidation: true,
      localSchemaFile: './graphql.schema.json'
    },
    excludes: ['src/**/api.tsx',],

  },
  queries: [
    {
      schema: 'client',
      // includes: ['src/**/*.tsx', 'src/**/*.ts'],
      // excludes: ['src/**/Connect.tsx', 'src/**/ConnectSection.tsx'],
      // excludes: ['./src/api/graphql/api.tsx',],
    },
  ],
};