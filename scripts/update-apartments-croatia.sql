-- Delete existing apartments and add new Croatian apartments
DELETE FROM apartments;
DELETE FROM recommendations;

-- Reset the sequence
ALTER SEQUENCE apartments_id_seq RESTART WITH 1;
ALTER SEQUENCE recommendations_id_seq RESTART WITH 1;

-- Insert Croatian apartments with working images
INSERT INTO apartments (name, description, price_per_night, number_of_rooms, capacity, amenities, latitude, longitude, address, image_urls) VALUES
(
    'Villa Adriatic Poreč',
    'Luksuzna vila s pogledom na more u srcu Istre. Savršena za obitelji koje traže mir i udobnost uz pristup prekrasnim plažama Poreča.',
    180.00,
    3,
    6,
    '["WiFi", "Bazen", "Parking", "Kuhinja", "Klima", "Pristup plaži", "Terasa", "Roštilj"]',
    45.2269,
    13.5944,
    'Obala Maršala Tita 15, 52440 Poreč, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Villa+Adriatic+Poreč", "/placeholder.svg?height=400&width=600&text=Bazen", "/placeholder.svg?height=400&width=600&text=Terasa"]'
),
(
    'Apartman Rovinj Centar',
    'Šarmantan apartman u starom gradu Rovinja s pogledom na luku. Idealno za romantične parove koji žele doživjeti autentičnu Istru.',
    150.00,
    2,
    4,
    '["WiFi", "Klima", "Kuhinja", "Balkon", "Pogled na more", "Blizina centra"]',
    45.0811,
    13.6387,
    'Ul. Svetog Križa 8, 52210 Rovinj, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Rovinj+Centar", "/placeholder.svg?height=400&width=600&text=Balkon", "/placeholder.svg?height=400&width=600&text=Pogled"]'
),
(
    'Penthouse Rijeka',
    'Moderni penthouse u centru Rijeke s panoramskim pogledom na Kvarnerski zaljev. Luksuz i udobnost na jednom mjestu.',
    220.00,
    3,
    6,
    '["WiFi", "Parking", "Kuhinja", "Klima", "Terasa", "Pogled na more", "Lift", "Moderna oprema"]',
    45.3271,
    14.4422,
    'Korzo 12, 51000 Rijeka, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Penthouse+Rijeka", "/placeholder.svg?height=400&width=600&text=Terasa", "/placeholder.svg?height=400&width=600&text=Panorama"]'
),
(
    'Apartman Zadar Old Town',
    'Tradicionalni kameni apartman u povijesnoj jezgri Zadra, blizu Morskih orgulja i Pozdrava suncu.',
    130.00,
    2,
    4,
    '["WiFi", "Klima", "Kuhinja", "Povijesna lokacija", "Blizina atrakcija", "Kameni zidovi"]',
    44.1194,
    15.2314,
    'Ul. Mihovila Pavlinovića 3, 23000 Zadar, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Zadar+Old+Town", "/placeholder.svg?height=400&width=600&text=Kameni+zidovi", "/placeholder.svg?height=400&width=600&text=Centar"]'
),
(
    'Zagreb City Loft',
    'Stilski loft u srcu Zagreba, blizu Trga bana Jelačića. Savršen za poslovne ljude i turiste koji žele istražiti glavni grad.',
    160.00,
    2,
    4,
    '["WiFi", "Parking", "Kuhinja", "Klima", "Lift", "Blizina centra", "Javni prijevoz", "Moderna oprema"]',
    45.8150,
    15.9819,
    'Ilica 25, 10000 Zagreb, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Zagreb+Loft", "/placeholder.svg?height=400&width=600&text=Moderni+enterijer", "/placeholder.svg?height=400&width=600&text=Centar"]'
),
(
    'Villa Sunset Poreč',
    'Ekskluzivna vila s privatnim bazenom i pogledom na zalazak sunca. Idealna za luksuzni odmor u Istri.',
    280.00,
    4,
    8,
    '["WiFi", "Privatni bazen", "Parking", "Kuhinja", "Klima", "Vrt", "Roštilj", "Sauna"]',
    45.2150,
    13.6100,
    'Ul. Mate Balote 42, 52440 Poreč, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Villa+Sunset", "/placeholder.svg?height=400&width=600&text=Privatni+bazen", "/placeholder.svg?height=400&width=600&text=Zalazak+sunca"]'
),
(
    'Apartman Rovinj Marina',
    'Luksuzni apartman uz marinu s direktnim pogledom na jahte i more. Vrhunska lokacija za nautičke entuzijaste.',
    200.00,
    3,
    6,
    '["WiFi", "Parking", "Kuhinja", "Klima", "Balkon", "Pogled na marinu", "Blizina restorana"]',
    45.0750,
    13.6300,
    'Obala Pina Budicina 6, 52210 Rovinj, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Rovinj+Marina", "/placeholder.svg?height=400&width=600&text=Marina+pogled", "/placeholder.svg?height=400&width=600&text=Luksuz"]'
),
(
    'Rijeka Seaside',
    'Apartman na obali mora s privatnom plažom i pogledom na otoke Krka i Cresa.',
    190.00,
    3,
    6,
    '["WiFi", "Privatna plaža", "Parking", "Kuhinja", "Klima", "Terasa", "Pogled na otoke"]',
    45.3200,
    14.4600,
    'Liburnijska obala 15, 51000 Rijeka, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Rijeka+Seaside", "/placeholder.svg?height=400&width=600&text=Privatna+plaža", "/placeholder.svg?height=400&width=600&text=Otoci"]'
);

