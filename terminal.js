/* terminal.js — terminal mode logic. Depends on `projects` from script.js */

var TERM = (function () {
  'use strict';

  var lastCommand = '';
  var hasBooted   = false;

  // Ordered project keys (matches display order 1…N)
  var projectKeys = Object.keys(projects);

  /* ── helpers ─────────────────────────────────────── */

  function delay(ms) {
    return new Promise(function (res) { setTimeout(res, ms); });
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function outEl() { return document.getElementById('term-output'); }

  function scrollBottom() {
    var el = outEl();
    el.scrollTop = el.scrollHeight;
  }

  function appendLine(html, cls) {
    var div = document.createElement('div');
    div.className = 't-line' + (cls ? ' ' + cls : '');
    div.innerHTML = html;
    outEl().appendChild(div);
    scrollBottom();
    return div;
  }

  function blank() { appendLine('&nbsp;'); }

  function typeIn(text, cls, speed) {
    return new Promise(function (resolve) {
      var div = appendLine('', cls);
      var i = 0;
      speed = speed || 20;
      function tick() {
        if (i < text.length) {
          div.textContent += text[i++];
          scrollBottom();
          setTimeout(tick, speed);
        } else {
          resolve(div);
        }
      }
      tick();
    });
  }

  /* ── boot sequence ───────────────────────────────── */

  function boot() {
    var inputRow = document.getElementById('term-input-row');
    inputRow.style.display = 'none';

    delay(400)
      .then(function () { return typeIn('Irene Gallini', 't-name', 45); })
      .then(function () { return delay(80); })
      .then(function () { return typeIn('CS & Chemistry Student', 't-role', 28); })
      .then(function () { return delay(80); })
      .then(function () { return typeIn('Exploring how software connects research, data, and ideas.', 't-bio', 14); })
      .then(function () { return delay(300); })
      .then(function () {
        blank();
        appendLine('─'.repeat(50), 't-dim');
        appendLine("type <span class='t-cmd'>'help'</span> for commands", 't-dim');
        blank();
        inputRow.style.display = 'flex';
        document.getElementById('term-input').focus();
      });
  }

  /* ── command runner ──────────────────────────────── */

  function echoCmd(raw) {
    appendLine(
      "<span class='t-prompt-label'>irene@portfolio:~$</span> " +
      "<span class='t-typed'>" + esc(raw) + "</span>",
      't-echo'
    );
  }

  function run(raw) {
    raw = String(raw).trim();
    if (!raw) return;

    lastCommand = raw;
    echoCmd(raw);

    var parts = raw.toLowerCase().split(/\s+/);
    var name  = parts[0];

    if (name === 'clear') { outEl().innerHTML = ''; return; }

    if (name === 'open') {
      var n = parseInt(parts[1], 10);
      if (!n || n < 1 || n > projectKeys.length) {
        appendLine("<span class='t-error'>open: invalid number. Use 'projects' to see the list.</span>");
      } else {
        cmdOpen(n);
      }
      blank();
      return;
    }

    switch (name) {
      case 'help':     cmdHelp();     break;
      case 'about':    cmdAbout();    break;
      case 'projects': cmdProjects(); break;
      case 'skills':   cmdSkills();   break;
      case 'contact':  cmdContact();  break;
      default:
        appendLine("<span class='t-error'>command not found: " + esc(name) + ". Try 'help'.</span>");
    }
    blank();
  }

  /* ── commands ────────────────────────────────────── */

  function cmdHelp() {
    blank();
    [
      ['about',         'who I am'],
      ['projects',      'list all projects'],
      ['skills',        'technical skills'],
      ['contact',       'contact info'],
      ['open &lt;n&gt;','view project by number'],
      ['clear',         'clear terminal'],
    ].forEach(function (row) {
      appendLine(
        "  <span class='t-cmd'>" + row[0] + "</span>" +
        "<span class='t-dim pad'>" + row[1] + "</span>"
      );
    });
  }

  function cmdAbout() {
    blank();
    appendLine("<span class='t-head'>Irene Gallini</span>");
    appendLine('CS &amp; Chemistry Student');
    blank();
    appendLine('Exploring how software can connect different fields and');
    appendLine('turn technical ideas into useful tools. I build projects');
    appendLine('across research, data, and applications with a focus on');
    appendLine('accessibility and real-world impact.');
    blank();
    appendLine("<span class='t-dim'>Macalester College · 2026</span>");
  }

  function cmdProjects() {
    blank();
    projectKeys.forEach(function (key, i) {
      var p   = projects[key];
      var n   = i + 1;
      var tags = p.tags.slice(0, 3).join(', ');
      var row  = appendLine(
        "  <span class='t-idx'>" + String(n) + "</span>  " +
        "<span class='t-proj-title'>" + esc(p.title) + "</span>" +
        "<span class='t-dim'>  " + esc(tags) + "…</span>",
        't-proj-row'
      );
      (function (num) {
        row.addEventListener('click', function () { run('open ' + num); });
      }(n));
    });
    blank();
    appendLine("<span class='t-dim'>click a row or type 'open &lt;n&gt;'</span>");
  }

  function cmdSkills() {
    blank();
    [
      ['Languages',    'JavaScript · Swift · Python'],
      ['Web',          'React · Node.js &amp; Express · TailwindCSS'],
      ['Mobile/Cloud', 'SwiftUI · Firebase · PostgreSQL'],
      ['Research/AI',  'PyTorch · Drug Discovery · Machine Learning'],
    ].forEach(function (row) {
      appendLine(
        "  <span class='t-skill-cat'>" + row[0] + "</span>" +
        "<span class='t-dim'>" + row[1] + "</span>"
      );
    });
  }

  function cmdContact() {
    blank();
    [
      ['GitHub',   'https://github.com/IreneGallini',                      'github.com/IreneGallini'],
      ['Email',    'mailto:igallini@macalester.edu',                        'igallini@macalester.edu'],
      ['LinkedIn', 'https://www.linkedin.com/in/irene-gallini-38942b261/', 'linkedin.com/in/irene-gallini-38942b261'],
    ].forEach(function (row) {
      appendLine(
        "  <span class='t-skill-cat'>" + row[0] + "</span>" +
        "<a class='t-link' href='" + row[1] + "' target='_blank' rel='noopener'>" + row[2] + "</a>"
      );
    });
  }

  function cmdOpen(n) {
    var key = projectKeys[n - 1];
    if (!key) return;
    var p   = projects[key];
    var sep = '─'.repeat(44);

    blank();
    appendLine("<span class='t-dim'>" + sep + "</span>");
    appendLine("<span class='t-head'>" + n + '. ' + esc(p.title) + "</span>");
    appendLine("<span class='t-dim'>" + sep + "</span>");
    blank();
    appendLine("<span class='t-dim'>tags: " + esc(p.tags.join(', ')) + "</span>");
    blank();
    p.desc.split('\n\n').forEach(function (para) {
      appendLine(esc(para));
    });
    blank();
    p.links.forEach(function (link) {
      appendLine(
        "  → <span class='t-dim'>" + esc(link.label) + ":</span>  " +
        "<a class='t-link' href='" + esc(link.href) + "' target='_blank' rel='noopener'>" +
        esc(link.href.replace(/^https?:\/\//, '')) + "</a>"
      );
    });
    if (p.collab) {
      blank();
      appendLine("<span class='t-dim'>" + esc(p.collab) + "</span>");
    }
    appendLine("<span class='t-dim'>" + sep + "</span>");
  }

  /* ── sidebar ─────────────────────────────────────── */

  function buildSidebar() {
    var sidebar = document.getElementById('term-sidebar');
    var html    = '';

    html += "<div class='sidebar-section'><div class='sidebar-label'>Commands</div>";
    ['about', 'projects', 'skills', 'contact', 'clear'].forEach(function (cmd) {
      html += "<button class='sidebar-btn' onclick=\"TERM.run('" + cmd + "')\">" + cmd + "</button>";
    });
    html += "</div>";

    html += "<div class='sidebar-section'><div class='sidebar-label'>Projects</div>";
    projectKeys.forEach(function (key, i) {
      var n     = i + 1;
      var title = projects[key].title;
      var short = title.length > 13 ? title.slice(0, 13) + '…' : title;
      html += "<button class='sidebar-btn' onclick=\"TERM.run('open " + n + "')\" title='" +
        esc(title) + "'>open " + n + " · " + esc(short) + "</button>";
    });
    html += "</div>";

    sidebar.innerHTML = html;
  }

  /* ── mode control ────────────────────────────────── */

  function setMode(mode) {
    var termView = document.getElementById('terminal-view');
    var webView  = document.getElementById('web-view');
    var btn      = document.getElementById('mode-toggle');

    if (mode === 'terminal') {
      termView.classList.remove('hidden');
      webView.classList.add('hidden');
      btn.textContent = '[ web view ]';
      btn.classList.remove('web-mode');
      if (!hasBooted) { hasBooted = true; boot(); }
      else { document.getElementById('term-input').focus(); }
    } else {
      termView.classList.add('hidden');
      webView.classList.remove('hidden');
      btn.textContent = '[ terminal ]';
      btn.classList.add('web-mode');
    }

    localStorage.setItem('portfolioMode', mode);
  }

  function toggleMode() {
    var current = localStorage.getItem('portfolioMode') || 'terminal';
    setMode(current === 'terminal' ? 'web' : 'terminal');
  }

  /* ── init ────────────────────────────────────────── */

  function init() {
    buildSidebar();

    var input = document.getElementById('term-input');

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var val = input.value;
        input.value = '';
        run(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (lastCommand) {
          input.value = lastCommand;
          setTimeout(function () {
            input.setSelectionRange(input.value.length, input.value.length);
          }, 0);
        }
      }
    });

    outEl().addEventListener('click', function (e) {
      if (!e.target.closest('a') && !e.target.closest('.t-proj-row')) {
        input.focus();
      }
    });

    var saved = localStorage.getItem('portfolioMode') || 'terminal';
    setMode(saved);
  }

  /* ── public API ──────────────────────────────────── */
  return { init: init, toggleMode: toggleMode, run: run };
}());

TERM.init();
