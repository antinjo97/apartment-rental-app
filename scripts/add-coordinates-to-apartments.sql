-- Dodaj latitude i longitude stupce u apartments tablicu
ALTER TABLE apartments 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- Ažuriraj postojeće apartmane s koordinatama hrvatskih gradova
UPDATE apartments SET 
  latitude = 45.3271, longitude = 13.6101  -- Poreč koordinate
WHERE title LIKE '%Poreč%' OR address LIKE '%Poreč%';

UPDATE apartments SET 
  latitude = 44.4449, longitude = 15.0586  -- Pag koordinate  
WHERE title LIKE '%Pag%' OR address LIKE '%Pag%';

UPDATE apartments SET 
  latitude = 44.8666, longitude = 13.8496  -- Pula koordinate
WHERE title LIKE '%Pula%' OR address LIKE '%Pula%';

UPDATE apartments SET 
  latitude = 45.0809, longitude = 13.6388  -- Rovinj koordinate
WHERE title LIKE '%Rovinj%' OR address LIKE '%Rovinj%';

UPDATE apartments SET 
  latitude = 45.3271, longitude = 14.4422  -- Rijeka koordinate
WHERE title LIKE '%Rijeka%' OR address LIKE '%Rijeka%';

-- Ako nema apartmana s tim nazivima, ažuriraj po ID-u
UPDATE apartments SET latitude = 45.3271, longitude = 13.6101 WHERE id = 1; -- Poreč
UPDATE apartments SET latitude = 44.4449, longitude = 15.0586 WHERE id = 2; -- Pag
UPDATE apartments SET latitude = 44.8666, longitude = 13.8496 WHERE id = 3; -- Pula
UPDATE apartments SET latitude = 45.0809, longitude = 13.6388 WHERE id = 4; -- Rovinj
UPDATE apartments SET latitude = 45.3271, longitude = 14.4422 WHERE id = 5; -- Rijeka

COMMENT ON COLUMN apartments.latitude IS 'Latitude coordinate for apartment location';
COMMENT ON COLUMN apartments.longitude IS 'Longitude coordinate for apartment location';
