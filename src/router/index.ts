import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },

    // ─── Dashboard ────────────────────────────────────────────────────────────
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/modules/dashboard/views/DashboardView.vue'),
      meta: { title: 'Dashboard' },
    },

    // ─── Projects ─────────────────────────────────────────────────────────────
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/modules/projects/views/ProjectsView.vue'),
      meta: { title: 'Projects' },
    },
    {
      path: '/projects/new',
      name: 'project-new',
      component: () => import('@/modules/projects/views/ProjectEditView.vue'),
      meta: { title: 'New Project' },
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('@/modules/projects/views/ProjectDetailView.vue'),
      meta: { title: 'Project' },
    },
    {
      path: '/projects/:id/edit',
      name: 'project-edit',
      component: () => import('@/modules/projects/views/ProjectEditView.vue'),
      meta: { title: 'Edit Project' },
    },

    // ─── Moodboard ────────────────────────────────────────────────────────────
    {
      path: '/projects/:id/moodboard',
      name: 'moodboard',
      component: () => import('@/modules/moodboard/views/MoodboardView.vue'),
      meta: { title: 'Moodboard' },
    },

    // ─── Brief & Offers ───────────────────────────────────────────────────────
    {
      path: '/projects/:id/brief',
      name: 'brief',
      component: () => import('@/modules/brief/views/BriefView.vue'),
      meta: { title: 'Brief' },
    },

    // ─── Budget ───────────────────────────────────────────────────────────────
    {
      path: '/projects/:id/budget',
      name: 'budget',
      component: () => import('@/modules/budget/views/BudgetView.vue'),
      meta: { title: 'Budget' },
    },

    // ─── Contacts ─────────────────────────────────────────────────────────────
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/modules/contacts/views/ContactsView.vue'),
      meta: { title: 'Contacts' },
    },
    {
      path: '/contacts/:id',
      name: 'contact-detail',
      component: () => import('@/modules/contacts/views/ContactDetailView.vue'),
      meta: { title: 'Contact' },
    },

    // ─── Auth / Integrations ──────────────────────────────────────────────────
    {
      path: '/auth/callback/pinterest',
      name: 'pinterest-callback',
      component: () => import('@/modules/auth/views/PinterestCallbackView.vue'),
      meta: { title: 'Connecting Pinterest…' },
    },

    // ─── Catch-all ────────────────────────────────────────────────────────────
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · PhotoProjects` : 'PhotoProjects'
})

export default router
