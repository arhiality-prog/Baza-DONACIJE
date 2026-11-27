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

const demoProjekti = [
  {
    slug: 'loft-dorcol',
    naziv: 'Loft Dorćol',
    tip: 'Enterijeri',
    opis: 'Industrijski loft u srcu Dorćola. Eksponirani beton, čelične grede i topli drveni akcenti.',
    kadrovi: ['loft-dorcol-1']
  },
  {
    slug: 'vila-avala',
    naziv: 'Vila Avala',
    tip: 'Eksterijeri',
    opis: 'Moderna porodična vila na padinama Avale. Kamena baza, staklena fasada i zeleni krov.',
    kadrovi: ['vila-avala-1']
  },
  {
    slug: 'restoran-dunavski',
    naziv: 'Restoran Dunavski',
    tip: 'Restorani i kafići',
    opis: 'Restoran sa pogledom na Dunav. Prirodni materijali, indirektna rasveta i otvoren kuhinjski prostor.',
    kadrovi: ['restoran-dunavski-1']
  },
  {
    slug: 'hotel-skadarlija',
    naziv: 'Boutique Hotel Skadarlija',
    tip: 'Hoteli',
    opis: 'Butik hotel u renoviranoj zgradi iz 19. veka. Spoj tradicije i savremenog dizajna.',
    kadrovi: ['hotel-skadarlija-1']
  },
  {
    slug: 'kancelarija-tech-park',
    naziv: 'Kancelarija Tech Park',
    tip: 'Kancelarije',
    opis: 'Open-space kancelarija za IT kompaniju. Akustični paneli, zeleni zidovi i fleksibilni radni prostori.',
    kadrovi: ['kancelarija-tech-park-1']
  },
  {
    slug: 'penthouse-nbgd',
    naziv: 'Penthouse Novi Beograd',
    tip: 'Enterijeri',
    opis: 'Dupleks penthouse sa panoramskim pogledom. Minimalistički pristup sa luksuznim materijalima.',
    kadrovi: ['penthouse-nbgd-1']
  },
  {
    slug: 'wellness-zlatibor',
    naziv: 'Wellness Centar Zlatibor',
    tip: 'Wellness & Spa',
    opis: 'Spa centar integrisan u planinski pejzaž. Lokalni kamen, drvo i voda kao elementi dizajna.',
    kadrovi: ['wellness-zlatibor-1']
  },
  {
    slug: 'prodavnica-vina',
    naziv: 'Prodavnica Vina',
    tip: 'Prodavnice',
    opis: 'Vinoteka sa degustacionim prostorom. Hrast, opeka i ambijentalna rasveta.',
    kadrovi: ['prodavnica-vina-1']
  },
  {
    slug: 'kuca-na-vodi',
    naziv: 'Kuća na Vodi',
    tip: 'Eksterijeri',
    opis: 'Plutajuća kuća na Savi. Čelik, staklo i cedar. Održivi dizajn sa solarnim panelima.',
    kadrovi: ['kuca-na-vodi-1']
  },
  {
    slug: 'master-kupatilo-lux',
    naziv: 'Master Kupatilo Lux',
    tip: 'Kupatila',
    opis: 'Master kupatilo sa slobodnostojećom kadom, duplim umivaonikom i kišnim tušem u mermeru.',
    kadrovi: ['master-kupatilo-lux-1']
  }
];

