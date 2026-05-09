<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import type { Project, ProjectGenre, ProjectStatus } from '@/types'

const router = useRouter()
const route = useRoute()
const store = useProjectsStore()

const isEdit = computed(() => !!route.params.id)
const title = computed(() => isEdit.value ? 'Modifica progetto' : 'Nuovo progetto')

const form = ref({
  title: '',
  genre: 'documentary' as ProjectGenre,
  status: 'draft' as ProjectStatus,
  concept: '',
  statement: '',
  intent: '',
  references: '',
  tags: [] as string[],
})

const tagInput = ref('')

const genres: { value: ProjectGenre; label: string }[] = [
  { value: 'documentary', label: 'Documentario' },
  { value: 'fine_art', label: 'Fine Art' },
  { value: 'commercial', label: 'Commerciale' },
  { value: 'portrait', label: 'Ritratto' },
  { value: 'landscape', label: 'Paesaggio' },
  { value: 'street', label: 'Street' },
  { value: 'editorial', label: 'Editoriale' },
  { value: 'other', label: 'Altro' },
]

const statuses: { value: ProjectStatus; label: string }[] = [
  { value: 'draft', label: 'Bozza' },
  { value: 'in_progress', label: 'In corso' },
  { value: 'completed', label: 'Completato' },
  { value: 'archived', label: 'Archiviato' },
]

onMounted(() => {
  if (isEdit.value) {
    const project = store.getById(route.params.id as string)
    if (project) Object.assign(form.value, project)
  }
})

function addTag() {
  const t = tagInput.value.trim().toLowerCase()
  if (t && !form.value.tags.includes(t)) form.value.tags.push(t)
  tagInput.value = ''
}

function removeTag(tag: string) {
  form.value.tags = form.value.tags.filter((t) => t !== tag)
}

function save() {
  if (!form.value.title.trim()) return alert('Il titolo è obbligatorio')
  if (isEdit.value) {
    store.update(route.params.id as string, form.value)
    router.push(`/projects/${route.params.id}`)
  } else {
    const p = store.add(form.value)
    router.push(`/projects/${p.id}`)
  }
}
</script>

<template>
  <div style="max-width: 720px">
    <div class="page-header" style="display:flex; justify-content:space-between; align-items:center">
      <h1 class="page-title">{{ title }}</h1>
      <button class="btn btn-secondary" @click="router.back()">← Indietro</button>
    </div>

    <div class="card">
      <div class="form-group">
        <label class="form-label">Titolo *</label>
        <input v-model="form.title" class="form-input" placeholder="Es. Periferie Invisibili" />
      </div>

      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Genere fotografico</label>
          <select v-model="form.genre" class="form-select">
            <option v-for="g in genres" :key="g.value" :value="g.value">{{ g.label }}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Stato</label>
          <select v-model="form.status" class="form-select">
            <option v-for="s in statuses" :key="s.value" :value="s.value">{{ s.label }}</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Concept</label>
        <textarea v-model="form.concept" class="form-textarea" placeholder="Descrivi l'idea centrale del progetto..." />
      </div>

      <div class="form-group">
        <label class="form-label">Statement artistico</label>
        <textarea v-model="form.statement" class="form-textarea" placeholder="Dichiara l'intenzione artistica del progetto..." />
      </div>

      <div class="form-group">
        <label class="form-label">Intento / Obiettivo</label>
        <textarea v-model="form.intent" class="form-textarea" style="min-height:80px" placeholder="Cosa vuoi comunicare con questo progetto?" />
      </div>

      <div class="form-group">
        <label class="form-label">Riferimenti (artisti, libri, film…)</label>
        <textarea v-model="form.references" class="form-textarea" style="min-height:80px" placeholder="Es. Sebastião Salgado, Robert Frank, cinema di Tarr…" />
      </div>

      <div class="form-group">
        <label class="form-label">Tag</label>
        <div style="display:flex; gap:8px; margin-bottom:8px">
          <input v-model="tagInput" class="form-input" placeholder="Aggiungi tag…" @keydown.enter.prevent="addTag" />
          <button class="btn btn-secondary" @click="addTag">+</button>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px">
          <span v-for="tag in form.tags" :key="tag" class="tag-pill">
            {{ tag }} <button @click="removeTag(tag)">×</button>
          </span>
        </div>
      </div>

      <div style="display:flex; gap:12px; margin-top:8px">
        <button class="btn btn-primary" @click="save">{{ isEdit ? 'Salva modifiche' : 'Crea progetto' }}</button>
        <button class="btn btn-secondary" @click="router.back()">Annulla</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-pill {
  display: inline-flex; align-items: center; gap: 4px;
  background: #e0e7ff; color: #3730a3;
  padding: 3px 10px; border-radius: 20px; font-size: 0.8rem;
}
.tag-pill button { background: none; border: none; cursor: pointer; font-size: 1rem; line-height: 1; color: #3730a3; }
</style>
