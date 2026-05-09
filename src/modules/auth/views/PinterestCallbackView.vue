<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  // In production: exchange the OAuth code for an access token
  // const code = route.query.code as string
  console.log('Pinterest OAuth callback received', route.query)
  setTimeout(() => router.push('/dashboard'), 2000)
})
</script>

<template>
  <div class="card empty-state">
    <div class="empty-state-icon">📌</div>
    <div class="empty-state-title">Connessione Pinterest…</div>
    <p style="color:#9ca3af; margin-top:8px; font-size:0.85rem">Reindirizzamento in corso…</p>
  </div>
</template>
