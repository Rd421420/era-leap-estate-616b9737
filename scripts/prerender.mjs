// Pré-rendu statique : génère un index.html par route avec les balises head de Helmet.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");
const entryFile = fs.readdirSync(serverDir).find((f) => /^entry-server\.(m?js)$/.test(f));
const { render, blogSlugs } = await import(pathToFileURL(path.join(serverDir, entryFile)).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

const routes = [
  "/",
  "/louer-bien-dpe-f-g-perpignan",
  "/loyers-impayes-perpignan",
  "/logement-ne-se-loue-pas-perpignan",
  "/gestion-locative-perpignan",
  "/deleguer-ou-gerer-soi-meme",
  "/blog",
  "/mentions-legales",
  "/confidentialite",
  ...blogSlugs.map((s) => `/blog/${s}`),
];

const stripHead = (head) =>
  head
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, "");

const build = (url) => {
  const { html, helmet } = render(url);
  const tags = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((t) => t.toString()).join("\n    ")
    : "";
  return template
    .replace(/<head>([\s\S]*?)<\/head>/i, (_, inner) => `<head>${stripHead(inner)}    ${tags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

const written = [];
for (const url of routes) {
  const out = url === "/" ? path.join(dist, "index.html") : path.join(dist, url.slice(1), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, build(url));
  written.push(path.relative(root, out));
}
fs.writeFileSync(path.join(dist, "404.html"), build("/__page-introuvable__"));
written.push("dist/404.html");
console.log(`Pré-rendu : ${written.length} fichiers\n` + written.join("\n"));
