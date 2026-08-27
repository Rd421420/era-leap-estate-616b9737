CREATE TABLE public.submission_rate_limit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX submission_rate_limit_ip_hash_created_at_idx
  ON public.submission_rate_limit (ip_hash, created_at);

GRANT ALL ON public.submission_rate_limit TO service_role;

ALTER TABLE public.submission_rate_limit ENABLE ROW LEVEL SECURITY;