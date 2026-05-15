export function useAuth() {
  const supabase = useSupabase()
  const user = useState('auth.user', () => null)

  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
    await navigateTo('/admin/login')
  }

  async function loadSession() {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user ?? null
  }

  const isLoggedIn = computed(() => !!user.value)

  return { user, isLoggedIn, login, logout, loadSession }
}
