# Implementacija / specifikacija za predaju

## Izdanje 1 · javni katalog
Referentni prototip je u folderu sajt. Cilj produkcijske izrade je da svaki kadar, projekat i materijal dobije stabilan URL koji se može poslati klijentu. Zadrži lokalni način rada referentnog prototipa kao rezervnu verziju za prezentacije.

| Ruta | Sadržaj i obavezno ponašanje |
|---|---|
| / | Naslovna kolekcija, svi kadrovi, pretraga, filteri po kategoriji |
| /projekti/:slug | Opis, povezane iteracije, uloga autora kada je potvrđena |
| /kadar/:slug | Ceo render, materijali, sačuvaj, povezani projekat i upit |
| /materijali/:slug | Svi kadrovi u kojima se javlja materijal. Stvarni artikli se dodaju posle verifikacije |
| /sacuvano | Lokalno sačuvani kadrovi, pojedinačno uklanjanje, prazno stanje |
| /upit | Pregled kadra, tip upita, napomena, izvoz u UTF-8 TXT |
| /o-platformi | Svrha, vlasnik koncepta, urednička pravila i način predstavljanja proizvoda |

Prvo isporuči ove rute kao statički sajt sa direktnim učitavanjem URL-a, bez servisnih naloga. Koristi gotove stranice u folderima sa index.html ili ekvivalentan statički izvoz. Na listama čuvaj pretragu i filter u URL parametrima kako bi Back i deljenje vratili isti izbor. „Sačuvano“ koristi samo identifikatore kadrova. Ne upisuj napomene ili kontakt korisnika u javni URL.

## Izdanje 2 · potvrđeni profili i zahtevi
Arhitekta šalje portfolio i bira ulogu na projektu. Urednik proverava izvor i odobrava kredit. Profil povezuje ime, stručnost, položaj na projektu, odobrene kadrove i kontakt za upit. Dobavljač prijavljuje konkretan artikal, završnu obradu, šifru i URL tehničkog lista. Urednik povezuje artikal sa projektom tek kada ima potvrdu specifikacije. Dok veza nije potvrđena, oznaka na slici ostaje opšti materijal.

**Predložene tabele i veze**

| Tabela | Minimalna polja | Veza i uslov |
|---|---|---|
| project | id, slug, naziv, tip, opis, status | Više kadrova pripada istom projektu |
| frame | id, project_id, slug, naslov, opis, media, alt, origin | Svaki od šest izvora ima jedinstven ID |
| material / frame_material | id, slug, naziv / frame_id, material_id | Jedinstven par, podržava više materijala po kadru |
| profile / credit | id, tip, naziv, status, kontakt / project_id, profile_id, uloga | Objavi samo odobrene kredite |
| product / placement | id, supplier_id, šifra, naziv, list_url / product_id, frame_id, status | Potvrda mora postojati pre prikaza trgovinskog naziva |
| inquiry | id, frame_id, primalac, tip, poruka, kontakt, status, created_at | Privatno, dostupno pošiljaocu, dodeljenom primaocu i administratoru |

Klijent bira arhitektu ili dobavljača, vidi primaoca, unosi kontakt i pregleda sadržaj pre slanja. Server kreira jedan zahtev uz jedinstveni ključ predaje i vraća potvrdu sa ID-em. Greška zadržava unete podatke i omogućava ponovni pokušaj. Dobavljač vidi samo dodeljene zahteve. Arhitekta uređuje sopstvene nacrte. Urednik kontroliše objavu i povlačenje. Sakrij akciju slanja dok nema potvrđenog primaoca i podešenog servisa. Lokalno preuzimanje ostaje upotrebljivo.

## Podaci za javnu objavu
Aleksandar odobrava spisak vizuala i kredite po projektu. Za Floris posebno potvrditi kredit projektnog biroa i odobrenje za javni prikaz. Novi render kupatila označiti kao koncept. Za cenu i raspoloživost proizvoda koristiti podatke konkretnog dobavljača sa datumom provere. Bez tih podataka, ekran prikazuje naziv završne obrade.

## Predaja i kontrola
1. Otvoriti svaki direktni URL u novom prozoru. Proveriti naslov stranice, vidljiv naslov, alt i povratak na isti filter.
2. Upit „celik“ nalazi Floris. „Opeka“ nalazi dve vizualizacije, „Enterijeri“ tri. Nepostojeći izraz daje prazno stanje.
3. Sačuvati kadar i osvežiti stranu na istom domenu. Ukloniti ga iz sačuvanih. U slučaju blokiranog skladišta zadržati izbor do kraja posete.
4. Preuzeti dva različita upita. Proveriti da su naslovi, tip i napomena odgovarajući za svaki.
5. Uporediti svih šest slika sa originalima. Proveriti i mali ekran, uvećanje teksta, tastaturu, vidljiv fokus i čitljivost dugmadi.
6. Hostingu predati samo javni izlaz. Za statičku verziju nema tajni ni procesa na serveru. Prvo proveriti privremeni URL i direktne putanje. Produkcijski domen povezuje vlasnik kada odobri objavu.

## Izdanje 3 · posle prvih stvarnih upita
Uvesti pakete za kupatilo nakon provere potrošenih sati. Zatim partnerstva i pregled potvrđenih preporuka. Dodati 360° i VR kada postoji odgovarajući panoramski ili 3D materijal. Uspeh meriti prelazima kadar → materijal → upit i brojem kvalifikovanih zahteva po stvarnom projektu.
