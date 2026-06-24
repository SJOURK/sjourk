import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, basename } from "path";
import matter from "gray-matter";

const VIRTUAL_ID = "virtual:articles";
const RESOLVED_ID = "\0virtual:articles";

function compareArticles(a, b) {
  const orderA = a.order ?? 0;
  const orderB = b.order ?? 0;
  if (orderA !== orderB) return orderA - orderB;

  const hasDateA = a.date != null;
  const hasDateB = b.date != null;
  if (hasDateA !== hasDateB) return hasDateA ? -1 : 1;
  if (hasDateA) {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff !== 0) return dateDiff;
  }

  return a.slug.localeCompare(b.slug);
}

function parseArticle(filePath, slug) {
  const { data } = matter(readFileSync(filePath, "utf-8"));
  const date = data.date instanceof Date
    ? data.date.toISOString().slice(0, 10)
    : data.date;

  return {
    title: data.title,
    blurb: data.blurb,
    image: data.image,
    imageAlt: data.imageAlt,
    order: data.order,
    date,
    slug
  };
}

function buildModule() {
  const dir = resolve("articles");
  const topLevel = [];
  const subArticleMap = {};

  // Flat .mdx files
  readdirSync(dir)
    .filter(f => f.endsWith(".mdx"))
    .forEach(file => {
      const article = parseArticle(resolve(dir, file), basename(file, ".mdx"));
      topLevel.push(article);
    });

  // Subfolders with index.mdx
  readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .forEach(d => {
      const indexPath = resolve(dir, d.name, "index.mdx");
      if (!existsSync(indexPath)) return;

      const article = parseArticle(indexPath, d.name);
      topLevel.push(article);

      const subs = readdirSync(resolve(dir, d.name))
        .filter(f => f.endsWith(".mdx") && f !== "index.mdx")
        .map(file => parseArticle(resolve(dir, d.name, file), `${d.name}/${basename(file, ".mdx")}`))
        .sort(compareArticles);

      if (subs.length > 0) subArticleMap[d.name] = subs;
    });

  topLevel.sort(compareArticles);

  return `export default ${JSON.stringify(topLevel)};\nexport const subArticleMap = ${JSON.stringify(subArticleMap)};`;
}

export default function articlesPlugin() {
  return {
    name: "vite-plugin-articles",

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },

    load(id) {
      if (id === RESOLVED_ID) return buildModule();
    },

    configureServer(server) {
      const onChange = file => {
        if (!file.endsWith(".mdx")) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.add(resolve("articles"));
      server.watcher.on("add", onChange);
      server.watcher.on("change", onChange);
      server.watcher.on("unlink", onChange);
    },
  };
}
