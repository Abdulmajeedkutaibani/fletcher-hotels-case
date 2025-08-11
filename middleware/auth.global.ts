
import { useAuthStore } from '~/stores/auth'
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  if (!auth.isAuthed && to.path !== '/login' && to.path !== '/register' && to.path !== '/forgot') {
    return navigateTo('/login')
  }
  if (auth.isAuthed && to.path === '/login') {
    return navigateTo('/hotels')
  }
})
