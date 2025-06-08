-- Create apartments table
CREATE TABLE IF NOT EXISTS apartments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_night DECIMAL(10,2) NOT NULL,
    number_of_rooms INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    amenities JSONB DEFAULT '[]',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    address TEXT,
    image_urls JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    apartment_id INTEGER REFERENCES apartments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_name VARCHAR(255),
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    apartment_id INTEGER REFERENCES apartments(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    location TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content_translations table for multilingual support
CREATE TABLE IF NOT EXISTS content_translations (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL,
    lang VARCHAR(10) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(key, lang)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_apartments_price ON apartments(price_per_night);
CREATE INDEX IF NOT EXISTS idx_apartments_capacity ON apartments(capacity);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON reservations(check_in_date, check_out_date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_content_translations_key_lang ON content_translations(key, lang);
