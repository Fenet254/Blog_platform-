<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="hero-content">
        <span class="hero-badge">✦ Welcome to SPEC</span>
        <h1 class="hero-title">
          Discover <span class="highlight">Inspiring</span> Stories
        </h1>
        <p class="hero-subtitle">
          A space where ideas come to life. Explore thought-provoking articles 
          on development, design, and the future of technology.
        </p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">{{ posts.length }}</span>
            <span class="stat-label">Articles</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{ categories.length }}</span>
            <span class="stat-label">Categories</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{ totalReadTime }}</span>
            <span class="stat-label">Min Read</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Posts Grid -->
    <section class="posts-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">◈</span>
          Latest Articles
        </h2>
        <p class="section-subtitle">Fresh perspectives and innovative ideas</p>
      </div>
      
      <div class="posts-grid" v-if="posts.length > 0">
        <PostCard 
          v-for="post in posts" 
          :key="post.id" 
          :post="post"
        />
      </div>
      
      <div class="empty-state" v-else>
        <div class="empty-icon">✦</div>
        <h3>No posts yet</h3>
        <p>Be the first to share your thoughts!</p>
        <NuxtLink to="/create" class="empty-cta">
          Write a Post
        </NuxtLink>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section" v-if="categories.length > 0">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">◈</span>
          Explore Topics
        </h2>
      </div>
      
      <div class="categories-grid">
        <div 
          v-for="category in categories" 
          :key="category" 
          class="category-card"
          @click="filterByCategory(category)"
        >
          <span class="category-icon">{{ getCategoryIcon(category) }}</span>
          <span class="category-name">{{ category }}</span>
          <span class="category-count">{{ getCategoryCount(category) }} posts</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { posts, initializePosts, getCategories } = usePosts()

const categories = ref([])
const totalReadTime = ref(0)

onMounted(() => {
  initializePosts()
  categories.value = getCategories()
  
  // Calculate total read time
  totalReadTime.value = posts.value.reduce((acc, post) => {
    const minutes = parseInt(post.readTime) || 0
    return acc + minutes
  }, 0)
})

const getCategoryIcon = (category) => {
  const icons = {
    'Development': '⚡',
    'Design': '🎨',
    'Architecture': '🏛️',
    'AI': '🤖',
    'Business': '💼',
    'Lifestyle': '🌿'
  }
  return icons[category] || '✦'
}

const getCategoryCount = (category) => {
  return posts.value.filter(post => post.category === category).length
}

const filterByCategory = (category) => {
  // For now, just scroll to posts section
  const postsSection = document.querySelector('.posts-section')
  if (postsSection) {
    postsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Hero Section */
.hero {
  position: relative;
  padding: 140px 24px 80px;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-color: #dcdff3;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(167, 139, 250, 0.25) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 10px 20px;
  background: rgba(167, 139, 250, 0.15);
  border: 1px solid rgba(167, 139, 250, 0.3);
  border-radius: 30px;
  color: #070118;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 24px;
  animation: fadeInUp 0.8s ease-out;
}

.hero-title {
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 800;
  color: #140303;
  line-height: 1.1;
  margin: 0 0 24px 0;
  letter-spacing: -1px;
  animation: fadeInUp 0.8s ease-out 0.1s both;
}

.highlight {
  background: linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(17, 4, 4, 0.6);
  line-height: 1.8;
  margin: 0 0 40px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 32px;
  font-weight: 800;
  color: #070606;
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  color: rgba(18, 14, 14, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 8px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Posts Section */
.posts-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  margin-top: 50px;
  text-align: center;
  margin-bottom: 48px;
  font-weight: 600;
}

.section-title {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 28px;
  font-weight: 700;
  color: #120101;
  margin: 0 0 12px 0;
}

.title-icon {

  color: #a78bfa;
  font-size: 20px;
}

.section-subtitle {
  font-size: 16px;
  color: rgba(14, 1, 1, 0.5);
  margin: 0;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
}

.empty-state {
  text-align: center;
  padding: 80px 24px;
  background: rgba(30, 30, 40, 0.4);
  border-radius: 24px;
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

.empty-icon {
  font-size: 48px;
  color: #a78bfa;
  margin-bottom: 20px;
  opacity: 0.6;
}

.empty-state h3 {
  font-size: 24px;
  color: #0e0101;
  margin: 0 0 12px 0;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 24px 0;
}

.empty-cta {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: #140202;
  text-decoration: none;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.empty-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(167, 139, 250, 0.35);
}

/* Categories Section */
.categories-section {
  align-items: center;
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 0 24px;
}

.categories-grid {
  margin-bottom: 50px;
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 30px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 28px 20px;
  background: rgba(0, 0, 8, 0.5);
  border: 1px solid rgba(8, 0, 0, 0.08);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-card:hover {
  background: rgba(167, 139, 250, 0.1);
  border-color: rgba(167, 139, 250, 0.3);
  transform: translateY(-4px);
}

.category-icon {
  font-size: 32px;
}

.category-name {
  font-size: 16px;
  font-weight: 600;
  color: #080000;
}

.category-count {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .hero {
    padding: 120px 24px 60px;
  }

  .hero-stats {
    gap: 32px;
  }

  .stat-number {
    font-size: 24px;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
