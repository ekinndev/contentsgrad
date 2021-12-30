module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                printWidth: 120,
                singleQuote: true,
                tabWidth: 4,
                semi: true,
                trailingComma: 'all',
                arrowParens: 'avoid',
                endOfLine: 'auto',
            },
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
};
