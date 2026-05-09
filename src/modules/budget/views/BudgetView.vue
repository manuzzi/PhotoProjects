<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import type { BudgetCategory } from '@/types'

const router = useRouter()
const route = useRoute()
const store = useProjectsStore()
const project = computed(() => store.getById(route.params.id as string))

interface Item { id: string; category: BudgetCategory; description: string; quantity: number; unit_cost: number }

const currency = ref('EUR')
const marginPercent = ref(0)
const items = ref<Item[]>([
  { id: crypto.randomUUID(), category: 'equipment', description: '', quantity: 1, unit_cost: 0 },
])

const categories: { value: BudgetCategory; label: string }[] = [
  { value: 'equipment', label: 'Attrezzatura' },
  { value: 'location', label: 'Location' },
  { value: 'models', label: 'Modelli/e' },
  { value: 'post_production', label: 'Post-produzione' },
  { value: 'travel', label: 'Trasporto' },
  { value: 'accommodation', label: 'Alloggio' },
  { value: 'printing', label: 'Stampa' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'other', label: 'Altro' },
]

function addItem() {
  items.value.push({ id: crypto.randomUUID(), category: 'other', description: '', quantity: 1, unit_cost: 0 })
}

function removeItem(id: string) { items.value = items.value.filter((i) => i.id !== id) }

const subtotal = computed(() => items.value.reduce((sum, i) => sum + i.quantity * i.unit_cost, 0))
const margin = computed(() => subtotal.value * (marginPercent.value / 100))
const total = computed(() => subtotal.value + margin.value)

function fmt(v: number) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: currency.value }).format(v)
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
  <div v-else>
    <div class="page-header" style="display:flex; justify-content:space-between; align-items:center">
      <div>
        <button class="back-link" @click="router.push(`/projects/${project.id}`)">← {{ project.title }}</button>
        <h1 class="page-title">Budget</h1>
      </div>
      <div style="display:flex; gap:8px; align-items:center">
        <select v-model="currency" class="form-select" style="width:90px">
          <option>EUR</option><option>USD</option><option>GBP</option>
        </select>
      </div>
    </div>

    <div class="card" style="margin-bottom:20px; overflow-x:auto">
      <table class="budget-table">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Descrizione</th>
            <th>Qtà</th>
            <th>Costo unitario</th>
            <th>Totale</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              <select v-model="item.category" class="form-select" style="min-width:130px">
                <option v-for="c in categories" :key="c.value" :value="c.value">{{ c.label }}</option>
              </select>
            </td>
            <td><input v-model="item.description" class="form-input" placeholder="Descrizione…" /></td>
            <td><input v-model.number="item.quantity" type="number" min="0" step="0.5" class="form-input num-input" /></td>
            <td><input v-model.number="item.unit_cost" type="number" min="0" step="0.01" class="form-input num-input" /></td>
            <td class="total-cell">{{ fmt(item.quantity * item.unit_cost) }}</td>
            <td><button class="btn btn-danger" @click="removeItem(item.id)">×</button></td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-secondary" style="margin-top:12px" @click="addItem">+ Aggiungi voce</button>
    </div>

    <div class="card summary-card">
      <div class="summary-row">
        <span>Subtotale</span>
        <span>{{ fmt(subtotal) }}</span>
      </div>
      <div class="summary-row">
        <div style="display:flex; align-items:center; gap:8px">
          <span>Margine</span>
          <input v-model.number="marginPercent" type="number" min="0" max="100" class="form-input" style="width:70px; padding:4px 8px" />
          <span>%</span>
        </div>
        <span>{{ fmt(margin) }}</span>
      </div>
      <div class="summary-row total-row">
        <span>TOTALE</span>
        <span>{{ fmt(total) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-link { background: none; border: none; color: #6b7280; cursor: pointer; font-size: 0.85rem; margin-bottom: 6px; padding: 0; display: block; }
.back-link:hover { color: #1a1a2e; }

.budget-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
.budget-table th { text-align: left; padding: 8px 6px; border-bottom: 2px solid #e5e7eb; color: #6b7280; font-size: 0.8rem; text-transform: uppercase; }
.budget-table td { padding: 6px 6px; border-bottom: 1px solid #f3f4f6; }
.num-input { width: 80px; }
.total-cell { font-weight: 600; min-width: 100px; }

.summary-card { max-width: 360px; margin-left: auto; }
.summary-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 0.9rem; }
.total-row { font-size: 1.1rem; font-weight: 800; border-bottom: none; padding-top: 14px; }
</style>
