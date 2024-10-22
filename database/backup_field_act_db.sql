PGDMP     *                    {            field_act_db    15.1    15.1 \    {           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            |           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            }           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ~           1262    16399    field_act_db    DATABASE     �   CREATE DATABASE field_act_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE field_act_db;
                postgres    false            �            1259    16431    contract    TABLE     �   CREATE TABLE public.contract (
    id_code integer NOT NULL,
    value_short character varying(250) NOT NULL,
    value_full character varying(250) NOT NULL,
    date date NOT NULL
);
    DROP TABLE public.contract;
       public         heap    postgres    false            �            1259    16430    contract_id_code_seq    SEQUENCE     �   CREATE SEQUENCE public.contract_id_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.contract_id_code_seq;
       public          postgres    false    219                       0    0    contract_id_code_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.contract_id_code_seq OWNED BY public.contract.id_code;
          public          postgres    false    218            �            1259    16440    field    TABLE       CREATE TABLE public.field (
    id_code integer NOT NULL,
    value_short character varying(250) NOT NULL,
    value_full character varying(250) NOT NULL,
    sequence integer NOT NULL,
    block_id integer NOT NULL,
    unit character varying(100) NOT NULL
);
    DROP TABLE public.field;
       public         heap    postgres    false            �            1259    16439    field_id_code_seq    SEQUENCE     �   CREATE SEQUENCE public.field_id_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.field_id_code_seq;
       public          postgres    false    221            �           0    0    field_id_code_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.field_id_code_seq OWNED BY public.field.id_code;
          public          postgres    false    220            �            1259    16489    field_research    TABLE     �  CREATE TABLE public.field_research (
    id_field_research integer NOT NULL,
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
    is_title_editable boolean DEFAULT false
);
 "   DROP TABLE public.field_research;
       public         heap    postgres    false            �            1259    16488 $   field_research_id_field_research_seq    SEQUENCE     �   CREATE SEQUENCE public.field_research_id_field_research_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.field_research_id_field_research_seq;
       public          postgres    false    229            �           0    0 $   field_research_id_field_research_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.field_research_id_field_research_seq OWNED BY public.field_research.id_field_research;
          public          postgres    false    228            �            1259    16456    field_template_lkp    TABLE     �   CREATE TABLE public.field_template_lkp (
    id_code integer NOT NULL,
    id_field integer NOT NULL,
    id_template integer NOT NULL
);
 &   DROP TABLE public.field_template_lkp;
       public         heap    postgres    false            �            1259    16455    field_template_lkp_id_code_seq    SEQUENCE     �   CREATE SEQUENCE public.field_template_lkp_id_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.field_template_lkp_id_code_seq;
       public          postgres    false    225            �           0    0    field_template_lkp_id_code_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.field_template_lkp_id_code_seq OWNED BY public.field_template_lkp.id_code;
          public          postgres    false    224            �            1259    16565    file_remark    TABLE     �   CREATE TABLE public.file_remark (
    id_code integer NOT NULL,
    id_remark integer NOT NULL,
    name character varying(150) NOT NULL,
    bin bytea NOT NULL
);
    DROP TABLE public.file_remark;
       public         heap    postgres    false            �            1259    16564    file_remark_id_code_seq    SEQUENCE     �   CREATE SEQUENCE public.file_remark_id_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.file_remark_id_code_seq;
       public          postgres    false    235            �           0    0    file_remark_id_code_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.file_remark_id_code_seq OWNED BY public.file_remark.id_code;
          public          postgres    false    234            �            1259    16546    remark    TABLE     �   CREATE TABLE public.remark (
    id_code integer NOT NULL,
    id_user integer NOT NULL,
    remarks text NOT NULL,
    date date NOT NULL,
    research_id integer NOT NULL
);
    DROP TABLE public.remark;
       public         heap    postgres    false            �            1259    16545    remark_id_code_seq    SEQUENCE     �   CREATE SEQUENCE public.remark_id_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.remark_id_code_seq;
       public          postgres    false    233            �           0    0    remark_id_code_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.remark_id_code_seq OWNED BY public.remark.id_code;
          public          postgres    false    232            �            1259    16473    research    TABLE     �  CREATE TABLE public.research (
    research_id integer NOT NULL,
    is_new boolean DEFAULT false NOT NULL,
    contractor character varying(250) NOT NULL,
    well_name character varying(250) NOT NULL,
    cluster character varying(250) NOT NULL,
    objects character varying(250) NOT NULL,
    oilfield character varying(250) NOT NULL,
    grp_date date,
    id_contract integer,
    client_role character varying(250) DEFAULT NULL::character varying,
    client_person character varying(250) DEFAULT NULL::character varying,
    executer_role character varying(250) DEFAULT NULL::character varying,
    executer_person character varying(250) DEFAULT NULL::character varying,
    shop_role character varying(250) DEFAULT NULL::character varying,
    shop_person character varying(250) DEFAULT NULL::character varying,
    f_propant_mass_nkt integer DEFAULT 0,
    id_user integer,
    id_status integer DEFAULT 1
);
    DROP TABLE public.research;
       public         heap    postgres    false            �            1259    16472    research_research_id_seq    SEQUENCE     �   CREATE SEQUENCE public.research_research_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.research_research_id_seq;
       public          postgres    false    227            �           0    0    research_research_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.research_research_id_seq OWNED BY public.research.research_id;
          public          postgres    false    226            �            1259    16410    role    TABLE     e   CREATE TABLE public.role (
    id_code integer NOT NULL,
    name character varying(250) NOT NULL
);
    DROP TABLE public.role;
       public         heap    postgres    false            �            1259    16409    role_id_code_seq    SEQUENCE     �   CREATE SEQUENCE public.role_id_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.role_id_code_seq;
       public          postgres    false    215            �           0    0    role_id_code_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.role_id_code_seq OWNED BY public.role.id_code;
          public          postgres    false    214            �            1259    16532    status    TABLE     f   CREATE TABLE public.status (
    id_code integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.status;
       public         heap    postgres    false            �            1259    16531    status_id_code_seq    SEQUENCE     �   CREATE SEQUENCE public.status_id_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.status_id_code_seq;
       public          postgres    false    231            �           0    0    status_id_code_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.status_id_code_seq OWNED BY public.status.id_code;
          public          postgres    false    230            �            1259    16449    template    TABLE     i   CREATE TABLE public.template (
    id_code integer NOT NULL,
    name character varying(250) NOT NULL
);
    DROP TABLE public.template;
       public         heap    postgres    false            �            1259    16448    template_id_code_seq    SEQUENCE     �   CREATE SEQUENCE public.template_id_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.template_id_code_seq;
       public          postgres    false    223            �           0    0    template_id_code_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.template_id_code_seq OWNED BY public.template.id_code;
          public          postgres    false    222            �            1259    16417    user    TABLE     K  CREATE TABLE public."user" (
    id_code integer NOT NULL,
    id_role integer NOT NULL,
    surname character varying(250),
    name character varying(250),
    patronymic character varying(250),
    login character varying(250) NOT NULL,
    email character varying(250) NOT NULL,
    password character varying(250) NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    16416    user_id_code_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_id_code_seq;
       public          postgres    false    217            �           0    0    user_id_code_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.user_id_code_seq OWNED BY public."user".id_code;
          public          postgres    false    216            �           2604    16434    contract id_code    DEFAULT     t   ALTER TABLE ONLY public.contract ALTER COLUMN id_code SET DEFAULT nextval('public.contract_id_code_seq'::regclass);
 ?   ALTER TABLE public.contract ALTER COLUMN id_code DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    16443    field id_code    DEFAULT     n   ALTER TABLE ONLY public.field ALTER COLUMN id_code SET DEFAULT nextval('public.field_id_code_seq'::regclass);
 <   ALTER TABLE public.field ALTER COLUMN id_code DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    16492     field_research id_field_research    DEFAULT     �   ALTER TABLE ONLY public.field_research ALTER COLUMN id_field_research SET DEFAULT nextval('public.field_research_id_field_research_seq'::regclass);
 O   ALTER TABLE public.field_research ALTER COLUMN id_field_research DROP DEFAULT;
       public          postgres    false    229    228    229            �           2604    16459    field_template_lkp id_code    DEFAULT     �   ALTER TABLE ONLY public.field_template_lkp ALTER COLUMN id_code SET DEFAULT nextval('public.field_template_lkp_id_code_seq'::regclass);
 I   ALTER TABLE public.field_template_lkp ALTER COLUMN id_code DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    16568    file_remark id_code    DEFAULT     z   ALTER TABLE ONLY public.file_remark ALTER COLUMN id_code SET DEFAULT nextval('public.file_remark_id_code_seq'::regclass);
 B   ALTER TABLE public.file_remark ALTER COLUMN id_code DROP DEFAULT;
       public          postgres    false    234    235    235            �           2604    16549    remark id_code    DEFAULT     p   ALTER TABLE ONLY public.remark ALTER COLUMN id_code SET DEFAULT nextval('public.remark_id_code_seq'::regclass);
 =   ALTER TABLE public.remark ALTER COLUMN id_code DROP DEFAULT;
       public          postgres    false    233    232    233            �           2604    16476    research research_id    DEFAULT     |   ALTER TABLE ONLY public.research ALTER COLUMN research_id SET DEFAULT nextval('public.research_research_id_seq'::regclass);
 C   ALTER TABLE public.research ALTER COLUMN research_id DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    16413    role id_code    DEFAULT     l   ALTER TABLE ONLY public.role ALTER COLUMN id_code SET DEFAULT nextval('public.role_id_code_seq'::regclass);
 ;   ALTER TABLE public.role ALTER COLUMN id_code DROP DEFAULT;
       public          postgres    false    215    214    215            �           2604    16535    status id_code    DEFAULT     p   ALTER TABLE ONLY public.status ALTER COLUMN id_code SET DEFAULT nextval('public.status_id_code_seq'::regclass);
 =   ALTER TABLE public.status ALTER COLUMN id_code DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    16452    template id_code    DEFAULT     t   ALTER TABLE ONLY public.template ALTER COLUMN id_code SET DEFAULT nextval('public.template_id_code_seq'::regclass);
 ?   ALTER TABLE public.template ALTER COLUMN id_code DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    16420    user id_code    DEFAULT     n   ALTER TABLE ONLY public."user" ALTER COLUMN id_code SET DEFAULT nextval('public.user_id_code_seq'::regclass);
 =   ALTER TABLE public."user" ALTER COLUMN id_code DROP DEFAULT;
       public          postgres    false    216    217    217            h          0    16431    contract 
   TABLE DATA           J   COPY public.contract (id_code, value_short, value_full, date) FROM stdin;
    public          postgres    false    219   �n       j          0    16440    field 
   TABLE DATA           [   COPY public.field (id_code, value_short, value_full, sequence, block_id, unit) FROM stdin;
    public          postgres    false    221   �o       r          0    16489    field_research 
   TABLE DATA           �   COPY public.field_research (id_field_research, id_code, research_id, mb_before_fracturing, mb_after_fracturing, mb_frac, design, redesign, fact, to_pay, is_editable, is_title_editable) FROM stdin;
    public          postgres    false    229   cq       n          0    16456    field_template_lkp 
   TABLE DATA           L   COPY public.field_template_lkp (id_code, id_field, id_template) FROM stdin;
    public          postgres    false    225   Yr       x          0    16565    file_remark 
   TABLE DATA           D   COPY public.file_remark (id_code, id_remark, name, bin) FROM stdin;
    public          postgres    false    235   �r       v          0    16546    remark 
   TABLE DATA           N   COPY public.remark (id_code, id_user, remarks, date, research_id) FROM stdin;
    public          postgres    false    233   �       p          0    16473    research 
   TABLE DATA           �   COPY public.research (research_id, is_new, contractor, well_name, cluster, objects, oilfield, grp_date, id_contract, client_role, client_person, executer_role, executer_person, shop_role, shop_person, f_propant_mass_nkt, id_user, id_status) FROM stdin;
    public          postgres    false    227   /�       d          0    16410    role 
   TABLE DATA           -   COPY public.role (id_code, name) FROM stdin;
    public          postgres    false    215   �       t          0    16532    status 
   TABLE DATA           /   COPY public.status (id_code, name) FROM stdin;
    public          postgres    false    231   p�       l          0    16449    template 
   TABLE DATA           1   COPY public.template (id_code, name) FROM stdin;
    public          postgres    false    223   ��       f          0    16417    user 
   TABLE DATA           e   COPY public."user" (id_code, id_role, surname, name, patronymic, login, email, password) FROM stdin;
    public          postgres    false    217   ��       �           0    0    contract_id_code_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.contract_id_code_seq', 16, true);
          public          postgres    false    218            �           0    0    field_id_code_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.field_id_code_seq', 23, true);
          public          postgres    false    220            �           0    0 $   field_research_id_field_research_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.field_research_id_field_research_seq', 364, true);
          public          postgres    false    228            �           0    0    field_template_lkp_id_code_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.field_template_lkp_id_code_seq', 13, true);
          public          postgres    false    224            �           0    0    file_remark_id_code_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.file_remark_id_code_seq', 6, true);
          public          postgres    false    234            �           0    0    remark_id_code_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.remark_id_code_seq', 30, true);
          public          postgres    false    232            �           0    0    research_research_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.research_research_id_seq', 5, true);
          public          postgres    false    226            �           0    0    role_id_code_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.role_id_code_seq', 2, true);
          public          postgres    false    214            �           0    0    status_id_code_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.status_id_code_seq', 3, true);
          public          postgres    false    230            �           0    0    template_id_code_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.template_id_code_seq', 9, true);
          public          postgres    false    222            �           0    0    user_id_code_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.user_id_code_seq', 3, true);
          public          postgres    false    216            �           2606    16438    contract contract_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.contract
    ADD CONSTRAINT contract_pkey PRIMARY KEY (id_code);
 @   ALTER TABLE ONLY public.contract DROP CONSTRAINT contract_pkey;
       public            postgres    false    219            �           2606    16447    field field_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.field
    ADD CONSTRAINT field_pkey PRIMARY KEY (id_code);
 :   ALTER TABLE ONLY public.field DROP CONSTRAINT field_pkey;
       public            postgres    false    221            �           2606    16503 "   field_research field_research_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.field_research
    ADD CONSTRAINT field_research_pkey PRIMARY KEY (id_field_research);
 L   ALTER TABLE ONLY public.field_research DROP CONSTRAINT field_research_pkey;
       public            postgres    false    229            �           2606    16461 *   field_template_lkp field_template_lkp_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.field_template_lkp
    ADD CONSTRAINT field_template_lkp_pkey PRIMARY KEY (id_code);
 T   ALTER TABLE ONLY public.field_template_lkp DROP CONSTRAINT field_template_lkp_pkey;
       public            postgres    false    225            �           2606    16572    file_remark file_remark_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.file_remark
    ADD CONSTRAINT file_remark_pkey PRIMARY KEY (id_code);
 F   ALTER TABLE ONLY public.file_remark DROP CONSTRAINT file_remark_pkey;
       public            postgres    false    235            �           2606    16553    remark remark_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.remark
    ADD CONSTRAINT remark_pkey PRIMARY KEY (id_code);
 <   ALTER TABLE ONLY public.remark DROP CONSTRAINT remark_pkey;
       public            postgres    false    233            �           2606    16482    research research_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.research
    ADD CONSTRAINT research_pkey PRIMARY KEY (research_id);
 @   ALTER TABLE ONLY public.research DROP CONSTRAINT research_pkey;
       public            postgres    false    227            �           2606    16415    role role_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id_code);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public            postgres    false    215            �           2606    16537    status status_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id_code);
 <   ALTER TABLE ONLY public.status DROP CONSTRAINT status_pkey;
       public            postgres    false    231            �           2606    16454    template template_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.template
    ADD CONSTRAINT template_pkey PRIMARY KEY (id_code);
 @   ALTER TABLE ONLY public.template DROP CONSTRAINT template_pkey;
       public            postgres    false    223            �           2606    16525    user user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_code);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    217            �           2606    16483    research contract_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.research
    ADD CONSTRAINT contract_fkey FOREIGN KEY (id_contract) REFERENCES public.contract(id_code);
 @   ALTER TABLE ONLY public.research DROP CONSTRAINT contract_fkey;
       public          postgres    false    219    3257    227            �           2606    16462    field_template_lkp field_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.field_template_lkp
    ADD CONSTRAINT field_fkey FOREIGN KEY (id_field) REFERENCES public.field(id_code);
 G   ALTER TABLE ONLY public.field_template_lkp DROP CONSTRAINT field_fkey;
       public          postgres    false    225    221    3259            �           2606    16509    field_research field_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.field_research
    ADD CONSTRAINT field_fkey FOREIGN KEY (id_code) REFERENCES public.field(id_code);
 C   ALTER TABLE ONLY public.field_research DROP CONSTRAINT field_fkey;
       public          postgres    false    229    221    3259            �           2606    16573    file_remark remark_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.file_remark
    ADD CONSTRAINT remark_fkey FOREIGN KEY (id_remark) REFERENCES public.remark(id_code);
 A   ALTER TABLE ONLY public.file_remark DROP CONSTRAINT remark_fkey;
       public          postgres    false    235    233    3271            �           2606    16504    field_research research_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.field_research
    ADD CONSTRAINT research_fkey FOREIGN KEY (research_id) REFERENCES public.research(research_id);
 F   ALTER TABLE ONLY public.field_research DROP CONSTRAINT research_fkey;
       public          postgres    false    229    3265    227            �           2606    16559    remark research_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.remark
    ADD CONSTRAINT research_fkey FOREIGN KEY (research_id) REFERENCES public.research(research_id) NOT VALID;
 >   ALTER TABLE ONLY public.remark DROP CONSTRAINT research_fkey;
       public          postgres    false    233    227    3265            �           2606    16538    research status_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.research
    ADD CONSTRAINT status_fkey FOREIGN KEY (id_status) REFERENCES public.status(id_code) NOT VALID;
 >   ALTER TABLE ONLY public.research DROP CONSTRAINT status_fkey;
       public          postgres    false    231    227    3269            �           2606    16467     field_template_lkp template_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.field_template_lkp
    ADD CONSTRAINT template_fkey FOREIGN KEY (id_template) REFERENCES public.template(id_code);
 J   ALTER TABLE ONLY public.field_template_lkp DROP CONSTRAINT template_fkey;
       public          postgres    false    3261    225    223            �           2606    16526    research uesr_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.research
    ADD CONSTRAINT uesr_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_code) NOT VALID;
 <   ALTER TABLE ONLY public.research DROP CONSTRAINT uesr_fkey;
       public          postgres    false    217    227    3255            �           2606    16554    remark user_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.remark
    ADD CONSTRAINT user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_code);
 :   ALTER TABLE ONLY public.remark DROP CONSTRAINT user_fkey;
       public          postgres    false    233    3255    217            �           2606    16425    user user_role_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_role_fkey FOREIGN KEY (id_role) REFERENCES public.role(id_code);
 ?   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_role_fkey;
       public          postgres    false    3253    217    215            h   �   x�u���0ki�, �>Y��]��x}f0+0	N�Oc
