-- Database: field_act_db

-- DROP DATABASE IF EXISTS field_act_db;

CREATE DATABASE field_act_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.contract

-- DROP TABLE IF EXISTS public.contract;

CREATE TABLE IF NOT EXISTS public.contract
(
    id_code integer NOT NULL DEFAULT nextval('contract_id_code_seq'::regclass),
    value_short character varying(250) COLLATE pg_catalog."default" NOT NULL,
    value_full character varying(250) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    CONSTRAINT contract_pkey PRIMARY KEY (id_code)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.contract
    OWNER to postgres;

-- Table: public.field

-- DROP TABLE IF EXISTS public.field;

CREATE TABLE IF NOT EXISTS public.field
(
    id_code integer NOT NULL DEFAULT nextval('field_id_code_seq'::regclass),
    value_short character varying(250) COLLATE pg_catalog."default" NOT NULL,
    value_full character varying(250) COLLATE pg_catalog."default" NOT NULL,
    sequence integer NOT NULL,
    block_id integer NOT NULL,
    unit character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT field_pkey PRIMARY KEY (id_code)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.field
    OWNER to postgres;

-- Table: public.field_research

-- DROP TABLE IF EXISTS public.field_research;

CREATE TABLE IF NOT EXISTS public.field_research
(
    id_field_research integer NOT NULL DEFAULT nextval('field_research_id_field_research_seq'::regclass),
    id_code integer NOT NULL,
    research_id integer NOT NULL,
    mb_before_fracturing integer DEFAULT 0,
    mb_after_fracturing integer DEFAULT 0,
    mb_frac integer DEFAULT 0,
    design integer DEFAULT 0,
    redesign integer DEFAULT 0,
    fact integer DEFAULT 0,
    to_pay integer DEFAULT 0,
    is_editable boolean DEFAULT false,
    is_title_editable boolean DEFAULT false,
    CONSTRAINT field_research_pkey PRIMARY KEY (id_field_research),
    CONSTRAINT field_fkey FOREIGN KEY (id_code)
        REFERENCES public.field (id_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT research_fkey FOREIGN KEY (research_id)
        REFERENCES public.research (research_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.field_research
    OWNER to postgres;

-- Table: public.field_template_lkp

-- DROP TABLE IF EXISTS public.field_template_lkp;

CREATE TABLE IF NOT EXISTS public.field_template_lkp
(
    id_code integer NOT NULL DEFAULT nextval('field_template_lkp_id_code_seq'::regclass),
    id_field integer NOT NULL,
    id_template integer NOT NULL,
    CONSTRAINT field_template_lkp_pkey PRIMARY KEY (id_code),
    CONSTRAINT field_fkey FOREIGN KEY (id_field)
        REFERENCES public.field (id_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT template_fkey FOREIGN KEY (id_template)
        REFERENCES public.template (id_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.field_template_lkp
    OWNER to postgres;

-- Table: public.research

-- DROP TABLE IF EXISTS public.research;

CREATE TABLE IF NOT EXISTS public.research
(
    research_id integer NOT NULL DEFAULT nextval('research_research_id_seq'::regclass),
    is_new boolean NOT NULL DEFAULT false,
    contractor character varying(250) COLLATE pg_catalog."default" NOT NULL,
    well_name character varying(250) COLLATE pg_catalog."default" NOT NULL,
    cluster character varying(250) COLLATE pg_catalog."default" NOT NULL,
    objects character varying(250) COLLATE pg_catalog."default" NOT NULL,
    oilfield character varying(250) COLLATE pg_catalog."default" NOT NULL,
    grp_date date,
    id_contract integer,
    client_role character varying(250) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    client_person character varying(250) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    executer_role character varying(250) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    executer_person character varying(250) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    shop_role character varying(250) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    shop_person character varying(250) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    f_propant_mass_nkt integer DEFAULT 0,
    CONSTRAINT research_pkey PRIMARY KEY (research_id),
    CONSTRAINT contract_fkey FOREIGN KEY (id_contract)
        REFERENCES public.contract (id_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.research
    OWNER to postgres;

-- Table: public.role

-- DROP TABLE IF EXISTS public.role;

CREATE TABLE IF NOT EXISTS public.role
(
    id_code integer NOT NULL DEFAULT nextval('role_id_code_seq'::regclass),
    name character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (id_code)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.role
    OWNER to postgres;

-- Table: public.template

-- DROP TABLE IF EXISTS public.template;

CREATE TABLE IF NOT EXISTS public.template
(
    id_code integer NOT NULL DEFAULT nextval('template_id_code_seq'::regclass),
    name character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT template_pkey PRIMARY KEY (id_code)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.template
    OWNER to postgres;

-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    id_code integer NOT NULL DEFAULT nextval('user_id_code_seq'::regclass),
    id_role integer NOT NULL,
    surname character varying(250) COLLATE pg_catalog."default",
    name character varying(250) COLLATE pg_catalog."default",
    patronymic character varying(250) COLLATE pg_catalog."default",
    login character varying(250) COLLATE pg_catalog."default" NOT NULL,
    email character varying(250) COLLATE pg_catalog."default" NOT NULL,
    password character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id_role),
    CONSTRAINT user_role_fkey FOREIGN KEY (id_role)
        REFERENCES public.role (id_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;