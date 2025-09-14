const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const ignoreList = ["node_modules", ".git", ".github"];

const folders = fs
  .readdirSync(rootDir, { withFileTypes: true })
  .filter(
    dir =>
      dir.isDirectory() &&
      !ignoreList.includes(dir.name) &&
      fs.existsSync(path.join(rootDir, dir.name, "index.html"))
  )
  .map(dir => dir.name)
  .sort((a,b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML/CSS/JS Playground</title>
  <style>
    body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 2rem; max-width: 900px; margin: auto; }
    header { display:flex; align-items:center; gap:1rem; }
    h1 { margin: 0; font-size: 1.6rem; }
    .grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem; }
    .card { padding: 1rem; border: 1px solid #e6e6e6; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
    .card a { text-decoration: none; color: #0b5fff; font-weight: 600; }
    .meta { color: #666; font-size: 0.9rem; margin-top: .5rem; }
    footer { margin-top: 2rem; color: #666; font-size: 0.85rem; }
    footer p { text-align: center; }
  </style>
</head>
<body>
  <header>
    <h1>HTML / CSS / JS Playground</h1>
  </header>

  <p>Automatically generated index of subprojects. Each item links to a folder that contains its own <code>index.html</code>.</p>

  <div class="grid">
    ${folders.map(f => `<div class="card"><a href="./${f}/">${f}</a><div class="meta">/${f}/index.html</div></div>`).join("\n            ")}
  </div>

   <footer>
    <p>Copyright © <span id="year"></span> - MN Research</p>
  </footer>
</body>
<script>
  document.getElementById('year').textContent = new Date().getFullYear();
</script>
</html>`;

fs.writeFileSync(path.join(rootDir, "index.html"), htmlContent, "utf8");
console.log(`✅ index.html updated with ${folders.length} projects.`);
