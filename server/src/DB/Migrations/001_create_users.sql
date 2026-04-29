CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_id        VARCHAR(255) UNIQUE NOT NULL,
    email            VARCHAR(255) UNIQUE NOT NULL,
    display_name     VARCHAR(255),
    avatar_url       TEXT,
    created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);