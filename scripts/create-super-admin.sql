-- Kreiraj super admin korisnika ante.simurina@gmail.com
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
  END IF;

  -- Dodaj super admin profil ako ne postoji
  INSERT INTO user_profiles (id, email, full_name, role, created_at, updated_at)
  SELECT 
    gen_random_uuid(),
    'ante.simurina@gmail.com',
    'Ante Šimurina',
    'super_admin',
    NOW(),
    NOW()
  WHERE NOT EXISTS (
    SELECT 1 FROM user_profiles WHERE email = 'ante.simurina@gmail.com'
  );

  RAISE NOTICE 'Super admin setup completed for ante.simurina@gmail.com';
END $$;
