-- Delete ALL existing data completely
DELETE FROM reservations;
DELETE FROM recommendations;
DELETE FROM apartments;
DELETE FROM content_translations;

-- Reset sequences
ALTER SEQUENCE apartments_id_seq RESTART WITH 1;
ALTER SEQUENCE recommendations_id_seq RESTART WITH 1;
ALTER SEQUENCE reservations_id_seq RESTART WITH 1;

-- Insert 5 best Croatian apartments with your preferred cities
INSERT INTO apartments (name, description, price_per_night, number_of_rooms, capacity, amenities, latitude, longitude, address, image_urls) VALUES

-- POREČ - Istarska perla
(
    'Villa Eufrazijana Poreč',
    'Elegantna vila nazvana po UNESCO-ovoj Eufrazijevoj bazilici. Moderni dizajn s istarskim kamenom, privatni bazen i vrt s autohtonim biljem. 5 minuta hoda do centra Poreča.',
    200.00,
    3,
    6,
    '["WiFi", "Privatni bazen", "Klima uređaj", "Kuhinja", "Vrt", "Parking", "Roštilj", "Terasa", "Blizina UNESCO spomenika"]',
    45.2269,
    13.5944,
    'Ul. Matka Laginje 18, 52440 Poreč, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Villa+Eufrazijana+Poreč", "/placeholder.svg?height=400&width=600&text=Istarski+kamen+Poreč", "/placeholder.svg?height=400&width=600&text=Poreč+centar"]'
),

-- PAG - Otok sira i zabave
(
    'Villa Pag Cheese & Beach',
    'Moderna vila na otoku Pagu s pogledom na jedinstvene krajolike. Blizu najpoznatijih plaža Zrće i Simuni. Idealno za ljubitelje paškog sira, janjetine i ljetnih festivala.',
    180.00,
    3,
    6,
    '["WiFi", "Klima uređaj", "Kuhinja", "Terasa", "Pogled na more", "Parking", "Blizina plaža", "Roštilj", "Vrt"]',
    44.4397,
    15.0586,
    'Ul. Ante Starčevića 25, 23250 Pag, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Villa+Pag+Cheese", "/placeholder.svg?height=400&width=600&text=Pag+krajolici", "/placeholder.svg?height=400&width=600&text=Zrće+plaža"]'
),

-- PULA - Rimska arena
(
    'Apartman Arena Pula',
    'Luksuzni apartman u srcu Pule s pogledom na rimsku Arenu. Spoj antičke povijesti i moderne udobnosti. Idealno za istraživanje najstarijih istarskih gradova.',
    160.00,
    2,
    4,
    '["WiFi", "Klima uređaj", "Kuhinja", "Balkon", "Pogled na Arenu", "Povijesna lokacija", "Blizina centra", "Parking"]',
    44.8683,
    13.8481,
    'Ul. Sergijevaca 15, 52100 Pula, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Apartman+Arena+Pula", "/placeholder.svg?height=400&width=600&text=Rimska+Arena", "/placeholder.svg?height=400&width=600&text=Pula+centar"]'
),

-- ROVINJ - Najromantičniji grad (zadržavam jer je prekrasan)
(
    'Casa Veneziana Rovinj',
    'Obnovljena venecijanska kuća iz 18. stoljeća u romantičnom Rovinju. Kameni zidovi, drveni stropovi i pogled na šarene kuće i luku. Autentični istarski doživljaj.',
    220.00,
    3,
    6,
    '["WiFi", "Klima uređaj", "Kuhinja", "Balkon", "Pogled na luku", "Povijesna arhitektura", "Kameni zidovi", "Blizina centra"]',
    45.0811,
    13.6387,
    'Ul. Grisia 12, 52210 Rovinj, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Casa+Veneziana+Rovinj", "/placeholder.svg?height=400&width=600&text=Rovinj+luka", "/placeholder.svg?height=400&width=600&text=Istarska+arhitektura"]'
),

-- RIJEKA - Luka i kultura
(
    'Penthouse Rijeka Port',
    'Moderni penthouse u centru Rijeke s panoramskim pogledom na Kvarnerski zaljev i luku. Luksuz i udobnost na jednom mjestu. Blizu Korza i kulturnih sadržaja.',
    190.00,
    3,
    6,
    '["WiFi", "Parking", "Kuhinja", "Klima uređaj", "Terasa", "Pogled na more", "Lift", "Moderna oprema", "Blizina Korza"]',
    45.3271,
    14.4422,
    'Korzo 12, 51000 Rijeka, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Penthouse+Rijeka+Port", "/placeholder.svg?height=400&width=600&text=Rijeka+luka", "/placeholder.svg?height=400&width=600&text=Kvarner+panorama"]'
);

