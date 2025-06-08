-- Pripremi tablicu za super admin, ali ne kreiraj korisnika
DO $$
BEGIN
  -- Provjeri postoji li već user_profiles tablica
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
    -- Kreiraj user_profiles tablicu ako ne postoji
    CREATE TABLE user_profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      email TEXT UNIQUE NOT NULL,
      full_name TEXT,
      role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Omogući RLS
    ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

    -- Kreiraj RLS politike
    CREATE POLICY "Users can view their own profile" ON user_profiles
      FOR SELECT USING (auth.uid() = id);

    CREATE POLICY "Users can update their own profile" ON user_profiles
      FOR UPDATE USING (auth.uid() = id);

    CREATE POLICY "Super admins can view all profiles" ON user_profiles
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM user_profiles 
          WHERE id = auth.uid() AND role = 'super_admin'
        )
      );

    RAISE NOTICE 'user_profiles tablica kreirana';
  ELSE
    RAISE NOTICE 'user_profiles tablica već postoji';
  END IF;

  -- Ažuriraj postojeći profil na super_admin ako postoji
  UPDATE user_profiles 
  SET role = 'super_admin', full_name = 'Ante Šimurina'
  WHERE email = 'ante.simurina@gmail.com';

  IF FOUND THEN
    RAISE NOTICE 'Postojeći profil ažuriran na super_admin';
  ELSE
    RAISE NOTICE 'Profil ante.simurina@gmail.com ne postoji - registrirajte se prvo';
  END IF;

END $$;
