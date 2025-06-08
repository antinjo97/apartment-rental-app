-- Dodaj Ante admin korisnika
DO $$
BEGIN
    -- Dodaj ante@admin.hr admin korisnika
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'ante@admin.hr') THEN
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
            'ante@admin.hr',
            crypt('admin', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"name": "Ante Admin"}',
            NOW(),
            NOW()
        );
        RAISE NOTICE 'Ante admin korisnik ante@admin.hr je dodan';
    ELSE
        RAISE NOTICE 'Ante admin korisnik ante@admin.hr već postoji';
    END IF;
END $$;

-- Provjeri je li dodan
SELECT email, email_confirmed_at, created_at 
FROM auth.users 
WHERE email = 'ante@admin.hr';
