-- Delete all existing data
DELETE FROM reservations;
DELETE FROM recommendations;
DELETE FROM apartments;

-- Reset sequences
ALTER SEQUENCE apartments_id_seq RESTART WITH 1;
ALTER SEQUENCE recommendations_id_seq RESTART WITH 1;
ALTER SEQUENCE reservations_id_seq RESTART WITH 1;

-- Insert authentic Croatian apartments
INSERT INTO apartments (name, description, price_per_night, number_of_rooms, capacity, amenities, latitude, longitude, address, image_urls) VALUES

-- DUBROVNIK
(
    'Villa Stradun Dubrovnik',
    'Luksuzna kamena vila u srcu Starog grada Dubrovnika, samo 50 metara od glavne ulice Stradun. Autentična dalmatinska arhitektura s modernim sadržajima. Pogled na gradske zidine i more.',
    320.00,
    4,
    8,
    '["WiFi", "Klima uređaj", "Kuhinja", "Terasa", "Pogled na more", "Povijesna lokacija", "Parking", "Perilica rublja"]',
    42.6407,
    18.1077,
    'Ul. od Puča 8, 20000 Dubrovnik, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Villa+Stradun", "/placeholder.svg?height=400&width=600&text=Terasa+Dubrovnik", "/placeholder.svg?height=400&width=600&text=Stari+grad"]'
),

-- SPLIT
(
    'Apartman Dioklecijanova palača',
    'Jedinstveni apartman unutar UNESCO-ove Dioklecijanova palače. Spoj antičke povijesti i modernog komfora. Idealno za ljubitelje kulture i povijesti.',
    180.00,
    2,
    4,
    '["WiFi", "Klima uređaj", "Kuhinja", "Povijesna lokacija", "Blizina Rive", "Kameni zidovi", "Autentična arhitektura"]',
    43.5081,
    16.4402,
    'Dioklecijanova 15, 21000 Split, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Dioklecijanova+palača", "/placeholder.svg?height=400&width=600&text=Antička+arhitektura", "/placeholder.svg?height=400&width=600&text=Split+centar"]'
),

-- HVAR
(
    'Villa Lavanda Hvar',
    'Mediteranska vila okružena lavandom s panoramskim pogledom na Paklene otoke. Privatni bazen i maslinik. Savršeno za romantični bijeg na najsunčanijem hrvatskom otoku.',
    280.00,
    3,
    6,
    '["WiFi", "Privatni bazen", "Klima uređaj", "Kuhinja", "Vrt", "Pogled na more", "Parking", "Roštilj", "Maslinik"]',
    43.1729,
    16.6413,
    'Ul. Matije Ivanića 25, 21450 Hvar, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Villa+Lavanda", "/placeholder.svg?height=400&width=600&text=Privatni+bazen", "/placeholder.svg?height=400&width=600&text=Pakleni+otoci"]'
),

-- ROVINJ
(
    'Casa Veneziana Rovinj',
    'Obnovljena venecijanska kuća iz 18. stoljeća u romantičnom Rovinju. Kameni zidovi, drveni stropovi i pogled na colorful kuće i luku. Autentični istarski doživljaj.',
    220.00,
    3,
    6,
    '["WiFi", "Klima uređaj", "Kuhinja", "Balkon", "Pogled na luku", "Povijesna arhitektura", "Kameni zidovi", "Blizina centra"]',
    45.0811,
    13.6387,
    'Ul. Grisia 12, 52210 Rovinj, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Casa+Veneziana", "/placeholder.svg?height=400&width=600&text=Rovinj+luka", "/placeholder.svg?height=400&width=600&text=Venecijanska+arhitektura"]'
),

-- POREČ
(
    'Villa Eufrazijana Poreč',
    'Elegantna vila nazvana po UNESCO-ovoj Eufrazijevoj bazilici. Moderni dizajn s istarskim kamenom, privatni bazen i vrt s autohtonim biljem. 5 minuta hoda do centra.',
    200.00,
    3,
    6,
    '["WiFi", "Privatni bazen", "Klima uređaj", "Kuhinja", "Vrt", "Parking", "Roštilj", "Terasa", "Blizina UNESCO spomenika"]',
    45.2269,
    13.5944,
    'Ul. Matka Laginje 18, 52440 Poreč, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Villa+Eufrazijana", "/placeholder.svg?height=400&width=600&text=Istarski+kamen", "/placeholder.svg?height=400&width=600&text=Poreč+centar"]'
),

-- ZADAR
(
    'Apartman Morske orgulje',
    'Moderni apartman s pogledom na Morske orgulje i Pozdrav suncu. Terasa za gledanje najljepšeg zalaska sunca na svijetu. U srcu povijesne jezgre Zadra.',
    160.00,
    2,
    4,
    '["WiFi", "Klima uređaj", "Kuhinja", "Terasa", "Pogled na more", "Blizina Morskih orgulja", "Povijesna lokacija"]',
    44.1194,
    15.2314,
    'Obala kralja Petra Krešimira IV 8, 23000 Zadar, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Morske+orgulje", "/placeholder.svg?height=400&width=600&text=Zadar+zalazak", "/placeholder.svg?height=400&width=600&text=Pozdrav+suncu"]'
),

