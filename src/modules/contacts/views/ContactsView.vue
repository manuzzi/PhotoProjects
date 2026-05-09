<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContactsStore } from '@/stores/contacts'
import type { ContactRole } from '@/types'

const router = useRouter()
const store = useContactsStore()

const search = ref('')
const roleFilter = ref<ContactRole | 'all'>('all')

const roles: { value: ContactRole | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'client', label: 'Clienti' },
  { value: 'model', label: 'Modelli/e' },
  { value: 'assistant', label: 'Assistenti' },
  { value: 'supplier', label: 'Fornitori' },
  { value: 'agency', label: 'Agenzie' },
]

import { computed } from 'vue'
const filtered = computed(() =>
  store.contacts.filter((c) => {
    const matchRole = roleFilter.value === 'all' || c.role === roleFilter.value
    const matchSearch = !search.value || c.name.toLowerCase().includes(search.value.toLowerCase()) || c.email.toLowerCase().includes(search.value.toLowerCase())
    return matchRole && matchSearch
  }),
)

const showForm = ref(false)
const form = ref({ name: '', email: '', phone: '', role: 'client' as ContactRole, notes: '', social_instagram: '', social_linkedin: '', social_pinterest: '', social_tiktok: '', website: '' })

function save() {
  if (!form.value.name.trim()) return alert('Il nome è obbligatorio')
  store.add(form.value)
  showForm.value = false
  form.value = { name: '', email: '', phone: '', role: 'client', notes: '', social_instagram: '', social_linkedin: '', social_pinterest: '', social_tiktok: '', website: '' }
}

function remove(id: string) {
  if (confirm('Eliminare questo contatto?')) store.remove(id)
}
</script>

<template>
  <div>
    <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-start">
      <div>
        <h1 class="page-title">Contatti</h1>
        <p class="page-subtitle">{{ store.contacts.length }} contatti</p>
      </div>
      <button class="btn btn-primary" @click="showForm = !showForm">+ Nuovo contatto</button>
    </div>

    <div v-if="showForm" class="card" style="margin-bottom:20px; max-width:640px">
      <h3 style="font-weight:700; margin-bottom:16px">Nuovo contatto</h3>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Nome *</label>
          <input v-model="form.name" class="form-input" placeholder="Nome e cognome" />
        </div>
        <div class="form-group">
          <label class="form-label">Ruolo</label>
          <select v-model="form.role" class="form-select">
            <option v-for="r in roles.slice(1)" :key="r.value" :value="r.value">{{ r.label }}</option>
          </select>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input v-model="form.email" class="form-input" type="email" />
        </div>
        <div class="form-group">
          <label class="form-label">Telefono</label>
          <input v-model="form.phone" class="form-input" />
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Instagram</label>
          <input v-model="form.social_instagram" class="form-input" placeholder="https://instagram.com/…" />
        </div>
        <div class="form-group">
          <label class="form-label">LinkedIn</label>
          <input v-model="form.social_linkedin" class="form-input" placeholder="https://linkedin.com/in/…" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Sito web</label>
        <input v-model="form.website" class="form-input" placeholder="https://…" />
      </div>
      <div style="display:flex; gap:8px">
        <button class="btn btn-primary" @click="save">Salva</button>
        <button class="btn btn-secondary" @click="showForm = false">Annulla</button>
      </div>
    </div>

    <div class="toolbar">
      <input v-model="search" class="form-input" style="max-width:280px" placeholder="🔍 Cerca…" />
      <div class="filter-bar" style="margin-bottom:0">
        <button v-for="r in roles" :key="r.value" class="filter-btn" :class="{ active: roleFilter === r.value }" @click="roleFilter = r.value">{{ r.label }}</button>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="card empty-state" style="margin-top:16px">
      <div class="empty-state-icon">👥</div>
      <div class="empty-state-title">Nessun contatto trovato</div>
    </div>

    <div v-else class="contacts-grid">
      <div v-for="c in filtered" :key="c.id" class="card contact-card">
        <div class="contact-header">
          <div class="contact-avatar">{{ c.name.charAt(0).toUpperCase() }}</div>
          <div>
            <div class="contact-name" @click="router.push(`/contacts/${c.id}`)">{{ c.name }}</div>
            <span :class="`badge badge-${c.role}`">{{ c.role }}</span>
          </div>
          <button class="btn btn-danger" style="margin-left:auto; padding:4px 8px" @click="remove(c.id)">×</button>
        </div>
        <div v-if="c.email" class="contact-info">✉️ {{ c.email }}</div>
        <div v-if="c.phone" class="contact-info">📞 {{ c.phone }}</div>
        <div class="social-links">
          <a v-if="c.social_instagram" :href="c.social_instagram" target="_blank" class="social-link">IG</a>
          <a v-if="c.social_linkedin" :href="c.social_linkedin" target="_blank" class="social-link">LI</a>
          <a v-if="c.website" :href="c.website" target="_blank" class="social-link">🌐</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbar { display: flex; gap: 16px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn { padding: 6px 14px; border-radius: 20px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer; font-size: 0.85rem; transition: all 0.15s; }
.filter-btn.active { background: #1a1a2e; color: #fff; border-color: #1a1a2e; }

.contacts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-top: 8px; }
.contact-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.contact-avatar { width: 40px; height: 40px; border-radius: 50%; background: #1a1a2e; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem; flex-shrink: 0; }
.contact-name { font-weight: 700; cursor: pointer; margin-bottom: 4px; }
.contact-name:hover { color: #4f46e5; }
.contact-info { font-size: 0.82rem; color: #6b7280; margin-bottom: 4px; }
.social-links { display: flex; gap: 6px; margin-top: 8px; }
.social-link { background: #f3f4f6; color: #374151; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-decoration: none; }
.social-link:hover { background: #e5e7eb; }
</style>
