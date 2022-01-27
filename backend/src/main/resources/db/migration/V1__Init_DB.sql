CREATE TYPE public.type_of_operation AS ENUM ('incomes', 'expenses');

ALTER TYPE public.type_of_operation OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL UNIQUE,
    login character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'USER'::character varying,
    status character varying(20) COLLATE pg_catalog."default" DEFAULT 'ACTIVE'::character varying
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.currencies
(
    id SERIAL NOT NULL UNIQUE,
    name character varying(5) COLLATE pg_catalog."default" NOT NULL,
    created_at date NOT NULL,
    CONSTRAINT currencies_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.currencies OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.accounts
(
    user_id integer NOT NULL,
    name character varying(55) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    created_at timestamp without time zone NOT NULL,
    id SERIAL NOT NULL UNIQUE,
    currency_id integer,
    amount SERIAL NOT NULL,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT fk_accounts_currencies FOREIGN KEY (currency_id)
        REFERENCES public.currencies (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.accounts OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.categories
(
    id SERIAL NOT NULL UNIQUE,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    color character varying(8) COLLATE pg_catalog."default" NOT NULL DEFAULT '#000'::character varying,
    created_at timestamp without time zone NOT NULL DEFAULT '2020-01-01 00:00:00'::timestamp without time zone,
    user_id integer NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.transactions
(
    id SERIAL NOT NULL UNIQUE,
    account_income integer NOT NULL,
    account_outcome integer NOT NULL,
    income numeric(12,2) NOT NULL,
    outcome numeric(12,2) NOT NULL,
    comment character varying(255) COLLATE pg_catalog."default",
    created_at timestamp without time zone NOT NULL,
    category_id integer,
    user_id integer NOT NULL,
    CONSTRAINT transactions_pkey PRIMARY KEY (id),
    CONSTRAINT fk_category FOREIGN KEY (category_id)
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.transactions OWNER to postgres;

CREATE UNIQUE INDEX IF NOT EXISTS users_id_uindex
    ON public.users USING btree
        (id ASC NULLS LAST, id ASC NULLS LAST)
    TABLESPACE pg_default;
