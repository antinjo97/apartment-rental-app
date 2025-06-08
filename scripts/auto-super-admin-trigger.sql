-- Kreiraj funkciju koja automatski postavlja super admin ulogu
CREATE OR REPLACE FUNCTION set_super_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Ako se registrira ante.simurina@gmail.com, postavi super_admin ulogu
  IF NEW.email = 'ante.simurina@gmail.com' THEN
    NEW.role = 'super_admin';
    NEW.full_name = 'Ante Šimurina';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Kreiraj trigger koji se pokreće prije INSERT-a
DROP TRIGGER IF EXISTS trigger_set_super_admin ON user_profiles;
CREATE TRIGGER trigger_set_super_admin
  BEFORE INSERT ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_super_admin_role();

-- Također kreiraj trigger za auth.users tablicu ako je moguće
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    CASE 
      WHEN NEW.email = 'ante.simurina@gmail.com' THEN 'super_admin'
      ELSE COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Kreiraj trigger za nowe korisnike
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
