'use strict';
const projekti = [
  {
    slug: 'sexy-kupatila',
    naziv: 'Sexy kupatila',
    tip: 'Kupatila',
    opis: 'Monolitna ploča, rebrasto staklo i bordo kamen. Novi koncept za ArhiHub koji istražuje odnos teških površina i svetlosti.',
    kadrovi: ['bordo']
  },
  {
    slug: 'stan-02',
    naziv: 'Stan 02',
    tip: 'Enterijeri',
    opis: 'Tri kadra jednog ulaznog prostora. Petrol pozadina, orah niša i crvena svetlosna linija oblikuju prvi utisak stana.',
    kadrovi: ['putanja', 'orah', 'petrol']
  },
  {
    slug: 'floris-fietsen',
    naziv: 'Floris Fietsen',
    tip: 'Eksterijeri',
    opis: 'Biciklistička radnja u dve interpretacije — krupni plan izloga posle kiše i široki kadar fasade u sutonu.',
    kadrovi: ['floris', 'suton']
  }
];

const kadrovi = [
  {
    id: 'bordo',
    projekat: 'sexy-kupatila',
    naslov: 'Bordo kamen u popodnevnom svetlu',
    kategorija: 'Kupatila',
    opis: 'Monolitna ploča i plitka zaobljena posuda dele istu osu. Rebrasto staklo propušta svetlost do tuša i zaklanja direktan pogled.',
    materijali: ['Bordo kamen', 'Rebrasto staklo', 'Zidna armatura'],
    poreklo: 'Novi koncept za ArhiHub',
    alt: 'Bordo kamena ploča sa svetlim lavaboom i tušem iza rebrastog stakla'
  },
  {
    id: 'putanja',
    projekat: 'stan-02',
    naslov: 'Svetlo koje skreće',
    kategorija: 'Enterijeri',
    opis: 'Crvena linija prelazi sa zida na plafon. Poprečna traka u podu obeležava mesto gde parket ustupa prostor keramici.',
    materijali: ['Linearna rasveta', 'Keramika', 'Parket'],
    poreklo: 'Postojeća projektna vizualizacija',
    alt: 'Ulazni prostor sa crvenom linearnom rasvetom na plafonu i prelazom parketa u keramiku'
  },
  {
    id: 'floris',
    projekat: 'floris-fietsen',
    naslov: 'Izlog posle kiše',
    kategorija: 'Eksterijeri',
    opis: 'Toplo osvetljenje izloga zadržava pogled na biciklima. Odraz u mokrom pločniku produžava izlog u ulicu.',
    materijali: ['Opeka', 'Čelik', 'Staklo'],
    poreklo: 'Postojeća projektna vizualizacija',
    alt: 'Izlog biciklističke radnje Floris Fietsen sa toplim svetlom nakon kiše'
  },
  {
    id: 'orah',
    projekat: 'stan-02',
    naslov: 'Niša u orahu',
    kategorija: 'Enterijeri',
    opis: 'Uvučena niša uvodi toplu površinu u dubinu petrol hodnika. Vertikalni ritam desnog zida naglašava ulaz.',
    materijali: ['Orah', 'Vertikalne letvice'],
    poreklo: 'Postojeća projektna vizualizacija',
    alt: 'Niša obložena orahom u petrol hodniku sa vertikalnim letvicama'
  },
  {
    id: 'suton',
    projekat: 'floris-fietsen',
    naslov: 'Fasada u sutonu',
    kategorija: 'Eksterijeri',
    opis: 'Široki kadar prikazuje odnos izloga, ulice i susednih kuća u niskom večernjem svetlu.',
    materijali: ['Opeka', 'Staklo'],
    poreklo: 'Postojeća projektna vizualizacija',
    alt: 'Fasada biciklističke radnje Floris Fietsen u večernjem svetlu sa susednim kućama'
  },
  {
    id: 'petrol',
    projekat: 'stan-02',
    naslov: 'Petrol i bordo',
    kategorija: 'Enterijeri',
    opis: 'Studija ulaznog prostora u kojoj se tamna pozadina, toplo drvo i geometrijska rasveta čitaju iz iste ose.',
    materijali: ['Orah', 'Linearna rasveta'],
    poreklo: 'Postojeća projektna vizualizacija',
    alt: 'Ulazni prostor sa petrol plavim zidovima, orahom i bordo rasvetom'
  }
];

const materijali = [
  { slug: 'bordo-kamen', naziv: 'Bordo kamen' },
  { slug: 'rebrasto-staklo', naziv: 'Rebrasto staklo' },
  { slug: 'zidna-armatura', naziv: 'Zidna armatura' },
  { slug: 'linearna-rasveta', naziv: 'Linearna rasveta' },
  { slug: 'keramika', naziv: 'Keramika' },
  { slug: 'parket', naziv: 'Parket' },
  { slug: 'opeka', naziv: 'Opeka' },
  { slug: 'celik', naziv: 'Čelik' },
  { slug: 'staklo', naziv: 'Staklo' },
  { slug: 'orah', naziv: 'Orah' },
  { slug: 'vertikalne-letvice', naziv: 'Vertikalne letvice' }
];

function materijalSlug(naziv) {
  return materijali.find(m => m.naziv === naziv)?.slug || naziv.toLowerCase().replace(/[čćšžđ]/g, c => ({č:'c',ć:'c',š:'s',ž:'z',đ:'dj'})[c] || c).replace(/\s+/g, '-');
}

function projekatZaKadar(kadar) {
  return projekti.find(p => p.slug === kadar.projekat);
}

function kadroviZaProjekat(slug) {
  return kadrovi.filter(k => k.projekat === slug);
}

function kadroviZaMaterijal(naziv) {
  return kadrovi.filter(k => k.materijali.includes(naziv));
}

const kategorije = ['Sve', ...new Set(kadrovi.map(k => k.kategorija))];
