export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      produits: {
        Row: {
          id: string
          nom: string
          description: string
          prix: number
          prix_promo: number | null
          categorie: string
          images: string[]
          stock: number
          en_vedette: boolean
          actif: boolean
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['produits']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['produits']['Insert']>
      }
      realisations: {
        Row: {
          id: string
          titre: string
          description: string
          lieu: string
          type_projet: string
          images: string[]
          date_realisation: string
          slug: string
          en_vedette: boolean
          actif: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['realisations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['realisations']['Insert']>
      }
      articles: {
        Row: {
          id: string
          titre: string
          contenu: string
          extrait: string
          image_couverture: string | null
          slug: string
          tags: string[]
          publie: boolean
          genere_par_ia: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['articles']['Insert']>
      }
      commandes: {
        Row: {
          id: string
          nom_client: string
          email_client: string
          telephone_client: string
          ville: string
          produits: Json
          total: number
          statut: string
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['commandes']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['commandes']['Insert']>
      }
      messages_contact: {
        Row: {
          id: string
          nom: string
          email: string
          telephone: string | null
          sujet: string
          message: string
          lu: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['messages_contact']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['messages_contact']['Insert']>
      }
    }
  }
}

export type Produit = Database['public']['Tables']['produits']['Row']
export type Realisation = Database['public']['Tables']['realisations']['Row']
export type Article = Database['public']['Tables']['articles']['Row']
export type Commande = Database['public']['Tables']['commandes']['Row']
export type MessageContact = Database['public']['Tables']['messages_contact']['Row']