-- Insert recommendations for 5 Croatian apartments
INSERT INTO recommendations (apartment_id, name, description, category, location) VALUES

-- Poreč recommendations (id=1)
(1, 'Eufrazijeva bazilika', 'UNESCO spomenik iz 6. stoljeća s prekrasnim mozaicima', 'attraction', 'Poreč, Hrvatska'),
(1, 'Restoran Konoba Ulixes', 'Istarska kuhinja s pogledom na more i tartufi', 'restaurant', 'Poreč, Hrvatska'),
(1, 'Plaža Zelena Laguna', 'Najpoznatija plaža Poreča s kristalno čistim morem', 'beach', 'Poreč, Hrvatska'),

-- Pag recommendations (id=2)
(2, 'Plaža Zrće', 'Najpoznatija party plaža u Hrvatskoj', 'beach', 'Pag, Hrvatska'),
(2, 'Paški sir', 'Degustacija autohtonog paškog sira', 'attraction', 'Pag, Hrvatska'),
(2, 'Restoran Boškinac', 'Vrhunska gastronomija s paškim specijalitetima', 'restaurant', 'Pag, Hrvatska'),

-- Pula recommendations (id=3)
(3, 'Pulska Arena', 'Najbolje očuvana rimska arena na svijetu', 'attraction', 'Pula, Hrvatska'),
(3, 'Brijuni nacionalni park', 'Otočje s bogatom poviješću i prirodom', 'park', 'Pula, Hrvatska'),
(3, 'Restoran Farabuto', 'Moderna istarska kuhinja u srcu Pule', 'restaurant', 'Pula, Hrvatska'),

-- Rovinj recommendations (id=4)
(4, 'Crkva sv. Eufemije', 'Simbol Rovinja s najljepšim pogledom na grad', 'attraction', 'Rovinj, Hrvatska'),
(4, 'Zlatni rt', 'Park prirode s prekrasnim šetnicama i plažama', 'park', 'Rovinj, Hrvatska'),
(4, 'Restoran Monte', 'Michelin preporučeni restoran s istarskim specijalitetima', 'restaurant', 'Rovinj, Hrvatska'),

-- Rijeka recommendations (id=5)
(5, 'Trsat', 'Povijesna tvrđava s pogledom na Kvarner', 'attraction', 'Rijeka, Hrvatska'),
(5, 'Korzo Rijeka', 'Glavna šetnica i srce grada Rijeke', 'attraction', 'Rijeka, Hrvatska'),
(5, 'Restoran Kukuriku', 'Gourmet restoran s lokalnim kvarnerskim specijalitetima', 'restaurant', 'Kastav, Hrvatska');

-- Add essential translations
INSERT INTO content_translations (key, lang, value) VALUES
-- Basic navigation
('home', 'en', 'Home'),
('home', 'hr', 'Početna'),
('apartments', 'en', 'Apartments'),
('apartments', 'hr', 'Apartmani'),
('contact', 'en', 'Contact'),
('contact', 'hr', 'Kontakt'),
('about', 'en', 'About Us'),
('about', 'hr', 'O nama'),

-- Authentication
('sign_in', 'en', 'Sign In'),
('sign_in', 'hr', 'Prijava'),
('sign_up', 'en', 'Sign Up'),
('sign_up', 'hr', 'Registracija'),
('sign_out', 'en', 'Sign Out'),
('sign_out', 'hr', 'Odjava'),

-- Booking
('book_now', 'en', 'Book Now'),
('book_now', 'hr', 'Rezerviraj Sada'),
('price_per_night', 'en', 'per night'),
('price_per_night', 'hr', 'po noći'),
('check_in', 'en', 'Check-in'),
('check_in', 'hr', 'Dolazak'),
('check_out', 'en', 'Check-out'),
('check_out', 'hr', 'Odlazak'),

-- Admin
('admin_panel', 'en', 'Admin Panel'),
('admin_panel', 'hr', 'Admin Panel'),
('dashboard', 'en', 'Dashboard'),
('dashboard', 'hr', 'Nadzorna Ploča'),

-- Common
('loading', 'en', 'Loading...'),
('loading', 'hr', 'Učitavanje...'),
('error', 'en', 'Error'),
('error', 'hr', 'Greška'),
('success', 'en', 'Success'),
('success', 'hr', 'Uspjeh');