7�{:� Dr����{;��>N��|�vnj&P1�D�����%Q�9;!��G�ݝ�J�127��m�q�-�Gf绪˶�����'��HTJ��^�����o5�4��o�`�Y��������/kۢ�      j   �  x��T�N�0<;_�#hl���ǴHP8�x���=�D�>�/����	��Vu�����t�J�����p��q��V�P�n'��aڑ���|��X�L�0�Z#p˧��MPbfsW�(�u�88E��ݱ;�B~{,��a�)�QY�=|ߒ��>H9JL��� ����sy�rO,�	s0W�.A�ƛ���ޫ�r7�=Z�J�ܤ����Y�)R��4���'�.���DO���
�4�gN�NC�%fJ�D	����Q����UF)�X�gfW�tf���̢��'�Ή9��S�6��|≄=�9]ʱ���S�E��g{(���7V��WD�='�Q`�47��H���+`��JW\adwm^�G�ʿ�m>�g���z�F(%\��UITwm����*�k4}��J
�]�gU6�n��ۀD��]o,�_ẵw۝ ��<��      r   �   x�u�Q�� D���t06p�~���v�jW�
)�=��#,�Z�f�n/��:�����$��$!�IGE<�*I��&Z�L�_�e�DuK�]-۴��[Y�b����,�o�ˮSώ���ɡ��S�Tأ�| ����̫�x�OX���2�>����bp�p'VZ�:�%lp8,=X1w�;dO���t$���b@�+Z�U:GՄVhB$t@�������@�2��s�/\v�      n   0   x��9 0��Ӌ��L��
���E�D�򋍲�c�!��1A      x      x��}Ɏ,�r��+���<�<�K�H�MIx�{���sg�CFf��2#3i������c�������������%�T�%e�ϙ�������o��I ~��ܧ,�Q�]�M����a��w�#"""""�A�+?#�������sя̄����	�i�� 6���YkB��o�������
����4deh�6��z��:����C]׆/k�&��y�#��
��?U&�_O]������wuQ���۪7qe�Nb�9�Ϗk��:����s5Tei�|�vU���9""""�á�¶n��|&��t���|o��T��yb������6F�7ݷ���|_�U[�mL��S�D������O���S-r[g,�wu�t��!8}�}*���ք�ĝ	��L�	1~~���gC�lJG�MO; ��&`���tT��{���E�z���Ѝ�H�5˕镛�H����}�OG�^��B��|H��ۯ��_�?k�fl���""""">����؏����� �~o���y7�w({È��u]������6m���� #""">�&�Ѥ�@�>���]_SԆ'0tf���21�Us<t�|n7bz�}u�.�X�Ř
���O���H���ii�>5������f������j*j϶�h��5x��G��Ϗ�x_(z@��zC���*�E�_����|tv��/C\'&�������{S%��8n����US�e���Hޤ��q��ޙ��h������3����? �������9���8�"�j|)��JGǙe���zv��	�| �	 �:f��4n��6H>5�����%�B����loi�z��޳�����&[�7��F�^#�a�D�a&
��~��Q�;����$���f}3��t`S�}�O0-�h�d�Gw)y�iߵ%ۭ7S�N��a0��Sd�{u����/�Sˉ�^�������|RCڋ�����~h����7��?��)�o(?-�!�k��t�P���4?�*w��g�.=��y�S
r~�?����G('�?[m���US ���'�	�盂�I���E>{��h���G��B���^=��y5����S��1��yrؙgn�������zcj�����w��/��G�x�b��_m��t��;���9�_\�g��#C�[
^���������˱�`�UP�>)��
'�w{������w�~�
��Ow��_�U�FZ����-=Ꚓ�Q���,��c��O��:4���؇?��j��+�]`��-�Qpr��^o�/�)�N��s���~���e<Kvs�Q`�6}������H|ؔP?�b.�_L(��&N)̋ߌv�}�_K���U���%�p��	S��¼���������1�\�W���Qp�Y�?Q0���_5���������%���`~.)l��jK�w9׿x�����f����6F�iƆ�kW���}J�=7T�|�q�Q�h_��ު����Go���IϦ�� ��~��	o��xq��Uz��y ʅ�e�C�����OY�uD�so��z�vaz�
��6��z�|V{��ޓ���������;�U�K�R�碥�v��C�&
fx�6��u�%?��o��j>V	�>�=^���jY�;�O�CQR0ϵ��+8��*����ଧ���=��0��������"�V��%׾�9d]+*
&���k���ַU9�z:ʏo�tS������,����k�eJa^�{�+o�p�@z��);
潌��P0�sp�
��{I�<τ�+7Wμ�0�L��wnp�OZP0��s����+W��8�~�|
ڑ	�G_���J
�.SX�K�*��E�e�vP�K�武�UG��#�7���9�BYE��g����Gϧ���(x�)����`�o��=wt���+��%����4~�^�K�_�ު�Y�Kt���y�t�O��+Z

