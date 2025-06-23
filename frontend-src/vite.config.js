import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    // build config
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                login: path.resolve(__dirname, 'login', 'index.html'),
                user: path.resolve(__dirname, 'user', 'index.html'),
                admin: path.resolve(__dirname, 'admin', 'index.html'),
            }
        },
        outDir: path.resolve(__dirname, '../frontend'),
        emptyOutDir: true,
    },
    root: __dirname
}))