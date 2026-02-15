<template>
  <nav class="navbar">
    <div class="navbar-container">
      <NuxtLink to="/" class="navbar-brand">
        <span class="brand-icon">✦</span>
        <span class="brand-text">ThoughtFlow</span>
      </NuxtLink>
      
      <button class="navbar-toggle" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
        <span class="toggle-bar"></span>
        <span class="toggle-bar"></span>
        <span class="toggle-bar"></span>
      </button>

      <div class="navbar-menu" :class="{ 'is-open': isMenuOpen }">
        <NuxtLink to="/" class="nav-link" @click="closeMenu">
          <span class="nav-icon">◈</span>
          Home
        </NuxtLink>
        <NuxtLink to="/create" class="nav-link" @click="closeMenu" v-if="isAuthenticated">
          <span class="nav-icon">✎</span>
          Write
        </NuxtLink>
        <div class="nav-auth" v-if="!isAuthenticated">
          <button class="btn-auth" @click="login">
            <span class="btn-icon">⬡</span>
            Sign In
          </button>
        </div>
        <div class="nav-user" v-else>
          <span class="user-avatar">Y</span>
          <button class="btn-logout" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isMenuOpen = ref(false)
const isAuthenticated = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const login = () => {
  if (process.client) {
    localStorage.setItem('auth-token', 'authenticated')
    isAuthenticated.value = true
    closeMenu()
    navigateTo('/create')
  }
}

const logout = () => {
  if (process.client) {
    localStorage.removeItem('auth-token')
    isAuthenticated.value = false
    closeMenu()
    navigateTo('/')
  }
}

onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    isAuthenticated.value = !!token
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 15, 20, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #fff;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.02);
}

.brand-icon {
  font-size: 28px;
  color: #a78bfa;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.brand-text {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #fff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.25s ease;
  position: relative;
}

.nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.nav-link.router-link-active {
  color: #a78bfa;
  background: rgba(167, 139, 250, 0.15);
}

.nav-icon {
  font-size: 14px;
  opacity: 0.8;
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-auth {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-auth:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(167, 139, 250, 0.4);
}

.btn-icon {
  font-size: 12px;
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: #fff;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
}

.btn-logout {
  padding: 8px 16px;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-logout:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.toggle-bar {
  display: block;
  width: 100%;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.navbar-toggle.is-active .toggle-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar-toggle.is-active .toggle-bar:nth-child(2) {
  opacity: 0;
}

.navbar-toggle.is-active .toggle-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .navbar-toggle {
    display: flex;
  }

  .navbar-menu {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    background: rgba(15, 15, 20, 0.98);
    padding: 24px;
    gap: 8px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .navbar-menu.is-open {
    transform: translateX(0);
  }

  .nav-link {
    width: 100%;
    padding: 16px 20px;
    font-size: 18px;
  }

  .nav-auth {
    width: 100%;
    margin-left: 0;
    padding-left: 0;
    padding-top: 16px;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .btn-auth {
    width: 100%;
    justify-content: center;
    padding: 16px;
  }

  .nav-user {
    width: 100%;
    margin-left: 0;
    padding-left: 0;
    padding-top: 16px;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    justify-content: space-between;
  }
}
</style>
