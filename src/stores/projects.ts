import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project } from '@/types'

const STORAGE_KEY = 'pp_projects'

function load(): Project[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function save(items: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(load())

  const byStatus = computed(() => (status: string) => projects.value.filter((p) => p.status === status))

  function getById(id: string) {
    return projects.value.find((p) => p.id === id)
  }

  function add(data: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>) {
    const now = new Date().toISOString()
    const project: Project = {
      ...data,
      id: crypto.randomUUID(),
      user_id: 'local',
      created_at: now,
      updated_at: now,
    }
    projects.value.unshift(project)
    save(projects.value)
    return project
  }

  function update(id: string, data: Partial<Project>) {
    const idx = projects.value.findIndex((p) => p.id === id)
    if (idx === -1) return
    projects.value[idx] = { ...projects.value[idx], ...data, updated_at: new Date().toISOString() } as Project
    save(projects.value)
  }

  function remove(id: string) {
    projects.value = projects.value.filter((p) => p.id !== id)
    save(projects.value)
  }

  // Seed demo data if empty
  if (projects.value.length === 0) {
    add({ title: 'Periferie Invisibili', genre: 'documentary', status: 'in_progress', concept: 'Un viaggio fotografico nelle periferie urbane dimenticate, alla ricerca di storie non raccontate.', statement: '', intent: '', references: '', tags: ['urbano', 'documentario'] })
    add({ title: 'Luce di Mezzo', genre: 'fine_art', status: 'draft', concept: 'Esplorazione della luce diffusa nelle ore di transizione tra giorno e notte.', statement: '', intent: '', references: '', tags: ['luce', 'fine art'] })
    add({ title: 'Campagna Moda SS25', genre: 'commercial', status: 'completed', concept: 'Campagna editoriale per collezione primavera/estate 2025.', statement: '', intent: '', references: '', tags: ['moda', 'commerciale'] })
  }

  return { projects, byStatus, getById, add, update, remove }
})
