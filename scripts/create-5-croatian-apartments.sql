-- Delete ALL existing data completely
DELETE FROM reservations;
DELETE FROM recommendations;
DELETE FROM apartments;
DELETE FROM content_translations;

-- Reset sequences
ALTER SEQUENCE apartments_id_seq RESTART WITH 1;
ALTER SEQUENCE recommendations_id_seq RESTART WITH 1;
ALTER SEQUENCE reservations_id_seq RESTART WITH 1;

-- Insert only 5 best Croatian apartments
INSERT INTO apartments (name, description, price_per_night, number_of_rooms, capacity, amenities, latitude, longitude, address, image_urls) VALUES

-- DUBROVNIK - Najpoznatiji grad
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
    '["/placeholder.svg?height=400&width=600&text=Villa+Stradun+Dubrovnik", "/placeholder.svg?height=400&width=600&text=Dubrovnik+Stari+grad", "/placeholder.svg?height=400&width=600&text=Gradske+zidine"]'
),

-- SPLIT - Dioklecijanova palača
(
    'Apartman Dioklecijanova palača',
    'Jedinstveni apartman unutar UNESCO-ove Dioklecijanova palače. Spoj antičke povijesti i modernog komfora. Idealno za ljubitelje kulture i povijesti u srcu Splita.',
    180.00,
    2,
    4,
    '["WiFi", "Klima uređaj", "Kuhinja", "Povijesna lokacija", "Blizina Rive", "Kameni zidovi", "UNESCO spomenik"]',
    43.5081,
    16.4402,
    'Dioklecijanova 15, 21000 Split, Hrvatska',
    '["/placeholder.svg?height=400&width=600&text=Dioklecijanova+palača+Split", "/placeholder.svg?height=400&width=600&text=Antička+arhitektura", "/placeholder.svg?height=400&width=600&text=Split+Riva"]'
),

-- HVAR - Najsunčaniji otok
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
    '["/placeholder.svg?height=400&width=600&text=Villa+Lavanda+Hvar", "/placeholder.svg?height=400&width=600&text=Privatni+bazen+Hvar", "/placeholder.svg?height=400&width=600&text=Pakleni+otoci"]'
),

-- ROVINJ - Najromantičniji grad
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

-- ZAGREB - Glavni grad
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
    '["/placeholder.svg?height=400&width=600&text=Loft+Tkalčićeva+Zagreb", "/placeholder.svg?height=400&width=600&text=Zagreb+centar", "/placeholder.svg?height=400&width=600&text=Tkalčićeva+ulica"]'
);

-- Insert recommendations for 5 Croatian apartments
INSERT INTO recommendations (apartment_id, name, description, category, location) VALUES

-- Dubrovnik recommendations (id=1)
(1, 'Gradske zidine Dubrovnika', 'Šetnja po najljepšim gradskim zidinama na svijetu', 'attraction', 'Dubrovnik, Hrvatska'),
(1, 'Restoran Nautika', 'Fine dining restoran s pogledom na tvrđavu Lovrijenac', 'restaurant', 'Dubrovnik, Hrvatska'),
(1, 'Plaža Banje', 'Glavna gradska plaža s pogledom na Stari grad', 'beach', 'Dubrovnik, Hrvatska'),

-- Split recommendations (id=2)
(2, 'Dioklecijanova palača', 'Najbolje očuvana rimska palača na svijetu', 'attraction', 'Split, Hrvatska'),
(2, 'Riva Split', 'Poznata splitska riva uz more', 'attraction', 'Split, Hrvatska'),
(2, 'Restoran Villa Spiza', 'Autentična dalmatinska kuhinja', 'restaurant', 'Split, Hrvatska'),

-- Hvar recommendations (id=3)
(3, 'Pakleni otoci', 'Kristalno čisto more i skrivene uvale', 'beach', 'Hvar, Hrvatska'),
(3, 'Tvrđava Španjola', 'Pogled na grad Hvar i okolne otoke', 'attraction', 'Hvar, Hrvatska'),
(3, 'Restoran Gariful', 'Luksuzni restoran uz more', 'restaurant', 'Hvar, Hrvatska'),

-- Rovinj recommendations (id=4)
(4, 'Crkva sv. Eufemije', 'Simbol Rovinja s najljepšim pogledom', 'attraction', 'Rovinj, Hrvatska'),
(4, 'Zlatni rt', 'Park prirode s prekrasnim šetnicama', 'park', 'Rovinj, Hrvatska'),
(4, 'Restoran Monte', 'Michelin preporučeni restoran', 'restaurant', 'Rovinj, Hrvatska'),

-- Zagreb recommendations (id=5)
(5, 'Gornji grad Zagreb', 'Povijesna jezgra Zagreba s katedralom', 'attraction', 'Zagreb, Hrvatska'),
(5, 'Dolac tržnica', 'Najpoznatija zagrebačka tržnica', 'attraction', 'Zagreb, Hrvatska'),
(5, 'Restoran Dubrovnik Put', 'Tradicionalna hrvatska kuhinja', 'restaurant', 'Zagreb, Hrvatska');

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
