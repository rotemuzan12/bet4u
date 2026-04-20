const fs = require("fs");

const endpoint = process.env.LINKS_ENDPOINT || "";
const content = `window.APP_CONFIG = {\n  LINKS_ENDPOINT: ${JSON.stringify(endpoint)},\n};\n`;

fs.writeFileSync("config.js", content);
console.log(`config.js written with LINKS_ENDPOINT="${endpoint}"`);
