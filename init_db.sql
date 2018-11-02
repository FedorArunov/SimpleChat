CREATE SEQUENCE public.author_seq;

CREATE TABLE public.users
(
    uid integer NOT NULL DEFAULT nextval('author_seq'::regclass),
    login character varying(4000) COLLATE pg_catalog."default",  
	registered timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT author_pk PRIMARY KEY (uid)
);

CREATE SEQUENCE public.message_seq;

CREATE TABLE public.messages
(
    uid integer NOT NULL DEFAULT nextval('message_seq'::regclass),
    author integer NOT NULL,
    updated timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content character varying(4000) COLLATE pg_catalog."default",     
    CONSTRAINT message_pk PRIMARY KEY (uid)
);