-- ZAGREB
(
    'Loft Tkalčićeva Zagreb',
    'Industrijski loft u srcu Zagreba na poznatoj Tkalčićevoj ulici. Visoki stropovi, cigleni zidovi i moderna oprema. Okružen kafićima, restoranima i noćnim životom.',
    140.00,
    2,
    4,
    '["WiFi", "Klima uređaj", "Kuhinja", "Visoki stropovi", "Industrijski dizajn", "Blizina Tkalčićeve", "Javni prijevoz"]',
    45.8150,
    15.9819,
    'Tkalčićeva 42, 10000 Zagreb, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Loft+Tkalčićeva", "/placeholder.svg?height=400&width=600&text=Zagreb+centar", "/placeholder.svg?height=400&width=600&text=Industrijski+stil"]'
),

-- PLITVICE
(
    'Kuća Plitvička jezera',
    'Tradicionalna drvena kuća u nacionalnom parku Plitvička jezera. Okružena netaknutom prirodom, idealna za ljubitelje prirode i planinarenja. Kamin za hladne večeri.',
    120.00,
    3,
    6,
    '["WiFi", "Kamin", "Kuhinja", "Vrt", "Parking", "Blizina Plitvica", "Priroda", "Planinarenje", "Drvena arhitektura"]',
    44.8654,
    15.5820,
    'Plitvička jezera 45, 53231 Plitvička jezera, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Plitvička+jezera", "/placeholder.svg?height=400&width=600&text=Drvena+kuća", "/placeholder.svg?height=400&width=600&text=Priroda"]'
),

-- KORČULA
(
    'Villa Marco Polo Korčula',
    'Kamena vila na otoku Korčuli, rodnom mjestu Marca Pola. Tradicionalna dalmatinska arhitektura s modernim sadržajima. Privatna plaža i pogled na Pelješac.',
    250.00,
    4,
    8,
    '["WiFi", "Privatna plaža", "Klima uređaj", "Kuhinja", "Terasa", "Pogled na more", "Parking", "Roštilj", "Kameni zidovi"]',
    42.9597,
    17.1358,
    'Ul. Marka Pola 19, 20260 Korčula, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Villa+Marco+Polo", "/placeholder.svg?height=400&width=600&text=Korčula+otok", "/placeholder.svg?height=400&width=600&text=Privatna+plaža"]'
),

-- OPATIJA
(
    'Villa Habsburg Opatija',
    'Austro-ugarska vila iz 1890. godine u elegantnoj Opatiji. Obnovljena s poštovanjem prema originalnoj arhitekturi. Pogled na Kvarnerski zaljev i Učku.',
    190.00,
    3,
    6,
    '["WiFi", "Klima uređaj", "Kuhinja", "Balkon", "Pogled na more", "Povijesna arhitektura", "Parking", "Vrt", "Blizina Lungomare"]',
    45.3378,
    14.3094,
    'Ul. Maršala Tita 128, 51410 Opatija, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Villa+Habsburg", "/placeholder.svg?height=400&width=600&text=Opatija+elegancija", "/placeholder.svg?height=400&width=600&text=Kvarner"]'
),

-- MOTOVUN
(
    'Kuća na brdu Motovun',
    'Istarska kamena kuća u srednjovjekovnom Motovunu s pogledom na dolinu rijeke Mirne. Okružena vinogradima i tartufima. Autentični istarski doživljaj.',
    170.00,
    2,
    4,
    '["WiFi", "Kamin", "Kuhinja", "Terasa", "Pogled na dolinu", "Vinogradi", "Istarski kamen", "Parking", "Blizina Motovuna"]',
    45.3367,
    13.8289,
    'Motovun 23, 52424 Motovun, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Motovun+brdo", "/placeholder.svg?height=400&width=600&text=Istarska+kuća", "/placeholder.svg?height=400&width=600&text=Vinogradi"]'
),

-- KRKA
(
    'Etno kuća Krka',
    'Tradicionalna dalmatinska kamena kuća blizu nacionalnog parka Krka. Obnovljena s autohtonim materijalima. Idealna za istraživanje slapova i prirode.',
    130.00,
    3,
    6,
    '["WiFi", "Klima uređaj", "Kuhinja", "Vrt", "Parking", "Blizina Krke", "Kameni zidovi", "Tradicionalna arhitektura", "Priroda"]',
    43.8069,
    15.9614,
    'Lozovac 15, 22300 Knin, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Etno+kuća+Krka", "/placeholder.svg?height=400&width=600&text=Krka+slapovi", "/placeholder.svg?height=400&width=600&text=Dalmatinska+kuća"]'
);

-- Insert Croatian recommendations
INSERT INTO recommendations (apartment_id, name, description, category, location) VALUES

-- Dubrovnik recommendations
(1, 'Gradske zidine Dubrovnika', 'Šetnja po najljepšim gradskim zidinama na svijetu', 'attraction', 'Dubrovnik, Hrvatska'),
(1, 'Restoran Nautika', 'Fine dining restoran s pogledom na tvrđavu Lovrijenac', 'restaurant', 'Dubrovnik, Hrvatska'),
(1, 'Plaža Banje', 'Glavna gradska plaža s pogledom na Stari grad', 'beach', 'Dubrovnik, Hrvatska'),

