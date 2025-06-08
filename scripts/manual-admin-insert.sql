-- Alternativni način - direktno dodavanje bez provjere
-- PAŽNJA: Pokreni samo ako prethodna skripta ne radi

-- Obriši postojeće admin korisnike (ako postoje)
DELETE FROM auth.users WHERE email IN ('admin@admin.com', 'test@test.com');

-- Dodaj admin korisnika
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_sent_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@admin.com',
    crypt('admin123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    NOW(),
    NOW()
);

-- Dodaj test korisnika
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_sent_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'test@test.com',
    crypt('test123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    NOW(),
    NOW()
);

-- Provjeri rezultat
SELECT email, email_confirmed_at, created_at FROM auth.users 
WHERE email IN ('admin@admin.com', 'test@test.com');
