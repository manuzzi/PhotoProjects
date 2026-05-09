<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

const router = useRouter()
const route = useRoute()
const store = useProjectsStore()

const project = computed(() => store.getById(route.params.id as string))

const tabs = [
  { label: '✏️ Moodboard', to: 'moodboard' },
  { label: '📋 Brief', to: 'brief' },
  { label: '💰 Budget', to: 'budget' },
]
</script>

<template>
  <div v-if="!project">
    <div class="card empty-state">
      <div class="empty-state-icon">❓</div>
      <div class="empty-state-title">Progetto non trovato</div>
      <button class="btn btn-primary" style="margin-top:12px" @click="router.push('/projects')">← Torna ai progetti</button>
    </div>
  </div>

  <div v-else>
    <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-start">
      <div>
        <button class="back-link" @click="router.push('/projects')">← Progetti</button>
        <h1 class="page-title">{{ project.title }}</h1>
        <div style="display:flex; gap:8px; margin-top:8px; align-items:center">
          <span :class="`badge badge-${project.status}`">{{ project.status }}</span>
          <span style="font-size:0.85rem; color:#9ca3af; text-transform:capitalize">{{ project.genre }}</span>
        </div>
      </div>
      <button class="btn btn-secondary" @click="router.push(`/projects/${project.id}/edit`)">Modifica</button>
    </div>

    <div class="module-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.to"
        class="tab-btn"
        @click="router.push(`/projects/${project.id}/${tab.to}`)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="details-grid">
      <div class="card" v-if="project.concept">
        <h3 class="detail-title">Concept</h3>
        <p class="detail-text">{{ project.concept }}</p>
      </div>
      <div class="card" v-if="project.statement">
        <h3 class="detail-title">Statement artistico</h3>
        <p class="detail-text">{{ project.statement }}</p>
      </div>
      <div class="card" v-if="project.intent">
        <h3 class="detail-title">Intento</h3>
        <p class="detail-text">{{ project.intent }}</p>
      </div>
      <div class="card" v-if="project.references">
        <h3 class="detail-title">Riferimenti</h3>
        <p class="detail-text">{{ project.references }}</p>
      </div>
    </div>

    <div v-if="project.tags?.length" style="margin-top:16px; display:flex; gap:6px; flex-wrap:wrap">
      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<style scoped>
.back-link { background: none; border: none; color: #6b7280; cursor: pointer; font-size: 0.85rem; margin-bottom: 6px; padding: 0; }
.back-link:hover { color: #1a1a2e; }

.module-tabs { display: flex; gap: 8px; margin: 20px 0; }
.tab-btn {
  padding: 8px 16px; border-radius: 8px; border: 1px solid #e5e7eb;
  background: #fff; cursor: pointer; font-size: 0.875rem; transition: all 0.15s;
}
.tab-btn:hover { background: #f9fafb; border-color: #1a1a2e; }

.details-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.detail-title { font-size: 0.85rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
.detail-text { font-size: 0.9rem; line-height: 1.7; color: #374151; }
</style>
