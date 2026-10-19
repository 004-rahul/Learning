// Preparation app server — Node.js built-ins only, no packages to install.
// Serves the app, reads the plan's Markdown files, and saves your progress to app/data/progress.json.
// Run:  node server.js   (or double-click OPEN_APP.bat in the PREPARATION folder)
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 4321);
const HOST = "127.0.0.1"; // only reachable from this computer
const APP_DIR = __dirname;
const PREP_DIR = path.resolve(APP_DIR, "..");
const PUBLIC_DIR = path.join(APP_DIR, "public");
const DATA_DIR = path.join(APP_DIR, "data");
const PROGRESS = path.join(DATA_DIR, "progress.json");
const BACKUPS = path.join(DATA_DIR, "backups");

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".md": "text/markdown; charset=utf-8", ".png": "image/png",
  ".pdf": "application/pdf", ".csv": "text/csv; charset=utf-8", ".svg": "image/svg+xml",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function inside(base, rel) {
  const full = path.resolve(base, rel);
  return full === base || full.startsWith(base + path.sep) ? full : null;
}

function send(res, code, body, type) {
  res.writeHead(code, { "Content-Type": type || "text/plain; charset=utf-8", "Cache-Control": "no-store" });
  res.end(body);
}

function sendFile(res, file) {
  fs.readFile(file, (err, buf) => {
    if (err) return send(res, 404, "Not found");
    send(res, 200, buf, TYPES[path.extname(file).toLowerCase()] || "application/octet-stream");
  });
}

function listMarkdown(dir, rel = "") {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "app") continue;
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out = out.concat(listMarkdown(path.join(dir, e.name), r));
    else if (e.name.endsWith(".md")) out.push(r);
  }
  return out;
}

function search(q, includeArchive) {
  const needle = q.toLowerCase();
  const results = [];
  for (const rel of listMarkdown(PREP_DIR)) {
    if (!includeArchive && rel.startsWith("ARCHIVE/")) continue;
    const lines = fs.readFileSync(path.join(PREP_DIR, rel), "utf8").split(/\r?\n/);
    let anchor = "", heading = "";
    for (let i = 0; i < lines.length; i++) {
      const a = lines[i].match(/^<a id="([^"]+)"><\/a>$/);
      if (a) anchor = a[1];
      const h = lines[i].match(/^#{1,6}\s+(.*)$/);
      if (h) heading = h[1];
      if (lines[i].toLowerCase().includes(needle) && !a) {
        results.push({ file: rel, line: i + 1, anchor, heading, text: lines[i].trim().slice(0, 240) });
        if (results.length >= 200) return results;
      }
    }
  }
  return results;
}

function saveProgress(json) {
  fs.mkdirSync(BACKUPS, { recursive: true });
  const tmp = PROGRESS + ".tmp";
  fs.writeFileSync(tmp, json);
  fs.renameSync(tmp, PROGRESS);
  // one backup per day, keep the last 30
  const day = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(BACKUPS, `progress-${day}.json`), json);
  const old = fs.readdirSync(BACKUPS).filter((f) => f.startsWith("progress-")).sort();
  while (old.length > 30) fs.unlinkSync(path.join(BACKUPS, old.shift()));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const p = decodeURIComponent(url.pathname);

  if (p === "/api/progress" && req.method === "GET") {
    if (!fs.existsSync(PROGRESS)) return send(res, 200, "{}", TYPES[".json"]);
    return sendFile(res, PROGRESS);
  }
  if (p === "/api/progress" && req.method === "PUT") {
    let body = "";
    req.on("data", (c) => { body += c; if (body.length > 20e6) req.destroy(); });
    req.on("end", () => {
      try {
        JSON.parse(body);
        saveProgress(body);
        send(res, 200, '{"ok":true}', TYPES[".json"]);
      } catch (e) {
        send(res, 400, JSON.stringify({ ok: false, error: String(e.message || e) }), TYPES[".json"]);
      }
    });
    return;
  }
  if (p === "/api/doc") {
    const rel = url.searchParams.get("path") || "";
    const file = inside(PREP_DIR, rel);
    if (!file || !file.endsWith(".md")) return send(res, 400, "Bad path");
    return sendFile(res, file);
  }
  if (p === "/api/list") return send(res, 200, JSON.stringify(listMarkdown(PREP_DIR)), TYPES[".json"]);
  if (p === "/api/search") {
    const q = (url.searchParams.get("q") || "").trim();
    if (q.length < 2) return send(res, 200, "[]", TYPES[".json"]);
    return send(res, 200, JSON.stringify(search(q, url.searchParams.get("archive") === "1")), TYPES[".json"]);
  }
  if (p.startsWith("/files/")) {
    const file = inside(PREP_DIR, p.slice("/files/".length));
    if (!file) return send(res, 400, "Bad path");
    return sendFile(res, file);
  }
  const rel = p === "/" ? "index.html" : p.slice(1);
  const file = inside(PUBLIC_DIR, rel);
  if (!file) return send(res, 400, "Bad path");
  return sendFile(res, file);
});

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.log(`The app is probably already running. Open http://localhost:${PORT}`);
    process.exit(0);
  }
  throw e;
});

server.listen(PORT, HOST, () => {
  console.log(`Preparation app running at http://localhost:${PORT}`);
  console.log(`Progress is saved to ${PROGRESS}`);
  console.log("Keep this window open while you use the app. Close it (or press Ctrl+C) to stop.");
});
