import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";

const projectRoot = new URL("../", import.meta.url);
const contentSource = await readFile(new URL("content.js", projectRoot), "utf8");

function render(pathname) {
  let renderedHtml = "";
  const siteMain = {};

  Object.defineProperty(siteMain, "innerHTML", {
    get: () => renderedHtml,
    set: (value) => { renderedHtml = value; },
  });

  const context = vm.createContext({
    window: { location: { pathname } },
    document: {
      getElementById(id) {
        if (id !== "site-main") throw new Error(`Unexpected element id: ${id}`);
        return siteMain;
      },
    },
  });

  new vm.Script(contentSource, { filename: "content.js" }).runInContext(context);
  return renderedHtml.trim();
}

async function writeStaticPage(filename, pathname) {
  const pageUrl = new URL(filename, projectRoot);
  const pageSource = await readFile(pageUrl, "utf8");
  const mainPattern = /(<main\b[^>]*\bid=["']site-main["'][^>]*>)[\s\S]*?(<\/main>)/;

  if (!mainPattern.test(pageSource)) {
    throw new Error(`Could not find #site-main in ${filename}`);
  }

  const renderedHtml = render(pathname);
  const generatedPage = pageSource.replace(
    mainPattern,
    (_match, openingTag, closingTag) => `${openingTag}\n      <!-- Static content generated from content.js; do not edit this block directly. -->\n${renderedHtml}\n    ${closingTag}`,
  );
  await writeFile(pageUrl, generatedPage);
}

await writeStaticPage("index.html", "/index.html");
await writeStaticPage("research.html", "/research.html");
await writeStaticPage("en/index.html", "/en/index.html");
await writeStaticPage("en/research.html", "/en/research.html");

console.log("Generated static content in the Chinese and English pages");