-- Split recommendations
(2, 'Dioklecijanova palača', 'Najbolje očuvana rimska palača na svijetu', 'attraction', 'Split, Hrvatska'),
(2, 'Riva', 'Poznata splitska riva uz more', 'attraction', 'Split, Hrvatska'),
(2, 'Restoran Villa Spiza', 'Autentična dalmatinska kuhinja', 'restaurant', 'Split, Hrvatska'),

-- Hvar recommendations
(3, 'Pakleni otoci', 'Kristalno čisto more i skrivene uvale', 'beach', 'Hvar, Hrvatska'),
(3, 'Tvrđava Španjola', 'Pogled na grad Hvar i okolne otoke', 'attraction', 'Hvar, Hrvatska'),
(3, 'Restoran Gariful', 'Luksuzni restoran uz more', 'restaurant', 'Hvar, Hrvatska'),

-- Rovinj recommendations
(4, 'Crkva sv. Eufemije', 'Simbol Rovinja s najljepšim pogledom', 'attraction', 'Rovinj, Hrvatska'),
(4, 'Zlatni rt', 'Park prirode s prekrasnim šetnicama', 'park', 'Rovinj, Hrvatska'),
(4, 'Restoran Monte', 'Michelin preporučeni restoran', 'restaurant', 'Rovinj, Hrvatska'),

-- Poreč recommendations
(5, 'Eufrazijeva bazilika', 'UNESCO spomenik iz 6. stoljeća', 'attraction', 'Poreč, Hrvatska'),
(5, 'Plaža Zelena Laguna', 'Najpoznatija plaža Poreča', 'beach', 'Poreč, Hrvatska'),
(5, 'Restoran Konoba Ulixes', 'Istarska kuhinja s pogledom na more', 'restaurant', 'Poreč, Hrvatska'),

-- Zadar recommendations
(6, 'Morske orgulje', 'Jedinstvena glazbena instalacija', 'attraction', 'Zadar, Hrvatska'),
(6, 'Pozdrav suncu', 'Spektakularni zalazak sunca', 'attraction', 'Zadar, Hrvatska'),
(6, 'Restoran Pet bunara', 'Vrhunska dalmatinska kuhinja', 'restaurant', 'Zadar, Hrvatska'),

-- Zagreb recommendations
(7, 'Gornji grad', 'Povijesna jezgra Zagreba', 'attraction', 'Zagreb, Hrvatska'),
(7, 'Dolac tržnica', 'Najpoznatija zagrebačka tržnica', 'attraction', 'Zagreb, Hrvatska'),
(7, 'Restoran Dubrovnik Put', 'Tradicionalna hrvatska kuhinja', 'restaurant', 'Zagreb, Hrvatska'),

-- Plitvice recommendations
(8, 'Plitvička jezera', 'Najljepši nacionalni park Hrvatske', 'park', 'Plitvička jezera, Hrvatska'),
(8, 'Veliki slap', 'Najviši slap u Hrvatskoj', 'attraction', 'Plitvička jezera, Hrvatska'),
(8, 'Restoran Lička kuća', 'Tradicionalna lička kuhinja', 'restaurant', 'Plitvička jezera, Hrvatska'),

-- Korčula recommendations
(9, 'Stari grad Korčula', 'Srednjovjekovni grad Marca Pola', 'attraction', 'Korčula, Hrvatska'),
(9, 'Vela Przina', 'Najljepša plaža na Korčuli', 'beach', 'Korčula, Hrvatska'),
(9, 'Restoran Adio Mare', 'Dalmatinska kuhinja uz more', 'restaurant', 'Korčula, Hrvatska'),

-- Opatija recommendations
(10, 'Lungomare', 'Najljepša šetnica na Jadranu', 'attraction', 'Opatija, Hrvatska'),
(10, 'Villa Angiolina', 'Prva villa u Opatiji', 'attraction', 'Opatija, Hrvatska'),
(10, 'Restoran Bevanda', 'Fine dining uz more', 'restaurant', 'Opatija, Hrvatska'),

-- Motovun recommendations
(11, 'Motovun', 'Najljepši istarski gradić', 'attraction', 'Motovun, Hrvatska'),
(11, 'Tartufi', 'Lov na tartufe u istarskim šumama', 'attraction', 'Motovun, Hrvatska'),
(11, 'Restoran Mondo', 'Istarska kuhinja s tartufima', 'restaurant', 'Motovun, Hrvatska'),

-- Krka recommendations
(12, 'Nacionalni park Krka', 'Slapovi i netaknuta priroda', 'park', 'Krka, Hrvatska'),
(12, 'Skradinski buk', 'Najpoznatiji slap na Krki', 'attraction', 'Krka, Hrvatska'),
(12, 'Restoran Skala', 'Dalmatinska kuhinja uz Krku', 'restaurant', 'Krka, Hrvatska');
