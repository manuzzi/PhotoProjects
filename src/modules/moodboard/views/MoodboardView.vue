<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

const router = useRouter()
const route = useRoute()
const store = useProjectsStore()
const project = computed(() => store.getById(route.params.id as string))
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
    <div class="page-header" style="display:flex; justify-content:space-between; align-items:center">
      <div>
        <button class="back-link" @click="router.push(`/projects/${project.id}`)">← {{ project.title }}</button>
        <h1 class="page-title">Moodboard</h1>
      </div>
      <button class="btn btn-secondary" disabled title="Richiede credenziali Pinterest">🔗 Connetti Pinterest</button>
    </div>
    <div class="card empty-state">
      <div class="empty-state-icon">🖼️</div>
      <div class="empty-state-title">Moodboard vuoto</div>
      <p style="font-size:0.85rem; margin-top:8px; color:#9ca3af">L'integrazione Pinterest sarà disponibile dopo la configurazione delle credenziali API.<br>Potrai anche caricare immagini manualmente.</p>
      <button class="btn btn-primary" style="margin-top:16px" disabled>+ Carica immagini (coming soon)</button>
    </div>
  </div>
</template>

<style scoped>
.back-link { background: none; border: none; color: #6b7280; cursor: pointer; font-size: 0.85rem; margin-bottom: 6px; padding: 0; display: block; }
.back-link:hover { color: #1a1a2e; }
</style>
