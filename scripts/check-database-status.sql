-- PROVJERA POSTOJANJA SVIH POTREBNIH TABLICA I STUPACA
-- Pokrenite ovu skriptu da vidite što već imate

-- 1. Provjeri postojanje tablica
SELECT 
  'apartments' as table_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'apartments') 
    THEN '✅ POSTOJI' 
    ELSE '❌ NE POSTOJI' 
  END as status
UNION ALL
SELECT 
  'users' as table_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') 
    THEN '✅ POSTOJI' 
    ELSE '❌ NE POSTOJI' 
  END as status
UNION ALL
SELECT 
  'reservations' as table_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'reservations') 
    THEN '✅ POSTOJI' 
    ELSE '❌ NE POSTOJI' 
  END as status
UNION ALL
SELECT 
  'blocked_dates' as table_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blocked_dates') 
    THEN '✅ POSTOJI' 
    ELSE '❌ NE POSTOJI' 
  END as status
UNION ALL
SELECT 
  'content_translations' as table_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'content_translations') 
    THEN '✅ POSTOJI' 
    ELSE '❌ NE POSTOJI' 
  END as status;

-- 2. Provjeri postojanje stupaca u apartments tablici
SELECT 
  column_name,
  data_type,
  '✅ POSTOJI' as status
FROM information_schema.columns 
WHERE table_name = 'apartments' 
  AND column_name IN ('latitude', 'longitude', 'instagram_url', 'facebook_url', 'owner_id', 'owner_email')
ORDER BY column_name;

-- 3. Provjeri broj apartmana
SELECT 
  COUNT(*) as broj_apartmana,
  CASE 
    WHEN COUNT(*) >= 5 THEN '✅ IMATE DOVOLJNO APARTMANA'
    ELSE '❌ TREBATE VIŠE APARTMANA'
  END as status
FROM apartments;

-- 4. Provjeri super admin korisnika
SELECT 
  email,
  COALESCE(raw_user_meta_data->>'role', 'nema role') as role,
  '✅ POSTOJI' as status
FROM auth.users 
WHERE email IN ('ante.simurina@gmail.com', 'ante@admin.hr');

-- 5. Provjeri Storage bucket
SELECT 
  name as bucket_name,
  public,
  '✅ POSTOJI' as status
FROM storage.buckets 
WHERE name = 'apartment-images';
