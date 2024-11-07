import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                  {
                    urlPattern: ({ url }) => {
                      return url.pathname.startsWith("/api");
                    },
                    handler: "NetworkFirst",
                    options: {
                      cacheName: "api-cache",
                      cacheableResponse: {
                        statuses: [0, 200],
                      },
                    },
                  },
                ],

                

              },
        })
    ],
    base: "/mobi/",
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    }
});