-- DODAJ OSNOVNE APARTMANE AKO NE POSTOJE

-- Provjeri postoje li apartmani
DO $$ 
BEGIN
    -- Ako nema apartmana, dodaj ih
    IF (SELECT COUNT(*) FROM apartments) = 0 THEN
        
        INSERT INTO apartments (
            title, description, address, price_per_night, number_of_rooms, 
            capacity, amenities, images, owner_email, latitude, longitude
        ) VALUES 
        (
            'Luksuzni apartman u Poreču',
            'Prekrasan apartman u centru Poreča, blizu mora i glavnih atrakcija. Potpuno opremljen s modernim namještajem.',
            'Ul. Marafor 15, 52440 Poreč, Hrvatska',
            120.00,
            2,
            4,
            ARRAY['WiFi', 'Klima', 'Kuhinja', 'Parking', 'Balkon'],
            ARRAY['/placeholder.svg?height=300&width=400'],
            'ante.simurina@gmail.com',
            45.2269,
            13.5944
        ),
        (
            'Apartman na otoku Pag',
            'Mirni apartman na otoku Pag s pogledom na more. Idealno za opuštanje i uživanje u prirodi.',
            'Ul. Kralja Tomislava 8, 23250 Pag, Hrvatska',
            90.00,
            1,
            3,
            ARRAY['WiFi', 'Klima', 'Kuhinja', 'Pogled na more'],
            ARRAY['/placeholder.svg?height=300&width=400'],
            'ante.simurina@gmail.com',
            44.4397,
            15.0586
        ),
        (
            'Moderni apartman u Puli',
            'Moderni apartman u povijesnom centru Pule, blizu Arene i drugih rimskih spomenika.',
            'Ul. Sergijevaca 12, 52100 Pula, Hrvatska',
            100.00,
            2,
            5,
            ARRAY['WiFi', 'Klima', 'Kuhinja', 'Parking', 'Terasa'],
            ARRAY['/placeholder.svg?height=300&width=400'],
            'ante.simurina@gmail.com',
            44.8683,
            13.8481
        ),
        (
            'Romantični apartman u Rovinju',
            'Šarmantni apartman u starom gradu Rovinju s pogledom na luku. Savršeno za romantični odmor.',
            'Ul. Grisia 5, 52210 Rovinj, Hrvatska',
            150.00,
            1,
            2,
            ARRAY['WiFi', 'Klima', 'Kuhinja', 'Pogled na more', 'Balkon'],
            ARRAY['/placeholder.svg?height=300&width=400'],
            'ante.simurina@gmail.com',
            45.0811,
            13.6387
        ),
        (
            'Prostrani apartman u Rijeci',
            'Veliki apartman u centru Rijeke, blizu glavnih trgovačkih centara i kulturnih atrakcija.',
            'Ul. Korzo 20, 51000 Rijeka, Hrvatska',
            80.00,
            3,
            6,
            ARRAY['WiFi', 'Klima', 'Kuhinja', 'Parking', 'Balkon', 'Perilica'],
            ARRAY['/placeholder.svg?height=300&width=400'],
            'ante.simurina@gmail.com',
            45.3271,
            14.4422
        );
        
        RAISE NOTICE 'Dodano je 5 osnovnih apartmana.';
    ELSE
        RAISE NOTICE 'Apartmani već postoje. Broj apartmana: %', (SELECT COUNT(*) FROM apartments);
    END IF;
END $$;
