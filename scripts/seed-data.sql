-- Insert sample apartments
INSERT INTO apartments (name, description, price_per_night, number_of_rooms, capacity, amenities, latitude, longitude, address, image_urls) VALUES
(
    'Luxury Beachfront Villa',
    'Experience the ultimate in luxury living with this stunning beachfront villa. Wake up to breathtaking ocean views every morning and fall asleep to the sound of waves.',
    250.00,
    3,
    6,
    '["WiFi", "Pool", "Beach Access", "Parking", "Kitchen", "AC", "Hot Tub", "BBQ Grill"]',
    34.0259,
    -118.7798,
    '123 Ocean Drive, Malibu, California',
    '["/placeholder.svg?height=400&width=600"]'
),
(
    'Cozy Mountain Cabin',
    'Perfect retreat in the heart of nature with stunning mountain views and hiking trails right at your doorstep.',
    120.00,
    2,
    4,
    '["WiFi", "Fireplace", "Hiking", "Parking", "Kitchen", "Mountain View"]',
    39.1911,
    -106.8175,
    '456 Pine Trail, Aspen, Colorado',
    '["/placeholder.svg?height=400&width=600"]'
),
(
    'Modern City Loft',
    'Stylish apartment in downtown area with easy access to restaurants, shopping, and entertainment.',
    180.00,
    2,
    4,
    '["WiFi", "Gym", "Rooftop", "Parking", "Kitchen", "City View"]',
    40.7128,
    -74.0060,
    '789 Broadway, New York, NY',
    '["/placeholder.svg?height=400&width=600"]'
),
(
    'Charming Countryside House',
    'Peaceful getaway surrounded by vineyards with wine tasting experiences and beautiful countryside views.',
    200.00,
    4,
    8,
    '["WiFi", "Garden", "Wine Tasting", "Parking", "Kitchen", "Countryside View"]',
    43.7696,
    11.2558,
    '321 Vineyard Road, Tuscany, Italy',
    '["/placeholder.svg?height=400&width=600"]'
);

-- Insert sample recommendations
INSERT INTO recommendations (apartment_id, name, description, category, location) VALUES
(1, 'Malibu Pier', 'Historic pier with restaurants and fishing opportunities', 'attraction', 'Malibu, CA'),
(1, 'Nobu Malibu', 'World-renowned Japanese restaurant with ocean views', 'restaurant', 'Malibu, CA'),
(1, 'Zuma Beach', 'Beautiful sandy beach perfect for swimming and surfing', 'beach', 'Malibu, CA'),
(2, 'Aspen Mountain', 'Premier skiing destination with breathtaking views', 'attraction', 'Aspen, CO'),
(2, 'The Little Nell', 'Luxury dining experience in the heart of Aspen', 'restaurant', 'Aspen, CO'),
(3, 'Central Park', 'Iconic urban park perfect for walks and picnics', 'park', 'New York, NY'),
(3, 'Times Square', 'Vibrant entertainment district with theaters and shops', 'attraction', 'New York, NY'),
(4, 'Chianti Wine Region', 'Famous wine region with tours and tastings', 'attraction', 'Tuscany, Italy'),
(4, 'Osteria di Passignano', 'Traditional Tuscan restaurant in historic abbey', 'restaurant', 'Tuscany, Italy');

-- Insert sample translations
INSERT INTO content_translations (key, lang, value) VALUES
('welcome_message', 'en', 'Welcome to our apartment rental platform'),
('welcome_message', 'hr', 'Dobrodošli na našu platformu za iznajmljivanje apartmana'),
('search_placeholder', 'en', 'Search for apartments...'),
('search_placeholder', 'hr', 'Pretražite apartmane...'),
('book_now', 'en', 'Book Now'),
('book_now', 'hr', 'Rezerviraj Sada'),
('price_per_night', 'en', 'per night'),
('price_per_night', 'hr', 'po noći');
