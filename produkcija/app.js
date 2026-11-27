'use strict';
const B = document.documentElement.dataset.base || './';
const storageKey = 'arhiHub.saved.v1';
let favorites = new Set();
try {
  const s = JSON.parse(localStorage.getItem(storageKey));
  if (Array.isArray(s)) favorites = new Set(s.filter(id => kadrovi.some(k => k.id === id)));
} catch {}

function saveFavorites() {
  try { localStorage.setItem(storageKey, JSON.stringify([...favorites])); } catch {}
}

const norm = t => t.toLocaleLowerCase('sr-Latn').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'dj');

function el(tag, text, cls) {
  const n = document.createElement(tag);
  if (text) n.textContent = text;
  if (cls) n.className = cls;
  return n;
}

function link(href, text, cls) {
  const a = el('a', text, cls);
  a.href = B + href;
  return a;
}

function buildHeader() {
  const header = el('header', null, 'site-header');
  const wrap = el('div', null, 'wrap');
  const logoLink = link('', null);
  logoLink.setAttribute('aria-label', 'ArhiHub početna');
  const logoImg = el('img');
  logoImg.src = B + 'assets/logo.svg';
  logoImg.alt = 'ArhiHub';
  logoImg.width = 131;
  logoLink.appendChild(logoImg);
  const nav = el('nav');
  nav.appendChild(link('', 'Istraži'));
  nav.appendChild(link('usluge/', 'Usluge'));
  const savedBtn = link('sacuvano/', 'Sačuvano ');
  const badge = el('span', String(favorites.size), 'badge');
  savedBtn.appendChild(badge);
  nav.appendChild(savedBtn);
  const search = el('div', null, 'search-bar');
  search.innerHTML = '&#x2315; ';
  const input = el('input');
  input.type = 'search';
  input.id = 'search';
  input.setAttribute('aria-label', 'Pretraži kadrove');
  input.placeholder = 'Pretraži materijal, prostor…';
  search.appendChild(input);
  wrap.append(logoLink, nav, search);
  header.appendChild(wrap);
  return header;
}

function buildFooter() {
  const footer = el('footer', null, 'site-footer');
  const wrap = el('div', null, 'wrap');
  const img = el('img');
  img.src = B + 'assets/logo.svg';
  img.alt = 'ArhiHub';
  img.width = 86;
  wrap.append(img, el('span', 'Arhitektura u kadru'), link('o-platformi/', 'O platformi'));
  footer.appendChild(wrap);
  return footer;
}

function buildCard(k) {
  const a = link('kadar/' + k.id + '/', null, 'card');
  if (k.demo) {
    const ph = el('div', null, 'card-placeholder');
    ph.appendChild(el('span', k.kategorija, 'card-placeholder-cat'));
    ph.appendChild(el('span', k.naslov, 'card-placeholder-title'));
    a.appendChild(ph);
  } else {
    const img = el('img');
    img.src = B + 'assets/' + k.id + '-640.webp';
    img.alt = k.alt || k.naslov;
    img.loading = 'lazy';
    a.appendChild(img);
  }
  const proj = projekti.find(p => p.slug === k.projekat);
  a.append(el('span', (proj ? proj.naziv : k.projekat) + ' / ' + k.kategorija, 'meta'), el('span', k.naslov, 'card-title'));
  return a;
}

function breadcrumb(items) {
  const bc = el('nav', null, 'breadcrumb');
  bc.setAttribute('aria-label', 'Navigacija');
  items.forEach((item, i) => {
    if (i > 0) bc.appendChild(el('span', '/'));
    if (item.href) {
      bc.appendChild(link(item.href, item.label));
    } else {
      bc.appendChild(el('span', item.label));
    }
  });
  return bc;
}

