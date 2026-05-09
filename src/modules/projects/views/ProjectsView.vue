<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import type { ProjectStatus } from '@/types'

const router = useRouter()
const store = useProjectsStore()

const filter = ref<ProjectStatus | 'all'>('all')

const filtered = computed(() =>
  filter.value === 'all' ? store.projects : store.byStatus(filter.value),
)

const statuses: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'draft', label: 'Bozza' },
  { value: 'in_progress', label: 'In corso' },
  { value: 'completed', label: 'Completati' },
  { value: 'archived', label: 'Archiviati' },
]

function remove(id: string) {
  if (confirm('Eliminare questo progetto?')) store.remove(id)
}
</script>

<template>
  <div>
    <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-start">
      <div>
        <h1 class="page-title">Progetti</h1>
        <p class="page-subtitle">{{ store.projects.length }} progetti totali</p>
      </div>
      <button class="btn btn-primary" @click="router.push('/projects/new')">+ Nuovo progetto</button>
    </div>

    <div class="filter-bar">
      <button
        v-for="s in statuses"
        :key="s.value"
        class="filter-btn"
        :class="{ active: filter === s.value }"
        @click="filter = s.value"
      >
        {{ s.label }}
      </button>
    </div>

    <div v-if="filtered.length === 0" class="card empty-state">
      <div class="empty-state-icon">📁</div>
      <div class="empty-state-title">Nessun progetto</div>
      <button class="btn btn-primary" style="margin-top:12px" @click="router.push('/projects/new')">Crea il primo progetto</button>
    </div>

    <div v-else class="projects-grid">
      <div v-for="p in filtered" :key="p.id" class="card project-card">
        <div class="project-card-header">
          <span :class="`badge badge-${p.status}`">{{ p.status }}</span>
          <span class="genre-tag">{{ p.genre }}</span>
        </div>
        <h3 class="project-card-title" @click="router.push(`/projects/${p.id}`)">{{ p.title }}</h3>
        <p class="project-card-concept">{{ p.concept || 'Nessun concept ancora.' }}</p>
        <div class="project-card-tags">
          <span v-for="tag in p.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <div class="project-card-actions">
          <button class="btn btn-secondary" @click="router.push(`/projects/${p.id}`)">Apri</button>
          <button class="btn btn-secondary" @click="router.push(`/projects/${p.id}/edit`)">Modifica</button>
          <button class="btn btn-danger" @click="remove(p.id)">Elimina</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-bar { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.filter-btn {
  padding: 6px 14px; border-radius: 20px; border: 1px solid #e5e7eb;
  background: #fff; cursor: pointer; font-size: 0.85rem; transition: all 0.15s;
}
.filter-btn.active { background: #1a1a2e; color: #fff; border-color: #1a1a2e; }

.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }

.project-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.genre-tag { font-size: 0.75rem; color: #9ca3af; text-transform: capitalize; }
.project-card-title { font-size: 1.1rem; font-weight: 700; cursor: pointer; margin-bottom: 8px; }
.project-card-title:hover { color: #4f46e5; }
.project-card-concept { font-size: 0.85rem; color: #6b7280; line-height: 1.5; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.project-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.tag { background: #f3f4f6; color: #374151; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; }
.project-card-actions { display: flex; gap: 8px; }
</style>
