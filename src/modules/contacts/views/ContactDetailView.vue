<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useContactsStore } from '@/stores/contacts'

const router = useRouter()
const route = useRoute()
const store = useContactsStore()
const contact = computed(() => store.getById(route.params.id as string))
</script>

<template>
  <div v-if="!contact">
    <div class="card empty-state">
      <div class="empty-state-icon">❓</div>
      <div class="empty-state-title">Contatto non trovato</div>
      <button class="btn btn-primary" style="margin-top:12px" @click="router.push('/contacts')">← Torna ai contatti</button>
    </div>
  </div>
  <div v-else style="max-width:600px">
    <div class="page-header">
      <button class="back-link" @click="router.push('/contacts')">← Contatti</button>
      <h1 class="page-title">{{ contact.name }}</h1>
      <span :class="`badge badge-${contact.role}`" style="margin-top:8px; display:inline-block">{{ contact.role }}</span>
    </div>

    <div class="card">
      <div class="info-section">
        <div v-if="contact.email" class="info-row"><span class="info-label">Email</span><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></div>
        <div v-if="contact.phone" class="info-row"><span class="info-label">Telefono</span><span>{{ contact.phone }}</span></div>
        <div v-if="contact.notes" class="info-row"><span class="info-label">Note</span><span>{{ contact.notes }}</span></div>
      </div>

      <div v-if="contact.social_instagram || contact.social_linkedin || contact.social_pinterest || contact.social_tiktok || contact.website" style="margin-top:16px">
        <div class="info-label" style="margin-bottom:8px">Profili social</div>
        <div style="display:flex; flex-wrap:wrap; gap:8px">
          <a v-if="contact.social_instagram" :href="contact.social_instagram" target="_blank" class="social-pill">📸 Instagram</a>
          <a v-if="contact.social_linkedin" :href="contact.social_linkedin" target="_blank" class="social-pill">💼 LinkedIn</a>
          <a v-if="contact.social_pinterest" :href="contact.social_pinterest" target="_blank" class="social-pill">📌 Pinterest</a>
          <a v-if="contact.social_tiktok" :href="contact.social_tiktok" target="_blank" class="social-pill">🎵 TikTok</a>
          <a v-if="contact.website" :href="contact.website" target="_blank" class="social-pill">🌐 Sito web</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-link { background: none; border: none; color: #6b7280; cursor: pointer; font-size: 0.85rem; margin-bottom: 6px; padding: 0; display: block; }
.back-link:hover { color: #1a1a2e; }
.info-section { display: flex; flex-direction: column; gap: 12px; }
.info-row { display: flex; gap: 12px; align-items: flex-start; }
.info-label { font-size: 0.8rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; width: 80px; flex-shrink: 0; padding-top: 2px; }
.social-pill { display: inline-flex; align-items: center; gap: 4px; padding: 6px 14px; border-radius: 20px; background: #f3f4f6; color: #374151; text-decoration: none; font-size: 0.85rem; }
.social-pill:hover { background: #e5e7eb; }
</style>