function buildServiceCard(u) {
  const card = link('usluge/' + u.slug + '/', null, 'service-card');
  card.appendChild(el('span', u.naziv, 'service-card-title'));
  card.appendChild(el('span', u.opis, 'service-card-desc'));
  const partners = partneriZaUslugu(u.slug);
  if (partners.length) {
    card.appendChild(el('span', partners.length + (partners.length === 1 ? ' partner' : ' partnera'), 'service-card-badge'));
  }
  return card;
}

function buildPartnerCard(p, uslugaSlug, kadarId) {
  const card = el('div', null, 'partner-card');
  const avatar = el('div', p.naziv.charAt(0), 'partner-avatar');
  const info = el('div', null, 'partner-info');
  info.appendChild(el('span', p.naziv, 'partner-name'));
  info.appendChild(el('span', p.tip, 'partner-type'));
  info.appendChild(el('span', p.opis, 'partner-desc'));
  if (p.status) info.appendChild(el('span', p.status, 'partner-status'));
  const qs = 'usluga=' + uslugaSlug + '&partner=' + p.slug + (kadarId ? '&kadar=' + kadarId : '');
  const btn = link('upit/?' + qs, 'Zatraži ponudu ↗', 'btn-primary btn-sm');
  card.append(avatar, info, btn);
  return card;
}

// --- Page renderers ---

function renderHome(main) {
  const params = new URLSearchParams(location.search);
  let query = params.get('q') || '';
  let cat = params.get('cat') || 'Sve';
  let onlySaved = params.get('sacuvano') === '1';

  const hero = el('section', null, 'hero');
  hero.innerHTML = `
    <div class="hero-pic"><img src="${B}assets/bordo-1600.webp" alt="Bordo kamena ploča sa svetlim lavaboom i tušem iza rebrastog stakla"></div>
    <div class="hero-text">
      <small class="eyebrow">Kolekcija / Kupatila</small>
      <h1>Sexy<br><i>kupatila.</i></h1>
      <p>Bordo kamen, rebrasto staklo i poslednji snop popodnevnog svetla.</p>
      <a href="${B}kadar/bordo/" class="btn-primary">Istraži kadar &#x2197;</a>
    </div>`;
  main.appendChild(hero);

  const section = el('section');
  section.id = 'kadrovi';
  const head = el('div', null, 'section-head');
  const title = el('h2');
  const countSpan = el('span', '', 'count');
  countSpan.setAttribute('aria-live', 'polite');
  head.append(title, countSpan);
  section.appendChild(head);

  const filtersDiv = el('div', null, 'filters');
  filtersDiv.setAttribute('aria-label', 'Kategorije');
  section.appendChild(filtersDiv);

  const grid = el('div', null, 'grid');
  section.appendChild(grid);
  main.appendChild(section);

  const searchInput = document.getElementById('search');
  if (searchInput && query) searchInput.value = query;

  function update() {
    if (searchInput) query = searchInput.value.trim();
    title.textContent = onlySaved ? 'Sačuvani kadrovi' : 'Izbor kadrova';
    const matches = kadrovi.filter(k =>
      (!onlySaved || favorites.has(k.id)) &&
      (cat === 'Sve' || k.kategorija === cat) &&
      norm([projekatZaKadar(k)?.naziv || '', k.naslov, k.kategorija, ...k.materijali].join(' ')).includes(norm(query))
    );
    countSpan.textContent = 'Prikazano ' + matches.length + ' / ' + kadrovi.length;
    grid.replaceChildren();
    for (const k of matches) grid.appendChild(buildCard(k));
    if (!matches.length) {
      grid.appendChild(el('p', onlySaved && !favorites.size ? 'Otvori kadar i izaberi „Sačuvaj kadar".' : 'Nema kadrova za ovaj izbor.'));
      const resetBtn = el('button', 'Prikaži sve kadrove', 'btn-secondary');
      resetBtn.onclick = () => { onlySaved = false; cat = 'Sve'; query = ''; if (searchInput) searchInput.value = ''; updateUrl(); update(); };
      grid.appendChild(resetBtn);
    }
    filtersDiv.replaceChildren();
    for (const c of kategorije) {
      const btn = el('button', c);
      btn.setAttribute('aria-pressed', String(c === cat));
      btn.onclick = () => { cat = c; updateUrl(); update(); };
      filtersDiv.appendChild(btn);
    }
  }

  function updateUrl() {
    const p = new URLSearchParams();
    if (query) p.set('q', query);
    if (cat !== 'Sve') p.set('cat', cat);
    if (onlySaved) p.set('sacuvano', '1');
    const qs = p.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
  }

  if (searchInput) {
    searchInput.oninput = () => { updateUrl(); update(); };
  }

  update();
}

