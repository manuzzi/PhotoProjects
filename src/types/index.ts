// ─── Project ──────────────────────────────────────────────────────────────────

export type ProjectStatus = 'draft' | 'in_progress' | 'completed' | 'archived'
export type ProjectGenre =
  | 'documentary'
  | 'fine_art'
  | 'commercial'
  | 'portrait'
  | 'landscape'
  | 'street'
  | 'editorial'
  | 'other'

export interface Project {
  id: string
  title: string
  genre: ProjectGenre
  status: ProjectStatus
  concept: string
  statement: string
  intent: string
  references: string
  tags: string[]
  created_at: string
  updated_at: string
  user_id: string
}

// ─── Moodboard ────────────────────────────────────────────────────────────────

export interface MoodboardImage {
  id: string
  project_id: string
  url: string
  note: string
  source: 'upload' | 'pinterest'
  pinterest_pin_id?: string
  order: number
  created_at: string
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export type ContactRole = 'client' | 'supplier' | 'assistant' | 'model' | 'agency'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  role: ContactRole
  notes: string
  social_instagram?: string
  social_linkedin?: string
  social_pinterest?: string
  social_tiktok?: string
  website?: string
  user_id: string
  created_at: string
  updated_at: string
}

// ─── Budget ───────────────────────────────────────────────────────────────────

export type BudgetCategory =
  | 'equipment'
  | 'location'
  | 'models'
  | 'post_production'
  | 'travel'
  | 'accommodation'
  | 'printing'
  | 'marketing'
  | 'other'

export interface BudgetItem {
  id: string
  project_id: string
  category: BudgetCategory
  description: string
  quantity: number
  unit_cost: number
  total: number
  notes: string
}

export interface Budget {
  id: string
  project_id: string
  items: BudgetItem[]
  subtotal: number
  margin_percent: number
  total: number
  currency: string
  created_at: string
  updated_at: string
}

// ─── Brief / Offer ────────────────────────────────────────────────────────────

export type BriefStatus = 'draft' | 'sent' | 'accepted' | 'rejected'

export interface Brief {
  id: string
  project_id: string
  client_id: string
  title: string
  description: string
  deliverables: string[]
  timeline: string
  terms: string
  status: BriefStatus
  budget_id?: string
  created_at: string
  updated_at: string
}
