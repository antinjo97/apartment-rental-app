-- Update super admin email to ante.simurina@gmail.com
UPDATE auth.users 
SET email = 'ante.simurina@gmail.com'
WHERE email = 'ante@admin.hr';

-- Also update in user_profiles if it exists
UPDATE user_profiles 
SET email = 'ante.simurina@gmail.com'
WHERE email = 'ante@admin.hr';

-- Insert new super admin if doesn't exist
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  role
) VALUES (
  gen_random_uuid(),
  'ante.simurina@gmail.com',
  crypt('admin', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"role": "super_admin", "full_name": "Ante Šimurina"}',
  'authenticated'
) ON CONFLICT (email) DO UPDATE SET
  raw_user_meta_data = '{"role": "super_admin", "full_name": "Ante Šimurina"}';

-- Ensure super admin role in user_profiles
INSERT INTO user_profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'ante.simurina@gmail.com'),
  'ante.simurina@gmail.com',
  'Ante Šimurina',
  'super_admin',
  now(),
  now()
) ON CONFLICT (email) DO UPDATE SET
  role = 'super_admin',
  full_name = 'Ante Šimurina';
