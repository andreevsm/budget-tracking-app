CREATE TABLE users (
    id bigserial not null primary key,
    email VARCHAR NOT NULL UNIQUE,
    encrypted_password VARCHAR NOT NULL
);
