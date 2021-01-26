PGDMP                          y            budget    13.1 (Debian 13.1-1.pgdg100+1)    13.0 3    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16471    budget    DATABASE     Z   CREATE DATABASE budget WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE budget;
                postgres    false            z           1247    16473    type_of_operation    TYPE     P   CREATE TYPE public.type_of_operation AS ENUM (
    'incomes',
    'expenses'
);
 $   DROP TYPE public.type_of_operation;
       public          postgres    false            �            1259    16479    accounts    TABLE       CREATE TABLE public.accounts (
    user_id integer NOT NULL,
    name character varying(55) NOT NULL,
    description character varying(255),
    created_at timestamp without time zone NOT NULL,
    id integer NOT NULL,
    currency_id integer,
    amount bigint NOT NULL
);
    DROP TABLE public.accounts;
       public         heap    postgres    false            �            1259    16482    accounts_amount_seq    SEQUENCE     |   CREATE SEQUENCE public.accounts_amount_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.accounts_amount_seq;
       public          postgres    false    200            �           0    0    accounts_amount_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.accounts_amount_seq OWNED BY public.accounts.amount;
          public          postgres    false    201            �            1259    16484    accounts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.accounts_id_seq;
       public          postgres    false    200            �           0    0    accounts_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;
          public          postgres    false    202            �            1259    16486 
   categories    TABLE     ?  CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    color character varying(8) DEFAULT '#000'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT '2020-01-01 00:00:00'::timestamp without time zone NOT NULL,
    user_id integer NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    16491    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    203            �           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    204            �            1259    16493    category_id_seq    SEQUENCE     x   CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.category_id_seq;
       public          postgres    false    203            �           0    0    category_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.category_id_seq OWNED BY public.categories.id;
          public          postgres    false    205            �            1259    16495 
   currencies    TABLE     �   CREATE TABLE public.currencies (
    id integer NOT NULL,
    name character varying(5) NOT NULL,
    created_at date NOT NULL
);
    DROP TABLE public.currencies;
       public         heap    postgres    false            �            1259    16498    currencies_id_seq    SEQUENCE     �   CREATE SEQUENCE public.currencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.currencies_id_seq;
       public          postgres    false    206            �           0    0    currencies_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.currencies_id_seq OWNED BY public.currencies.id;
          public          postgres    false    207            �            1259    16505    transactions    TABLE     `  CREATE TABLE public.transactions (
    id integer NOT NULL,
    account_income integer NOT NULL,
    account_outcome integer NOT NULL,
    income numeric(12,2) NOT NULL,
    outcome numeric(12,2) NOT NULL,
    comment character varying(255),
    created_at timestamp without time zone NOT NULL,
    category_id integer,
    user_id integer NOT NULL
);
     DROP TABLE public.transactions;
       public         heap    postgres    false            �            1259    16508    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public          postgres    false    208            �           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public          postgres    false    209            �            1259    16510    users    TABLE     P  CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'USER'::character varying NOT NULL,
    status character varying(20) DEFAULT 'ACTIVE'::character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16518    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    210            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    211                       2604    16520    accounts id    DEFAULT     j   ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);
 :   ALTER TABLE public.accounts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    200                       2604    16521    accounts amount    DEFAULT     r   ALTER TABLE ONLY public.accounts ALTER COLUMN amount SET DEFAULT nextval('public.accounts_amount_seq'::regclass);
 >   ALTER TABLE public.accounts ALTER COLUMN amount DROP DEFAULT;
       public          postgres    false    201    200                       2604    16522    categories id    DEFAULT     l   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    203                       2604    16523    currencies id    DEFAULT     n   ALTER TABLE ONLY public.currencies ALTER COLUMN id SET DEFAULT nextval('public.currencies_id_seq'::regclass);
 <   ALTER TABLE public.currencies ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206                       2604    16525    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208                       2604    16526    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210            �          0    16479    accounts 
   TABLE DATA           c   COPY public.accounts (user_id, name, description, created_at, id, currency_id, amount) FROM stdin;
    public          postgres    false    200   )9       �          0    16486 
   categories 
   TABLE DATA           J   COPY public.categories (id, name, color, created_at, user_id) FROM stdin;
    public          postgres    false    203   �9       �          0    16495 
   currencies 
   TABLE DATA           :   COPY public.currencies (id, name, created_at) FROM stdin;
    public          postgres    false    206   �:       �          0    16505    transactions 
   TABLE DATA           �   COPY public.transactions (id, account_income, account_outcome, income, outcome, comment, created_at, category_id, user_id) FROM stdin;
    public          postgres    false    208   �:       �          0    16510    users 
   TABLE DATA           N   COPY public.users (id, login, password_hash, email, role, status) FROM stdin;
    public          postgres    false    210   L;       �           0    0    accounts_amount_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.accounts_amount_seq', 5, true);
          public          postgres    false    201            �           0    0    accounts_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.accounts_id_seq', 13, true);
          public          postgres    false    202            �           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 2, true);
          public          postgres    false    204            �           0    0    category_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.category_id_seq', 18, true);
          public          postgres    false    205            �           0    0    currencies_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.currencies_id_seq', 3, true);
          public          postgres    false    207            �           0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 87, true);
          public          postgres    false    209            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 7, true);
          public          postgres    false    211                       2606    16528    accounts accounts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.accounts DROP CONSTRAINT accounts_pkey;
       public            postgres    false    200                        2606    16530    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    203            "           2606    16532    currencies currencies_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.currencies
    ADD CONSTRAINT currencies_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.currencies DROP CONSTRAINT currencies_pkey;
       public            postgres    false    206            $           2606    16534    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    208            %           1259    16558    users_id_uindex    INDEX     F   CREATE UNIQUE INDEX users_id_uindex ON public.users USING btree (id);
 #   DROP INDEX public.users_id_uindex;
       public            postgres    false    210            &           2606    16537    accounts fk_accounts_currencies    FK CONSTRAINT     �   ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT fk_accounts_currencies FOREIGN KEY (currency_id) REFERENCES public.currencies(id);
 I   ALTER TABLE ONLY public.accounts DROP CONSTRAINT fk_accounts_currencies;
       public          postgres    false    2850    206    200            (           2606    16547    transactions fk_category    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories(id);
 B   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_category;
       public          postgres    false    203    208    2848            )           2606    16559    transactions fk_user_id    FK CONSTRAINT     v   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);
 A   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_user_id;
       public          postgres    false    208    2853    210            '           2606    16564    categories fk_user_id    FK CONSTRAINT     t   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);
 ?   ALTER TABLE ONLY public.categories DROP CONSTRAINT fk_user_id;
       public          postgres    false    2853    210    203            �   �   x�e���0D��)�@"�o'���@I��"� X����
V�",�"��y#�Pp:]��NW��ԡ��hK��!��0b�'1�δ1�l�$��X%Laf�ODf3����X��R��]E�G��{����c-�M8���~/H���,8O�%�n8�6�R�3�O�      �   �   x�eͱ�0@��<E�Ա|�cǞ�ʘ=�P2 D
3�mD�2�����}�HzCi\�ـV+��v��h1j#Ch�t@Wn�K�l&���>��[bm��Uy�=i��[;P�l�W��j����3��W1�e�u2�z����N
!~�J=      �   +   x�3�v�4202�5 "s.#ΠP'dcN�� d�=... 6�
X      �   t   x�}��1�3�"x5�8�%�בا���8px�gAh�p����D��`���N	]�-�)S@�O`�,Ԫ���=��G}`U�ɛ��'��ɏ��=�G���~�����Z� �x?�      �   �   x�m�Kr�0  �u8�` I���� b��M��&��w�-Ӎx�s&��R�rUa���zif��h�2��㔊���R�LI�(n]�!p3_k�_b�)�����\���{�%�Mq���K0����������Y{V��Rj
ڣp��y��v
���|}7��Ob;�u��oE�5|.|����2��+tK�>��,9����:�u�g�ŎQ,��ח��n���<�>�$Iwl�\�     