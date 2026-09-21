import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSlug from "rehype-slug";
import remarkLetterLists from "./remark-plugin-letter-lists.js";
import articlesPlugin from "./vite-plugin-articles.js";
import imagesPlugin from "./vite-plugin-images.js";
import listIndentPlugin from "./vite-plugin-list-indent.js";

export default defineConfig({
  plugins: [
    articlesPlugin(),
    imagesPlugin(),
    listIndentPlugin(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkGfm, remarkSmartypants, remarkLetterLists],
      rehypePlugins: [rehypeSlug],
      providerImportSource: "@mdx-js/react",
    }),
    react(),
  ],
  base: '/sjourk/',
});
