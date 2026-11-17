CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('tender', 'notice', 'award', 'advert')),
  summary TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  ref_no TEXT,
  deadline TIMESTAMPTZ,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notices_published_created
  ON notices (published, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notices_type_created
  ON notices (type, created_at DESC);

CREATE OR REPLACE FUNCTION set_notices_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS notices_set_updated_at ON notices;

CREATE TRIGGER notices_set_updated_at
BEFORE UPDATE ON notices
FOR EACH ROW
EXECUTE FUNCTION set_notices_updated_at();
