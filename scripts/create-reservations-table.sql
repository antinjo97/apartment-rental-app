-- Kreiranje tablice za rezervacije
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

-- Kreiranje indeksa za bolje performanse
CREATE INDEX IF NOT EXISTS idx_reservations_apartment_id ON reservations(apartment_id);
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON reservations(check_in_date, check_out_date);

-- Kreiranje funkcije za automatsko ažuriranje updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Kreiranje trigger-a za automatsko ažuriranje updated_at
DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;
CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Dodavanje RLS (Row Level Security) pravila
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Pravilo: korisnici mogu vidjeti svoje rezervacije
CREATE POLICY "Users can view own reservations" ON reservations
    FOR SELECT USING (
        auth.uid() = user_id OR 
        guest_email = auth.jwt() ->> 'email'
    );

-- Pravilo: korisnici mogu kreirati rezervacije
CREATE POLICY "Users can create reservations" ON reservations
    FOR INSERT WITH CHECK (true);

-- Pravilo: admin može vidjeti sve rezervacije
CREATE POLICY "Admins can view all reservations" ON reservations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Pravilo: admin može ažurirati sve rezervacije
CREATE POLICY "Admins can update all reservations" ON reservations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );
