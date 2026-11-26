'use strict';
const byId = id => document.getElementById(id);
const dialog = byId('detail');
const search = byId('search');
const categories = ['Sve', ...new Set(kadrovi.map(item => item.category))];
const storageKey = 'arhiHub.saved.v1';
let favorites = new Set();
try {
  const stored = JSON.parse(localStorage.getItem(storageKey));
  if (Array.isArray(stored)) favorites = new Set(stored.filter(id => kadrovi.some(item => item.id === id)));
} catch {}
let onlySaved = false;
let category = 'Sve';
const normalized = text => text.toLocaleLowerCase('sr-Latn').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('đ','dj');
function element(tag, label, cls) {
  const node = document.createElement(tag);
  if (label) node.textContent = label;
  if (cls) node.className = cls;
  return node;
}
function button(label, action, cls) {
  const node = element('button',label,cls);
  node.onclick = action;
  return node;
}
function render() {
  byId('saved').querySelector('span').textContent = favorites.size;
  byId('saved').setAttribute('aria-pressed',String(onlySaved));
  byId('gridtitle').textContent = onlySaved ? 'Sačuvani kadrovi' : 'Izbor kadrova';
  const matches = kadrovi.filter(item => (!onlySaved || favorites.has(item.id))
    && (category === 'Sve' || item.category === category)
    && normalized([item.project,item.title,item.category,...item.materials].join(' ')).includes(normalized(search.value.trim())));
  byId('results').textContent = 'Prikazano ' + matches.length + ' / ' + kadrovi.length;
  const grid = byId('grid');
  grid.replaceChildren();
  for (const item of matches) {
    const card = button('',() => openItem(item),'card');
    const img = element('img');
    img.src = 'assets/'+item.id+'-640.webp';
    img.alt = item.title;
    img.loading = 'lazy';
    card.append(img,element('span',item.project+' / '+item.category,'meta'),element('strong',item.title));
    grid.append(card);
  }
  if (!matches.length) grid.append(element('p', onlySaved && !favorites.size ? 'Otvori kadar i izaberi „Sačuvaj kadar”.' : 'Nema kadrova za ovaj izbor.'),button('Prikaži sve kadrove',reset,'secondary'));
  byId('filters').replaceChildren(...categories.map(cat => {
    const chip = button(cat,() => {category=cat; render()});
    chip.setAttribute('aria-pressed',String(cat === category));
    return chip;
  }));
}
function reset() {onlySaved=false; category='Sve'; search.value=''; render()}
function show(...nodes) {
  byId('body').replaceChildren(...nodes);
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop=0;
}
function downloadBrief(item, note, scope) {
  const body = ['ARHI HUB / PROJEKTNI UPIT',item.project+' — '+item.title,'Oblast: '+scope,'Materijali iz kadra: '+item.materials.join(', '),'Napomena klijenta: '+note.trim(),'Za dopunu: lokacija, mere, rok i kontakt.'].join('\n');
  const url = URL.createObjectURL(new Blob([body],{type:'text/plain;charset=utf-8'}));
  const link=element('a');link.href=url;link.download='ArhiHub-upit-'+item.id+'.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
}
function brief(item) {
  const box=element('section',null,'info');
  const scope=element('select');
  scope.setAttribute('aria-label','Oblast upita');
  for(const kind of ['Arhitektonsko rešenje','Izbor materijala i opreme'])scope.append(element('option',kind));
  const note=element('textarea');note.placeholder='Šta želiš da primeniš u svom prostoru?';note.setAttribute('aria-label','Opis projekta');
  box.append(element('small',item.project,'eyebrow'),element('h2','Pripremi upit'),element('p',item.title+' · Upit se preuzima kao tekst koji možeš proslediti arhitekti ili dobavljaču.'),scope,note,button('Preuzmi upit',()=>downloadBrief(item,note.value,scope.value),'primary'));
  show(box);
}
function openItem(item) {
  const img=element('img',null,'full');img.src='assets/'+item.id+'-1600.webp';img.alt=item.title;
  const info=element('section',null,'info');
  const tags=element('div',null,'tags');
  for(const mat of item.materials) tags.append(button(mat,()=>{dialog.close();reset();search.value=mat;render();byId('kadrovi').scrollIntoView()},'tag'));
  const actions=element('div',null,'actions');
  const save=button(favorites.has(item.id)?'Ukloni iz sačuvanih':'Sačuvaj kadar',()=>{
    if(favorites.has(item.id))favorites.delete(item.id);else favorites.add(item.id);
    try {localStorage.setItem(storageKey,JSON.stringify([...favorites]))} catch {}
    save.textContent=favorites.has(item.id)?'Ukloni iz sačuvanih':'Sačuvaj kadar';render();
  },'secondary');
  actions.append(button('Pripremi upit ↗',()=>brief(item),'primary'),save);
  info.append(element('small',item.project+' / '+item.category,'eyebrow'),element('h2',item.title),element('p',item.description),element('h3','Materijali u kadru'),tags,element('p',item.origin,'meta'),actions);
  show(img,info);
}
byId('feature').onclick=()=>openItem(kadrovi[0]);
byId('about').onclick=()=>{
  const info=element('section',null,'info');
  info.append(element('h2','O platformi'),element('p','ArhiHub je arhitektonska platforma Aleksandra Petrovića. Istraži kadar, izdvoj materijale i pripremi upit za svoj prostor.'),element('p','Ovo izdanje povezuje tri studije kroz šest vizualizacija. Sačuvani kadrovi ostaju u ovom pregledaču.'));
  show(info);
};
byId('close').onclick=()=>dialog.close();
byId('saved').onclick=()=>{onlySaved=!onlySaved;category='Sve';search.value='';render();byId('kadrovi').scrollIntoView()};
document.querySelector('nav a').onclick=reset;
search.oninput=()=>{render();byId('kadrovi').scrollIntoView()};
render();
