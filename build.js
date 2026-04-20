const fs = require("fs");
const path = require("path");

const OUT = "dist";
const STATIC_FILES = ["index.html", "styles.css", "app.js", "bet4u-background.jpg"];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const file of STATIC_FILES) {
  fs.copyFileSync(file, path.join(OUT, file));
  console.log(`copied ${file}`);
}

const endpoint = process.env.LINKS_ENDPOINT || "";
const configContent = `window.APP_CONFIG = {\n  LINKS_ENDPOINT: ${JSON.stringify(endpoint)},\n};\n`;
fs.writeFileSync(path.join(OUT, "config.js"), configContent);

if (!endpoint) {
  console.warn("WARNING: LINKS_ENDPOINT env var is empty — config.js written with empty value.");
} else {
  console.log(`config.js written with LINKS_ENDPOINT="${endpoint}"`);
}
