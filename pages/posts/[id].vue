<template>
  <div class="post-detail" v-if="post">
    <!-- Hero Image -->
    <div class="post-hero">
      <div class="hero-image-wrapper">
        <img :src="post.image" :alt="post.title" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      
      <div class="post-header">
        <div class="post-meta">
          <span class="category-badge">{{ post.category }}</span>
          <span class="meta-divider">•</span>
          <span class="meta-date">{{ formatDate(post.date) }}</span>
          <span class="meta-divider">•</span>
          <span class="meta-read-time">{{ post.readTime }}</span>
        </div>
        
        <h1 class="post-title">{{ post.title }}</h1>
        
        <div class="post-author">
          <div class="author-avatar">
            {{ getAuthorInitial(post.author) }}
          </div>
          <div class="author-info">
            <span class="author-name">{{ post.author }}</span>
            <span class="author-role">Author</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <article class="post-content">
      <div class="content-wrapper">
        <p class="content-lead">{{ post.excerpt }}</p>
        
        <div class="content-body" v-html="formatContent(post.content)"></div>
        
        <!-- Tags -->
        <div class="post-tags" v-if="post.category">
          <span class="tag-label">Category:</span>
          <span class="tag">{{ post.category }}</span>
        </div>
      </div>
    </article>

    <!-- Navigation -->
    <div class="post-navigation">
      <NuxtLink to="/" class="nav-back">
        <span class="back-icon">←</span>
        Back to Home
      </NuxtLink>
      
      <div class="nav-actions" v-if="isAuthenticated">
        <NuxtLink :to="`/edit/${post.id}`" class="nav-edit">
          <span class="edit-icon">✎</span>
          Edit Post
        </NuxtLink>
        <button class="nav-delete" @click="handleDelete">
          <span class="delete-icon">✕</span>
          Delete
        </button>
      </div>
    </div>

    <!-- Related Posts -->
    <section class="related-posts" v-if="relatedPosts.length > 0">
      <h3 class="related-title">
        <span class="title-icon">◈</span>
        Related Articles
      </h3>
      <div class="related-grid">
        <PostCard 
          v-for="relatedPost in relatedPosts" 
          :key="relatedPost.id" 
          :post="relatedPost"
        />
      </div>
    </section>
  </div>

  <!-- Loading State -->
  <div class="loading-state" v-else-if="!post">
    <div class="loading-spinner"></div>
    <p>Loading post...</p>
  </div>

  <!-- Not Found State -->
  <div class="not-found-state" v-else-if="post === null">
    <div class="not-found-icon">✦</div>
    <h2>Post Not Found</h2>
    <p>The post you're looking for doesn't exist or has been removed.</p>
    <NuxtLink to="/" class="back-home">
      Back to Home
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const { getPost, deletePost, posts, initializePosts } = usePosts()

const post = ref(null)
const relatedPosts = ref([])
const isAuthenticated = ref(false)

onMounted(() => {
  initializePosts()
  
  // Check auth
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    isAuthenticated.value = !!token
  }
  
  // Get post
  const postId = route.params.id
  post.value = getPost(postId)
  
  // Get related posts (same category, excluding current)
  if (post.value) {
    relatedPosts.value = posts.value
      .filter(p => p.category === post.value.category && p.id !== post.value.id)
      .slice(0, 2)
  }
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const getAuthorInitial = (author) => {
  return author.charAt(0).toUpperCase()
}

const formatContent = (content) => {
  // Convert line breaks to paragraphs
  return content
    .split('\n\n')
    .map(para => `<p>${para}</p>`)
    .join('')
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this post?')) {
    deletePost(post.value.id)
    navigateTo('/')
  }
}
</script>

<style scoped>
.post-detail {
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Hero */
.post-hero {
  position: relative;
  height: 520px;
  overflow: hidden;
}

.hero-image-wrapper {
  position: absolute;
  inset: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(15, 15, 20, 0.3) 0%,
    rgba(15, 15, 20, 0.6) 50%,
    rgba(15, 15, 20, 1) 100%
  );
}

.post-header {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48px;
  max-width: 900px;
  margin: 0 auto;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.category-badge {
  padding: 6px 16px;
  background: rgba(167, 139, 250, 0.9);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 20px;
}

.meta-divider {
  color: rgba(255, 255, 255, 0.4);
}

.meta-date,
.meta-read-time {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.post-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin: 0 0 28px 0;
  letter-spacing: -0.5px;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 14px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border-radius: 50%;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.author-role {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

/* Content */
.post-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px;
}

.content-wrapper {
  background: rgba(30, 30, 40, 0.5);
  border-radius: 24px;
  padding: 48px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.content-lead {
  font-size: 22px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  margin: 0 0 36px 0;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.content-body {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.9;
}

.content-body :deep(p) {
  margin: 0 0 24px 0;
}

.content-body :deep(p:last-child) {
  margin-bottom: 0;
}

.post-tags {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.tag-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.tag {
  padding: 8px 16px;
  background: rgba(167, 139, 250, 0.15);
  color: #a78bfa;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
}

/* Navigation */
.post-navigation {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-back,
.nav-edit {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: rgba(30, 30, 40, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-back:hover,
.nav-edit:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.nav-actions {
  display: flex;
  gap: 12px;
}

.nav-delete {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-delete:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
}

/* Related Posts */
.related-posts {
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 0 24px;
}

.related-title {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 32px 0;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(167, 139, 250, 0.2);
  border-top-color: #a78bfa;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
}

/* Not Found */
.not-found-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 24px;
}

.not-found-icon {
  font-size: 64px;
  color: #a78bfa;
  margin-bottom: 24px;
  opacity: 0.6;
}

.not-found-state h2 {
  font-size: 32px;
  color: #fff;
  margin: 0 0 12px 0;
}

.not-found-state p {
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 32px 0;
}

.back-home {
  padding: 14px 28px;
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.back-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(167, 139, 250, 0.35);
}

@media (max-width: 768px) {
  .post-hero {
    height: 420px;
  }

  .post-header {
    padding: 32px 24px;
  }

  .content-wrapper {
    padding: 32px 24px;
  }

  .content-lead {
    font-size: 18px;
  }

  .post-navigation {
    flex-direction: column;
    gap: 16px;
  }

  .nav-back,
  .nav-actions {
    width: 100%;
    justify-content: center;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
