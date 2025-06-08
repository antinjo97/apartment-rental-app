-- Provjeri postojanje admin korisnika
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    last_sign_in_at
FROM auth.users 
WHERE email IN (
    'admin@admin.com',
    'test@test.com',
    'admin@example.com',
    'admin@apartrent.com'
)
ORDER BY created_at DESC;

-- Provjeri ukupan broj korisnika
SELECT COUNT(*) as total_users FROM auth.users;

-- Provjeri strukturu auth.users tablice
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'auth' AND table_name = 'users'
ORDER BY ordinal_position;
