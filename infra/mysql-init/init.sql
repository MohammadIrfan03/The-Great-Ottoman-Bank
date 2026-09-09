-- Runs automatically on first MySQL container startup.
-- Creates one database per microservice and grants the shared
-- application user access to all of them.

CREATE DATABASE IF NOT EXISTS auth_db;
CREATE DATABASE IF NOT EXISTS account_db;
CREATE DATABASE IF NOT EXISTS transaction_db;
CREATE DATABASE IF NOT EXISTS notification_db;
CREATE DATABASE IF NOT EXISTS audit_db;

CREATE USER IF NOT EXISTS 'ottoman_user'@'%' IDENTIFIED BY 'OttomanBank@2026';

GRANT ALL PRIVILEGES ON auth_db.* TO 'ottoman_user'@'%';
GRANT ALL PRIVILEGES ON account_db.* TO 'ottoman_user'@'%';
GRANT ALL PRIVILEGES ON transaction_db.* TO 'ottoman_user'@'%';
GRANT ALL PRIVILEGES ON notification_db.* TO 'ottoman_user'@'%';
GRANT ALL PRIVILEGES ON audit_db.* TO 'ottoman_user'@'%';

FLUSH PRIVILEGES;