-- Jednostavno dodavanje admin korisnika bez ON CONFLICT
-- Prvo provjeri postoji li već
DO $$
BEGIN
    -- Dodaj admin korisnika samo ako ne postoji
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@admin.com') THEN
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
        RAISE NOTICE 'Admin korisnik admin@admin.com je dodan';
    ELSE
        RAISE NOTICE 'Admin korisnik admin@admin.com već postoji';
    END IF;

    -- Dodaj test korisnika samo ako ne postoji
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'test@test.com') THEN
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
        RAISE NOTICE 'Test korisnik test@test.com je dodan';
    ELSE
        RAISE NOTICE 'Test korisnik test@test.com već postoji';
    END IF;
END $$;