-- Insert recommendations for Croatian apartments
INSERT INTO recommendations (apartment_id, name, description, category, location) VALUES
-- Poreč recommendations
(1, 'Eufrazijeva bazilika', 'UNESCO spomenik svjetske baštine iz 6. stoljeća', 'attraction', 'Poreč, Hrvatska'),
(1, 'Restoran Konoba Ulixes', 'Tradicionalna istarska kuhinja s pogledom na more', 'restaurant', 'Poreč, Hrvatska'),
(1, 'Plaža Zelena Laguna', 'Prekrasna plaža s kristalno čistim morem', 'beach', 'Poreč, Hrvatska'),

-- Rovinj recommendations  
(2, 'Crkva sv. Eufemije', 'Barokna crkva s najljepšim pogledom na Rovinj', 'attraction', 'Rovinj, Hrvatska'),
(2, 'Restoran Monte', 'Michelin preporučeni restoran s istarskim specijalitetima', 'restaurant', 'Rovinj, Hrvatska'),
(2, 'Zlatni rt', 'Najpoznatiji park prirode u Istri', 'park', 'Rovinj, Hrvatska'),

-- Rijeka recommendations
(3, 'Trsat', 'Povijesna tvrđava s pogledom na Kvarner', 'attraction', 'Rijeka, Hrvatska'),
(3, 'Restoran Kukuriku', 'Gourmet restoran s lokalnim specijalitetima', 'restaurant', 'Kastav, Hrvatska'),
(3, 'Plaža Kostanj', 'Popularna gradska plaža', 'beach', 'Rijeka, Hrvatska'),

-- Zadar recommendations
(4, 'Morske orgulje', 'Jedinstvena arhitektonska atrakcija na obali', 'attraction', 'Zadar, Hrvatska'),
(4, 'Pozdrav suncu', 'Spektakularni svjetlosni show na zalasku sunca', 'attraction', 'Zadar, Hrvatska'),
(5, 'Restoran Pet bunara', 'Vrhunska dalmatinska kuhinja', 'restaurant', 'Zadar, Hrvatska'),

-- Zagreb recommendations
(5, 'Gornji grad', 'Povijesna jezgra Zagreba s katedralom', 'attraction', 'Zagreb, Hrvatska'),
(5, 'Restoran Dubrovnik Put', 'Tradicionalna hrvatska kuhinja', 'restaurant', 'Zagreb, Hrvatska'),
(5, 'Maksimir', 'Najveći park u Zagrebu', 'park', 'Zagreb, Hrvatska'),

-- Additional recommendations
(6, 'Baredine Cave', 'Podzemna špilja s prekrasnim stalaktitima', 'attraction', 'Nova Vas, Hrvatska'),
(7, 'Lim fjord', 'Spektakularan prirodni fenomen', 'attraction', 'Rovinj, Hrvatska'),
(8, 'Opatija', 'Elegantno lječilište na Kvarneru', 'attraction', 'Opatija, Hrvatska');
