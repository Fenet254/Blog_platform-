// Auth middleware - protects create and edit routes

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server-side
  if (process.server) return

  // Check for auth token in localStorage
  const token = localStorage.getItem('auth-token')
  
  // If no token, redirect to home
  if (!token) {
    // Allow access to home and post detail pages
    if (to.path === '/' || to.path.startsWith('/posts/')) {
      return
    }
    
    // Redirect to home for protected routes
    return navigateTo('/')
  }
})
