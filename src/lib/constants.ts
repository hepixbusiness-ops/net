export const SITE = {
  name: 'New Energy Technology SARL',
  shortName: 'NET Solaire',
  domain: 'newenergytechnology.sarl',
  url: 'https://newenergytechnology.sarl',
  email: 'contact@newenergytechnology.sarl',
  phone: '+237 691 287 852',
  phones: ['+237 691 287 852', '+237 677 659 959', '+237 678 067 592'],
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
  { id: 'lampadaires', label: 'Lampadaires Solaires' },
  { id: 'panneaux_solaires', label: 'Panneaux Solaires' },
  { id: 'batteries', label: 'Batteries' },
  { id: 'onduleurs', label: 'Onduleurs' },
  { id: 'pompes_solaires', label: 'Pompes Solaires' },
  { id: 'kits_solaires', label: 'Kits Solaires' },
  { id: 'accessoires', label: 'Accessoires' },
]

export const TYPES_PROJET = [
  { id: 'installation_solaire', label: 'Installation Solaire' },
  { id: 'pompage_solaire', label: 'Pompage Solaire' },
  { id: 'eclairage_solaire', label: 'Éclairage Solaire' },
  { id: 'systeme_hybride', label: 'Système Hybride' },
]

export const COULEURS = {
  primary: '#B83232',    // Rouge brique logo NET
  secondary: '#1E3A5F',  // Bleu marine professionnel
  accent: '#F59E0B',     // Jaune solaire (accents)
  light: '#FDE8E8',      // Rouge clair
  dark: '#1A1A1A',       // Texte sombre
}

const SUPABASE_STORAGE = 'https://wnixiooqtqxmrdpxglgo.supabase.co/storage/v1/object/public/media/image'

export const IMAGES = {
  logo: `${SUPABASE_STORAGE}/logo-net.jpeg`,
  heroPanneaux: `${SUPABASE_STORAGE}/panneaux.jpeg`,
  heroPompage: `${SUPABASE_STORAGE}/pompage.webp`,
  heroLampadaire: `${SUPABASE_STORAGE}/lampadaire%20Solaire.jpeg`,
  heroMaintenance: `${SUPABASE_STORAGE}/Maintenance%20%26%20SAV.jpg`,
}
