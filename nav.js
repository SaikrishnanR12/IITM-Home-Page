/* ============================================================
   nav.js — single source of truth for the site's header/nav.
   To add a new page: add ONE entry to PAGES below.
   Nothing else needs to change on any existing page.
   ============================================================ */
(function () {
  var PAGES = [
    { href: 'index.html', label: 'Home' },
    {
      href: 'statistics1.html',
      label: 'Statistics 1',
      children: [
        { href: 'activity1.html', label: 'Activity 1' },
        { href: 'activity2.html', label: 'Activity 2' },
        { href: 'activity3.html', label: 'Activity 3' },
        { href: 'activity4.html', label: 'Activity 4' }
        // Add future activities here — they'll show up on every page automatically.
      ]
    },
    { href: 'about.html', label: 'About' }
  ];

  var BRAND_LABEL = 'My CSE Portfolio';
  var BRAND_HREF = 'index.html';

  var CSS = ""
    + "nav.site-nav{display:flex;justify-content:space-between;align-items:center;"
    + "max-width:960px;margin:0 auto;padding:20px 32px;position:sticky;top:0;z-index:1000;"
    + "background:rgba(10,18,14,0.42);backdrop-filter:blur(16px) saturate(160%);-webkit-backdrop-filter:blur(16px) saturate(160%);"
    + "border-bottom:1px solid rgba(255,255,255,0.08);font-family:'Inter',system-ui,-apple-system,sans-serif;"
    + "box-sizing:border-box;}"
    + "nav.site-nav *{box-sizing:border-box;}"
    + "nav.site-nav .site-nav-brand{font-family:'JetBrains Mono',monospace;font-weight:700;"
    + "font-size:14px;letter-spacing:1px;}"
    + "nav.site-nav .site-nav-brand a{color:#F2B705;text-decoration:none;}"
    + "nav.site-nav .site-nav-links{display:flex;gap:26px;align-items:center;font-size:14px;}"
    + "nav.site-nav .site-nav-links>a,nav.site-nav .site-nav-dropdown>a{"
    + "color:#B9CCC0;text-decoration:none;position:relative;padding-bottom:4px;"
    + "transition:color .15s;white-space:nowrap;}"
    + "nav.site-nav .site-nav-links>a:hover,nav.site-nav .site-nav-dropdown>a:hover{color:#F2B705;}"
    + "nav.site-nav .site-nav-links>a.active,nav.site-nav .site-nav-dropdown>a.active{"
    + "color:#F2B705;font-weight:600;}"
    + "nav.site-nav .site-nav-links>a.active::after,nav.site-nav .site-nav-dropdown>a.active::after{"
    + "content:'';position:absolute;left:0;right:0;bottom:-4px;height:2px;"
    + "background:linear-gradient(90deg,#F2B705,#FFDE59);border-radius:2px;}"
    + "nav.site-nav .site-nav-dropdown{position:relative;}"
    + "nav.site-nav .site-nav-dropdown-menu{display:none;position:absolute;top:26px;left:0;"
    + "background:#0F2B1C;border:1px solid rgba(255,255,255,0.12);border-radius:10px;"
    + "min-width:150px;padding:6px;z-index:10;box-shadow:0 12px 30px -10px rgba(0,0,0,0.5);}"
    + "nav.site-nav .site-nav-dropdown:hover .site-nav-dropdown-menu,"
    + "nav.site-nav .site-nav-dropdown.open .site-nav-dropdown-menu{display:block;}"
    + "nav.site-nav .site-nav-dropdown-menu a{display:block;padding:8px 10px;border-radius:6px;"
    + "font-size:13px;color:#B9CCC0;text-decoration:none;}"
    + "nav.site-nav .site-nav-dropdown-menu a:hover{background:#153623;color:#F2B705;}"
    + "nav.site-nav .site-nav-dropdown-menu a.active{color:#F2B705;font-weight:700;"
    + "text-decoration:underline;text-decoration-color:#F2B705;text-decoration-thickness:2px;"
    + "text-underline-offset:4px;}"
    + "nav.site-nav .site-nav-toggle{display:none;background:none;border:none;"
    + "color:#EAF3EA;font-size:22px;cursor:pointer;line-height:1;padding:2px 4px;}"
    + "@media (max-width:720px){"
    + "nav.site-nav{padding:16px 20px;flex-wrap:wrap;}"
    + "nav.site-nav .site-nav-toggle{display:block;}"
    + "nav.site-nav .site-nav-links{display:none;flex-direction:column;align-items:flex-start;"
    + "gap:2px;width:100%;margin-top:14px;}"
    + "nav.site-nav .site-nav-links.open{display:flex;}"
    + "nav.site-nav .site-nav-dropdown{width:100%;padding:6px 0;}"
    + "nav.site-nav .site-nav-dropdown-menu{position:static;display:none;margin:8px 0 4px 12px;"
    + "border:none;background:rgba(255,255,255,0.04);box-shadow:none;}"
    + "nav.site-nav .site-nav-dropdown.open .site-nav-dropdown-menu{display:block;}"
    + "}";

  function currentPage() {
    var p = location.pathname.split('/').pop();
    return p === '' ? 'index.html' : p;
  }

  function buildLinksHTML(current) {
    var html = '';
    PAGES.forEach(function (page) {
      if (page.children) {
        var childActive = page.children.some(function (c) { return c.href === current; });
        var selfActive = page.href === current || childActive;
        html += '<div class="site-nav-dropdown' + (selfActive ? ' open-hint' : '') + '">';
        html += '<a href="' + page.href + '" class="' + (selfActive ? 'active' : '') + '">' + page.label + ' \u25BE</a>';
        html += '<div class="site-nav-dropdown-menu">';
        page.children.forEach(function (c) {
          html += '<a href="' + c.href + '" class="' + (c.href === current ? 'active' : '') + '">' + c.label + '</a>';
        });
        html += '</div></div>';
      } else {
        html += '<a href="' + page.href + '" class="' + (page.href === current ? 'active' : '') + '">' + page.label + '</a>';
      }
    });
    return html;
  }

  function inject() {
    var current = currentPage();

    var style = document.createElement('style');
    style.setAttribute('data-nav', 'true');
    style.textContent = CSS;
    document.head.appendChild(style);

    var mount = document.getElementById('site-nav');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'site-nav';
      document.body.insertBefore(mount, document.body.firstChild);
    }

    var nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML =
      '<div class="site-nav-brand"><a href="' + BRAND_HREF + '">' + BRAND_LABEL + '</a></div>' +
      '<div class="site-nav-links">' + buildLinksHTML(current) + '</div>' +
      '<button class="site-nav-toggle" aria-label="Toggle menu">\u2630</button>';

    mount.replaceWith(nav);

    var toggle = nav.querySelector('.site-nav-toggle');
    var linksEl = nav.querySelector('.site-nav-links');
    if (toggle && linksEl) {
      toggle.addEventListener('click', function () {
        linksEl.classList.toggle('open');
      });
    }
    nav.querySelectorAll('.site-nav-dropdown > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 720) {
          e.preventDefault();
          a.parentElement.classList.toggle('open');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
