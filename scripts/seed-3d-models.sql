-- Phase 0: Seed model_3d_url on products from store_media GLB records
-- Run in Supabase SQL Editor
-- Replace <glb_url> values with actual file_url from store_media table

-- First, find your GLB URLs:
-- SELECT file_name, file_url FROM store_media
-- WHERE store_id = '58e62e61-75d1-4a79-8bed-3a3fb8f9400d'
--   AND source = 'blender-export'
--   AND status = 'active'
-- ORDER BY created_at;

-- Then run these updates with the actual URLs:

-- Mint Pouches → mint-can-scene.glb
UPDATE products SET custom_fields = jsonb_set(
  COALESCE(custom_fields, '{}'::jsonb),
  '{model_3d_url}',
  (SELECT to_jsonb(sm.file_url) FROM store_media sm
   WHERE sm.store_id = '58e62e61-75d1-4a79-8bed-3a3fb8f9400d'
     AND sm.file_name LIKE 'mint-can-scene%'
     AND sm.status = 'active'
   LIMIT 1)
)
WHERE store_id = '58e62e61-75d1-4a79-8bed-3a3fb8f9400d'
  AND slug = 'mint-pouches';

-- Blue Raspberry Pouches → blue-raspberry-can-scene.glb
UPDATE products SET custom_fields = jsonb_set(
  COALESCE(custom_fields, '{}'::jsonb),
  '{model_3d_url}',
  (SELECT to_jsonb(sm.file_url) FROM store_media sm
   WHERE sm.store_id = '58e62e61-75d1-4a79-8bed-3a3fb8f9400d'
     AND sm.file_name LIKE 'blue-raspberry-can-scene%'
     AND sm.status = 'active'
   LIMIT 1)
)
WHERE store_id = '58e62e61-75d1-4a79-8bed-3a3fb8f9400d'
  AND slug = 'blue-raspberry-pouches';

-- Mango Pouches → mango-can-scene.glb
UPDATE products SET custom_fields = jsonb_set(
  COALESCE(custom_fields, '{}'::jsonb),
  '{model_3d_url}',
  (SELECT to_jsonb(sm.file_url) FROM store_media sm
   WHERE sm.store_id = '58e62e61-75d1-4a79-8bed-3a3fb8f9400d'
     AND sm.file_name LIKE 'mango-can-scene%'
     AND sm.status = 'active'
   LIMIT 1)
)
WHERE store_id = '58e62e61-75d1-4a79-8bed-3a3fb8f9400d'
  AND slug = 'mango-pouches';

-- Limitless Capsules → motion-capsules-scene10.glb
UPDATE products SET custom_fields = jsonb_set(
  COALESCE(custom_fields, '{}'::jsonb),
  '{model_3d_url}',
  (SELECT to_jsonb(sm.file_url) FROM store_media sm
   WHERE sm.store_id = '58e62e61-75d1-4a79-8bed-3a3fb8f9400d'
     AND sm.file_name LIKE 'motion-capsules-scene%'
     AND sm.status = 'active'
   LIMIT 1)
)
WHERE store_id = '58e62e61-75d1-4a79-8bed-3a3fb8f9400d'
  AND slug = 'limitless-capsules';

-- Also create the RPC function used by Media Studio's "Set as Product 3D Model":
CREATE OR REPLACE FUNCTION set_product_custom_field(
  p_product_id UUID,
  p_key TEXT,
  p_value TEXT
) RETURNS void AS $$
BEGIN
  UPDATE products
  SET custom_fields = jsonb_set(
    COALESCE(custom_fields, '{}'::jsonb),
    ARRAY[p_key],
    to_jsonb(p_value)
  )
  WHERE id = p_product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
