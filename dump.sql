--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 15.3

-- Started on 2023-08-06 13:05:51

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
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 90212)
-- Name: shortly; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortly (
    id integer NOT NULL,
    url text NOT NULL,
    shorturl text NOT NULL,
    userid integer,
    visitcount integer DEFAULT 0,
    createdat timestamp without time zone DEFAULT now()
);


--
-- TOC entry 204 (class 1259 OID 90210)
-- Name: shortly_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shortly_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2957 (class 0 OID 0)
-- Dependencies: 204
-- Name: shortly_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shortly_id_seq OWNED BY public.shortly.id;


--
-- TOC entry 207 (class 1259 OID 90230)
-- Name: tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    token character varying(200) NOT NULL,
    userid integer NOT NULL,
    createdat timestamp without time zone DEFAULT now()
);


--
-- TOC entry 206 (class 1259 OID 90228)
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2958 (class 0 OID 0)
-- Dependencies: 206
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- TOC entry 203 (class 1259 OID 90201)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    createdat timestamp without time zone DEFAULT now()
);


--
-- TOC entry 202 (class 1259 OID 90199)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2959 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2811 (class 2604 OID 90215)
-- Name: shortly id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortly ALTER COLUMN id SET DEFAULT nextval('public.shortly_id_seq'::regclass);


--
-- TOC entry 2814 (class 2604 OID 90233)
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- TOC entry 2809 (class 2604 OID 90204)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2821 (class 2606 OID 90222)
-- Name: shortly shortly_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortly
    ADD CONSTRAINT shortly_pkey PRIMARY KEY (id);


--
-- TOC entry 2823 (class 2606 OID 90236)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 2817 (class 2606 OID 90209)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2819 (class 2606 OID 90207)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2824 (class 2606 OID 90223)
-- Name: shortly shortly_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortly
    ADD CONSTRAINT shortly_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 2825 (class 2606 OID 90237)
-- Name: tokens tokens_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2023-08-06 13:05:51

--
-- PostgreSQL database dump complete
--

