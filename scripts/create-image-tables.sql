-- Kreiranje tablice za slike
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  apartment_id INTEGER REFERENCES apartments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kreiranje bucket-a za slike ako ne postoji
-- Napomena: Ovo se mora izvršiti kroz Supabase UI ili CLI
-- jer SQL ne može direktno kreirati storage bucket

-- Kreiranje RLS politika za tablicu slika
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Politika za čitanje slika - svi mogu vidjeti javne slike
CREATE POLICY "Public images are viewable by everyone" 
ON images FOR SELECT 
USING (apartment_id IS NOT NULL OR user_id IS NULL);

-- Politika za čitanje privatnih slika - samo vlasnik može vidjeti
CREATE POLICY "Private images are viewable by owner" 
ON images FOR SELECT 
USING (auth.uid() = user_id);

-- Politika za umetanje - autentificirani korisnici mogu dodavati slike
CREATE POLICY "Users can insert their own images" 
ON images FOR INSERT 
WITH CHECK (auth.uid() = user_id OR auth.uid() IN (
  SELECT id FROM auth.users WHERE role = 'admin'
));

-- Politika za ažuriranje - samo vlasnik ili admin može ažurirati
CREATE POLICY "Users can update their own images" 
ON images FOR UPDATE 
USING (auth.uid() = user_id OR auth.uid() IN (
  SELECT id FROM auth.users WHERE role = 'admin'
));

-- Politika za brisanje - samo vlasnik ili admin može brisati
CREATE POLICY "Users can delete their own images" 
ON images FOR DELETE 
USING (auth.uid() = user_id OR auth.uid() IN (
  SELECT id FROM auth.users WHERE role = 'admin'
));

-- Kreiranje indeksa za brže pretraživanje
CREATE INDEX IF NOT EXISTS idx_images_user_id ON images(user_id);
CREATE INDEX IF NOT EXISTS idx_images_apartment_id ON images(apartment_id);