const demoKadrovi = [
  { id: 'loft-dorcol-1', projekat: 'loft-dorcol', naslov: 'Detalj ograde na galeriji', kategorija: 'Enterijeri', opis: 'Čelična ograda galerije sa drvenim rukohvatom. Eksponirani beton i industrijska rasveta.', materijali: ['Čelik', 'Orah'], poreklo: 'Demo studija', alt: 'Detalj galerijske ograde u industrijskom loftu', demo: true },
  { id: 'vila-avala-1', projekat: 'vila-avala', naslov: 'Studija fasadne obloge', kategorija: 'Eksterijeri', opis: 'Kamena baza prelazi u staklenu fasadu. Zeleni krov se spaja sa padinom.', materijali: ['Staklo'], poreklo: 'Demo studija', alt: 'Fasada moderne vile sa kamenom bazom i staklom', demo: true },
  { id: 'restoran-dunavski-1', projekat: 'restoran-dunavski', naslov: 'Večernja scena restorana', kategorija: 'Restorani i kafići', opis: 'Indirektna rasveta naglašava teksturu drveta i kamena. Otvoren pogled na reku.', materijali: ['Orah', 'Linearna rasveta'], poreklo: 'Demo studija', alt: 'Unutrašnjost restorana sa pogledom na Dunav', demo: true },
  { id: 'hotel-skadarlija-1', projekat: 'hotel-skadarlija', naslov: 'Detalj hotelskih vrata', kategorija: 'Hoteli', opis: 'Renovirana vrata sa originalnim okvirima. Moderno svetlo na tradicionalnoj fasadi.', materijali: ['Orah', 'Zidna armatura'], poreklo: 'Demo studija', alt: 'Detalj vrata butik hotela u Skadarliji', demo: true },
  { id: 'kancelarija-tech-park-1', projekat: 'kancelarija-tech-park', naslov: 'Izbor akustične obloge', kategorija: 'Kancelarije', opis: 'Akustični paneli u toplim tonovima. Zeleni zid kao vizuelni fokus open-space prostora.', materijali: ['Vertikalne letvice'], poreklo: 'Demo studija', alt: 'Open-space kancelarija sa akustičnim panelima', demo: true },
  { id: 'penthouse-nbgd-1', projekat: 'penthouse-nbgd', naslov: 'Uporedna specifikacija parketa', kategorija: 'Enterijeri', opis: 'Tri varijante parketa u istoj prostoriji. Pogled na Novi Beograd kroz panoramsko staklo.', materijali: ['Parket', 'Staklo'], poreklo: 'Demo studija', alt: 'Penthouse sa panoramskim pogledom i tri varijante parketa', demo: true },
  { id: 'wellness-zlatibor-1', projekat: 'wellness-zlatibor', naslov: 'Detalj preliva bazena', kategorija: 'Wellness & Spa', opis: 'Preliv bazena sa lokalnim kamenom. Drvo i voda kao dominantni materijali.', materijali: ['Bordo kamen', 'Keramika'], poreklo: 'Demo studija', alt: 'Preliv bazena u wellness centru na Zlatiboru', demo: true },
  { id: 'prodavnica-vina-1', projekat: 'prodavnica-vina', naslov: 'Rasveta degustacionog stola', kategorija: 'Prodavnice', opis: 'Ambijentalna rasveta iznad hrastovog stola. Opeka i drvo oblikuju topao prostor.', materijali: ['Orah', 'Opeka', 'Linearna rasveta'], poreklo: 'Demo studija', alt: 'Degustacioni sto u vinoteci sa ambijentalnom rasvetom', demo: true },
  { id: 'kuca-na-vodi-1', projekat: 'kuca-na-vodi', naslov: 'Zaštita fasadne obloge', kategorija: 'Eksterijeri', opis: 'Cedar i čelik na plutajućoj konstrukciji. Solarne ploče na ravnom krovu.', materijali: ['Čelik', 'Staklo'], poreklo: 'Demo studija', alt: 'Plutajuća kuća na Savi sa cedar i čelik fasadom', demo: true },
  { id: 'master-kupatilo-lux-1', projekat: 'master-kupatilo-lux', naslov: 'Koordinacija slivnika i rastera keramike', kategorija: 'Kupatila', opis: 'Mermer, kišni tuš i slobodnostojeća kada. Slivnik usklađen sa rasterom pločica.', materijali: ['Bordo kamen', 'Keramika', 'Zidna armatura'], poreklo: 'Demo studija', alt: 'Master kupatilo sa mermerom i kišnim tušem', demo: true }
];

for (const dp of demoProjekti) projekti.push(dp);
for (const dk of demoKadrovi) kadrovi.push(dk);

const kategorije = ['Sve', ...new Set(kadrovi.map(k => k.kategorija))];

const usluge = [
  {
    slug: 'lasersko-snimanje',
    naziv: 'Lasersko snimanje / BLK360',
    opis: 'Oblak tačaka i dogovorene osnove postojećeg stanja.',
    ulazi: 'Adresa, obuhvat, pristup prostoru',
    isporuka: 'Oblak tačaka i dogovorene osnove postojećeg stanja',
    materijali: []
  },
  {
    slug: 'archicad-bim',
    naziv: 'ArchiCAD / BIM i razrada',
    opis: 'Model, preseci i šeme pozicija iz osnova i nivoa razrade.',
    ulazi: 'Osnove i nivo razrade',
    isporuka: 'Model, preseci i šeme pozicija',
    materijali: []
  },
  {
    slug: 'vizualizacije',
    naziv: 'Vizualizacije sa zaključanom geometrijom',
    opis: 'Dnevni i noćni kadar iz iste kamere na osnovu odobrenog modela.',
    ulazi: 'Model, kamera, odobren materijal',
    isporuka: 'Dnevni i noćni kadar iz iste kamere',
    materijali: []
  },
  {
    slug: 'hotelski-fit-out',
    naziv: 'Hotelski fit-out i stolarija',
    opis: 'Tipski detalj, tabela količina i dokumentacija za fabriku.',
    ulazi: 'Tip sobe, sprat, mere i okovi',
    isporuka: 'Tipski detalj, tabela količina i dokumentacija za fabriku',
    materijali: ['Orah', 'Vertikalne letvice']
  },
  {
    slug: 'specifikacija-materijala',
    naziv: 'Specifikacija materijala i nabavka',
    opis: 'Uporedivi artikli, količine, alternative i RFQ.',
    ulazi: 'Kadar, budžet, površine i rok',
    isporuka: 'Uporedivi artikli, količine, alternative i RFQ',
    materijali: ['Bordo kamen', 'Rebrasto staklo', 'Keramika', 'Parket', 'Opeka', 'Staklo']
  },
  {
    slug: 'dizajn-rasvete',
    naziv: 'Dizajn rasvete',
    opis: 'Plan svetiljki, pozicije, detalj ugradnje i scene.',
    ulazi: 'Osnova, preseci i scenario korišćenja',
    isporuka: 'Plan svetiljki, pozicije, detalj ugradnje i scene',
    materijali: ['Linearna rasveta', 'Zidna armatura']
  },
  {
    slug: 'montazne-kuce',
    naziv: 'Montažne kuće i varijante fasade',
    opis: 'Varijante volumena i uporedni prikazi fasada.',
    ulazi: 'Parcela, program i tehnički sistem',
    isporuka: 'Varijante volumena i uporedni prikazi',
    materijali: []
  },
  {
    slug: 'ai-alati',
    naziv: 'AI alati za projektne biroe',
    opis: 'Pilot automatizacije i kriterijum provere rezultata.',
    ulazi: 'Uzorak radnog procesa i izlaznog dokumenta',
    isporuka: 'Pilot automatizacije i kriterijum provere rezultata',
    materijali: []
  }
];