�!9B��X�Y<��t�f���t�m(���E�XGӊ�y�����:��:e�� �5_ ��뱢�L_���|����4�)8=�� �m�.�>xzf�
��{駐~�e8~Ζ���>�n�[����|Bϵ��Wk+�G	��z���Am���Y'L0�2c��Ǧ/z9�3@�O�~�� ���ڝ�ƭ�i�;���"@����֫�����+�D����ڊ�_���!}��C�;��ߣG߭o�x_���?=���}��_̓��`���{�Jb+*=�]���� 
n]º��:ɇ����
��'�b��������[�U�aV!�ʵ�Æ�?+������k��u��+Aw-�T�2� ������zU�[���Z�-����N[>͗0���ջ䷔2�GB����f�����z���0�N��B�(��iw;Y�t|���Q_�?ڣ�)8~�A��]"�W�����?���|9���0[Q����Ύ)/��P����y޶���]�5��7�ȸ��	�53���>t����M��ض�8	��< ��~{�~E�G��c^���|�}Z ��F�|t��K)�]�D��&@�EF��Lx̲5P�gVo�o[?-؍���A��|
���y;��Cr
迖S��N�����ߓ�����Y���?c]o+?b�Fz�"��}��i�[ ,�װ�*���C_@��t�V�������A/��]ɧ�+�~��?�f0���z�C�@?���ðu����?�㤡��[�GQ/6�<9_
��1�>��)x�r������>ރ�?�nv�K�_Ɗ��{�?�����[�[�a�;�pt����P�R�G��_��_K�E��h��)@�S鶠�����|؟]-�K��y@���w}�~8o9�G&nߥ���mo�+���]��uO�ͿU?��r��	�R�9a�U�IHO�}q�o�}\�6�/�{�I,��a}��v�;��'�,4a-��OiR
��@��>Y�C��B���lُ�~Lx6���5߃zʺ� �������-�?\��k3
��� = ��8��Ŏ��#��`���W�]4_`�Q�ž'�B��5x��k�?�+z?���޼-�:~����d��;O�?��{�}􍰇���8��h�H�TCu%��g���� Vr/����A��������e��Om�k��������������Os��Ӏ��i{]Fh���:��͝�'�=e2R��o������>^��Y!ﾷ��Qe=]�@?��˞|�ի<9C�g��
G��y1E?V�?���gc�r��"�34��^���Bk���0w��!��?�.�`�`��R�,���/P~��m��ȗ�\�����Ke'=�j�g�Q�C� �,?"z �_�?5��������h�d�Y��o�=�8�}"�>�b%���� t\�G�n�?-��f���#������Ջ	�D��=GHϵ��Z_ ���� ؉j�y(|�~oe��̫����'�3=���?��L�ɽ��q�����)�[����cE�-}�����.\���Y4n����ߍ��tE��z	�������@��u
�=$�՞�}��x�� v���[�#@��~��Okw'��̮�|��+x���v�j]D�د������ۖ[�V�wʁ}s�O/�i�!��&f�^���Wy�HBN[���yc��nӾ��}�u�WG�l9���=��B��n5�^Bנ�@;C��:?�d�o��n�s�
]������g��}�9��F�����=i���|귀�>+�Ԁ�$��>���=�{�s�
�l���o���_`wF^��ܭ��g�t>�{�5	y���{�O��5	�#��~޾���6Ou�/R.���a�ߧ�;�{�w*���χ޿R�k1�dVM6������ޅ�w����n��,�����sG�}<��O@~��A�:� C��ϖ�����5\;�W��<!�uG�;[^����E�����+Wh��-���4��~��|�����F�(}��D�a�}��z?����N�Ո�^~�'����_�<��/z��/��鶍��`��^_~(��g����[��j�_1O    ���\(��wj?�*_�h�|g'�����yD���r ?����z�忷���N��~���g�]ζ�^���{�y ��r^�W���>T�����JW���������B� �����F�����u�{�X��k��e�����^;����KG9>��q��ѫ� ��)� 1�o/9a|�x�~祿����ɳb��M{��!���������_�G�K#"�g��������N��y��F�N^\jH�ڹ�'�iN��HNH��R:g��4W6�Q����|�<
t{O��:�����Q��_���x=�^K�z�==�U��Q�ڧ�����)�t>1r0�S,ƒ������|�1�ڂ�g��9��>�۔ۚ✬h�R>WN�'���值�X���q/������?�Ge�<���o:S�A��@~��R��$i�1��N))��L>'�{����{�(�\��>�Sf���+ϣ���GDDDD������ve]�oN�1r� t����t�6��}9���f\��ĝ�C�-�W�0?Q5}c�_���8��B��=�ַ���=�Nl��={5m�z>����;jϸWo�/�/�����W����ם��P}Cv�G��Q���v��=���P�����<;��]�Oף�T|�'���K�0�0�/�'M�q'�|��R����F�G>I�|H�v	�sn�iP�?��N��������޽�=�u>�ܽ�Î>�g�W���{�����ٳ��:�t�{��}�q�?
�st������3�j����ѹ�r��/r>��Q�t���~(�C���Aْ�Ov���v_��Un�3�{J����8��~8�k���8�c�G�s��|Dn½,�eK��� ���_����Z�/�����O
����{
�?���c��Gʇ|W����~g~V������=��w������ ���/��Y�G
�-�3��
r��V �r�_�%rU�z�q,~����X-�!�����Ưn���8���!?A�dǵ�Ǳ������`}tCH��s�R�1��'�?���������"9�=��9�l����cWYy v��g��h�w������������	�5���4Xgqo��^�郟X���!X��Z�\?���֕�0Y��}"R^�/Ln'�過p�;�?�G�&��{�*�/T���c��UĽu�~��.~����Ր��X���=��^u ���{���MhG{��u�(�[�텿zܛ��?8��(�#�}�G�d�H¿���o�A�Ƚ8��{.�GX߳����]��B�q���9x����~�Ҟ��gR��xew��G;������_m����O��� ��F�?�~������,�x6����D���t4�J��E�_7LGO�������h�~s'_{�`�������fw^�l{�+��r�ȧp�������<��g%�	��i:zvx��~9�7�{Wm=p��_�6:������F��~E�!���
����Ï���z ��-��_�	� r:�rh7}O�!�{�v��dM�E})S
^q߲�su�� ��'6�A���������e�}u��{�����}C��� �[z/|�>�O��~�*����ƅ���۲�@�����{����׏�]]ݷ�o��	�.N��F�R���&�'��`�_Y=��Wߩ(������ǳg�S��g�!����W���/|u��_B�����~Y��f/������9H��#�7�����!�K6Hzk�'�puI��� ����5B{�{�!�"���^ioܗ =����/��Cζ�&�Ͳ�I�5ɽ��O�|��|�or�����y3���qf��r� bM���!�/�8���c�@�� �i��0���q�������s2�О�/W�L�v��~��	�CZ����u}п��VE}B��>����������ĳ迢�c=99ܗ�t��|0mڂ�q���y�dʨ>c6��?���lOX�����/�~ù��g�� ��k�:��ο��W	��{g�x���}�����=��z|�Wx>d����3��	�����Z��r��=�����x>�oz��G�|�����s��ރ_����oRN�O��	��=���]����DO�{���|�����'�9�ã?Vt@��O��`�W�z����0!{�keG����^��M/�^G�A�/��B����_>��v��}{_^�>eK�U},��������V����}�H��Ϣ��G	GїO��}�Q����eޘQK�Z�g�?��4[���7X�J����~��a�����1�|���'�����Ɇ�W��u��G��Eo���mV>�����!��Z�C�k���ܥ!6��v��?M�o�{䕞|E�Pب�������ZϢ�����E�p��w���@·��jN�\���������#�=
ݿ�Jߗg�+�n}�. ����\�9�7
��E`ע`陼=�E�PA���e���C߳����/��c?#��>��A�k`��yQ���x4��w��o������>=?Jos��S�����{#�@u㼁��jhs~���tZ0:=@����nv>���C违�bd�_�Vv?�{X���
����u��|лb}�}�����ƭ�Wv�����v@�u�~/�S zmζt��f���}t�A���f6��~v�^����D�����O�ce�'���=I�r��_�ҟ�w�O��	��S��+����<�L�e���'������r��n�`_���������S���7Si=G��.���E���{+�/�}a'v� �����_���y��� ��ph\��������~����}�����h�?�p f��:+_�t��������@�bc����ڟ�{�OX��G���r�]A���mG��<@�C�>�'��X'�/�E�a�l�d�y}�O��s�`���S~�=��kP4H���x�ꋵ�R�.�;p�O[�=eo��%El�z{��{�߆�>x}������)��C�}�?n��l��x�����vY���UۙJ�V�����}��zm��|���_e���q��_�,γ�s�"��1�ڻ~_���<��L�ݎ3�[�������l�Q�/ܓ���Ǔq��*�o��#�����ޯkF��n��/ݘ܌�~�������Q�`OpF/��#���<�8�i^�%?�����aؽ19��^zG�[��)H����߽���������s�=�G�y4���ţ��ܛ�������|zu}"^�G�_�>�Z~��}|z~�����t������l �<&�_�e��e�?��6-�k��O�j�4��ym�����������h?�{��t���P|4�B�����v�W�������������_�P� ��|��sh�<�C��˽��Q�	�㻷�#�Ϥ�х����_�_�����9���|>k�/8-Z���i�{v	r�PJZ0������M�8��G��������3��L�y�����gg�y��"�-�Tz��_���Kt�X(��s����7>b��tO����w� $�w%""""�{�d�ێ������� �؎��������z���j�{����/���W�����\���4&[�p{�T���L���΅N��;w�/�ߞ�����G9��[����^轔m����=���]��cw����_�w��߁ǟ����S�ܗ���~��Owi? �.O�v�3߿5����s��\�:]�	�ެ�����"""""~7����?�>��]��p徟5�e;���S??���_�p��;��o��h$?4㭮?d��DDDD�;���=�|׎�y�G?����� ����@���2���p��ߑs��|k_(u>�ޑ�GDDDD|�E��> ���vz�<D��������0Z~��Cĸ��W�F2�>���?�w��߁g���-Ѝc+����G�5}&g�doзK�tO�    ��]�3\���`�s���~���n�>���;�����������?���%;����/������ ����~o���s�����+h���g��ߙ���?""""�;�*�����+Yr��˭�����C�W��}����?�x�T�m+����DDDD�w�U��qe8M�r���|@~�o��/�^{B����48?��wD��k�F��߿���w�x�Y��s�?�j|�=�-��q����ǫ�]Ż�c��ƫ迆��~�9��K܉�޲?@� ��=B�o�Bu+�'c�P�]=V7��a�pu��T���n�.�w�%�����,���(\�p{�MWߋsv|?�^�Wߓ��]�h=�Ƌ�i�؎ohqn��x��s��GǏ�����^�`?�+�{�ڳ�?��F��z���q�:>��Z9��s�r/��y��pH)���sBa����5lx��X��	�y���D�#�|Eaο���g^�W���C���v{2��}������M׎ό��A�{���&�]E����0�M�(����

.�z��K����O���|�6}P�Vp�/_���S���Om*t��t|��__?o~g�~�,��˹��t�o�����!<�����W�ݎ�	�����Z?���W����5Е4���t\���U�5�;��
Τ'���3MB�Dz3�8��l(l����S�__Rp�
'���l)�tA�C�����(�v�(�kVQ0�QR�]�r�~��0�w��� �����K��ԹA�e��tf��I��o��������Hf�����[���jZ���sk�e��X������P��t����{�k=��!M?
�g�~٧�'Q0�S��!(�t�Ƽ�n��^K��#�v#��U\9B��#rgMav�q�T\�L�L��Ig�`�o)8���c*
N�j����@ʟ��.�#�s���}FRR0�H(|��^��'���1������O98}�ny��M�U�R0qAa]�H�#�D`j�+ztK������o���l<H�����>p��׿�.��V4�ݼX�֛Gź�I���������_�r�����H�%<�_Sx}9���9�0'��?�E����?Q��t�,��?�#]�u[܎�����R0C���Q�G�[�-�8���f`���z`� t������w���f� ff;�;t:D�Y�c����1쌋�%R�<%U���z4��eC�L?��C�0��m�,�oU�~|{;�u몥"����9
&�(8��ݿ��͇�+�3���Y^P01o�����%/!��j����aNac_:����;
����إ�O��Q���R�c�)��R
N���~¸B��幔abN��+�������?Դ6ʏ���	�'��_st�G����@�r*z3�'$e�n�W����*��gL��&'=$=M�/��F����'��`-9?ג~�ޚ:�?1�v�i��ko���k��k7����v�?���N���m?���](ݳ�8L�Yps��V:��~��<��WB����wW��+�/v����/&�=���nz{�o\�8���q��+�=y��/ʩ�������{�^ZO�?�H�#��v�u]W�]K�WcU1�o(=��e5�f^q_W��ꪦ}̮.*ޏ��-�X?�m_m�3�t>5���7��p�|�����������;P�-�v( ��H���_���_E�t|�~������cF�������)�ʮ4��~��J��k�W�B�^+�_��>�C���Q�!D��h��t���?B�C1٫�\o��qK����d�V�*�>Ƨۻ
��7������|��q��c��	�����?��oWx�ӊ�\�3�=��������~P��Ӊ¼�C���^��>�N����#����2XMf���J�������f� �_��W�����>�|�|�Χ���_���bio^�ށ���(���'��_��b�`�g�y?����xۺ�B>��N��RX�9��|�{�k{?����8���y�y�{��#��_�Gf?���T<��^����&�{�3�<���i5�������V��=I/�M�/|`��Ѥ�'?"��G������O?�7�6�[礞�=�:���r<��?k��%���+��q>�xG�w��EK�y�~���m�Ď0X���[�`�?����m��?��7�����>��?F
I�q^����~y�E����S�*�=/��W德������>��tO?��uA�}�<��g��7����|��#~3�y��u���7s��_�����-�8=�'Ǻ����u��	��"����F�5}���O��MՇ�{� lf��Y���Q�,�|�
&=>�7_�C��꼍�?��z�W���D������?��k�)��W����ж/;��7���:�sy�v�����Q����G>hG��'�����"�	����ξv��
����X���[������3��=�����,��s4��n���-h�E�N�ʽ9H~ W�&Ϣ/���Da퇗��\9���-zAOm�i�I蟐�&|��QʽL�oX��˥ǡ_��+�1�_�P:�/� 8���#�=ݱ�q
F�q�����7��W�K���������=����G������P8���[:+z���g���_ �;h������4��|V�'��㉙��+��V���"���vh�U���ϙi{��ѻ��{Nq��i�����#���{�������~�5ٔ�}�e���?R�w;/~~�!C��g�cM���?uN��K|<lt������)�r>���nb�r�o~�<iI�ɳ��z����r�g{l���?���7�����/����r��F����>�)x~�^��P}�m� ��2��y���z\�\��+;��=�C���V�
�y{��v|��&���%�By��I�/��;⽠�/y���-yp��ſ\��eR9��~�8�yt＿��q�G�T0�O�������:���K�c���G�����1��OY�?`�v�-o>Z��������[4�v�,����#�u񭽸Z��~?�P�~h�t��N���.��#��n���]�>�j(�r2!?w���;7���"���ǃܣ�����֫=+^��z�sρ�3���?��'����e��~�j�O��x폮��������o��]��k����/�l�a2��[�Ϸݕ�D�B�e�9k�M�8�=.���k��U���<τ�|f�F�EN�|�ݗ�+�x�o��ڄ¼�X���vDߏ�~m�1����~�w����i_v��H����?�B܃���X�G�P��z^�{�ǧ�#�SI�fU��	տmۖ4^���Q���&�/���G�@^<Iܑ&����0���u�P����F��^�k/�$��_����P�?e����=���u"pn������>:�� �}��y4�ݮh�������e^E�.h��������{eH�O��eF>�qJf*DO�9���E[�{/�mٗR,��:�N����~�}������h߅��v��Oz����g�G�|��^C�A?:>���������9�wū�]���GW�߻̫���_jƚ��@�on2#Q�r}�Q�u�o8���bzR���fCB�����y3o�S��?��nOٛAΌxOt��׈}�b�Oi۶h^�o�����xoh:P�`��&��ٞ3���2�}�v�%љ�3'�Rq���G�{���r�7d��5cW���:�{Ӻ�8�qq)�t�~I���q�9��\����U��Z�����g� ��1���'������e�z�,��x���}ZL��Jև��Fܦ�H�� �<ɐ5|���b�Sd9���EZ�����o�%������=�qd���$|;�(�GDDDD��~>s#q���;���9|���b�[��EV&D��<��s��9�]��#�"����m�癙��B�KO�/v~��o�����|��#""""Bؐqn������U]�N�'"m���.�x�j�˩�i$����볤h۞�� J  ���8K%J��c�U���&��+�E�1�<���y�j���"ݏ����8�!ʋ_�m/{YQ�麼d���g|Z�z,� �z�Y�Gy?""""�
��S7��1�޿o�{�z�M�6�:/��UA�"�N�s6T�]񼤓�����u�=�r��Z�K�ߏ�����xO�&�?��/���L����f��cJg�t�>��s��MR�H�#"""""����G&�s��'&�Y>S>����Ϥ��������������w���;=9������ $����#m���������O�������㯿�U�uV�UZU�%U��Uf✾�����wS�u��ɘtu���ݦ)��~b~���*�'���o����VS]P�晶��Yݚ�{�ũɷ o^���1�����L&�����Jf��Ӽ̓�R�LY)��.M9���=Xv����e7��6.=]Zyv��aW��{���M*wj�7l��}�n�p�sr�n�+��N��Vt�������.c�,��dU��G
�6}�ڑ^.�����4u����]�T��;����x4�ԣ�<��۽EO�c��m�-T�?m��K�=3>ߣ�2r2.o+#��ѓ"])Q.k�)�R�S�?T���CnR��)�͙�{'jP�u߫�G��͆+8%�|{�Zr������;�,5��XyF�Ѹ]���.iQh'�+f&<��v��P8z֎�������Y�Qί�z7���^ʴ������m�/��Ǘyܴ�5�u���?<�ʛ7m��^�"%�ˮWc��&7SG)�^>���:�0���~���J��/[�ac�>�@�߼}�ĝ=}��[��U�u��L���2��P���Ͻ�R9����M�:��.R������S=��ݔ�s�HY~k�R��\�:�yu)��M�_:㼱�U��sd{��Y��%P�DEKT�DEKT�DEKT�DEKT�DEKT�DEKT�DE���nT�DEKT��DEK�G����������������l����wR��C>׍阅!5	�44�0��Y���d�`�%[bCXl�_���l���OI�L���)H�d�[-��s7�Ҡ��1�3f�
]�@������d)/=�w��Q��%7!�;���ԆH+
L�M��K�ƌ�/�	wJM��>���L�p�����a���4���7��ߗ�ti���v��*祇He��.��ɭ�Y��ɴ>��Sħ�)zu�dL���̸YTAS���ͭi�֌M32]:�`fRkެ�w�R˘*���V�E�4�3r/�zab�)g3c��.�T_���"�.��Si]�ex'�C�}ї9嘜OE�� �H�g�Nak�7���u'�k$��6�&�7R�U�fT��w^�#�|>e�ro�T$˨2o�UvvL.�'�����5�x�<�V����>r�d��#n$�{uE�:��%y�|=5SFS��b�6��g(�=��b~<bv�(F�/|l	e��p�ygfƔg�)wՅzt�Q���F���/J^U*VV/�&�ڝs����ޚ��Ϧl$�`����}3��{q��~x2�Xr��X�j���yra����r�Zq�fpMr�!#���^�ep�Q�K�}^�/����k�u"�qos�P/�J���2����'b�טo�����R��� ��ssc�gE�2	�ߜ.�猼<��;F�猓s+��'�)�ǬB���!.����Z��u��D�>�Zst����9��}�\��Z��k�M?��?�����z�̕r�O�Oq�c�y�8�~�Xzgn>����3�ډ��w��3�=��߲��j����ު�ͻ�f�y������ڟ�f���z�{�n��p�T�,��9�ޣ��c��+p��+�{�.�����ϰ�Χ?��ǟ���l(_�      v     x����J1���Sd�E�.�d׶7"(�=�h+��Fћ��@|�Z�X-m_a�FN�XaӞ<M�����ԙb���a�c�_G�m3�s�~R�,0�8��JWe\��i�p��6��P��>�qb_lFp�S�9����7���c�po�� uD}��	iE�l�,�טd�30kYIG5�m�A��M�{&���\�T��`P ��5釭#哈�i��,l_�=������v#}���[Drm҇�<]���N��n���yN�Ot[IeY�~Z��!������      p   �  x���MN�@��ϧ�z�n��'`�	� I�� 90�h�b�O����o4�:
xP�Y Ǌ�ݯ��zm'[��R��ۡ����[��:b}n����
z��bl����g�G(p��G�g���p�ixc�d������e[�c��Y��22�-�c�	_��A�&�:���͊�Өe@�+�q�ɬ��fTd�\~~�k�~��G��L��f�B2O1���s�+Ŭ	�8,Xy�?+hK��k��c�C���ژ�"ԓy�4� �.�Z�4~�1�B5��Op����Y-�[�#鑦��j��.�3�E���q�	���%��w�vQqr�>CWh��{أ�9�o)�r�rv�2F���%�g���l�V�x³�J��"��AZ�]l3��NT�'g��0BUk[�/
T�nW��}��K�v����O�Z� }��ܯ���7���-O.���$�_�,�      d   Q   x����0��0��a��2 �c�@����x:ߝ�w���f^|Y�`0���l�C:O*����-�+E���S��!c1�      t   6   x�3�0��T�/̻0�����I@z.�HnV�3.��2�Ī-F��� i�4x      l   7   x�3༰�/쾰��^��/,�0_��^ oυ��	)1����� �4,      f   �   x�e�KA��5����~qk��;Dbc!��p!���8C����ņYT�������|�?��g���ay��՟]��&n�	n�nA�ޠk�Ƽ�;E�7PZ��AK�@�x#��C=b���n��f�M#n�M,��U��d�&M��;^̄�x�
�'7����!��~�ڸ��7F�дVEh!J	(z�����x���\|^^{_����A�琿�     