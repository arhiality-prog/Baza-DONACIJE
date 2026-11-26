# Vizuelni sistem i tačan redosled dizajna

**Utisak u tri sekunde.** Posetilac prepoznaje aluziju kroz beli „Arhi“ i crni „hub“ na narandžastoj pločici, tamno platno i gustu mrežu slika. U prvom kadru jasno vidi lavabo, kamenu ploču i staklo. Sadržaj i naslovi odmah određuju temu. Referenca za anatomiju logotipa je Pornhub. Produkcijski znak ArhiHub u assets/logo.svg isporučen je kao krive, tako da izgleda isto bez instaliranih fontova.

## 1 · Postavi identitet
Na tamnoj podlozi koristi izvezeni SVG u celini. U zaglavlju je širok 130 px, u podnožju 86 px. Oko znaka ostavi najmanje 8 px slobodnog prostora. Na faviconu koristi samostalno malo „h“ sa narandžastom osnovom; fajl je u assets/znak.svg. Znak uvek zadržava originalne proporcije.

| Uloga | Vrednost | Primena |
|---|---|---|
| Pozadina | #101010 | Cela strana |
| Sekundarna površina | #211D1A | Tekstualni deo naslovne kolekcije |
| Signal | #FF9900 | Pločica, primarna akcija, fokus |
| Tekst | #F4F1EC | Naslovi na tamnoj podlozi |
| Pomoćni tekst | #BDB9B3 | Kolekcija, broj rezultata, poreklo |
| Razdelnik | #393836 | Pretraga, filteri, podnožje |

Inter sa Arial sistemskom zamenom za navigaciju i kartice. Georgia Italic za reč „kupatila“ na naslovnici. Kontrast masnog groteska i jednog kurzivnog reza je urednički potpis ove kolekcije. Stranica se može prikazati bez mrežnih fontova.

## 2 · Napravi kompoziciju, prvo na 390 px
Red 1 ima znak levo i izbor kadrova/sačuvane desno. Pretraga zauzima drugi red. Naslovni kadar je iznad teksta. Na telefonu naslov staje u jedan red kad ima prostora. Dve kartice po redu do širine 360 px, ispod toga jedna. Na desktopu ograniči sadržaj na 1440 px i 94% širine prozora. Naslovni modul dobija odnos kolona 1,8 prema 1. Na 621–850 px koristi 1,25 prema 1 i dve kartice. Na većim ekranima tri kartice. Kanonske vrednosti su u style.css.

## 3 · Pripremi medije
Polazni materijal je šest PNG mastera. Bordo je nova konceptualna slika. Putanja, Orah i Petrol su iteracije istog ulaza. Floris i Suton predstavljaju dve interpretacije istog izloga. Nema osnova da se iteracije računaju kao odvojeni izvedeni projekti. Za kartice koristi WebP širine do 640 px, za detalje do 1600 px. Originali zadržavaju svoju rezoluciju. Kadriranje kartice koristi 16:10. U detalju se uvek prikazuje cela kompozicija. Buduće varijante Stana 02 zadržavaju položaj kamere, otvore, granicu podova i proporcije. Razliku materijala ili rasvete upiši u naziv iteracije.

## 4 · Poveži elemente
Kartica otvara pun kadar. Ispod slike slede kolekcija, naslov, jedna prostorna opservacija i klikabilni materijali. Klik na „Opeka“ vraća oba prikaza Florisa. Čuvanje ima vidljivo stanje i broj u navigaciji. „Pripremi upit“ prenosi naslov i materijale u kratak obrazac. U javnoj verziji korisnik dodatno bira autora ili potvrđenog dobavljača kada postoji veza. Prazan rezultat uvek nudi povratak na sve kadrove.

## 5 · Završna provera
Na 390 i 1440 px proceni čitljivost natpisa na znaku, prelom naslova, mesto spoja dve površine u hero modulu i crop umivaonika. Probaj Tab, Enter i Escape. Zatvaranje detalja vraća fokus na element koji ga je otvorio. Na 320 px proveri da stranica nema horizontalni skrol. Pre objave potvrdi autorstvo, dozvolu za prikaz projektnih vizuala i kontakte pojedinačnih dobavljača.
