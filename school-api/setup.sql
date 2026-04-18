-- Run this once to set up your database

CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

CREATE TABLE IF NOT EXISTS schools (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255)  NOT NULL,
  address    VARCHAR(500)  NOT NULL,
  latitude   FLOAT         NOT NULL,
  longitude  FLOAT         NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: seed data for testing
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('DPS Pune',          'Lohegaon, Pune',          18.5793, 73.9089),
  ('Symbiosis School',  'Viman Nagar, Pune',        18.5679, 73.9143),
  ('The Orchid School', 'Baner, Pune',              18.5590, 73.7868),
  ('Podar School',      'Wakad, Pune',              18.5983, 73.7717),
  ('MIT School',        'Kothrud, Pune',            18.5074, 73.8077);
