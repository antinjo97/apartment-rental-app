-- Add social media links to apartments table
ALTER TABLE apartments 
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS facebook_url TEXT;

-- Update existing apartments with sample social links (optional)
UPDATE apartments SET 
  instagram_url = 'https://instagram.com/apartment_' || id,
  facebook_url = 'https://facebook.com/apartment_' || id
WHERE id IN (1, 2); -- Only for first two apartments as examples

COMMENT ON COLUMN apartments.instagram_url IS 'Instagram profile URL for the apartment';
COMMENT ON COLUMN apartments.facebook_url IS 'Facebook page URL for the apartment';
