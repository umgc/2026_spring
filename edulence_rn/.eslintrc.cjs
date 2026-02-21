module.exports = {
  root: true,
  extends: ['universe/native', 'universe/shared/typescript-analysis'],
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['security'],
  rules: {
    'security/detect-object-injection': 'warn'
  }
};
