export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return
  if (import.meta.server) return

  const supabase = useSupabase()
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    return navigateTo('/admin/login')
  }
})
