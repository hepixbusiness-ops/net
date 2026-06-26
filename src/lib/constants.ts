export const SITE = {
  name: 'New Energy Technology SARL',
  shortName: 'NET Solaire',
  domain: 'newenergytechnology.sarl',
  url: 'https://newenergytechnology.sarl',
  email: 'contact@newenergytechnology.sarl',
  phone: '+237 691 287 852',
  phones: ['+237 691 287 852', '+237 677 659 959', '+237 678 067 592', '+237 693 396 362'],
  whatsapp: '+237691287852',
  adresse: 'Yaoundé, Cameroun',
  description: 'Spécialiste en installations solaires, pompage solaire et équipements solaires au Cameroun.',
  slogan: 'L\'énergie du soleil, au service de votre avenir',
  reseaux: {
    facebook: 'https://facebook.com/newenergytech',
    instagram: 'https://instagram.com/newenergytech',
    linkedin: 'https://linkedin.com/company/newenergytech',
  },
}

export const CATEGORIES_PRODUITS = [
  { id: 'panneaux_solaires', label: 'Panneaux Solaires' },
  { id: 'pompes_solaires', label: 'Pompes Solaires' },
  { id: 'lampadaires', label: 'Lampadaires Solaires' },
  { id: 'batteries', label: 'Batteries' },
  { id: 'onduleurs', label: 'Onduleurs' },
  { id: 'kits_solaires', label: 'Kits Solaires' },
  { id: 'accessoires', label: 'Accessoires' },
]

export const SOUS_CATEGORIES_ACCESSOIRES = [
  { id: 'disjoncteurs_ac', label: 'Disjoncteurs AC' },
  { id: 'disjoncteurs_dc', label: 'Disjoncteurs DC' },
  { id: 'parafoudres_ac', label: 'Parafoudres AC' },
  { id: 'parafoudres_dc', label: 'Parafoudres DC' },
  { id: 'rails_din', label: 'Rails DIN' },
  { id: 'coffrets_electriques', label: 'Coffrets électriques' },
  { id: 'accessoires_panneaux', label: 'Accessoires panneaux solaires' },
  { id: 'connecteurs_mc4', label: 'Connecteurs MC4' },
  { id: 'cables_solaires', label: 'Câbles solaires' },
  { id: 'fusibles_dc', label: 'Fusibles DC' },
  { id: 'porte_fusibles', label: 'Porte-fusibles' },
  { id: 'inverseurs_source', label: 'Inverseurs de source' },
  { id: 'borniers', label: 'Borniers' },
  { id: 'gaines_electriques', label: 'Gaines électriques' },
  { id: 'serre_cables', label: 'Serre-câbles' },
  { id: 'colliers_fixation', label: 'Colliers de fixation' },
  { id: 'supports_fixation', label: 'Supports de fixation' },
  { id: 'boites_derivation', label: 'Boîtes de dérivation' },
  { id: 'interrupteurs', label: 'Interrupteurs' },
  { id: 'prises_electriques', label: 'Prises électriques' },
  { id: 'autres_accessoires', label: 'Autres accessoires' },
]

export const TYPES_PROJET = [
  { id: 'installation_solaire', label: 'Installation Solaire' },
  { id: 'pompage_solaire', label: 'Pompage Solaire' },
  { id: 'eclairage_solaire', label: 'Éclairage Solaire' },
  { id: 'systeme_hybride', label: 'Système Hybride' },
]

export const COULEURS = {
  primary: '#B83232',
  secondary: '#1E3A5F',
  accent: '#F59E0B',
  light: '#FDE8E8',
  dark: '#1A1A1A',
}

const SUPABASE_STORAGE = 'https://wnixiooqtqxmrdpxglgo.supabase.co/storage/v1/object/public/media/image'

export const IMAGES = {
  logo: `${SUPABASE_STORAGE}/logo-net.jpeg`,
  heroPanneaux: `${SUPABASE_STORAGE}/panneaux.jpeg`,
  heroPompage: `${SUPABASE_STORAGE}/pompage.webp`,
  heroLampadaire: `${SUPABASE_STORAGE}/lampadaire%20Solaire.jpeg`,
  heroMaintenance: `${SUPABASE_STORAGE}/Maintenance%20%26%20SAV.jpg`,
}
