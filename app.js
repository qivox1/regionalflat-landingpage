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

  /* ---------- Mobiles Menü ---------- */
  var burger = document.getElementById('navBurger');
  var navMobile = document.getElementById('navMobile');
  if (burger && navMobile && nav) {
    function setMenu(open) {
      nav.classList.toggle('menu-open', open);
      navMobile.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    }
    burger.addEventListener('click', function () { setMenu(nav.classList.contains('menu-open') ? false : true); });
    navMobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

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
    // Sicherheitsnetz: alles, was beim Laden bereits im Viewport ist, sofort einblenden
    function revealInView() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      revealEls.forEach(function (el) {
        if (el.classList.contains('in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) { el.classList.add('in'); io.unobserve(el); }
      });
    }
    revealInView();
    window.addEventListener('load', revealInView);
  }

  /* ---------- HERO: typing → reveal recommendations ---------- */
  var sim = document.getElementById('sim');
  var aiIntro = document.getElementById('aiIntro');
  var recoItems = document.querySelectorAll('#reco .reco-item, #reco .reco-gap');
  var simPlayed = false;
  // window.__rfIntroOrt wird von der URL-Personalisierung gesetzt; sonst „Ihrer Region"
  window.__rfIntroText = function () {
    return window.__rfIntroOrt
      ? ('Gerne! In ' + window.__rfIntroOrt + ' werden besonders häufig empfohlen:')
      : 'Gerne! In Ihrer Region werden besonders häufig empfohlen:';
  };
  function playSim() {
    if (simPlayed) return; simPlayed = true;
    if (prefersReduced) {
      aiIntro.textContent = window.__rfIntroText();
      recoItems.forEach(function (el) { el.classList.add('show'); });
      return;
    }
    setTimeout(function () {
      aiIntro.textContent = window.__rfIntroText();
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

  /* ---------- SELBSTTEST: Direkt-Links zu ChatGPT / Perplexity ---------- */
  var rfLastQuestion = '';
  function updateAiLinks() {
    var ct = document.getElementById('copyText');
    if (!ct) return;
    rfLastQuestion = ct.textContent.trim().replace(/\s+/g, ' ');
    var q = encodeURIComponent(rfLastQuestion);
    function setHref(id, url) { var el = document.getElementById(id); if (el) el.href = url; }
    setHref('openChatgpt', 'https://chatgpt.com/?q=' + q);
    setHref('openGoogle', 'https://www.google.com/search?udm=50&q=' + q); // Google AI Mode
    setHref('openPerplexity', 'https://www.perplexity.ai/search?q=' + q);
    setHref('openClaude', 'https://claude.ai/new?q=' + q);
  }
  updateAiLinks();
  ['openChatgpt', 'openGoogle', 'openPerplexity', 'openClaude'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(rfLastQuestion).catch(function () {});
      }
    });
  });

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

  /* Slug je Branche (Reihenfolge = branchen[]) — für URL-Parameter ?branche= */
  var brancheSlugs = ['dachdecker','elektriker','heizung','maler','tischler','kfz','baeckerei','restaurant','friseur','zahnarzt','apotheke','steuerberater','immobilien','fahrschule','hotel','gebaeudereinigung'];

  /* Kosten des Nichtstuns je Branche-Slug — ein verlorener Auftrag in Euro */
  var costBySlug = {
    dachdecker:       'Ein einziger Dachauftrag bringt schnell <b>3.000–15.000 €</b>.',
    elektriker:       'Eine Installation oder Wallbox bringt <b>1.500–6.000 €</b>.',
    heizung:          'Eine neue Heizung oder Wärmepumpe bringt <b>8.000–25.000 €</b>.',
    maler:            'Ein Anstrich-Auftrag bringt <b>1.500–6.000 €</b>.',
    tischler:         'Ein Möbelstück nach Maß bringt <b>2.000–8.000 €</b>.',
    kfz:              'Eine Reparatur oder Inspektion bringt <b>300–2.500 €</b>.',
    baeckerei:        'Ein neuer Stammkunde bringt <b>500–1.500 €</b> im Jahr.',
    restaurant:       'Eine Reservierung oder Feier bringt <b>100–5.000 €</b>.',
    friseur:          'Ein neuer Stammkunde bringt <b>300–800 €</b> im Jahr.',
    zahnarzt:         'Ein neuer Patient bringt <b>500–3.000 €</b>.',
    apotheke:         'Ein neuer Stammkunde bringt <b>mehrere Hundert Euro</b> im Jahr.',
    steuerberater:    'Ein neues Mandat bringt <b>2.000–10.000 €</b> im Jahr.',
    immobilien:       'Eine einzige Vermittlung bringt <b>5.000–30.000 €</b> Provision.',
    fahrschule:       'Ein Fahrschüler bringt <b>2.000–3.500 €</b>.',
    hotel:            'Eine Buchung bringt <b>100–600 €</b> — ein Stammgast ein Vielfaches.',
    gebaeudereinigung:'Ein Reinigungsvertrag bringt <b>5.000–30.000 €</b> im Jahr.'
  };
  var costLine = document.getElementById('costLine');
  function updateCost(idx) {
    if (!costLine) return;
    var msg = costBySlug[brancheSlugs[idx]] || costBySlug.dachdecker;
    costLine.innerHTML = msg + ' Nennt die KI bei der nächsten Suche Ihren Wettbewerber statt Sie, ist <b>genau dieser Auftrag weg</b> — und 299&nbsp;€/Monat sind weniger als ein einziger davon.';
  }

  function renderMirror(idx) {
    var b = branchen[idx];
    mirrorQ.style.opacity = 0;
    setTimeout(function () {
      mirrorQ.innerHTML = '„' + b.q.replace('{STADT}', '<span class="v">' + currentStadt + '</span>') + '"';
      mirrorSub.innerHTML = b.sub;
      mirrorQ.style.opacity = 1;
    }, 160);
    updateCost(idx);
  }
  function activeChipIndex() {
    if (!chipWrap) return 0;
    var a = chipWrap.querySelector('.chip.active');
    return a ? Array.prototype.indexOf.call(chipWrap.children, a) : 0;
  }
  if (chipWrap) {
    branchen.forEach(function (b, i) {
      var c = document.createElement('button');
      c.className = 'chip' + (i === 0 ? ' active' : '');
      c.innerHTML = b.name;
      c.addEventListener('click', function () {
        chipWrap.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('active'); });
        c.classList.add('active');
        renderMirror(i);
        syncPersonalization(decode(b.name), currentStadt);
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
    updateAiLinks();
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

  /* ---------- BOOKING widget (echte Termine via Apps Script) ---------- */
  // Apps-Script Web-App (Sabrina-Kalender). Leer = Fallback auf Google-Buchungsseite.
  var BOOKING_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwvnKXm5DCFoSVmRWG2BeAklcHOu7TYCAUMADDYBgEtEz8foM0bqL8due35JjZ3PklHwA/exec';

  var daysWrap = document.getElementById('days');
  var weekPrevBtn = document.getElementById('weekPrev');
  var weekNextBtn = document.getElementById('weekNext');
  var weekLabel = document.getElementById('weekLabel');
  var slotsWrap = document.getElementById('slots');
  var confirmBtn = document.getElementById('confirmBtn');
  var bkPicker = document.getElementById('bkPicker');
  var bkSteps = document.getElementById('bkSteps');
  var bkLoading = document.getElementById('bkLoading');
  var bkForm = document.getElementById('bkForm');
  var bkName = document.getElementById('bkName');
  var bkEmail = document.getElementById('bkEmail');
  var bkCompany = document.getElementById('bkCompany');
  var bkPhone = document.getElementById('bkPhone');
  var bkType = document.getElementById('bkType');
  var bkErr = document.getElementById('bkErr');
  var bkFallback = document.getElementById('bkFallback');
  var bkDone = document.getElementById('bkDone');
  var bkDoneText = document.getElementById('bkDoneText');
  // SMS-Verifizierung
  var bkVerify = document.getElementById('bkVerify');
  var bkVerifyNum = document.getElementById('bkVerifyNum');
  var bkCode = document.getElementById('bkCode');
  var verifyBtn = document.getElementById('verifyBtn');
  var bkResend = document.getElementById('bkResend');
  var bkChangeNum = document.getElementById('bkChangeNum');
  var bkVerifyErr = document.getElementById('bkVerifyErr');
  var bkDaypart = document.getElementById('bkDaypart');
  var sumType = document.getElementById('sumType');
  var sumDay = document.getElementById('sumDay');
  var sumTime = document.getElementById('sumTime');
  var selIso = null;
  var selType = 'meeting';   // 'meeting' | 'call'
  var selTypeChosen = false; // Schritt 1 erledigt?
  var selDayIdx = null;      // gewählter Tag-Index
  var selDayObj = null;      // gewähltes Tag-Objekt (mit times)
  var selPart = 'am';        // 'am' | 'pm' (Vormittags/Nachmittags)
  var selToken = null;       // OTP-Token vom Backend
  var resendTimer = null;
  var STEP_ORDER = ['type', 'day', 'time', 'contact'];

  // Stepper: nur der aktuelle Schritt offen, erledigte als Zusammenfassung, spätere ausgeblendet
  function isStepDone(name) {
    if (name === 'type') return selTypeChosen;
    if (name === 'day') return selDayIdx !== null;
    if (name === 'time') return !!selIso;
    return false; // contact ist der letzte Schritt
  }
  function openStep(name) {
    STEP_ORDER.forEach(function (n) {
      var el = document.getElementById('step-' + n);
      if (!el) return;
      el.classList.toggle('open', n === name);
      el.classList.toggle('done', n !== name && isStepDone(n));
    });
  }

  function bkShowFallback() {
    if (bkLoading) bkLoading.style.display = 'none';
    if (bkSteps) bkSteps.hidden = true;
    if (bkFallback) bkFallback.hidden = false;
  }
  function bkEmailOk(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); }
  function bkPhoneOk(v) {
    var digits = (v || '').replace(/[^\d]/g, '');
    return /^\+?[\d\s/()-]{7,20}$/.test(v || '') && digits.length >= 7 && digits.length <= 15;
  }
  function refreshConfirm() {
    var ok = !!selIso && bkName && bkName.value.trim() && bkEmail && bkEmailOk(bkEmail.value.trim())
             && bkCompany && bkCompany.value.trim();
    if (selType === 'call') ok = ok && bkPhone && bkPhoneOk(bkPhone.value.trim());
    if (!confirmBtn) return;
    confirmBtn.disabled = !ok;
    confirmBtn.style.opacity = ok ? '1' : '.5';
    confirmBtn.style.cursor = ok ? 'pointer' : 'not-allowed';
  }
  var daysData = [];
  var weeks = [];        // [{ key, days: [{ day, gIdx }] }]
  var curWeek = 0;

  // Montag (yyyy-MM-dd) der Woche, in der das Datum liegt
  function mondayKey(ymd) {
    var p = (ymd || '').split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    var wd = (d.getUTCDay() + 6) % 7; // Mo=0 … So=6
    d.setUTCDate(d.getUTCDate() - wd);
    return d.toISOString().slice(0, 10);
  }
  // daysData nach Kalenderwoche gruppieren (chronologisch)
  function buildWeeks() {
    weeks = []; curWeek = 0;
    var map = {};
    daysData.forEach(function (day, gIdx) {
      var k = mondayKey(day.date);
      if (!map[k]) { map[k] = { key: k, days: [] }; weeks.push(map[k]); }
      map[k].days.push({ day: day, gIdx: gIdx });
    });
    weeks.sort(function (a, b) { return a.key < b.key ? -1 : 1; });
  }

  // Schritt 1: Auswahl Webmeeting / Telefonat
  function setBookingType(t) {
    selType = (t === 'call') ? 'call' : 'meeting';
    selTypeChosen = true;
    if (bkType) {
      bkType.querySelectorAll('.bk-type-opt').forEach(function (o) {
        var on = o.dataset.type === selType;
        o.classList.toggle('sel', on);
        o.setAttribute('aria-checked', on ? 'true' : 'false');
      });
    }
    if (bkPhone) {
      bkPhone.style.display = (selType === 'call') ? 'block' : 'none';
      bkPhone.required = (selType === 'call');
      if (selType !== 'call') bkPhone.value = '';
    }
    if (sumType) sumType.textContent = (selType === 'call') ? 'Telefonat' : 'Webmeeting';
    openStep('day');
    refreshConfirm();
  }

  // Schritt 2: Tag wählen — eine Woche pro Ansicht, Vor/Zurück-Navigation
  function renderWeek() {
    daysWrap.innerHTML = '';
    var wk = weeks[curWeek];
    if (!wk) return;
    wk.days.forEach(function (entry) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day' + (entry.gIdx === selDayIdx ? ' sel' : '');
      btn.dataset.gidx = entry.gIdx;
      btn.innerHTML = '<div class="dn">' + entry.day.dayLabel + '</div><div class="dd">' + entry.day.dateLabel + '</div>';
      btn.addEventListener('click', function () { selectDay(entry.gIdx); });
      daysWrap.appendChild(btn);
    });
    updateWeekNav();
  }
  function updateWeekNav() {
    var multi = weeks.length > 1;
    if (weekPrevBtn) { weekPrevBtn.hidden = !multi; weekPrevBtn.disabled = curWeek <= 0; }
    if (weekNextBtn) { weekNextBtn.hidden = !multi; weekNextBtn.disabled = curWeek >= weeks.length - 1; }
    if (weekLabel) {
      var wk = weeks[curWeek];
      if (multi && wk && wk.days.length) {
        var first = wk.days[0].day.dateLabel;
        var last = wk.days[wk.days.length - 1].day.dateLabel;
        weekLabel.hidden = false;
        weekLabel.textContent = 'Woche ' + (curWeek + 1) + ' von ' + weeks.length + ' · ' + first + '–' + last;
      } else {
        weekLabel.hidden = true;
      }
    }
  }
  function gotoWeek(delta) {
    var n = curWeek + delta;
    if (n < 0 || n >= weeks.length) return;
    curWeek = n;
    renderWeek();
  }
  function selectDay(idx) {
    selDayIdx = idx; selDayObj = daysData[idx]; selIso = null;
    daysWrap.querySelectorAll('.day').forEach(function (x) { x.classList.toggle('sel', +x.dataset.gidx === idx); });
    if (sumDay) sumDay.textContent = selDayObj.dayLabel + ', ' + selDayObj.dateLabel;
    if (sumTime) sumTime.textContent = '';
    setupDayparts(selDayObj.times);
    openStep('time');
    refreshConfirm();
  }

  // Schritt 3: Uhrzeit (mit Vormittags/Nachmittags)
  function setupDayparts(times) {
    var am = times.filter(function (t) { return parseInt(t.hm, 10) < 12; });
    var pm = times.filter(function (t) { return parseInt(t.hm, 10) >= 12; });
    if (bkDaypart) bkDaypart.hidden = !(am.length && pm.length);
    selPart = am.length ? 'am' : 'pm';
    if (bkDaypart) bkDaypart.querySelectorAll('.bk-daypart-opt').forEach(function (o) {
      o.classList.toggle('sel', o.dataset.part === selPart);
    });
    renderSlots();
  }
  function renderSlots() {
    if (!selDayObj) return;
    var times = selDayObj.times.filter(function (t) {
      var h = parseInt(t.hm, 10);
      return selPart === 'am' ? h < 12 : h >= 12;
    });
    slotsWrap.innerHTML = '';
    times.forEach(function (t) {
      var s = document.createElement('button');
      s.type = 'button'; s.className = 'slot' + (t.iso === selIso ? ' sel' : ''); s.textContent = t.hm;
      s.addEventListener('click', function () {
        selIso = t.iso;
        slotsWrap.querySelectorAll('.slot').forEach(function (x) { x.classList.remove('sel'); });
        s.classList.add('sel');
        if (sumTime) sumTime.textContent = t.hm + ' Uhr';
        openStep('contact');
        refreshConfirm();
      });
      slotsWrap.appendChild(s);
    });
  }
  function setDaypart(part) {
    selPart = (part === 'pm') ? 'pm' : 'am';
    if (bkDaypart) bkDaypart.querySelectorAll('.bk-daypart-opt').forEach(function (o) {
      o.classList.toggle('sel', o.dataset.part === selPart);
    });
    renderSlots();
  }
  // „ändern" auf einem erledigten Schritt: dorthin zurück, spätere Auswahl zurücksetzen
  function editStep(name) {
    if (name === 'type') {
      selDayIdx = null; selDayObj = null; selIso = null;
      if (sumDay) sumDay.textContent = ''; if (sumTime) sumTime.textContent = '';
      daysWrap.querySelectorAll('.day').forEach(function (x) { x.classList.remove('sel'); });
    }
    if (name === 'day') { selIso = null; if (sumTime) sumTime.textContent = ''; }
    openStep(name);
    refreshConfirm();
  }
  function loadSlots() {
    fetch(BOOKING_ENDPOINT + (BOOKING_ENDPOINT.indexOf('?') > -1 ? '&' : '?') + 'action=slots')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.ok || !res.slots || !res.slots.length) { bkShowFallback(); return; }
        daysData = res.slots;
        buildWeeks();
        if (bkLoading) bkLoading.style.display = 'none';
        if (bkSteps) bkSteps.hidden = false;
        renderWeek();
        openStep('type');
      })
      .catch(function () { bkShowFallback(); });
  }
  function bkErrorMsg(err) {
    switch (err) {
      case 'slot_taken':       return 'Dieser Termin wurde gerade vergeben. Bitte wählen Sie einen anderen.';
      case 'email_invalid':    return 'Bitte prüfen Sie Ihre E-Mail-Adresse.';
      case 'company_missing':  return 'Bitte geben Sie Ihre Firma an.';
      case 'phone_invalid':    return 'Bitte geben Sie eine gültige Handynummer ein.';
      case 'too_soon':         return 'Dieser Termin liegt zu kurzfristig. Bitte wählen Sie einen späteren.';
      case 'too_many_codes':   return 'Zu viele SMS-Anfragen für diese Nummer. Bitte später erneut versuchen.';
      case 'sms_not_configured': return 'SMS-Versand ist derzeit nicht möglich. Bitte wählen Sie ein Webmeeting.';
      case 'sms_send_failed':  return 'Die SMS konnte nicht gesendet werden. Bitte Nummer prüfen oder erneut versuchen.';
      case 'code_missing':     return 'Bitte geben Sie den Code aus der SMS ein.';
      case 'code_invalid':     return 'Der Code stimmt nicht. Bitte erneut eingeben.';
      case 'code_expired':     return 'Der Code ist abgelaufen. Bitte fordern Sie einen neuen an.';
      case 'code_attempts':    return 'Zu viele Fehlversuche. Bitte fordern Sie einen neuen Code an.';
      default:                 return 'Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.';
    }
  }
  function setBtn(btn, busy, busyText, idleText) {
    if (!btn) return;
    btn.disabled = busy;
    btn.style.opacity = busy ? '.6' : '1';
    btn.textContent = busy ? busyText : idleText;
  }

  // Webmeeting -> direkt buchen; Telefonat -> erst SMS-Code anfordern
  function submitBooking(e) {
    e.preventDefault();
    if (confirmBtn.disabled) return;
    if (bkErr) bkErr.hidden = true;
    if (selType === 'call') requestCode();
    else doBook(false);
  }

  function requestCode() {
    setBtn(confirmBtn, true, 'Code wird gesendet …', '');
    fetch(BOOKING_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'send_code', phone: bkPhone ? bkPhone.value.trim() : '' })
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        setBtn(confirmBtn, false, '', 'Termin verbindlich buchen');
        if (res && res.ok) {
          selToken = res.token;
          if (bkVerifyNum) bkVerifyNum.textContent = res.phone || (bkPhone ? bkPhone.value.trim() : '');
          if (bkSteps) bkSteps.hidden = true;
          if (bkVerify) bkVerify.hidden = false;
          if (bkVerifyErr) bkVerifyErr.hidden = true;
          if (bkCode) { bkCode.value = ''; bkCode.focus(); }
          refreshVerifyBtn();
          startResendCooldown(60);
        } else if (bkErr) {
          bkErr.textContent = bkErrorMsg(res && res.error); bkErr.hidden = false;
        }
      })
      .catch(function () {
        setBtn(confirmBtn, false, '', 'Termin verbindlich buchen');
        if (bkErr) { bkErr.textContent = 'Verbindung fehlgeschlagen. Bitte erneut versuchen.'; bkErr.hidden = false; }
      });
  }

  function doBook(fromVerify) {
    var btn = fromVerify ? verifyBtn : confirmBtn;
    var errBox = fromVerify ? bkVerifyErr : bkErr;
    var idle = fromVerify ? 'Bestätigen & Termin buchen' : 'Termin verbindlich buchen';
    if (errBox) errBox.hidden = true;
    setBtn(btn, true, 'Wird gebucht …', '');
    fetch(BOOKING_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: bkName.value.trim(), email: bkEmail.value.trim(),
        company: bkCompany ? bkCompany.value.trim() : '', iso: selIso,
        type: selType, phone: (selType === 'call' && bkPhone) ? bkPhone.value.trim() : '',
        token: selToken || '', code: (selType === 'call' && bkCode) ? bkCode.value.trim() : ''
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res.ok) {
          var artLabel = (res.type === 'call') ? 'Telefontermin' : 'Webmeeting';
          var nachsatz = (res.type === 'call')
            ? ' Wir rufen Sie pünktlich an. Den Termin finden Sie in der Bestätigungs-E-Mail.'
            : (res.meetLink ? ' Den Video-Link finden Sie in der Bestätigungs-E-Mail.' : ' Sie erhalten gleich eine Bestätigungs-E-Mail.');
          bkDoneText.innerHTML = 'Ihr ' + artLabel + ' ist gebucht: <b>' + (res.when || '') + '</b>.' + nachsatz;
          if (resendTimer) { clearInterval(resendTimer); resendTimer = null; }
          bkPicker.style.display = 'none';
          bkDone.classList.add('show');
        } else {
          setBtn(btn, false, '', idle);
          if (errBox) { errBox.textContent = bkErrorMsg(res && res.error); errBox.hidden = false; }
        }
      })
      .catch(function () {
        setBtn(btn, false, '', idle);
        if (errBox) { errBox.textContent = 'Verbindung fehlgeschlagen. Bitte erneut versuchen.'; errBox.hidden = false; }
      });
  }

  function refreshVerifyBtn() {
    if (!verifyBtn) return;
    var ok = bkCode && /^\d{6}$/.test(bkCode.value.trim());
    verifyBtn.disabled = !ok;
    verifyBtn.style.opacity = ok ? '1' : '.5';
    verifyBtn.style.cursor = ok ? 'pointer' : 'not-allowed';
  }
  function startResendCooldown(sec) {
    if (!bkResend) return;
    if (resendTimer) clearInterval(resendTimer);
    var left = sec;
    bkResend.disabled = true;
    bkResend.textContent = 'Code erneut senden (' + left + ' s)';
    resendTimer = setInterval(function () {
      left--;
      if (left <= 0) {
        clearInterval(resendTimer); resendTimer = null;
        bkResend.disabled = false; bkResend.textContent = 'Code erneut senden';
      } else {
        bkResend.textContent = 'Code erneut senden (' + left + ' s)';
      }
    }, 1000);
  }
  function changeNumber() {
    if (resendTimer) { clearInterval(resendTimer); resendTimer = null; }
    selToken = null;
    if (bkCode) bkCode.value = '';
    if (bkVerifyErr) bkVerifyErr.hidden = true;
    if (bkVerify) bkVerify.hidden = true;
    if (bkSteps) bkSteps.hidden = false;
    openStep('contact');
    if (bkPhone) bkPhone.focus();
  }
  if (bkPicker) {
    if (bkName) bkName.addEventListener('input', refreshConfirm);
    if (bkEmail) bkEmail.addEventListener('input', refreshConfirm);
    if (bkCompany) bkCompany.addEventListener('input', refreshConfirm);
    if (bkPhone) bkPhone.addEventListener('input', refreshConfirm);
    if (bkType) {
      bkType.querySelectorAll('.bk-type-opt').forEach(function (o) {
        o.addEventListener('click', function () { setBookingType(o.dataset.type); });
      });
    }
    if (bkForm) bkForm.addEventListener('submit', submitBooking);
    // Wochen-Navigation (Tag wählen)
    if (weekPrevBtn) weekPrevBtn.addEventListener('click', function () { gotoWeek(-1); });
    if (weekNextBtn) weekNextBtn.addEventListener('click', function () { gotoWeek(1); });
    // Vormittags/Nachmittags
    if (bkDaypart) bkDaypart.querySelectorAll('.bk-daypart-opt').forEach(function (o) {
      o.addEventListener('click', function () { setDaypart(o.dataset.part); });
    });
    // „ändern" auf einem zusammengeklappten (erledigten) Schritt
    STEP_ORDER.forEach(function (n) {
      var head = document.querySelector('#step-' + n + ' .bk-step-head');
      if (head) head.addEventListener('click', function () {
        var step = document.getElementById('step-' + n);
        if (step && step.classList.contains('done')) editStep(n);
      });
    });
    // SMS-Verifizierung
    if (bkCode) bkCode.addEventListener('input', function () {
      bkCode.value = bkCode.value.replace(/\D/g, '').slice(0, 6); // nur Ziffern
      refreshVerifyBtn();
    });
    if (verifyBtn) verifyBtn.addEventListener('click', function () { if (!verifyBtn.disabled) doBook(true); });
    if (bkResend) bkResend.addEventListener('click', function () {
      if (bkResend.disabled) return;
      bkResend.disabled = true; bkResend.textContent = 'Senden …';
      requestCode();
    });
    if (bkChangeNum) bkChangeNum.addEventListener('click', changeNumber);
    if (BOOKING_ENDPOINT) loadSlots();
    else bkShowFallback();
  }

  /* ---------- GENUS / ARTIKEL (für „Welcher/Welche/Welches … ist zu empfehlen?") ----------
     Der bestimmte Artikel in der Hero-„KI-Antwort" muss zum grammatischen Geschlecht
     der eingesetzten Branche passen (z. B. „Welches Hotel", „Welches Restaurant",
     „Welche Bäckerei", „Welcher Dachdecker"). Quelle der Branche: Hero-Chips,
     ?bereich=-Deep-Link (Mailing) und Selbsttest-Dropdowns. */
  // Explizite Zuordnung für alle bekannten Labels (Hero-Chips + brancheTree-Unterkategorien).
  var ARTIKEL_MAP = {
    // Hero-Chips
    'dachdecker':'Welcher','elektriker':'Welcher','sanitär & heizung':'Welches','maler':'Welcher',
    'tischler':'Welcher','kfz-werkstatt':'Welche','bäckerei':'Welche','restaurant':'Welches',
    'friseur':'Welcher','zahnarzt':'Welcher','apotheke':'Welche','steuerberater':'Welcher',
    'immobilien':'Welche','fahrschule':'Welche','hotel':'Welches','gebäudereinigung':'Welche',
    // brancheTree – Handwerk
    'bau':'Welcher','bäckerei/konditorei':'Welche','elektro':'Welcher',
    'fleischverarbeitung/metzgerei':'Welche','friseur und kosmetik':'Welcher',
    'garten- und landschaftsbau':'Welcher','goldschmied':'Welcher','kfz-handwerk':'Welches',
    'maler und lackierer':'Welcher','optiker & augenoptik':'Welcher','orthopädietechnik':'Welche',
    'sanitär':'Welches','sonstiges handwerk':'Welches','tischler/schreiner':'Welcher',
    'uhrmacher & juwelier':'Welcher','zahntechnik':'Welche',
    // Handel
    'baumarkt/heimwerkerhandel':'Welcher','einzelhandel':'Welcher','elektronikhandel':'Welcher',
    'großhandel':'Welcher','kfz-handel':'Welcher','lebensmittelhandel':'Welcher',
    'modehandel':'Welcher','möbelhandel':'Welcher',
    // Dienstleistung
    'reinigung':'Welche','spedition/güterverkehr':'Welche','taxi und fahrdienste':'Welches',
    // Gastronomie
    'bar/kneipe':'Welche','café':'Welches','catering':'Welches','hotel mit gastronomie':'Welches',
    'schnellimbiss':'Welcher',
    // Bildung
    'sprachschule':'Welche',
    // Gesundheit
    'arztpraxis':'Welche','pflegeeinrichtung':'Welche','sport und fitness':'Welcher',
    'veterinärmedizin/tierarztpraxis':'Welche','wellness und spa':'Welches','zahnarztpraxis':'Welche',
    // Recht & Finanzen
    'rechtsdienstleistungen':'Welche','steuerberatung und wirtschaftsprüfung':'Welche',
    'versicherungswesen':'Welches',
    // Technologie
    'it-beratung und digitalisierung':'Welche','telekommunikation':'Welche',
    // Kreativ
    'architektur und planung':'Welche',
    // Sonstige
    'facility management':'Welches','personaldienstleistungen':'Welche',
    'sicherheitsdienste':'Welche','tourismus und reisen':'Welcher'
  };
  function artikelFor(branche) {
    var s = decode(String(branche || '')).toLowerCase().replace(/\s+/g, ' ').trim();
    if (!s) return 'Welcher';
    if (ARTIKEL_MAP[s]) return ARTIKEL_MAP[s];
    // Heuristik für unbekannte Mailing-Werte: erst Neutrum, dann Femininum, sonst Maskulinum.
    if (/(hotel|restaurant|café|cafe|bistro|catering|wellness|handwerk|management|studio|unternehmen|institut|zentrum|büro|wesen|sanitär)/.test(s) ||
        /\b(spa|taxi)\b/.test(s)) return 'Welches';
    var head = s.split(/[\s/&]+/)[0]; // erstes Wort ist hier i. d. R. das bestimmende Nomen
    if (/(ei|ung|heit|keit|schaft|tät|ion|ik|tur|ie|ia|enz|anz)$/.test(head) ||
        /\b(praxis|schule|werkstatt|apotheke|medizin|reinigung|spedition|bar|kneipe|immobilien|dienstleistung|dienste|telekommunikation|versicherung|planung|beratung)\b/.test(s)) return 'Welche';
    return 'Welcher';
  }
  function setArtikel(branche) {
    var a = artikelFor(branche);
    document.querySelectorAll('[data-artikel]').forEach(function (el) { el.textContent = a; });
  }

  /* ---------- PERSONALIZATION (Stadt + Branche) ---------- */
  function syncPersonalization(branche, stadt) {
    document.querySelectorAll('[data-branche]').forEach(function (el) { el.textContent = branche; });
    document.querySelectorAll('[data-stadt]').forEach(function (el) { el.textContent = stadt; });
    setArtikel(branche);
    updateAiLinks();
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
    guide.removeAttribute('inert');
    guide.setAttribute('aria-hidden', 'false');
    guide.classList.add('show');
  }
  if (guideClose) {
    guideClose.addEventListener('click', function () {
      guideDismissed = true;
      guide.classList.remove('show');
      guide.setAttribute('inert', '');
      guide.setAttribute('aria-hidden', 'true');
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

  /* ---------- STADT-EINGABE (Fallback für Nicht-Mail-Besucher) ---------- */
  var stadtInput = document.getElementById('stadtInput');
  if (stadtInput) {
    if (!stadtInput.value) stadtInput.value = currentStadt;
    stadtInput.addEventListener('input', function () {
      var v = stadtInput.value.trim();
      if (window.__rfSetStadt) window.__rfSetStadt(v || 'Minden');
    });
  }

  /* ---------- PERSONALISIERUNG VIA URL (?ort= &branche= &web=) ---------- */
  var slugToTree = {
    dachdecker:['Handwerk','Dachdecker'], elektriker:['Handwerk','Elektro'],
    heizung:['Handwerk','Sanitär'], maler:['Handwerk','Maler und Lackierer'],
    tischler:['Handwerk','Tischler/Schreiner'], kfz:['Handwerk','Kfz-Handwerk'],
    baeckerei:['Handwerk','Bäckerei/Konditorei'], restaurant:['Gastronomie','Restaurant'],
    friseur:['Handwerk','Friseur und Kosmetik'], zahnarzt:['Gesundheitswesen','Zahnarztpraxis'],
    apotheke:['Gesundheitswesen','Apotheke'], steuerberater:['Recht und Finanzen','Steuerberatung und Wirtschaftsprüfung'],
    immobilien:['Dienstleistung','Immobilien'], fahrschule:['Bildungseinrichtung','Fahrschule'],
    hotel:['Gastronomie','Hotel mit Gastronomie'], gebaeudereinigung:['Dienstleistung','Reinigung']
  };
  try {
    var params = new URLSearchParams(window.location.search);
    var pBranche = (params.get('branche') || '').toLowerCase().trim();
    var pBereich = (params.get('bereich') || '').trim();
    var pOrt = (params.get('ort') || '').trim();
    var pWeb = (params.get('web') || '').trim();

    // Ort ZUERST setzen — sonst überschreibt __rfSetStadt die unten gesetzte Branche
    if (pOrt && window.__rfSetStadt) {
      currentStadt = pOrt;
      if (stadtInput) stadtInput.value = pOrt;
      window.__rfSetStadt(pOrt);
    }

    // Branche der Hero-„KI-Antwort"-Frage direkt aus ?bereich= setzen — robust und
    // unabhängig vom Selbsttest-Dropdown-Lookup. Sonst bleibt der Default „Dachdecker"
    // aus __rfSetStadt stehen (z. B. „Welcher Dachdecker in Bielefeld …").
    if (pBereich) {
      var heroBranche = decode(pBereich);
      document.querySelectorAll('[data-branche]').forEach(function (el) { el.textContent = heroBranche; });
      setArtikel(heroBranche);
      if (cpBranche) cpBranche.textContent = heroBranche;
      updateAiLinks();
    }

    if (pBranche && brancheSlugs.indexOf(pBranche) >= 0 && chipWrap) {
      var bi = brancheSlugs.indexOf(pBranche);
      if (chipWrap.children[bi]) chipWrap.children[bi].click();
      // Selbsttest-Dropdowns mitziehen
      var tree = slugToTree[pBranche];
      if (tree && catParent && catChild) {
        catParent.value = tree[0]; fillChildren(tree[0]);
        catChild.value = tree[1]; updatePrompt();
      }
    }

    /* Direkter Bereich-Parameter (?bereich=) — deckt ALLE Selbsttest-Kategorien ab,
       nicht nur die 16 Hero-Slugs. Wert = exakte Unterkategorie aus brancheTree. */
    if (pBereich && catParent && catChild) {
      var want = decode(pBereich).toLowerCase();
      var foundParent = null, foundChild = null;
      Object.keys(brancheTree).forEach(function (parent) {
        brancheTree[parent].forEach(function (child) {
          if (decode(child).toLowerCase() === want) { foundParent = parent; foundChild = decode(child); }
        });
      });
      if (foundParent) {
        catParent.value = foundParent; fillChildren(foundParent);
        catChild.value = foundChild; updatePrompt();
        if (cpBranche) cpBranche.textContent = foundChild;
        syncPersonalization(foundChild, currentStadt);
      }
    }
    if (pWeb) {
      var host = pWeb.replace(/^https?:\/\//, '').replace(/\/$/, '');
      document.querySelectorAll('[data-web]').forEach(function (el) { el.textContent = host; });
      var pb = document.getElementById('persoBanner');
      if (pb) pb.classList.add('show');
    }

    /* ---------- HERO: echte Wettbewerber (?w1= &w2= &w3=) + Firmenname (?firma=) ----------
       Wenn die Mail die drei real recherchierten lokalen Konkurrenten mitgibt, zeigt die
       Hero-„KI-Antwort" exakt diese Namen — und in der Lücke fehlt der Empfänger selbst. */
    var pW = [ (params.get('w1') || '').trim(),
               (params.get('w2') || '').trim(),
               (params.get('w3') || '').trim() ].filter(Boolean);
    var pFirma = (params.get('firma') || '').trim();

    /* Gemeinsamer, gekürzter Anzeige-Name für Box-Lücke UND H1:
       Klammer-Zusätze/Rechtsform-Reste weg; bei >30 Zeichen Fallback „Ihr Betrieb". */
    var firmaClean = (pFirma || '').split('(')[0].replace(/\s+/g, ' ').replace(/[\s,–-]+$/, '').trim();
    var firmaAnzeige = (firmaClean && firmaClean.length <= 30) ? firmaClean : 'Ihr Betrieb';

    /* Verfolger-Modus (?modus=verfolger&pos=N): Empfänger steht in der KI bereits drin,
       aber auf Platz N (2/3/…). Statt „nicht zu finden" erscheint die eigene Firma als
       hervorgehobene Reco-Zeile an Position N, darüber die echten Anbieter, darunter ein
       Ziel-Band. Ohne diesen Modus bleibt die Erst-Mailing-Logik („Lücke") unverändert. */
    var isVerfolger = (params.get('modus') || '').trim().toLowerCase() === 'verfolger';
    var pPos = parseInt(params.get('pos') || '0', 10);
    if (isVerfolger && pPos >= 2) {
      var recoWrap = document.getElementById('reco');
      var vItems = recoWrap ? recoWrap.querySelectorAll('.reco-item') : [];
      var vGap = recoWrap ? recoWrap.querySelector('.reco-gap') : null;
      if (vGap) vGap.style.display = 'none';
      var leadersToShow = Math.min(pPos - 1, vItems.length - 1); // mind. 1 Firmen-Zeile frei
      for (var vi = 0; vi < vItems.length; vi++) {
        var vName = vItems[vi].querySelector('.rname');
        var vMeta = vItems[vi].querySelector('.rmeta');
        var vRank = vItems[vi].querySelector('.rank');
        var vCheck = vItems[vi].querySelector('.check');
        if (vi < leadersToShow) {                 // Anbieter über der Firma
          if (vName) vName.textContent = pW[vi] || ('Anbieter ' + (vi + 1));
          if (vMeta) vMeta.textContent = 'empfohlen & verlinkt';
          if (vRank) vRank.textContent = String(vi + 1);
          vItems[vi].classList.remove('reco-you');
          vItems[vi].style.display = '';
        } else if (vi === leadersToShow) {         // die eigene Firma (hervorgehoben)
          if (vName) vName.innerHTML = '';
          if (vName) { vName.appendChild(document.createTextNode(firmaAnzeige));
                       var tag = document.createElement('span'); tag.className = 'you-tag';
                       tag.textContent = '(das sind Sie)'; vName.appendChild(tag); }
          if (vMeta) vMeta.textContent = 'sichtbar — aber nicht ganz vorne';
          if (vRank) vRank.textContent = String(pPos);
          if (vCheck) vCheck.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
          vItems[vi].classList.add('reco-you');
          vItems[vi].style.display = '';
        } else {                                   // überzählige Zeilen aus
          vItems[vi].style.display = 'none';
        }
      }
      if (recoWrap && !recoWrap.querySelector('.reco-ziel')) {
        var ziel = document.createElement('div');
        ziel.className = 'reco-ziel';
        ziel.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>' +
          '<span><b>Ziel:</b> von Platz ' + pPos + ' auf Platz 1.</span>';
        recoWrap.appendChild(ziel);
      }
    } else if (pW.length) {
      var recoItems = document.querySelectorAll('#reco .reco-item');
      for (var ri = 0; ri < recoItems.length; ri++) {
        var nameEl = recoItems[ri].querySelector('.rname');
        if (pW[ri]) {
          if (nameEl) nameEl.textContent = pW[ri];
          recoItems[ri].style.display = '';
        } else {
          // weniger als 3 echte Treffer → überzählige Zeile ausblenden
          recoItems[ri].style.display = 'none';
        }
      }
    }

    if (pFirma && !isVerfolger) {
      var gapB = document.querySelector('#reco .reco-gap .gtext b');
      if (gapB) gapB.textContent = '… und ' + firmaAnzeige + '?';
    }

    /* aiIntro mit Ort personalisieren („In {Ort} …" statt „In Ihrer Region …") */
    if (pOrt) {
      window.__rfIntroOrt = pOrt;
      var aiIntroEl = document.getElementById('aiIntro');
      if (aiIntroEl && /empfohlen/.test(aiIntroEl.textContent || '')) {
        aiIntroEl.textContent = window.__rfIntroText();
      }
    }

    /* ---------- HERO-H1 personalisieren (?ort= + ?firma=) ----------
       „Die KI empfiehlt in {Ort} drei Firmen – ist {Firma} dabei?"
       Fallbacks (Best Practice): ohne Ort bleibt die generische H1; bei sehr langem
       oder fehlendem Firmennamen → „Ihr Betrieb" (Headline bleibt einzeilig/lesbar). */
    var heroH1 = document.getElementById('heroH1');
    if (heroH1 && pOrt) {
      var esc = function (s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      };
      if (isVerfolger && pPos >= 2) {
        // Verfolger: Firma ist sichtbar, steht aber nicht vorne
        heroH1.innerHTML = esc(firmaAnzeige) + ' ist in der KI dabei&nbsp;– ' +
                           '<span class="hl">aber nicht ganz vorne.</span>';
      } else {
        heroH1.innerHTML = 'Die KI empfiehlt in ' + esc(pOrt) + ' drei Firmen&nbsp;– ' +
                           '<span class="hl">ist ' + esc(firmaAnzeige) + ' dabei?</span>';
      }
    }
  } catch (e) {}

  /* ---------- REFERENZ-SLIDER (Beweis) ---------- */
  var slider = document.getElementById('refSlider');
  if (slider) {
    var slides = slider.querySelectorAll('.ref-slide');
    var dotsWrap = document.getElementById('refDots');
    var prev = document.getElementById('refPrev');
    var next = document.getElementById('refNext');
    var cur = 0;
    function go(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle('active', n === cur); });
      if (dotsWrap) dotsWrap.querySelectorAll('.ref-dot').forEach(function (d, n) { d.classList.toggle('on', n === cur); });
    }
    if (dotsWrap) {
      slides.forEach(function (s, n) {
        var d = document.createElement('button');
        d.className = 'ref-dot' + (n === 0 ? ' on' : '');
        d.setAttribute('aria-label', 'Referenz ' + (n + 1));
        d.addEventListener('click', function () { go(n); });
        dotsWrap.appendChild(d);
      });
    }
    if (prev) prev.addEventListener('click', function () { go(cur - 1); });
    if (next) next.addEventListener('click', function () { go(cur + 1); });
    go(0);
  }

  /* ---------- Scroll-Fortschritt + Parallax ---------- */
  if (!prefersReduced) {
    var progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    var heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) heroVisual.classList.add('parallax');

    var ticking = false;
    function onScrollFx() {
      var doc = document.documentElement;
      var max = (doc.scrollHeight - doc.clientHeight) || 1;
      var p = Math.min(Math.max(window.scrollY / max, 0), 1);
      progress.style.transform = 'scaleX(' + p + ')';
      if (heroVisual && window.scrollY < window.innerHeight * 1.2) {
        heroVisual.style.transform = 'translateY(' + (window.scrollY * 0.07) + 'px)';
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(onScrollFx); ticking = true; }
    }, { passive: true });
    onScrollFx();
  }
})();
