import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        aboutUs: resolve(__dirname, 'AboutUs.html'),
        productDetail: resolve(__dirname, 'ProductDetail.html'),
        faq: resolve(__dirname, 'compte.html'),
        terms: resolve(__dirname, 'conditionsGenerales..html'),
        privacyPolicy: resolve(__dirname, 'PrivacyPolicy.html'),
        legalNotice: resolve(__dirname, 'LegalNotice.html'),
      },
    },
  },
})
