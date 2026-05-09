<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { useContactsStore } from '@/stores/contacts'

const router = useRouter()
const route = useRoute()
const store = useProjectsStore()
const contactsStore = useContactsStore()

const project = computed(() => store.getById(route.params.id as string))
const clients = computed(() => contactsStore.contacts.filter((c) => c.role === 'client'))

const form = ref({
  title: '',
  clientId: '',
  description: '',
  deliverables: [''],
  timeline: '',
  terms: '',
})

function addDeliverable() { form.value.deliverables.push('') }
function removeDeliverable(i: number) { form.value.deliverables.splice(i, 1) }

function generate() {
  if (!project.value) return
  form.value.title = `Brief — ${project.value.title}`
  form.value.description = project.value.concept || ''
  form.value.deliverables = ['File RAW selezionati e ritoccati', 'Consegna digitale via WeTransfer', 'Licenza d\'uso concordata']
  form.value.timeline = 'Da definire con il cliente'
  form.value.terms = '50% all\'accettazione, 50% alla consegna. Tutte le immagini restano di proprietà del fotografo fino al saldo completo.'
  alert('Brief generato con dati del progetto. Con OpenAI configurata verrà generato con AI.')
}
</script>

<template>
  <div v-if="!project">
    <div class="card empty-state">
      <div class="empty-state-icon">❓</div>
      <div class="empty-state-title">Progetto non trovato</div>
      <button class="btn btn-primary" style="margin-top:12px" @click="router.push('/projects')">← Torna ai progetti</button>
    </div>
  </div>
  <div v-else style="max-width:720px">
    <div class="page-header" style="display:flex; justify-content:space-between; align-items:center">
      <div>
        <button class="back-link" @click="router.push(`/projects/${project.id}`)">← {{ project.title }}</button>
        <h1 class="page-title">Brief & Offerta</h1>
      </div>
      <button class="btn btn-secondary" @click="generate">🤖 Genera da progetto</button>
    </div>

    <div class="card">
      <div class="form-group">
        <label class="form-label">Titolo brief</label>
        <input v-model="form.title" class="form-input" :placeholder="`Brief — ${project.title}`" />
      </div>

      <div class="form-group">
        <label class="form-label">Cliente</label>
        <select v-model="form.clientId" class="form-select">
          <option value="">— Seleziona cliente —</option>
          <option v-for="c in clients" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Descrizione progetto</label>
        <textarea v-model="form.description" class="form-textarea" placeholder="Descrizione del servizio fotografico..." />
      </div>

      <div class="form-group">
        <label class="form-label">Deliverable</label>
        <div v-for="(d, i) in form.deliverables" :key="i" style="display:flex; gap:8px; margin-bottom:8px">
          <input v-model="form.deliverables[i]" class="form-input" placeholder="Es. 20 foto ritoccate in alta risoluzione" />
          <button class="btn btn-danger" @click="removeDeliverable(i)">×</button>
        </div>
        <button class="btn btn-secondary" @click="addDeliverable">+ Aggiungi</button>
      </div>

      <div class="form-group">
        <label class="form-label">Timeline</label>
        <input v-model="form.timeline" class="form-input" placeholder="Es. Shooting: 15 giu, Consegna: 30 giu" />
      </div>

      <div class="form-group">
        <label class="form-label">Condizioni e termini</label>
        <textarea v-model="form.terms" class="form-textarea" placeholder="Condizioni di pagamento, licenze, ecc." />
      </div>

      <div style="display:flex; gap:12px; margin-top:8px">
        <button class="btn btn-primary">💾 Salva bozza</button>
        <button class="btn btn-secondary" disabled>📄 Esporta PDF (coming soon)</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-link { background: none; border: none; color: #6b7280; cursor: pointer; font-size: 0.85rem; margin-bottom: 6px; padding: 0; display: block; }
.back-link:hover { color: #1a1a2e; }
</style>
