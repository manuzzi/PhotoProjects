<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { useContactsStore } from '@/stores/contacts'

const router = useRouter()
const projectsStore = useProjectsStore()
const contactsStore = useContactsStore()

const stats = computed(() => ({
  total: projectsStore.projects.length,
  inProgress: projectsStore.byStatus('in_progress').length,
  draft: projectsStore.byStatus('draft').length,
  completed: projectsStore.byStatus('completed').length,
}))

const recent = computed(() => projectsStore.projects.slice(0, 3))
</script>

<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Benvenuto in PhotoProjects</p>
    </div>

    <div class="grid-3" style="margin-bottom: 28px">
      <div class="card stat-card">
        <div class="stat-value">{{ stats.total }}</div>
        <div class="stat-label">Progetti totali</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" style="color:#1d4ed8">{{ stats.inProgress }}</div>
        <div class="stat-label">In corso</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" style="color:#16a34a">{{ stats.completed }}</div>
        <div class="stat-label">Completati</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="section-header">
          <h2 class="section-title">Ultimi progetti</h2>
          <button class="btn btn-secondary" @click="router.push('/projects')">Tutti →</button>
        </div>
        <div v-if="recent.length === 0" class="empty-state">
          <div class="empty-state-icon">📁</div>
          <div class="empty-state-title">Nessun progetto</div>
        </div>
        <div v-else class="project-list">
          <div
            v-for="p in recent"
            :key="p.id"
            class="project-row"
            @click="router.push(`/projects/${p.id}`)"
          >
            <div>
              <div class="project-row-title">{{ p.title }}</div>
              <div class="project-row-genre">{{ p.genre }}</div>
            </div>
            <span :class="`badge badge-${p.status}`">{{ p.status }}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="section-header">
          <h2 class="section-title">Contatti recenti</h2>
          <button class="btn btn-secondary" @click="router.push('/contacts')">Tutti →</button>
        </div>
        <div class="project-list">
          <div
            v-for="c in contactsStore.contacts.slice(0, 3)"
            :key="c.id"
            class="project-row"
            @click="router.push(`/contacts/${c.id}`)"
          >
            <div>
              <div class="project-row-title">{{ c.name }}</div>
              <div class="project-row-genre">{{ c.email }}</div>
            </div>
            <span :class="`badge badge-${c.role}`">{{ c.role }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top: 24px">
      <div class="section-header">
        <h2 class="section-title">Azioni rapide</h2>
      </div>
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:12px">
        <button class="btn btn-primary" @click="router.push('/projects/new')">+ Nuovo progetto</button>
        <button class="btn btn-secondary" @click="router.push('/contacts')">+ Aggiungi contatto</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card { text-align: center; }
.stat-value { font-size: 2.5rem; font-weight: 800; line-height: 1; margin-bottom: 6px; }
.stat-label { font-size: 0.85rem; color: #6b7280; }

.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.section-title { font-size: 1rem; font-weight: 700; }

.project-list { display: flex; flex-direction: column; gap: 8px; }
.project-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px; border-radius: 8px; cursor: pointer;
  transition: background 0.15s;
}
.project-row:hover { background: #f9fafb; }
.project-row-title { font-weight: 600; font-size: 0.9rem; }
.project-row-genre { font-size: 0.8rem; color: #9ca3af; text-transform: capitalize; margin-top: 2px; }
</style>
