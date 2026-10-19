// Small Markdown renderer for the plan files (no dependencies).
// Supports: headings, paragraphs, lists (nested, ordered, task), tables, fenced code,
// blockquotes, horizontal rules, inline code/bold/italic/links/images, and the raw HTML
// used in the plan (<a id>, <details>, <summary>, <br>).
(function () {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function ghSlug(text) {
    return text.replace(/<[^>]+>/g, "").trim().toLowerCase()
      .replace(/[`*_~\[\]()]/g, "")
      .replace(/[^\p{L}\p{N} -]/gu, "")
      .replace(/ /g, "-");
  }

  function inline(text, opt) {
    // protect inline code
    const codes = [];
    text = text.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
    text = esc(text);
    // allowed raw html
    text = text.replace(/&lt;a id=&quot;([^&]+)&quot;&gt;&lt;\/a&gt;/g, '<a id="$1"></a>');
    text = text.replace(/&lt;br\s*\/?&gt;/g, "<br>");
    // images then links
    text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, src) => `<img alt="${alt}" src="${opt.link(src, true)}">`);
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, href) => {
      const h = opt.link(href.replace(/&amp;/g, "&"), false);
      const ext = /^https?:/.test(href);
      return `<a href="${h}"${ext ? ' target="_blank" rel="noopener"' : ""} data-src="${esc(href)}">${label}</a>`;
    });
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/(^|[^\w*])\*([^*\s][^*]*?)\*(?=[^\w*]|$)/g, "$1<em>$2</em>");
    text = text.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${esc(codes[+i])}</code>`);
    return text;
  }

  function render(src, opt) {
    opt = Object.assign({ link: (h) => h, taskify: false }, opt || {});
    const lines = src.replace(/\r\n/g, "\n").split("\n");
    let i = 0, html = "", olTop = 0;
    const out = (s) => { html += s; };

    function isTableSep(l) { return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l); }
    function cells(l) {
      l = l.trim().replace(/^\|/, "").replace(/\|$/, "");
      const res = []; let cur = "", inCode = false;
      for (let k = 0; k < l.length; k++) {
        const ch = l[k];
        if (ch === "`") inCode = !inCode;
        if (ch === "\\" && l[k + 1] === "|") { cur += "|"; k++; continue; }
        if (ch === "|" && !inCode) { res.push(cur.trim()); cur = ""; continue; }
        cur += ch;
      }
      res.push(cur.trim());
      return res;
    }

    function parseList(start) {
      // collect list lines (items + continuation) into a nested structure
      const items = [];
      let j = start;
      const listRe = /^(\s*)([-*+]|\d+\.)\s+(.*)$/;
      while (j < lines.length) {
        const l = lines[j];
        const m = l.match(listRe);
        if (m) { items.push({ indent: m[1].length, ordered: /\d/.test(m[2]), text: m[3] }); j++; continue; }
        if (l.trim() === "") {
          // blank line: list continues only if next line is a list item or indented
          const nx = lines[j + 1];
          if (nx !== undefined && (listRe.test(nx) || /^\s{2,}\S/.test(nx))) { j++; continue; }
          break;
        }
        if (/^\s{2,}\S/.test(l) && items.length) { items[items.length - 1].text += " " + l.trim(); j++; continue; }
        break;
      }
      // build html with a stack
      let h = "";
      const stack = [];
      for (const it of items) {
        while (stack.length && it.indent < stack[stack.length - 1].indent) { h += `</li></${stack.pop().tag}>`; }
        const top = stack[stack.length - 1];
        if (!top || it.indent > top.indent) {
          const tag = it.ordered ? "ol" : "ul";
          stack.push({ indent: it.indent, tag });
          h += `<${tag}>`;
        } else {
          h += "</li>";
        }
        let body = it.text;
        let prefix = "";
        const task = body.match(/^\[( |x|X)\]\s+(.*)$/);
        if (task) { prefix = `<input type="checkbox" disabled ${task[1] !== " " ? "checked" : ""}> `; body = task[2]; }
        if (opt.taskify && stack.length === 1 && stack[0].tag === "ol") {
          olTop++;
          prefix = `<input type="checkbox" class="step" data-step="${olTop}"> `;
        }
        h += `<li>${prefix}${inline(body, opt)}`;
      }
      while (stack.length) h += `</li></${stack.pop().tag}>`;
      return { html: h, next: j };
    }

    while (i < lines.length) {
      const l = lines[i];
      if (l.trim() === "") { i++; continue; }
      // fenced code
      const fence = l.match(/^\s*```(\w*)/);
      if (fence) {
        const lang = fence[1]; const buf = []; i++;
        while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        out(`<pre class="code${lang === "mermaid" ? " mermaid" : ""}"><code>${esc(buf.join("\n"))}</code></pre>`);
        continue;
      }
      // raw html block lines
      if (/^\s*<(a id=|\/?details|summary|br|div|\/div)/.test(l)) {
        const t = l.trim();
        if (/^<summary>/.test(t)) out(t.replace(/<summary>(.*)<\/summary>/, (m, s) => `<summary>${inline(s, opt)}</summary>`));
        else out(t);
        i++; continue;
      }
      // heading
      const hm = l.match(/^(#{1,6})\s+(.*)$/);
      if (hm) {
        const lvl = hm[1].length; const text = hm[2];
        out(`<h${lvl} id="${esc(ghSlug(text))}">${inline(text, opt)}</h${lvl}>`);
        i++; continue;
      }
      if (/^\s*(-{3,}|\*{3,})\s*$/.test(l)) { out("<hr>"); i++; continue; }
      // blockquote
      if (/^\s*>/.test(l)) {
        const buf = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, "")); i++; }
        out(`<blockquote>${render(buf.join("\n"), Object.assign({}, opt, { taskify: false }))}</blockquote>`);
        continue;
      }
      // table
      if (/^\s*\|/.test(l) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
        const head = cells(l); i += 2;
        let t = "<div class=\"tablewrap\"><table><thead><tr>" + head.map((c) => `<th>${inline(c, opt)}</th>`).join("") + "</tr></thead><tbody>";
        while (i < lines.length && /^\s*\|/.test(lines[i])) {
          t += "<tr>" + cells(lines[i]).map((c) => `<td>${inline(c, opt)}</td>`).join("") + "</tr>"; i++;
        }
        out(t + "</tbody></table></div>");
        continue;
      }
      // list
      if (/^(\s*)([-*+]|\d+\.)\s+/.test(l)) {
        const r = parseList(i); out(r.html); i = r.next; continue;
      }
      // paragraph
      const buf = [];
      while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,6}\s|\s*```|\s*>|\s*\|)/.test(lines[i])
             && !/^(\s*)([-*+]|\d+\.)\s+/.test(lines[i]) && !/^\s*<(a id=|\/?details|summary)/.test(lines[i])) {
        buf.push(lines[i]); i++;
      }
      if (!buf.length) { out(`<p>${inline(l, opt)}</p>`); i++; continue; }
      out(`<p>${buf.map((b) => inline(b.replace(/\s{2,}$/, ""), opt) + (/\s{2,}$/.test(b) ? "<br>" : "")).join(" ")}</p>`);
    }
    return html;
  }

  window.MD = { render, ghSlug, esc };
})();