function renderKadar(main, slug) {
  const k = kadrovi.find(x => x.id === slug);
  if (!k) { main.appendChild(el('p', 'Kadar nije pronađen.')); return; }
  const proj = projekatZaKadar(k);

  main.appendChild(breadcrumb([
    { href: '', label: 'Početna' },
    { href: 'projekti/' + k.projekat + '/', label: proj ? proj.naziv : k.projekat },
    { label: k.naslov }
  ]));

  if (k.demo) {
    const ph = el('div', null, 'detail-hero-placeholder');
    ph.appendChild(el('span', k.kategorija, 'detail-hero-cat'));
    ph.appendChild(el('span', k.naslov, 'detail-hero-title'));
    ph.appendChild(el('span', 'Demo studija — fotografija u pripremi', 'detail-hero-note'));
    main.appendChild(ph);
  } else {
    const img = el('img', null, 'detail-hero');
    img.src = B + 'assets/' + k.id + '-1600.webp';
    img.alt = k.alt || k.naslov;
    main.appendChild(img);
  }

  const info = el('div', null, 'detail-info');
  info.appendChild(el('small', (proj ? proj.naziv : k.projekat) + ' / ' + k.kategorija, 'eyebrow'));
  info.appendChild(el('h1', k.naslov));
  info.appendChild(el('p', k.opis));
  info.appendChild(el('h3', 'Materijali u kadru'));

  const tags = el('div', null, 'tags');
  for (const m of k.materijali) {
    const a = link('materijali/' + materijalSlug(m) + '/', m, 'tag');
    tags.appendChild(a);
  }
  info.appendChild(tags);
  info.appendChild(el('p', k.poreklo, 'meta'));

  const relatedServices = [...new Set(k.materijali.flatMap(m => uslugeZaMaterijal(m)))];
  if (relatedServices.length) {
    info.appendChild(el('h3', 'Povezane usluge'));
    const svcTags = el('div', null, 'tags');
    for (const u of relatedServices) {
      svcTags.appendChild(link('usluge/' + u.slug + '/?kadar=' + k.id, u.naziv, 'tag tag-service'));
    }
    info.appendChild(svcTags);
  }

  const actions = el('div', null, 'actions');
  const inquiryBtn = link('upit/?kadar=' + k.id, 'Pripremi upit ↗', 'btn-primary');
  actions.appendChild(inquiryBtn);

  const saveBtn = el('button', favorites.has(k.id) ? 'Ukloni iz sačuvanih' : 'Sačuvaj kadar', 'btn-secondary');
  saveBtn.onclick = () => {
    if (favorites.has(k.id)) favorites.delete(k.id); else favorites.add(k.id);
    saveFavorites();
    saveBtn.textContent = favorites.has(k.id) ? 'Ukloni iz sačuvanih' : 'Sačuvaj kadar';
    document.querySelectorAll('.badge').forEach(b => b.textContent = favorites.size);
  };
  actions.appendChild(saveBtn);
  info.appendChild(actions);

  const comments = komentariZaKadar(k.id);
  if (comments.length) {
    const cSection = el('div', null, 'related-section');
    cSection.appendChild(el('h2', 'Komentari · Demo'));
    for (const c of comments) {
      const cCard = el('div', null, 'comment-card');
      const cHead = el('div', null, 'comment-head');
      cHead.appendChild(el('span', c.avatar, 'comment-avatar'));
      const cUser = el('span', c.korisnik, 'comment-user');
      cHead.appendChild(cUser);
      if (c.verifikovan) cHead.appendChild(el('span', '✓ ' + c.oznaka, 'comment-badge'));
      if (c.sponzor) cHead.appendChild(el('span', 'Sponzorisano', 'comment-sponsor'));
      cHead.appendChild(el('span', c.vreme, 'comment-time'));
      cCard.appendChild(cHead);
      cCard.appendChild(el('p', c.tekst, 'comment-text'));
      const cFoot = el('div', null, 'comment-foot');
      cFoot.appendChild(el('span', '♥ ' + c.lajkovi));
      cCard.appendChild(cFoot);
      cSection.appendChild(cCard);
    }
    info.appendChild(cSection);
  }

  if (proj && proj.kadrovi.length > 1) {
    const related = el('div', null, 'related-section');
    related.appendChild(el('h2', 'Ostali kadrovi projekta'));
    const rg = el('div', null, 'grid');
    for (const id of proj.kadrovi) {
      if (id === k.id) continue;
      const rk = kadrovi.find(x => x.id === id);
      if (rk) rg.appendChild(buildCard(rk));
    }
    related.appendChild(rg);
    info.appendChild(related);
  }

  main.appendChild(info);
  document.title = k.naslov + ' — ArhiHub';
}

