module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // eslint
    'no-sequences': 'off',
    'no-underscore-dangle': 'off',
    'default-case': 'off',
    'class-methods-use-this': 'off',
    'no-unused-expressions': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'max-classes-per-file': 'off',
    'no-unused-vars': 'off',
    'no-nested-ternary': 'off',
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    radix: 'off',
    'guard-for-in': 'off',
    'no-case-declarations': 'off',
    'no-useless-return': 'off',
    'no-await-in-loop': 'off',
    'no-bitwise': 'off',
    'global-require': 'off',
    'no-continue': 'off',
    camelcase: 'off',
    'no-restricted-properties': 'off',
    'no-useless-escape': 'off',
    'import/no-extraneous-dependencies': 'off',
    "no-undef": 'off',

    // type-script
    '@typescript-eslint/no-unused-vars': 'off',

    // react
    'react/forbid-foreign-prop-types': 'off',
    'react/no-unused-state': 'off',
    'react/no-did-update-set-state': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/prefer-stateless-function': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],

    // prettier
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        endOfLine: 'auto',
        singleQuote: true,
        printWidth: 100,
      },
    ],
  },
};
