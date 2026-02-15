<template>
  <div class="app-layout">
    <Navbar />
    <main class="main-content">
      <slot />
    </main>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="brand-icon">✦</span>
          <span class="brand-text">SPEC</span>
        </div>
        <p class="footer-tagline">Software Programming and Engeenering Club</p>
        <div class="footer-bottom">
          <p class="copyright">© 2026 ThoughtFlow. B</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 72px;
}

.footer {
  background: rgba(0, 0, 15, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 60px 24px 32px;
}

.footer-content {
  max-width: 1600px;
  margin: 0 auto;
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.brand-icon {
  font-size: 24px;
  color: #0a0a0a;
}

.brand-text {
  font-size: 30px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.5px;
}

.footer-tagline {
  font-size: 19px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 32px 0;
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.copyright {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}
</style>
