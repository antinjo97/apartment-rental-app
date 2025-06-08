-- Create users table for role management
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.email() = email);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.email() = email);

-- Super admin can see all users
CREATE POLICY "Super admin can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE email = auth.email() 
      AND role = 'super_admin'
    )
  );

-- Add owner_id to apartments table to track who owns which apartment
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS owner_email TEXT;

-- Update existing apartments to have owner
UPDATE apartments 
SET owner_email = 'ante@admin.hr', 
    owner_id = (SELECT id FROM auth.users WHERE email = 'ante@admin.hr' LIMIT 1)
WHERE owner_email IS NULL;

-- Create RLS policies for apartments based on ownership
DROP POLICY IF EXISTS "Anyone can view apartments" ON apartments;
DROP POLICY IF EXISTS "Admins can manage apartments" ON apartments;

-- Everyone can view apartments
CREATE POLICY "Anyone can view apartments" ON apartments
  FOR SELECT USING (true);

-- Apartment owners can manage their own apartments
CREATE POLICY "Owners can manage their apartments" ON apartments
  FOR ALL USING (
    owner_email = auth.email() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE email = auth.email() 
      AND role = 'super_admin'
    )
  );

-- Super admin can delete any apartment
CREATE POLICY "Super admin can delete apartments" ON apartments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE email = auth.email() 
      AND role = 'super_admin'
    )
  );

-- Insert default users
INSERT INTO users (email, role) VALUES 
  ('ante@admin.hr', 'super_admin')
ON CONFLICT (email) DO UPDATE SET role = 'super_admin';

-- Create function to automatically create user record when someone signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'role', 'user'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_apartments_owner ON apartments(owner_email);
