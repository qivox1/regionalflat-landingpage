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

  /* ---------- SELBSTTEST: Direkt-Links zu ChatGPT / Perplexity ---------- */
  function updateAiLinks() {
    var ct = document.getElementById('copyText');
    if (!ct) return;
    var q = encodeURIComponent(ct.textContent.trim().replace(/\s+/g, ' '));
    var gpt = document.getElementById('openChatgpt');
    var ppx = document.getElementById('openPerplexity');
    if (gpt) gpt.href = 'https://chatgpt.com/?q=' + q;
    if (ppx) ppx.href = 'https://www.perplexity.ai/search?q=' + q;
  }
  updateAiLinks();

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
  var slotsWrap = document.getElementById('slots');
  var confirmBtn = document.getElementById('confirmBtn');
  var bkPicker = document.getElementById('bkPicker');
  var bkSteps = document.getElementById('bkSteps');
  var bkLoading = document.getElementById('bkLoading');
  var bkForm = document.getElementById('bkForm');
  var bkName = document.getElementById('bkName');
  var bkEmail = document.getElementById('bkEmail');
  var bkCompany = document.getElementById('bkCompany');
  var bkErr = document.getElementById('bkErr');
  var bkFallback = document.getElementById('bkFallback');
  var bkDone = document.getElementById('bkDone');
  var bkDoneText = document.getElementById('bkDoneText');
  var selIso = null;

  function bkShowFallback() {
    if (bkLoading) bkLoading.style.display = 'none';
    if (bkSteps) bkSteps.hidden = true;
    if (bkFallback) bkFallback.hidden = false;
  }
  function bkEmailOk(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); }
  function refreshConfirm() {
    var ok = !!selIso && bkName && bkName.value.trim() && bkEmail && bkEmailOk(bkEmail.value.trim());
    if (!confirmBtn) return;
    confirmBtn.disabled = !ok;
    confirmBtn.style.opacity = ok ? '1' : '.5';
    confirmBtn.style.cursor = ok ? 'pointer' : 'not-allowed';
  }
  function renderSlots(times) {
    slotsWrap.innerHTML = ''; selIso = null;
    times.forEach(function (t) {
      var s = document.createElement('button');
      s.type = 'button'; s.className = 'slot'; s.textContent = t.hm;
      s.addEventListener('click', function () {
        slotsWrap.querySelectorAll('.slot').forEach(function (x) { x.classList.remove('sel'); });
        s.classList.add('sel'); selIso = t.iso;
        if (bkForm) bkForm.hidden = false;
        refreshConfirm();
      });
      slotsWrap.appendChild(s);
    });
    if (bkForm) bkForm.hidden = true;
    refreshConfirm();
  }
  function renderDays(days) {
    daysWrap.innerHTML = '';
    days.forEach(function (day, i) {
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'day' + (i === 0 ? ' sel' : '');
      btn.innerHTML = '<div class="dn">' + day.dayLabel + '</div><div class="dd">' + day.dateLabel + '</div>';
      btn.addEventListener('click', function () {
        daysWrap.querySelectorAll('.day').forEach(function (x) { x.classList.remove('sel'); });
        btn.classList.add('sel');
        renderSlots(day.times);
      });
      daysWrap.appendChild(btn);
    });
    if (days.length) renderSlots(days[0].times);
  }
  function loadSlots() {
    fetch(BOOKING_ENDPOINT + (BOOKING_ENDPOINT.indexOf('?') > -1 ? '&' : '?') + 'action=slots')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.ok || !res.slots || !res.slots.length) { bkShowFallback(); return; }
        if (bkLoading) bkLoading.style.display = 'none';
        if (bkSteps) bkSteps.hidden = false;
        renderDays(res.slots);
      })
      .catch(function () { bkShowFallback(); });
  }
  function submitBooking(e) {
    e.preventDefault();
    if (confirmBtn.disabled) return;
    if (bkErr) bkErr.hidden = true;
    var label = confirmBtn.textContent;
    confirmBtn.disabled = true; confirmBtn.style.opacity = '.6'; confirmBtn.textContent = 'Wird gebucht …';
    fetch(BOOKING_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: bkName.value.trim(), email: bkEmail.value.trim(),
        company: bkCompany ? bkCompany.value.trim() : '', iso: selIso
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res.ok) {
          bkDoneText.innerHTML = 'Ihr Webmeeting ist gebucht: <b>' + (res.when || '') + '</b>.' +
            (res.meetLink ? ' Den Video-Link finden Sie in der Bestätigungs-E-Mail.' : ' Sie erhalten gleich eine Bestätigungs-E-Mail.');
          bkPicker.style.display = 'none';
          bkDone.classList.add('show');
        } else {
          var msg = 'Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.';
          if (res && res.error === 'slot_taken') msg = 'Dieser Termin wurde gerade vergeben. Bitte wählen Sie einen anderen.';
          if (res && res.error === 'email_invalid') msg = 'Bitte prüfen Sie Ihre E-Mail-Adresse.';
          if (res && res.error === 'too_soon') msg = 'Dieser Termin liegt zu kurzfristig. Bitte wählen Sie einen späteren.';
          if (bkErr) { bkErr.textContent = msg; bkErr.hidden = false; }
          confirmBtn.disabled = false; confirmBtn.style.opacity = '1'; confirmBtn.textContent = label;
        }
      })
      .catch(function () {
        if (bkErr) { bkErr.textContent = 'Verbindung fehlgeschlagen. Bitte erneut versuchen oder direkt bei Google buchen.'; bkErr.hidden = false; }
        confirmBtn.disabled = false; confirmBtn.style.opacity = '1'; confirmBtn.textContent = label;
      });
  }
  if (bkPicker) {
    if (bkName) bkName.addEventListener('input', refreshConfirm);
    if (bkEmail) bkEmail.addEventListener('input', refreshConfirm);
    if (bkForm) bkForm.addEventListener('submit', submitBooking);
    if (BOOKING_ENDPOINT) loadSlots();
    else bkShowFallback();
  }

  /* ---------- PERSONALIZATION (Stadt + Branche) ---------- */
  function syncPersonalization(branche, stadt) {
    document.querySelectorAll('[data-branche]').forEach(function (el) { el.textContent = branche; });
    document.querySelectorAll('[data-stadt]').forEach(function (el) { el.textContent = stadt; });
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
    var pOrt = (params.get('ort') || '').trim();
    var pWeb = (params.get('web') || '').trim();

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
    if (pOrt && window.__rfSetStadt) {
      currentStadt = pOrt;
      if (stadtInput) stadtInput.value = pOrt;
      window.__rfSetStadt(pOrt);
    }
    if (pWeb) {
      var host = pWeb.replace(/^https?:\/\//, '').replace(/\/$/, '');
      document.querySelectorAll('[data-web]').forEach(function (el) { el.textContent = host; });
      var pb = document.getElementById('persoBanner');
      if (pb) pb.classList.add('show');
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
