function init() {
  // Mobile nav toggle
  var toggle = document.querySelector('.navtoggle');
  var overlay = document.querySelector('.navoverlay');

  if (toggle && overlay) {
    var closeBtn = overlay.querySelector('.closebtn');

    toggle.addEventListener('click', function () {
      var isOpen = overlay.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        overlay.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        overlay.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Career-timeline "scope of each role" toggle
  var scopeToggle = document.getElementById('scopeToggle');
  var scopeWrap = document.getElementById('scopeWrap');
  var scopePanel = document.getElementById('scopePanel');
  if (scopeToggle && scopeWrap && scopePanel) {
    scopeToggle.addEventListener('click', function () {
      var isOpen = scopeToggle.getAttribute('aria-expanded') === 'true';
      scopeToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      scopeWrap.classList.toggle('open', !isOpen);
      scopePanel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      scopeToggle.querySelector('span:first-child').textContent = isOpen
        ? 'Show scope of each role'
        : 'Hide scope of each role';
    });
  }

  // Mobile: each job has its own independent scope toggle
  document.querySelectorAll('.roleScopeToggle').forEach(function (btn) {
    var wrap = btn.nextElementSibling;
    if (!wrap) return;
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      wrap.classList.toggle('open', !isOpen);
      btn.querySelector('span').textContent = isOpen ? 'Show scope' : 'Hide scope';
    });
  });

  // Slide-in-from-bottom reveal as sections scroll into view
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      // No IntersectionObserver support: just show everything.
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  // Back-to-top button
  var toTopBtn = document.getElementById('toTopBtn');
  if (toTopBtn) {
    var toggleToTopBtn = function () {
      toTopBtn.classList.toggle('show', window.scrollY > 600);
    };
    toggleToTopBtn();
    window.addEventListener('scroll', toggleToTopBtn, { passive: true });

    toTopBtn.addEventListener('click', function () {
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  // Copy-to-clipboard buttons on the contact card
  document.querySelectorAll('.copyBtn').forEach(function (btn) {
    var text = btn.getAttribute('data-copy');
    if (!text) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var showCopied = function () {
        btn.classList.add('copied');
        clearTimeout(btn._copyTimeout);
        btn._copyTimeout = setTimeout(function () {
          btn.classList.remove('copied');
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(function () {
          fallbackCopy(text);
          showCopied();
        });
      } else {
        fallbackCopy(text);
        showCopied();
      }
    });
  });

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* no-op */ }
    document.body.removeChild(ta);
  }
}

// Guard against the DOMContentLoaded event having already fired by the time
// this script runs (e.g. loaded late, or restored from cache).
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// CV viewer overlay: opens over the page, no navigation
(function () {
  var modal = document.getElementById('cvModal');
  var openBtn = document.getElementById('viewCvBtn');
  var closeBtn = document.getElementById('cvClose');
  var frame = document.getElementById('cvFrame');
  var stage = document.getElementById('cvStage');
  var scroller = document.getElementById('cvScroll');
  if (!modal || !openBtn || !frame || !stage || !scroller) return;
  var DOC_W = 794;
  var lastFocus = null;

  function fit() {
    var avail = scroller.clientWidth - parseFloat(getComputedStyle(scroller).paddingLeft) * 2;
    var scale = Math.min(1, avail / DOC_W);
    var h = 0;
    try { h = frame.contentDocument.documentElement.scrollHeight; } catch (e) { h = 0; }
    if (!h) return;
    frame.style.height = h + 'px';
    frame.style.transform = 'scale(' + scale + ')';
    stage.style.width = DOC_W * scale + 'px';
    stage.style.height = h * scale + 'px';
  }

  frame.addEventListener('load', function () {
    fit();
    try {
      if (frame.contentDocument.fonts && frame.contentDocument.fonts.ready) {
        frame.contentDocument.fonts.ready.then(fit);
      }
    } catch (e) { /* no-op */ }
  });
  window.addEventListener('resize', function () { if (modal.classList.contains('open')) fit(); });

  function openCv() {
    lastFocus = document.activeElement;
    if (!frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
    modal.removeAttribute('inert');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cv-open');
    scroller.scrollTop = 0;
    closeBtn.focus();
    fit();
  }
  function closeCv() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('inert', '');
    document.body.classList.remove('cv-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  openBtn.addEventListener('click', openCv);
  closeBtn.addEventListener('click', closeCv);
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') { closeCv(); return; }
    if (e.key === 'Tab') {
      var f = modal.querySelectorAll('a[href], button');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
