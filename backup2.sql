toc.dat                                                                                             0000600 0004000 0002000 00000022221 13766213525 0014450 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       ,                    x            budget    13.1 (Debian 13.1-1.pgdg100+1)    13.0 "    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    16384    budget    DATABASE     Z   CREATE DATABASE budget WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE budget;
                postgres    false         �           1247    16419    currency    TYPE     J   CREATE TYPE public.currency AS ENUM (
    'RUB',
    'USD',
    'EURO'
);
    DROP TYPE public.currency;
       public          postgres    false         w           1247    16386    type_of_operation    TYPE     P   CREATE TYPE public.type_of_operation AS ENUM (
    'incomes',
    'expenses'
);
 $   DROP TYPE public.type_of_operation;
       public          postgres    false         �            1259    16391    accounts    TABLE     �   CREATE TABLE public.accounts (
    id integer NOT NULL,
    userid integer NOT NULL,
    name character varying(55) NOT NULL,
    description character varying(255)
);
    DROP TABLE public.accounts;
       public         heap    postgres    false         �            1259    16394    accounts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.accounts_id_seq;
       public          postgres    false    200         �           0    0    accounts_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;
          public          postgres    false    201         �            1259    16396 
   categories    TABLE     f   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false         �            1259    16399    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    202         �           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    203         �            1259    16425    flyway_schema_history    TABLE     �  CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);
 )   DROP TABLE public.flyway_schema_history;
       public         heap    postgres    false         �            1259    16401 
   operations    TABLE     %  CREATE TABLE public.operations (
    id integer NOT NULL,
    account_id integer NOT NULL,
    amount integer NOT NULL,
    type_of_operation public.type_of_operation NOT NULL,
    date timestamp without time zone NOT NULL,
    name character varying(255) NOT NULL,
    category_id integer
);
    DROP TABLE public.operations;
       public         heap    postgres    false    631         �            1259    16404    operations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.operations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.operations_id_seq;
       public          postgres    false    204         �           0    0    operations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.operations_id_seq OWNED BY public.operations.id;
          public          postgres    false    205         �            1259    16406    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(50) NOT NULL,
    passwordhash character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false         �            1259    16412    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    206         �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    207                    2604    16414    accounts id    DEFAULT     j   ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);
 :   ALTER TABLE public.accounts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200                    2604    16415    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202                    2604    16416    operations id    DEFAULT     n   ALTER TABLE ONLY public.operations ALTER COLUMN id SET DEFAULT nextval('public.operations_id_seq'::regclass);
 <   ALTER TABLE public.operations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204                    2604    16417    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206         �          0    16391    accounts 
   TABLE DATA           A   COPY public.accounts (id, userid, name, description) FROM stdin;
    public          postgres    false    200       2971.dat �          0    16396 
   categories 
   TABLE DATA           .   COPY public.categories (id, name) FROM stdin;
    public          postgres    false    202       2973.dat �          0    16425    flyway_schema_history 
   TABLE DATA           �   COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
    public          postgres    false    208       2979.dat �          0    16401 
   operations 
   TABLE DATA           h   COPY public.operations (id, account_id, amount, type_of_operation, date, name, category_id) FROM stdin;
    public          postgres    false    204       2975.dat �          0    16406    users 
   TABLE DATA           ?   COPY public.users (id, login, passwordhash, email) FROM stdin;
    public          postgres    false    206       2977.dat �           0    0    accounts_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.accounts_id_seq', 1, false);
          public          postgres    false    201         �           0    0    categories_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.categories_id_seq', 1, false);
          public          postgres    false    203         �           0    0    operations_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.operations_id_seq', 1, false);
          public          postgres    false    205         �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    207                    2606    16433 .   flyway_schema_history flyway_schema_history_pk 
   CONSTRAINT     x   ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);
 X   ALTER TABLE ONLY public.flyway_schema_history DROP CONSTRAINT flyway_schema_history_pk;
       public            postgres    false    208                    1259    16434    flyway_schema_history_s_idx    INDEX     `   CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);
 /   DROP INDEX public.flyway_schema_history_s_idx;
       public            postgres    false    208                                                                                                                                                                                                                                                                                                                                                                                       2971.dat                                                                                            0000600 0004000 0002000 00000000005 13766213525 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2973.dat                                                                                            0000600 0004000 0002000 00000000005 13766213525 0014263 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2979.dat                                                                                            0000600 0004000 0002000 00000000145 13766213525 0014276 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	<< Flyway Baseline >>	BASELINE	<< Flyway Baseline >>	\N	null	2020-12-15 23:01:38.849609	0	t
\.


                                                                                                                                                                                                                                                                                                                                                                                                                           2975.dat                                                                                            0000600 0004000 0002000 00000000005 13766213525 0014265 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2977.dat                                                                                            0000600 0004000 0002000 00000000110 13766213525 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	andreevsm	ede6b50e7b5826fe48fc1f0fe772c48f	aandreev.sm@gmail.com
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                        restore.sql                                                                                         0000600 0004000 0002000 00000020445 13766213525 0015403 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE budget;
--
-- Name: budget; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE budget WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE budget OWNER TO postgres;

\connect budget

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: currency; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.currency AS ENUM (
    'RUB',
    'USD',
    'EURO'
);


ALTER TYPE public.currency OWNER TO postgres;

--
-- Name: type_of_operation; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.type_of_operation AS ENUM (
    'incomes',
    'expenses'
);


ALTER TYPE public.type_of_operation OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    userid integer NOT NULL,
    name character varying(55) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO postgres;

--
-- Name: operations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.operations (
    id integer NOT NULL,
    account_id integer NOT NULL,
    amount integer NOT NULL,
    type_of_operation public.type_of_operation NOT NULL,
    date timestamp without time zone NOT NULL,
    name character varying(255) NOT NULL,
    category_id integer
);


ALTER TABLE public.operations OWNER TO postgres;

--
-- Name: operations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.operations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.operations_id_seq OWNER TO postgres;

--
-- Name: operations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.operations_id_seq OWNED BY public.operations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(50) NOT NULL,
    passwordhash character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: operations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operations ALTER COLUMN id SET DEFAULT nextval('public.operations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, userid, name, description) FROM stdin;
\.
COPY public.accounts (id, userid, name, description) FROM '$$PATH$$/2971.dat';

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
\.
COPY public.categories (id, name) FROM '$$PATH$$/2973.dat';

--
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
\.
COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM '$$PATH$$/2979.dat';

--
-- Data for Name: operations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.operations (id, account_id, amount, type_of_operation, date, name, category_id) FROM stdin;
\.
COPY public.operations (id, account_id, amount, type_of_operation, date, name, category_id) FROM '$$PATH$$/2975.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, login, passwordhash, email) FROM stdin;
\.
COPY public.users (id, login, passwordhash, email) FROM '$$PATH$$/2977.dat';

--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: operations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.operations_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           