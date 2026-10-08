import react from '@vitejs/plugin-react';
import { defineConfig, lazyPlugins } from 'vite-plus';

// https://vite.dev/config/
export default defineConfig({
    fmt: {
        tabWidth: 4,
        quoteProps: 'consistent',
        singleQuote: true,
        sortImports: {
            groups: [
                'type-import',
                ['value-builtin', 'value-external'],
                'type-internal',
                'value-internal',
                ['type-parent', 'type-sibling', 'type-index'],
                ['value-parent', 'value-sibling', 'value-index'],
                'unknown',
            ],
        },
    },
    staged: {
        '*': 'vp check --fix',
    },
    lint: {
        plugins: ['react', 'typescript', 'oxc'],
        rules: {
            'react/rules-of-hooks': 'error',
            'react/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],
            'vite-plus/prefer-vite-plus-imports': 'error',
        },
        options: {
            typeAware: true,
            typeCheck: true,
        },
        jsPlugins: [
            {
                name: 'vite-plus',
                specifier: 'vite-plus/oxlint-plugin',
            },
        ],
    },
    plugins: lazyPlugins(() => [react()]),
});
