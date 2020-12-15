CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    login VARCHAR (50) NOT NULL,
    passwordHash VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL
);
