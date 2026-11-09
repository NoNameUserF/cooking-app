import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/react-virtualized')) return 'vendor-virtualized'
                    if (id.includes('node_modules/browser-image-compression')) return 'vendor-image'
                    if (id.includes('node_modules/xml-js')) return 'vendor-xml'

                    if (
                        id.includes('node_modules/react/') ||
                        id.includes('node_modules/react-dom/') ||
                        id.includes('node_modules/react-router-dom/')
                    ) return 'vendor-react'
                },
            },
        },
    },

    optimizeDeps: {
        include: ['react-virtualized', 'browser-image-compression', 'xml-js'],
        exclude: [],
    },
});