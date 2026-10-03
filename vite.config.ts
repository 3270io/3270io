import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";

import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path'
import { readFileSync } from 'node:fs'

const facts = JSON.parse(readFileSync(new URL('./src/lib/product-facts.json', import.meta.url), 'utf8'))
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://3270.io/#organization', name: '3270.io', url: 'https://3270.io/', logo: 'https://3270.io/icon-512.png', sameAs: ['https://github.com/3270io'] },
    { '@type': 'WebSite', '@id': 'https://3270.io/#website', name: '3270.io', url: 'https://3270.io/', inLanguage: 'en', publisher: { '@id': 'https://3270.io/#organization' } },
    ...Object.values(facts).map((product) => {
      const p = product as { name: string; url: string; description: string; operatingSystem: string; licenceUrl: string }
      return { '@type': 'SoftwareApplication', '@id': p.url + '#software', name: p.name, url: p.url, description: p.description, applicationCategory: 'DeveloperApplication', operatingSystem: p.operatingSystem, license: p.licenceUrl, publisher: { '@id': 'https://3270.io/#organization' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }
    }),
  ],
}


const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: "/",
  plugins: [
    { name: "product-metadata", transformIndexHtml: (html) => html.replace("<!--product-schema-->", `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`) },
    react(),
    tailwindcss(),
    // DO NOT REMOVE
    createIconImportProxy() as PluginOption,
    sparkPlugin({ outputDir: isSsrBuild ? ".prerender" : "dist", includeProxy: !isSsrBuild }) as PluginOption,
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
}));
