-- CreateTable
CREATE TABLE IF NOT EXISTS users (
  "user_id" SERIAL PRIMARY KEY NOT NULL,
  "username" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS event (
  "event_id" SERIAL PRIMARY KEY NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date" DATE NOT NULL,
  "location" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_event (
  "user_event_id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" INTEGER NOT NULL,
  "event_id" INTEGER NOT NULL
);

-- password 1234 has hash: $2b$10$fSJlLQg67qp3zB0t5FOIiu6xtD/.Af4Nr9km1kCMRYCnwD.KDO3OW
-- Seed
INSERT INTO users (username, email, password) VALUES ('Alex', 'a@com', '$2b$10$fSJlLQg67qp3zB0t5FOIiu6xtD/.Af4Nr9km1kCMRYCnwD.KDO3OW'), ('John', 'j@com', '$2b$10$fSJlLQg67qp3zB0t5FOIiu6xtD/.Af4Nr9km1kCMRYCnwD.KDO3OW');

INSERT INTO event (title, description, date, location) VALUES (
  'React Conference', 'A React conference where people are getting together and discuss React topics', NOW(), 'Bucuresti'), 
  ('Node Conference', 'A Node conference where people are getting together and discuss Node topics', NOW(), 'Vienna');

INSERT INTO user_event (user_id, event_id) VALUES (1, 1), (2, 2);
