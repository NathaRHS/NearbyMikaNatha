-- Nearby - schema administration
-- Execute apres les tables metier existantes

BEGIN;

CREATE TABLE IF NOT EXISTS admin_user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    failed_attempts INT NOT NULL DEFAULT 0,
    locked_until TIMESTAMP NULL,
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_admin_user_role CHECK (role IN ('admin', 'super_admin')),
    CONSTRAINT chk_admin_user_failed_attempts CHECK (failed_attempts >= 0)
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_user_email_lower
    ON admin_user (LOWER(email));
CREATE TABLE IF NOT EXISTS admin_session (
    id SERIAL PRIMARY KEY,
    admin_user_id INT NOT NULL,
    session_token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(64) NULL,
    user_agent VARCHAR(512) NULL,
    expires_at TIMESTAMP NOT NULL,
    revoked_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_seen_at TIMESTAMP NULL,
    CONSTRAINT fk_admin_session_user
        FOREIGN KEY (admin_user_id) REFERENCES admin_user(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_session_token_hash
    ON admin_session (session_token_hash);

CREATE INDEX IF NOT EXISTS ix_admin_session_user
    ON admin_session (admin_user_id);

CREATE INDEX IF NOT EXISTS ix_admin_session_expires_at
    ON admin_session (expires_at);

CREATE TABLE IF NOT EXISTS admin_audit_log (
    id SERIAL PRIMARY KEY,
    admin_user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id INT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'success',
    ip_address VARCHAR(64) NULL,
    user_agent VARCHAR(512) NULL,
    details JSONB NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_audit_user
        FOREIGN KEY (admin_user_id) REFERENCES admin_user(id) ON DELETE SET NULL,
    CONSTRAINT chk_admin_audit_status CHECK (status IN ('success', 'failed'))
);

CREATE INDEX IF NOT EXISTS ix_admin_audit_user
    ON admin_audit_log (admin_user_id);

CREATE INDEX IF NOT EXISTS ix_admin_audit_created_at
    ON admin_audit_log (created_at);

CREATE OR REPLACE FUNCTION admin_user_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admin_user_updated_at ON admin_user;

CREATE TRIGGER trg_admin_user_updated_at
BEFORE UPDATE ON admin_user
FOR EACH ROW
EXECUTE FUNCTION admin_user_set_updated_at();

COMMIT;



-- Exemple de seed (generer le hash avec: node backend/api/scripts/hashAdminPassword.js "MotDePasseFort"):
INSERT INTO admin_user (email, password_hash, role)
VALUES ('admin@nearby.local', 'scrypt$...', 'super_admin');
