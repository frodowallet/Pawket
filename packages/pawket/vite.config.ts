// vite.config.js

import { defineConfig } from 'vite'
import { createVuePlugin as vue } from "vite-plugin-vue2";
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

const htmlPlugin = () => {
    return {
        name: "html-transform",
        transformIndexHtml(html: string) {
            html = html.replace("%APPNAME%", "Pawket");
            html = html.replace("%ENTRY%", "main.ts");
            return html;
        },
    };
};

export default defineConfig(({ mode }) => ({
    base: "/",
    plugins: [
        htmlPlugin(),
        vue(),
    ],
    define: {
        'process.env.NODE_ENV': process.env.NODE_ENV,
        'process.env.VITE_API_URL': process.env.VITE_API_URL,
        'process.env.VITE_API_URL_TESTNET': process.env.VITE_API_URL_TESTNET,
        'process.env.VITE_VERSION': process.env.VITE_VERSION,
    },
    publicDir: './public/pawket',
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
            { find: /^~/, replacement: '../../node_modules/', },
            { find: 'clvm_tools', replacement: fileURLToPath(new URL('../../node_modules/clvm_tools/browser', import.meta.url)) },
        ]
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "esnext",
            define: {
                global: 'globalThis'
            },
            supported: {
                bigint: true
            },
        }
    },
    server: {
        port: 8080,
    },
    build: {
        target: ["esnext"],
        outDir: "../../dist/web",
        emptyOutDir: true,
        rollupOptions: {
            plugins: [
                mode === 'analyze' &&
                visualizer({
                    open: true,
                    filename: '../../dist/web.stats.html',
                    gzipSize: true,
                    brotliSize: true,
                }),
            ],
        },
    },
}))