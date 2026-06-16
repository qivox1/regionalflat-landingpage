/* =========================================================
   regionalflat.de — GEO Landingpage · app.js
   ========================================================= */
(function () {
  'use strict';
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- NAV scroll state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- HERO: typing → reveal recommendations ---------- */
  var sim = document.getElementById('sim');
  var aiIntro = document.getElementById('aiIntro');
  var recoItems = document.querySelectorAll('#reco .reco-item, #reco .reco-gap');
  var simPlayed = false;
  function playSim() {
    if (simPlayed) return; simPlayed = true;
    if (prefersReduced) {
      aiIntro.textContent = 'Gerne! In Ihrer Region werden besonders häufig empfohlen:';
      recoItems.forEach(function (el) { el.classList.add('show'); });
      return;
    }
    setTimeout(function () {
      aiIntro.textContent = 'Gerne! In Ihrer Region werden besonders häufig empfohlen:';
      recoItems.forEach(function (el, i) {
        setTimeout(function () { el.classList.add('show'); }, 380 + i * 520);
      });
    }, 1300);
  }
  if (sim) {
    if ('IntersectionObserver' in window && !prefersReduced) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { playSim(); sio.disconnect(); } });
      }, { threshold: 0.4 });
      sio.observe(sim);
    } else { playSim(); }
  }

  /* ---------- SELBSTTEST: copy button ---------- */
  var copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var txt = document.getElementById('copyText').textContent.trim().replace(/\s+/g, ' ');
      var label = copyBtn.querySelector('.cbtxt');
      function done() {
        copyBtn.classList.add('copied');
        if (label) label.textContent = 'Kopiert ✓';
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          if (label) label.textContent = 'Frage kopieren';
        }, 1900);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done).catch(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  }

  /* ---------- BRANCHEN-SPIEGEL ---------- */
  var branchen = [
    { name: 'Dachdecker',        q: 'Welcher <span class="v">Dachdecker</span> in {STADT} kommt auch kurzfristig?', sub: 'Notfälle &amp; Termindruck — wer zuerst genannt wird, bekommt den Anruf.' },
    { name: 'Elektriker',        q: 'Guter <span class="v">Elektriker</span> in {STADT} für eine neue Wallbox?', sub: 'Spezialanfragen wie E-Mobilität entscheiden sich heute in der KI-Antwort.' },
    { name: 'Sanitär &amp; Heizung', q: '<span class="v">Heizungsbauer</span> in {STADT} für eine Wärmepumpe gesucht.', sub: 'Förderung, Wärmepumpe, Umbau — Kunden fragen die KI nach Expertise.' },
    { name: 'Maler',             q: 'Welcher <span class="v">Maler</span> in {STADT} macht auch kleinere Aufträge?', sub: 'Kleine Jobs, große Wirkung — die KI sortiert nach Verfügbarkeit und Ruf.' },
    { name: 'Tischler',          q: '<span class="v">Schreiner</span> in {STADT} für Möbel nach Maß?', sub: 'Hochwertige Einzelstücke — Kunden suchen gezielt nach Spezialisten.' },
    { name: 'Kfz-Werkstatt',     q: 'Ehrliche <span class="v">Autowerkstatt</span> in {STADT} mit fairen Preisen?', sub: '„Ehrlich", „fair", „schnell" — die KI bewertet, was über Sie geschrieben steht.' },
    { name: 'Bäckerei',          q: 'Beste <span class="v">Bäckerei</span> in {STADT} mit Sonntagsverkauf?', sub: 'Öffnungszeiten &amp; Spezialitäten entscheiden die spontane Empfehlung.' },
    { name: 'Restaurant',        q: 'Schönes <span class="v">Restaurant</span> in {STADT} für ein Geschäftsessen?', sub: 'Anlassbezogene Suche — die KI nennt 3 Häuser. Sind Sie eines davon?' },
    { name: 'Friseur',           q: 'Guter <span class="v">Friseur</span> in {STADT} für Balayage?', sub: 'Spezialleistungen ziehen Neukunden — wenn die KI Sie dafür kennt.' },
    { name: 'Zahnarzt',          q: 'Welche <span class="v">Zahnarztpraxis</span> in {STADT} nimmt neue Patienten?', sub: 'Vertrauensbranche: Die KI-Empfehlung ersetzt die Empfehlung vom Nachbarn.' },
    { name: 'Apotheke',          q: '<span class="v">Apotheke</span> in {STADT} mit Notdienst heute?', sub: 'Dringlichkeit pur — hier zählt nur, wer sofort gefunden wird.' },
    { name: 'Steuerberater',     q: 'Empfehlenswerter <span class="v">Steuerberater</span> in {STADT} für Handwerksbetriebe?', sub: 'B2B-Anfragen mit hohem Auftragswert — genau hier zählt jede Nennung.' },
    { name: 'Immobilien',        q: 'Seriöser <span class="v">Immobilienmakler</span> in {STADT}?', sub: 'Hohe Auftragswerte — Vertrauen entscheidet, und das liest die KI mit.' },
    { name: 'Fahrschule',        q: 'Welche <span class="v">Fahrschule</span> in {STADT} hat schnell freie Plätze?', sub: 'Verfügbarkeit schlägt alles — die KI empfiehlt, wer erreichbar wirkt.' },
    { name: 'Hotel',             q: '<span class="v">Hotel</span> in {STADT} mit Parkplatz für eine Nacht?', sub: 'Reise- &amp; Geschäftsplanung läuft zunehmend über KI-Empfehlungen.' },
    { name: 'Gebäudereinigung',  q: 'Zuverlässige <span class="v">Gebäudereinigung</span> in {STADT}?', sub: 'Wiederkehrende Aufträge — wer empfohlen wird, bindet Kunden langfristig.' }
  ];
  var chipWrap = document.getElementById('brancheChips');
  var mirrorQ = document.getElementById('mirrorQ');
  var mirrorSub = document.getElementById('mirrorSub');
  var currentStadt = 'Minden';

  function renderMirror(idx) {
    var b = branchen[idx];
    mirrorQ.style.opacity = 0;
    setTimeout(function () {
      mirrorQ.innerHTML = '„' + b.q.replace('{STADT}', '<span class="v">' + currentStadt + '</span>') + '"';
      mirrorSub.innerHTML = b.sub;
      mirrorQ.style.opacity = 1;
    }, 160);
  }
  if (chipWrap) {
    branchen.forEach(function (b, i) {
      var c = document.createElement('button');
      c.className = 'chip' + (i === 0 ? ' active' : '');
      c.textContent = b.name;
      c.addEventListener('click', function () {
        chipWrap.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('active'); });
        c.classList.add('active');
        renderMirror(i);
        syncPersonalization(b.name, currentStadt);
      });
      chipWrap.appendChild(c);
    });
    renderMirror(0);
  }

  /* ---------- SELBSTTEST: Branchen-Dropdowns (Ober-/Unterkategorie) ---------- */
  var brancheTree = {
    'Handwerk': ['Bau','Bäckerei/Konditorei','Dachdecker','Elektro','Fleischverarbeitung/Metzgerei','Friseur und Kosmetik','Garten- und Landschaftsbau','Goldschmied','Kfz-Handwerk','Maler und Lackierer','Optiker &amp; Augenoptik','Orthopädietechnik','Sanitär','Sonstiges Handwerk','Tischler/Schreiner','Uhrmacher &amp; Juwelier','Zahntechnik'],
    'Handel': ['Baumarkt/Heimwerkerhandel','Einzelhandel','Elektronikhandel','Großhandel','Kfz-Handel','Lebensmittelhandel','Modehandel','Möbelhandel'],
    'Dienstleistung': ['Immobilien','Reinigung','Spedition/Güterverkehr','Taxi und Fahrdienste'],
    'Gastronomie': ['Bar/Kneipe','Café','Catering','Hotel mit Gastronomie','Restaurant','Schnellimbiss'],
    'Bildungseinrichtung': ['Fahrschule','Sprachschule'],
    'Gesundheitswesen': ['Apotheke','Arztpraxis','Pflegeeinrichtung','Sport und Fitness','Veterinärmedizin/Tierarztpraxis','Wellness und Spa','Zahnarztpraxis'],
    'Recht und Finanzen': ['Rechtsdienstleistungen','Steuerberatung und Wirtschaftsprüfung','Versicherungswesen'],
    'Technologie und Innovation': ['IT-Beratung und Digitalisierung','Telekommunikation'],
    'Kreativ und Kultur': ['Architektur und Planung'],
    'Sonstige': ['Facility Management','Personaldienstleistungen','Sicherheitsdienste','Tourismus und Reisen']
  };
  var catParent = document.getElementById('catParent');
  var catChild = document.getElementById('catChild');
  var cpBranche = document.getElementById('cpBranche');
  function decode(s){ var t = document.createElement('textarea'); t.innerHTML = s; return t.value; }
  function fillChildren(parent) {
    catChild.innerHTML = '';
    (brancheTree[parent] || []).forEach(function (child) {
      var o = document.createElement('option'); o.value = decode(child); o.innerHTML = child; catChild.appendChild(o);
    });
  }
  function updatePrompt() {
    if (cpBranche && catChild.value) cpBranche.textContent = catChild.value;
  }
  if (catParent && catChild) {
    Object.keys(brancheTree).forEach(function (p) {
      var o = document.createElement('option'); o.value = p; o.textContent = p; catParent.appendChild(o);
    });
    catParent.value = 'Handwerk';
    fillChildren('Handwerk');
    catChild.value = 'Dachdecker';
    updatePrompt();
    catParent.addEventListener('change', function () { fillChildren(catParent.value); updatePrompt(); });
    catChild.addEventListener('change', updatePrompt);
  }

  /* ---------- BEWEIS: animated counters, gauges, bars ---------- */
  function animateCount(el, to, dur) {
    if (prefersReduced) { el.firstChild ? el.childNodes[0].nodeValue = to : el.textContent = to; setMaybePct(el, to); return; }
    var start = 0, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      var val = Math.round(start + (to - start) * ease);
      setMaybePct(el, val);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function setMaybePct(el, val) {
    // keep " %" suffix if present in original
    if (el.dataset.pct === '1') el.innerHTML = val + '&nbsp;%';
    else el.textContent = val;
  }
  var beweisPlayed = false;
  function playBeweis() {
    if (beweisPlayed) return; beweisPlayed = true;
    document.querySelectorAll('#beweis .cnt').forEach(function (el) {
      var to = parseInt(el.dataset.to, 10);
      if (/%/.test(el.textContent)) el.dataset.pct = '1';
      animateCount(el, to, 1300);
    });
    document.querySelectorAll('#beweis .ring').forEach(function (ring) {
      var fg = ring.querySelector('.ring-fg');
      var score = parseInt(ring.dataset.score, 10);
      var circ = 289;
      var offset = circ - (circ * score / 100);
      if (prefersReduced) { fg.style.strokeDashoffset = offset; return; }
      fg.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)';
      requestAnimationFrame(function () { fg.style.strokeDashoffset = offset; });
    });
    document.querySelectorAll('#beweis .bar i').forEach(function (bar) {
      var w = parseInt(bar.dataset.w, 10);
      requestAnimationFrame(function () { bar.style.width = w + '%'; });
    });
  }
  var beweis = document.getElementById('beweis');
  if (beweis) {
    if ('IntersectionObserver' in window && !prefersReduced) {
      var bio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { playBeweis(); bio.disconnect(); } });
      }, { threshold: 0.3 });
      bio.observe(beweis);
    } else { playBeweis(); }
  }

  /* ---------- BOOKING widget ---------- */
  var daysWrap = document.getElementById('days');
  var slotsWrap = document.getElementById('slots');
  var confirmBtn = document.getElementById('confirmBtn');
  var bkPicker = document.getElementById('bkPicker');
  var bkDone = document.getElementById('bkDone');
  var bkDoneText = document.getElementById('bkDoneText');
  var selDay = null, selSlot = null;
  var dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  var slotTimes = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];

  function refreshConfirm() {
    var ok = selDay !== null && selSlot !== null;
    confirmBtn.disabled = !ok;
    confirmBtn.style.opacity = ok ? '1' : '.5';
    confirmBtn.style.cursor = ok ? 'pointer' : 'not-allowed';
  }
  if (daysWrap) {
    var today = new Date();
    var count = 0, d = new Date(today);
    while (count < 5) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0 || d.getDay() === 6) continue; // skip weekends
      (function (dateObj) {
        var btn = document.createElement('button');
        btn.className = 'day';
        btn.innerHTML = '<div class="dn">' + dayNames[dateObj.getDay()] + '</div><div class="dd">' + dateObj.getDate() + '</div>';
        btn.addEventListener('click', function () {
          daysWrap.querySelectorAll('.day').forEach(function (x) { x.classList.remove('sel'); });
          btn.classList.add('sel');
          selDay = dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.';
          refreshConfirm();
        });
        daysWrap.appendChild(btn);
      })(new Date(d));
      count++;
    }
    slotTimes.slice(0, 4).forEach(function (t) {
      var s = document.createElement('button');
      s.className = 'slot'; s.textContent = t;
      s.addEventListener('click', function () {
        slotsWrap.querySelectorAll('.slot').forEach(function (x) { x.classList.remove('sel'); });
        s.classList.add('sel'); selSlot = t; refreshConfirm();
      });
      slotsWrap.appendChild(s);
    });
    confirmBtn.addEventListener('click', function () {
      if (confirmBtn.disabled) return;
      bkDoneText.textContent = 'Ihr Wunschtermin am ' + selDay + ' um ' + selSlot + ' Uhr ist reserviert. Sabrina meldet sich zur Bestätigung.';
      bkPicker.style.display = 'none';
      bkDone.classList.add('show');
    });
  }

  /* ---------- PERSONALIZATION (Stadt + Branche) ---------- */
  function syncPersonalization(branche, stadt) {
    document.querySelectorAll('[data-branche]').forEach(function (el) { el.textContent = branche; });
    document.querySelectorAll('[data-stadt]').forEach(function (el) { el.textContent = stadt; });
  }
  // expose so tweaks can call it
  window.__rfSync = syncPersonalization;
  window.__rfSetStadt = function (stadt) {
    currentStadt = stadt;
    var active = chipWrap ? chipWrap.querySelector('.chip.active') : null;
    var idx = 0;
    if (active) { idx = Array.prototype.indexOf.call(chipWrap.children, active); }
    renderMirror(idx);
    var brancheName = branchen[idx] ? branchen[idx].name : 'Dachdecker';
    syncPersonalization(brancheName, stadt);
  };

  /* ---------- FLOATING SABRINA GUIDE ---------- */
  var guide = document.getElementById('guide');
  var guideText = document.getElementById('guideText');
  var guideClose = document.getElementById('guideClose');
  var guideDismissed = false;
  var guideMessages = [
    { sel: '#problem',  text: 'Kommt dir das bekannt vor? Genau hier verlieren die meisten Betriebe ihre Anfragen.' },
    { sel: '#check',    text: 'Das ist mein Lieblingsteil: Hier zeig ich dir, wie ich deine Sichtbarkeit wirklich messe.' },
    { sel: '#beweis',   text: 'Schau dir die Zahlen an — von F auf A. Das ist kein Zufall, das ist Methode.' },
    { sel: '#pakete',   text: 'Alle Preise offen. Starte risikoarm mit dem Audit — wird voll angerechnet.' },
    { sel: '#termin',   text: 'Such dir einfach einen Slot aus. 15 Minuten, und du weißt, wo du stehst. 😊' }
  ];
  var currentGuide = -1;
  function showGuide(i) {
    if (guideDismissed || i === currentGuide) return;
    currentGuide = i;
    guideText.textContent = guideMessages[i].text;
    guide.classList.add('show');
  }
  if (guideClose) {
    guideClose.addEventListener('click', function () {
      guideDismissed = true; guide.classList.remove('show');
    });
  }
  if (guide && 'IntersectionObserver' in window) {
    var gio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var idx = guideMessages.findIndex(function (m) { return m.sel === '#' + e.target.id; });
          if (idx >= 0) showGuide(idx);
        }
      });
    }, { threshold: 0.35 });
    guideMessages.forEach(function (m) {
      var el = document.querySelector(m.sel);
      if (el) gio.observe(el);
    });
  }
})();
