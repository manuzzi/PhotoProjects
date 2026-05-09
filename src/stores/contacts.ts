import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Contact } from '@/types'

const STORAGE_KEY = 'pp_contacts'

function load(): Contact[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function save(items: Contact[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>(load())

  function getById(id: string) {
    return contacts.value.find((c) => c.id === id)
  }

  function add(data: Omit<Contact, 'id' | 'created_at' | 'updated_at' | 'user_id'>) {
    const now = new Date().toISOString()
    const contact: Contact = {
      ...data,
      id: crypto.randomUUID(),
      user_id: 'local',
      created_at: now,
      updated_at: now,
    }
    contacts.value.unshift(contact)
    save(contacts.value)
    return contact
  }

  function update(id: string, data: Partial<Contact>) {
    const idx = contacts.value.findIndex((c) => c.id === id)
    if (idx === -1) return
    contacts.value[idx] = { ...contacts.value[idx], ...data, updated_at: new Date().toISOString() } as Contact
    save(contacts.value)
  }

  function remove(id: string) {
    contacts.value = contacts.value.filter((c) => c.id !== id)
    save(contacts.value)
  }

  // Seed demo data if empty
  if (contacts.value.length === 0) {
    add({ name: 'Sofia Bianchi', email: 'sofia@example.com', phone: '+39 333 1234567', role: 'model', notes: '', social_instagram: 'https://instagram.com/sofia.b', social_linkedin: '', social_pinterest: '', social_tiktok: '', website: '' })
    add({ name: 'Luca Ferretti', email: 'luca@studio-ferretti.it', phone: '+39 02 9876543', role: 'client', notes: 'Direttore creativo', social_instagram: '', social_linkedin: 'https://linkedin.com/in/lucaferretti', social_pinterest: '', social_tiktok: '', website: 'https://studio-ferretti.it' })
    add({ name: 'Marco Assistente', email: 'marco.a@email.com', phone: '+39 347 9876543', role: 'assistant', notes: '', social_instagram: 'https://instagram.com/marco.photo', social_linkedin: '', social_pinterest: '', social_tiktok: '', website: '' })
  }

  return { contacts, getById, add, update, remove }
})
