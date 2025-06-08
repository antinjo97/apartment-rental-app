-- POPRAVLJENA SKRIPTA - BEZ ON CONFLICT GREŠAKA
-- Ova skripta je sigurna za pokretanje

-- 1. Kreiraj users tablicu ako ne postoji
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Kreiraj reservations tablicu ako ne postoji
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    apartment_id INTEGER NOT NULL,
    user_id UUID,
    guest_name TEXT,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INTEGER DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Kreiraj blocked_dates tablicu ako ne postoji
CREATE TABLE IF NOT EXISTS blocked_dates (
    id SERIAL PRIMARY KEY,
    apartment_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Provjeri i dodaj stupce u apartments tablicu
DO $$ 
BEGIN
    -- Dodaj latitude ako ne postoji
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'apartments' AND column_name = 'latitude') THEN
        ALTER TABLE apartments ADD COLUMN latitude DECIMAL(10, 8);
    END IF;
    
    -- Dodaj longitude ako ne postoji
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'apartments' AND column_name = 'longitude') THEN
        ALTER TABLE apartments ADD COLUMN longitude DECIMAL(11, 8);
    END IF;
    
    -- Dodaj instagram_url ako ne postoji
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'apartments' AND column_name = 'instagram_url') THEN
        ALTER TABLE apartments ADD COLUMN instagram_url TEXT;
    END IF;
    
    -- Dodaj facebook_url ako ne postoji
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'apartments' AND column_name = 'facebook_url') THEN
        ALTER TABLE apartments ADD COLUMN facebook_url TEXT;
    END IF;
    
    -- Dodaj owner_id ako ne postoji
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'apartments' AND column_name = 'owner_id') THEN
        ALTER TABLE apartments ADD COLUMN owner_id UUID;
    END IF;
    
    -- Dodaj owner_email ako ne postoji
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'apartments' AND column_name = 'owner_email') THEN
        ALTER TABLE apartments ADD COLUMN owner_email TEXT;
    END IF;
END $$;

-- 5. Ažuriraj koordinate ako nisu postavljene (samo ako postoje apartmani)
UPDATE apartments SET 
    latitude = 45.2269, 
    longitude = 13.5944 
WHERE id = 1 AND (latitude IS NULL OR latitude = 0);

UPDATE apartments SET 
    latitude = 44.4397, 
    longitude = 15.0586 
WHERE id = 2 AND (latitude IS NULL OR latitude = 0);

UPDATE apartments SET 
    latitude = 44.8683, 
    longitude = 13.8481 
WHERE id = 3 AND (latitude IS NULL OR latitude = 0);

UPDATE apartments SET 
    latitude = 45.0811, 
    longitude = 13.6387 
WHERE id = 4 AND (latitude IS NULL OR latitude = 0);

UPDATE apartments SET 
    latitude = 45.3271, 
    longitude = 14.4422 
WHERE id = 5 AND (latitude IS NULL OR latitude = 0);

-- 6. Dodaj super admin korisnika u users tablicu (samo ako ne postoji)
INSERT INTO users (email, role) 
SELECT 'ante.simurina@gmail.com', 'super_admin'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'ante.simurina@gmail.com'
);

-- 7. Ažuriraj postojeći super admin ako postoji
UPDATE users 
SET role = 'super_admin' 
WHERE email = 'ante.simurina@gmail.com' AND role != 'super_admin';

-- 8. Omogući RLS na tablicama
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- 9. Obriši postojeće politike i kreiraj nove
DROP POLICY IF EXISTS "Anyone can view apartments" ON apartments;
DROP POLICY IF EXISTS "Owners can manage their apartments" ON apartments;
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can manage reservations" ON reservations;

-- Kreiraj nove politike
CREATE POLICY "Anyone can view apartments" ON apartments 
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert apartments" ON apartments 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Owners can update their apartments" ON apartments 
    FOR UPDATE USING (
        owner_email = auth.email() OR 
        EXISTS (SELECT 1 FROM users WHERE email = auth.email() AND role = 'super_admin')
    );

CREATE POLICY "Super admin can delete apartments" ON apartments 
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM users WHERE email = auth.email() AND role = 'super_admin')
    );

CREATE POLICY "Users can view their own data" ON users 
    FOR SELECT USING (email = auth.email());

CREATE POLICY "Anyone can create reservations" ON reservations 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view relevant reservations" ON reservations 
    FOR SELECT USING (
        guest_email = auth.email() OR
        EXISTS (
            SELECT 1 FROM apartments a 
            WHERE a.id = apartment_id AND a.owner_email = auth.email()
        ) OR
        EXISTS (SELECT 1 FROM users WHERE email = auth.email() AND role = 'super_admin')
    );

-- 10. Kreiraj indekse za performanse
CREATE INDEX IF NOT EXISTS idx_reservations_apartment_id ON reservations(apartment_id);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON reservations(check_in_date, check_out_date);
CREATE INDEX IF NOT EXISTS idx_blocked_dates_apartment_id ON blocked_dates(apartment_id);
CREATE INDEX IF NOT EXISTS idx_blocked_dates_dates ON blocked_dates(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_apartments_coordinates ON apartments(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_apartments_owner ON apartments(owner_email);
