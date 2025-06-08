-- KOMPLETNA SKRIPTA - DODAJE SAMO ONO ŠTO NEDOSTAJE
-- Ova skripta je sigurna za pokretanje - neće obrisati postojeće podatke

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
    apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_name TEXT,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Kreiraj blocked_dates tablicu ako ne postoji
CREATE TABLE IF NOT EXISTS blocked_dates (
    id SERIAL PRIMARY KEY,
    apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Dodaj stupce u apartments tablicu ako ne postoje
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8);
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS facebook_url TEXT;
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS owner_email TEXT;

-- 5. Ažuriraj koordinate ako nisu postavljene
UPDATE apartments SET latitude = 45.2269, longitude = 13.5944 WHERE id = 1 AND latitude IS NULL;
UPDATE apartments SET latitude = 44.4397, longitude = 15.0586 WHERE id = 2 AND latitude IS NULL;
UPDATE apartments SET latitude = 44.8683, longitude = 13.8481 WHERE id = 3 AND latitude IS NULL;
UPDATE apartments SET latitude = 45.0811, longitude = 13.6387 WHERE id = 4 AND latitude IS NULL;
UPDATE apartments SET latitude = 45.3271, longitude = 14.4422 WHERE id = 5 AND latitude IS NULL;

-- 6. Dodaj super admin korisnika
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data, role
) VALUES (
  gen_random_uuid(), 'ante.simurina@gmail.com', crypt('admin', gen_salt('bf')), 
  now(), now(), now(), '{"role": "super_admin", "full_name": "Ante Šimurina"}', 'authenticated'
) ON CONFLICT (email) DO UPDATE SET
  raw_user_meta_data = '{"role": "super_admin", "full_name": "Ante Šimurina"}';

-- 7. Dodaj u users tablicu
INSERT INTO users (email, role) VALUES 
  ('ante.simurina@gmail.com', 'super_admin')
ON CONFLICT (email) DO UPDATE SET role = 'super_admin';

-- 8. Omogući RLS na svim tablicama
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- 9. Kreiraj osnovne RLS politike
DROP POLICY IF EXISTS "Anyone can view apartments" ON apartments;
CREATE POLICY "Anyone can view apartments" ON apartments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Owners can manage their apartments" ON apartments;
CREATE POLICY "Owners can manage their apartments" ON apartments
  FOR ALL USING (
    owner_email = auth.email() OR
    EXISTS (SELECT 1 FROM users WHERE email = auth.email() AND role = 'super_admin')
  );

-- 10. Kreiraj indekse za performanse
CREATE INDEX IF NOT EXISTS idx_reservations_apartment_id ON reservations(apartment_id);
CREATE INDEX IF NOT EXISTS idx_blocked_dates_apartment_id ON blocked_dates(apartment_id);
CREATE INDEX IF NOT EXISTS idx_apartments_coordinates ON apartments(latitude, longitude);