function renderProjekat(main, slug) {
  const p = projekti.find(x => x.slug === slug);
  if (!p) { main.appendChild(el('p', 'Projekat nije pronađen.')); return; }

  main.appendChild(breadcrumb([
    { href: '', label: 'Početna' },
    { label: p.naziv }
  ]));

  const header = el('div', null, 'project-header');
  header.appendChild(el('small', p.tip, 'eyebrow'));
  header.appendChild(el('h1', p.naziv));
  header.appendChild(el('p', p.opis));
  main.appendChild(header);

  const grid = el('div', null, 'grid');
  for (const id of p.kadrovi) {
    const k = kadrovi.find(x => x.id === id);
    if (k) grid.appendChild(buildCard(k));
  }
  main.appendChild(grid);

  const allMats = [...new Set(p.kadrovi.flatMap(id => {
    const k = kadrovi.find(x => x.id === id);
    return k ? k.materijali : [];
  }))];

  if (allMats.length) {
    const matSection = el('div', null, 'related-section');
    matSection.appendChild(el('h2', 'Materijali u projektu'));
    const tags = el('div', null, 'tags');
    for (const m of allMats) {
      tags.appendChild(link('materijali/' + materijalSlug(m) + '/', m, 'tag'));
    }
    matSection.appendChild(tags);
    main.appendChild(matSection);
  }

  document.title = p.naziv + ' — ArhiHub';
}

function renderMaterijal(main, slug) {
  const m = materijali.find(x => x.slug === slug);
  if (!m) { main.appendChild(el('p', 'Materijal nije pronađen.')); return; }
  const related = kadroviZaMaterijal(m.naziv);

  main.appendChild(breadcrumb([
    { href: '', label: 'Početna' },
    { label: m.naziv }
  ]));

  const header = el('div', null, 'material-header');
  header.appendChild(el('small', 'Materijal', 'eyebrow'));
  header.appendChild(el('h1', m.naziv));
  header.appendChild(el('p', 'Kadrovi u kojima se javlja ovaj materijal.'));
  main.appendChild(header);

  const grid = el('div', null, 'grid');
  for (const k of related) grid.appendChild(buildCard(k));
  if (!related.length) grid.appendChild(el('p', 'Nema kadrova sa ovim materijalom.'));
  main.appendChild(grid);

  const relSvc = uslugeZaMaterijal(m.naziv);
  if (relSvc.length) {
    const svcSection = el('div', null, 'related-section');
    svcSection.appendChild(el('h2', 'Povezane usluge'));
    const svcCards = el('div', null, 'service-grid');
    for (const u of relSvc) {
      svcCards.appendChild(buildServiceCard(u));
    }
    svcSection.appendChild(svcCards);
    main.appendChild(svcSection);
  }

  document.title = m.naziv + ' — ArhiHub';
}

