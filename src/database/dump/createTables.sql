CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "email" VARCHAR(50) NOT NULL UNIQUE,
  "password" VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS "categories" (
  "id" SERIAL PRIMARY KEY,
  "description" VARCHAR(50) NOT NULL
);

CREATE TYPE "TYPE" AS ENUM ('income', 'expense');

CREATE TABLE IF NOT EXISTS "transactions" (
  "id" SERIAL PRIMARY KEY,
  "description" VARCHAR(150) NOT NULL,
  "value" INTEGER NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "category_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "type" "TYPE" NOT NULL,
  FOREIGN KEY ("category_id") REFERENCES "categories"("id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
);