const partneri = [
  {
    slug: 'arhi-studio-petrovic',
    naziv: 'ARHI Studio Petrović',
    tip: 'Biro',
    usluge: ['dizajn-rasvete', 'vizualizacije', 'specifikacija-materijala', 'archicad-bim', 'lasersko-snimanje'],
    opis: 'Projektovanje rasvete, vizualizacije i specifikacije za enterijere i javne prostore.',
    status: 'Demo profil'
  },
  {
    slug: 'svetlo-doo',
    naziv: 'Svetlo d.o.o.',
    tip: 'Dobavljač',
    usluge: ['dizajn-rasvete'],
    opis: 'Linearne LED sisteme i arhitektonsku rasvetu — konsultacija, isporuka i montaža.',
    status: 'Demo profil'
  }
];

const demoKomentari = [
  { korisnik: 'MilanArch92', avatar: '👷', tekst: 'Ovaj prelaz parketa u keramiku je čist 🔥 Ko je dobavljač za linearnu rasvetu?', lajkovi: 47, vreme: 'pre 2 dana', kadar: 'putanja' },
  { korisnik: 'InteriorJelena', avatar: '💡', tekst: 'Rebrasto staklo + bordo kamen = kombinacija koju nisam očekivala da radi ovako dobro. Bravo! 💧', lajkovi: 123, vreme: 'pre 5 dana', verifikovan: true, oznaka: 'Dizajner enterijera', kadar: 'bordo' },
  { korisnik: 'KlijentMarko', avatar: '🏠', tekst: 'Upravo poslao upit za ovo kupatilo. Nadam se da materijali nisu previše skupi 😅', lajkovi: 89, vreme: 'pre 1 nedelju', kadar: 'bordo' },
  { korisnik: 'KeramikaPlus', avatar: '🧱', tekst: 'Ovu keramiku imamo u 4 boje. Javite se za uzorak! Šifra: KP-2024-BORDO', lajkovi: 34, vreme: 'pre 3 dana', verifikovan: true, oznaka: 'Verifikovani dobavljač', sponzor: true, kadar: 'bordo' },
  { korisnik: 'NovakDesign', avatar: '✏️', tekst: 'Ta niša u orahu me podseća na japanski pristup — wabi-sabi u beogradskom stanu. Respect. 🌊', lajkovi: 201, vreme: 'pre 1 mesec', kadar: 'orah' },
  { korisnik: 'DobavljačSvetla', avatar: '💡', tekst: 'LED traka u ovom projektu je naš model LS-PRO-3000K. Detalji na profilu ⏰🔔', lajkovi: 56, vreme: 'pre 4 dana', verifikovan: true, oznaka: 'Verifikovani dobavljač', kadar: 'putanja' },
  { korisnik: 'StudentArh', avatar: '📐', tekst: 'Gledam ovo već treći put danas. Svaki put primetim novi detalj. Ovo je level kome težim 🫧', lajkovi: 312, vreme: 'pre 2 nedelje', kadar: 'petrol' },
  { korisnik: 'IzvođačPetar', avatar: '🔨', tekst: 'Radio sam sličan projekat — ta opeka zahteva specifičnu fugnu. DM za savet 👀💦', lajkovi: 78, vreme: 'pre 6 dana', verifikovan: true, oznaka: 'Verifikovani izvođač', kadar: 'floris' }
];

function komentariZaKadar(id) {
  return demoKomentari.filter(k => k.kadar === id);
}

function uslugeZaMaterijal(naziv) {
  return usluge.filter(u => u.materijali.includes(naziv));
}

function partneriZaUslugu(slug) {
  return partneri.filter(p => p.usluge.includes(slug));
}
