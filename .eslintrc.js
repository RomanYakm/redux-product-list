export default {
  'env': {
      'browser': true,
      'es2021': true
  },
  'extends': ['eslint:recommended'],
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single']
  },
  'parserOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module'
  },
};