function renderSacuvano(main) {
  main.appendChild(breadcrumb([
    { href: '', label: 'Početna' },
    { label: 'Sačuvano' }
  ]));

  const header = el('div', null, 'section-head');
  header.appendChild(el('h2', 'Sačuvani kadrovi'));
  header.appendChild(el('span', favorites.size + ' kadrova', 'count'));
  main.appendChild(header);

  if (!favorites.size) {
    const empty = el('div', null, 'empty-state');
    empty.appendChild(el('p', 'Nema sačuvanih kadrova.'));
    empty.appendChild(el('p', 'Otvori kadar i izaberi „Sačuvaj kadar" da ga dodaš ovde.'));
    empty.appendChild(link('', 'Istraži kadrove', 'btn-primary'));
    main.appendChild(empty);
    return;
  }

  const grid = el('div', null, 'grid');
  for (const id of favorites) {
    const k = kadrovi.find(x => x.id === id);
    if (!k) continue;
    const card = buildCard(k);
    const removeBtn = el('button', 'Ukloni', 'btn-secondary');
    removeBtn.style.marginTop = '8px';
    removeBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      favorites.delete(id);
      saveFavorites();
      renderPage();
    };
    const wrapper = el('div');
    wrapper.appendChild(card);
    wrapper.appendChild(removeBtn);
    grid.appendChild(wrapper);
  }
  main.appendChild(grid);

  document.title = 'Sačuvano — ArhiHub';
}

