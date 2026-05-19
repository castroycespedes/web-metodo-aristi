BEGIN;

ALTER TABLE auth_users
  ADD COLUMN IF NOT EXISTS refresh_token_hash TEXT;

CREATE INDEX IF NOT EXISTS ix_auth_users_refresh_token_hash
  ON auth_users (refresh_token_hash)
  WHERE refresh_token_hash IS NOT NULL AND deleted_at IS NULL;

UPDATE auth_users
SET password_hash = '$2b$10$X.G3tU3V7YZnARHcoSxsx.YOO/6Xr3OvdtlA2hTApHTlbeXwGY2I2'
WHERE email = 'admin@taskflow.local'
  AND password_hash = '$2b$12$replace_this_hash_before_production_000000000000000000000000000';

COMMIT;
