import { defineConfig } from 'oxlint';

export default defineConfig({
    plugins: ['react'],
    rules: {
        'react/exhaustive-deps': 'warn',
    },
});
