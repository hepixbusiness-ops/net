-- =============================================
-- NEW ENERGY TECHNOLOGY SARL — Schéma Supabase
-- =============================================

-- Extension UUID
create extension if not exists "uuid-ossp";

-- PRODUITS
create table if not exists produits (
  id uuid primary key default uuid_generate_v4(),
  nom text not null,
  description text not null,
  prix numeric(10,2) not null,
  prix_promo numeric(10,2),
  categorie text not null,
  images text[] not null default '{}',
  stock integer not null default 0,
  en_vedette boolean not null default false,
  actif boolean not null default true,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RÉALISATIONS
create table if not exists realisations (
  id uuid primary key default uuid_generate_v4(),
  titre text not null,
  description text not null,
  lieu text not null,
  type_projet text not null,
  images text[] not null default '{}',
  date_realisation date not null,
  slug text not null unique,
  en_vedette boolean not null default false,
  actif boolean not null default true,
  created_at timestamptz not null default now()
);

-- ARTICLES BLOG
create table if not exists articles (
  id uuid primary key default uuid_generate_v4(),
  titre text not null,
  contenu text not null,
  extrait text not null,
  image_couverture text,
  slug text not null unique,
  tags text[] not null default '{}',
  publie boolean not null default false,
  genere_par_ia boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- COMMANDES
create table if not exists commandes (
  id uuid primary key default uuid_generate_v4(),
  nom_client text not null,
  email_client text not null,
  telephone_client text not null,
  ville text not null,
  produits jsonb not null,
  total numeric(10,2) not null,
  statut text not null default 'en_attente',
  notes text,
  created_at timestamptz not null default now()
);

-- MESSAGES CONTACT
create table if not exists messages_contact (
  id uuid primary key default uuid_generate_v4(),
  nom text not null,
  email text not null,
  telephone text,
  sujet text not null,
  message text not null,
  lu boolean not null default false,
  created_at timestamptz not null default now()
);

-- TRIGGERS updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_produits_updated_at
  before update on produits
  for each row execute function update_updated_at();

create trigger trg_articles_updated_at
  before update on articles
  for each row execute function update_updated_at();

-- CATÉGORIES disponibles (contrainte check)
alter table produits add constraint categorie_valide
  check (categorie in (
    'lampadaires',
    'panneaux_solaires',
    'batteries',
    'onduleurs',
    'pompes_solaires',
    'accessoires',
    'kits_solaires'
  ));

alter table realisations add constraint type_projet_valide
  check (type_projet in (
    'installation_solaire',
    'pompage_solaire',
    'eclairage_solaire',
    'systeme_hybride'
  ));

alter table commandes add constraint statut_valide
  check (statut in (
    'en_attente',
    'confirmee',
    'en_cours',
    'livree',
    'annulee'
  ));

-- RLS (Row Level Security) — lecture publique
alter table produits enable row level security;
alter table realisations enable row level security;
alter table articles enable row level security;
alter table commandes enable row level security;
alter table messages_contact enable row level security;

-- Policies lecture publique
create policy "produits_public_read" on produits for select using (actif = true);
create policy "realisations_public_read" on realisations for select using (actif = true);
create policy "articles_public_read" on articles for select using (publie = true);

-- Policies écriture publique (contact + commandes)
create policy "commandes_public_insert" on commandes for insert with check (true);
create policy "contact_public_insert" on messages_contact for insert with check (true);

-- Storage bucket pour les images
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict do nothing;

create policy "media_public_read" on storage.objects
  for select using (bucket_id = 'media');

create policy "media_authenticated_upload" on storage.objects
  for insert with check (bucket_id = 'media');
