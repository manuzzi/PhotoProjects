<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '◈' },
  { to: '/projects', label: 'Progetti', icon: '📁' },
  { to: '/contacts', label: 'Contatti', icon: '👥' },
]
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="brand-icon">📸</span>
        <span class="brand-name">PhotoProjects</span>
      </div>
      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: route.path.startsWith(item.to) }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <span class="mock-badge">🔧 Mock mode</span>
      </div>
    </aside>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f8f9fa;
  color: #1a1a2e;
  height: 100vh;
}

#app { height: 100vh; }

.app-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1a1a2e;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  border-bottom: 1px solid #2d2d4e;
  font-weight: 700;
  font-size: 1rem;
}

.brand-icon { font-size: 1.4rem; }

.sidebar-nav {
  flex: 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #a0a0b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover { background: #2d2d4e; color: #fff; }
.nav-item.active { background: #3d3d6e; color: #fff; font-weight: 600; }
.nav-icon { font-size: 1rem; }

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #2d2d4e;
}

.mock-badge {
  font-size: 0.75rem;
  color: #f59e0b;
  background: rgba(245,158,11,0.15);
  padding: 4px 8px;
  border-radius: 4px;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

/* Utility classes */
.page-header { margin-bottom: 24px; }
.page-title { font-size: 1.6rem; font-weight: 700; color: #1a1a2e; }
.page-subtitle { color: #666; margin-top: 4px; font-size: 0.9rem; }

.card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.15s;
}
.btn:hover { opacity: 0.85; }
.btn-primary { background: #1a1a2e; color: #fff; }
.btn-secondary { background: #f0f0f8; color: #1a1a2e; }
.btn-danger { background: #fee2e2; color: #dc2626; }

.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
.badge-draft     { background: #f3f4f6; color: #6b7280; }
.badge-in_progress { background: #dbeafe; color: #1d4ed8; }
.badge-completed { background: #dcfce7; color: #16a34a; }
.badge-archived  { background: #f3f4f6; color: #9ca3af; }

.badge-client    { background: #ede9fe; color: #7c3aed; }
.badge-model     { background: #fce7f3; color: #be185d; }
.badge-assistant { background: #dbeafe; color: #1d4ed8; }
.badge-supplier  { background: #fef3c7; color: #d97706; }
.badge-agency    { background: #dcfce7; color: #15803d; }

.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; color: #374151; }
.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: #1a1a2e; }
.form-textarea { resize: vertical; min-height: 100px; }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: #9ca3af;
}
.empty-state-icon { font-size: 3rem; margin-bottom: 12px; }
.empty-state-title { font-size: 1.1rem; font-weight: 600; color: #374151; margin-bottom: 8px; }
</style>