function renderUpit(main) {
  const params = new URLSearchParams(location.search);
  const kadarId = params.get('kadar');
  const uslugaSlug = params.get('usluga');
  const partnerSlug = params.get('partner');
  const k = kadarId ? kadrovi.find(x => x.id === kadarId) : null;
  const u = uslugaSlug ? usluge.find(x => x.slug === uslugaSlug) : null;
  const p = partnerSlug ? partneri.find(x => x.slug === partnerSlug) : null;

  main.appendChild(breadcrumb([
    { href: '', label: 'Početna' },
    { label: 'Pripremi upit' }
  ]));

  const header = el('div', null, 'material-header');
  header.appendChild(el('small', 'Upit', 'eyebrow'));
  header.appendChild(el('h1', 'Pripremi projektni upit'));
  main.appendChild(header);

  if (k) {
    const preview = el('div', null, 'inquiry-preview');
    const img = el('img');
    img.src = B + 'assets/' + k.id + '-640.webp';
    img.alt = k.naslov;
    const div = el('div');
    const proj = projekatZaKadar(k);
    div.appendChild(el('small', (proj ? proj.naziv : '') + ' / ' + k.kategorija, 'eyebrow'));
    div.appendChild(el('strong', k.naslov));
    div.appendChild(el('p', 'Materijali: ' + k.materijali.join(', ')));
    preview.append(img, div);
    main.appendChild(preview);
  }

  if (u || p) {
    const ctx = el('div', null, 'inquiry-context');
    if (u) {
      const uRow = el('div', null, 'inquiry-context-row');
      uRow.appendChild(el('span', 'Usluga', 'detail-label'));
      uRow.appendChild(el('span', u.naziv));
      ctx.appendChild(uRow);
    }
    if (p) {
      const pRow = el('div', null, 'inquiry-context-row');
      pRow.appendChild(el('span', 'Partner', 'detail-label'));
      const pInfo = el('span');
      pInfo.appendChild(el('strong', p.naziv));
      pInfo.appendChild(document.createTextNode(' · ' + p.tip));
      pRow.appendChild(pInfo);
      ctx.appendChild(pRow);
    }
    main.appendChild(ctx);
  }

  const form = el('div', null, 'inquiry-form');

  if (!k) {
    const selectLabel = el('label', 'Izaberi kadar');
    const select = el('select');
    select.id = 'kadar-select';
    for (const kk of kadrovi) {
      const opt = el('option', kk.naslov);
      opt.value = kk.id;
      select.appendChild(opt);
    }
    select.onchange = () => {
      const url = new URL(location.href);
      url.searchParams.set('kadar', select.value);
      location.href = url.toString();
    };
    form.append(selectLabel, select);
  }

  const scopeLabel = el('label', 'Oblast upita');
  const scope = el('select');
  scope.id = 'scope';
  const scopeOptions = ['Arhitektonsko rešenje', 'Izbor materijala i opreme', 'Dizajn rasvete', 'Specifikacija i nabavka', 'Vizualizacija'];
  for (const kind of scopeOptions) {
    const opt = el('option', kind);
    if (u && kind.toLowerCase().includes(u.naziv.toLowerCase().split(' ')[0])) opt.selected = true;
    scope.appendChild(opt);
  }

  const noteLabel = el('label', 'Napomena');
  const note = el('textarea');
  note.id = 'note';
  note.placeholder = u ? 'Opiši šta ti treba — mere, rokove, posebne zahteve…' : 'Šta želiš da primeniš u svom prostoru?';

  const downloadBtn = el('button', 'Preuzmi upit kao tekst', 'btn-primary');
  downloadBtn.style.marginTop = '20px';
  downloadBtn.onclick = () => {
    const target = k || kadrovi.find(x => x.id === document.getElementById('kadar-select')?.value);
    if (!target) return;
    const proj = projekatZaKadar(target);
    const lines = [
      'ARHI HUB / PROJEKTNI UPIT',
      '',
      (proj ? proj.naziv : target.projekat) + ' — ' + target.naslov,
      'Oblast: ' + scope.value,
      'Materijali iz kadra: ' + target.materijali.join(', '),
    ];
    if (u) lines.push('Usluga: ' + u.naziv);
    if (p) lines.push('Partner: ' + p.naziv + ' (' + p.tip + ')');
    lines.push('', 'Napomena klijenta: ' + (note.value.trim() || '(nije uneta)'), '', 'Za dopunu: lokacija, mere, rok i kontakt.');
    const text = lines.join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = el('a');
    a.href = url;
    a.download = 'ArhiHub-upit-' + target.id + '.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  form.append(scopeLabel, scope, noteLabel, note, downloadBtn);
  main.appendChild(form);

  const info = el('div', null, 'inquiry-note');
  info.appendChild(el('p', 'Nakon preuzimanja, upit možeš proslediti arhitekti ili dobavljaču putem e-maila.'));
  info.appendChild(el('p', 'Tvoji podaci se ne šalju — upit ostaje lokalno na tvom uređaju.'));
  main.appendChild(info);

  document.title = 'Pripremi upit — ArhiHub';
}

function renderUsluge(main) {
  main.appendChild(breadcrumb([
    { href: '', label: 'Početna' },
    { label: 'Usluge' }
  ]));

  const header = el('div', null, 'material-header');
  header.appendChild(el('small', 'Servisni direktorijum', 'eyebrow'));
  header.appendChild(el('h1', 'Usluge'));
  header.appendChild(el('p', 'Od detalja koji vidiš do osobe koja ume da ga nacrta, isporuči ili izvede.'));
  main.appendChild(header);

  const grid = el('div', null, 'service-grid');
  for (const u of usluge) grid.appendChild(buildServiceCard(u));
  main.appendChild(grid);

  document.title = 'Usluge — ArhiHub';
}

function renderUsluga(main, slug) {
  const u = usluge.find(x => x.slug === slug);
  if (!u) { main.appendChild(el('p', 'Usluga nije pronađena.')); return; }
  const params = new URLSearchParams(location.search);
  const kadarId = params.get('kadar');
  const k = kadarId ? kadrovi.find(x => x.id === kadarId) : null;

  main.appendChild(breadcrumb([
    { href: '', label: 'Početna' },
    { href: 'usluge/', label: 'Usluge' },
    { label: u.naziv }
  ]));

  const header = el('div', null, 'material-header');
  header.appendChild(el('small', 'Usluga', 'eyebrow'));
  header.appendChild(el('h1', u.naziv));
  header.appendChild(el('p', u.opis));
  main.appendChild(header);

  const details = el('div', null, 'service-details');
  const row1 = el('div', null, 'service-detail-row');
  row1.appendChild(el('span', 'Potrebni ulazi', 'detail-label'));
  row1.appendChild(el('span', u.ulazi));
  const row2 = el('div', null, 'service-detail-row');
  row2.appendChild(el('span', 'Isporuka', 'detail-label'));
  row2.appendChild(el('span', u.isporuka));
  details.append(row1, row2);
  main.appendChild(details);

  if (k) {
    const ctx = el('div', null, 'inquiry-preview');
    const img = el('img');
    img.src = B + 'assets/' + k.id + '-640.webp';
    img.alt = k.naslov;
    const div = el('div');
    const proj = projekatZaKadar(k);
    div.appendChild(el('small', (proj ? proj.naziv : '') + ' / ' + k.kategorija, 'eyebrow'));
    div.appendChild(el('strong', k.naslov));
    div.appendChild(el('p', 'Materijali: ' + k.materijali.join(', ')));
    ctx.append(img, div);
    main.appendChild(ctx);
  }

  if (u.materijali.length) {
    const matSection = el('div', null, 'related-section');
    matSection.appendChild(el('h2', 'Povezani materijali'));
    const tags = el('div', null, 'tags');
    for (const m of u.materijali) {
      tags.appendChild(link('materijali/' + materijalSlug(m) + '/', m, 'tag'));
    }
    matSection.appendChild(tags);
    main.appendChild(matSection);
  }

  const partners = partneriZaUslugu(slug);
  const partnerSection = el('div', null, 'related-section');
  partnerSection.appendChild(el('h2', 'Partneri'));
  if (partners.length) {
    for (const p of partners) {
      partnerSection.appendChild(buildPartnerCard(p, slug, kadarId));
    }
  } else {
    partnerSection.appendChild(el('p', 'Još nema prijavljenih partnera za ovu uslugu.'));
  }
  main.appendChild(partnerSection);

  const relatedKadrovi = kadrovi.filter(kk => kk.materijali.some(m => u.materijali.includes(m)));
  if (relatedKadrovi.length) {
    const kadSection = el('div', null, 'related-section');
    kadSection.appendChild(el('h2', 'Kadrovi sa povezanim materijalima'));
    const grid = el('div', null, 'grid');
    for (const kk of relatedKadrovi) grid.appendChild(buildCard(kk));
    kadSection.appendChild(grid);
    main.appendChild(kadSection);
  }

  document.title = u.naziv + ' — ArhiHub';
}

function renderOPlatformi(main) {
  main.appendChild(breadcrumb([
    { href: '', label: 'Početna' },
    { label: 'O platformi' }
  ]));

  const content = el('div', null, 'about-content');
  content.innerHTML = `
    <h1>O platformi</h1>
    <p><strong>ArhiHub</strong> je arhitektonska platforma Aleksandra Petrovića. Istraži kadar, izdvoj materijale i pripremi upit za svoj prostor.</p>
    <h2>Svrha</h2>
    <p>Platforma povezuje arhitekte, klijente i dobavljače kroz konkretne projektne vizualizacije. Svaki kadar prikazuje prostor, materijale i rešenja koja se mogu primeniti.</p>
    <h2>Kako funkcioniše</h2>
    <p>Izaberi kadar koji te inspiriše. Pregledaj materijale koji su korišćeni. Sačuvaj omiljene kadrove. Pripremi upit sa konkretnim materijalom i željama — preuzmi ga kao tekst i prosledi arhitekti ili dobavljaču.</p>
    <h2>Urednička pravila</h2>
    <p>Objavljeni kadrovi predstavljaju stvarne projektne vizualizacije ili konceptualne studije. Svaki materijal nosi opšti naziv završne obrade. Konkretni proizvodi dobavljača prikazuju se tek nakon verifikacije specifikacije i odobrenja autora projekta.</p>
    <h2>Predstavljanje proizvoda</h2>
    <p>Materijali u kadru nose opšti naziv — „bordo kamen", „rebrasto staklo". Kada dobavljač potvrdi konkretan artikal, prikazuju se trgovinski naziv, šifra i kontakt. Plaćeni plasman uvek nosi jasnu oznaku.</p>
    <h2>Kolekcije</h2>
    <p>Prvo izdanje — <strong>Sexy kupatila</strong> — istražuje arhitekturu kroz dodir površine, odsjaj, proporciju i svetlo. Izraz „sexy" odnosi se na izraz prostora, ne na sadržaj.</p>
    <h2>Status modula</h2>
    <table class="status-table">
      <thead><tr><th>Modul</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Katalog kadrova (6 pravih + 10 demo)</td><td><span class="status-live">Postoji</span></td></tr>
        <tr><td>Pretraga i filteri</td><td><span class="status-live">Postoji</span></td></tr>
        <tr><td>Detalj kadra i materijali</td><td><span class="status-live">Postoji</span></td></tr>
        <tr><td>Lokalno čuvanje kadrova</td><td><span class="status-live">Postoji</span></td></tr>
        <tr><td>Priprema i preuzimanje upita</td><td><span class="status-live">Postoji</span></td></tr>
        <tr><td>Servisni direktorijum (8 usluga)</td><td><span class="status-live">Postoji</span></td></tr>
        <tr><td>Partneri i „Zatraži ponudu"</td><td><span class="status-sim">Simulirano</span> (2 demo profila)</td></tr>
        <tr><td>Komentari i reakcije</td><td><span class="status-sim">Simulirano</span> (8 demo komentara)</td></tr>
        <tr><td>Korisnički profili i prijava</td><td><span class="status-ext">Zahteva backend</span></td></tr>
        <tr><td>Naplata i pretplata</td><td><span class="status-ext">Zahteva integraciju</span></td></tr>
        <tr><td>ArhiBodovi (gamifikacija)</td><td><span class="status-ext">Zahteva backend</span></td></tr>
        <tr><td>Oglašavanje i promocije</td><td><span class="status-ext">Zahteva integraciju</span></td></tr>
        <tr><td>Video ture i 360°</td><td><span class="status-ext">Zahteva medije</span></td></tr>
      </tbody>
    </table>
  `;
  main.appendChild(content);

  document.title = 'O platformi — ArhiHub';
}

// --- Routing ---

function renderPage() {
  const route = document.body.dataset.route || 'home';
  const slug = document.body.dataset.slug || '';

  document.body.replaceChildren();
  document.body.appendChild(buildHeader());
  const main = el('main', null, 'wrap');

  switch (route) {
    case 'home': renderHome(main); break;
    case 'kadar': renderKadar(main, slug); break;
    case 'projekat': renderProjekat(main, slug); break;
    case 'materijal': renderMaterijal(main, slug); break;
    case 'sacuvano': renderSacuvano(main); break;
    case 'upit': renderUpit(main); break;
    case 'usluge': renderUsluge(main); break;
    case 'usluga': renderUsluga(main, slug); break;
    case 'o-platformi': renderOPlatformi(main); break;
    default: main.appendChild(el('p', 'Stranica nije pronađena.'));
  }

  document.body.appendChild(main);
  document.body.appendChild(buildFooter());

  const searchInput = document.getElementById('search');
  if (searchInput && route !== 'home') {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        location.href = B + '?q=' + encodeURIComponent(searchInput.value);
      }
    });
  }
}

renderPage();
