<template>
  <div class="edit-page">
    <div class="page-header">
      <div class="header-content">
        <span class="page-badge">✦ Edit Post</span>
        <h1 class="page-title">Edit Your Story</h1>
        <p class="page-subtitle">
          Make changes to your post and keep the conversation going.
        </p>
      </div>
    </div>

    <div class="form-container" v-if="post">
      <PostForm 
        :post="post" 
        :isEditing="true"
        @submit="handleSubmit" 
        @cancel="handleCancel" 
      />
    </div>

    <!-- Loading State -->
    <div class="loading-state" v-else-if="!post && !notFound">
      <div class="loading-spinner"></div>
      <p>Loading post...</p>
    </div>

    <!-- Not Found State -->
    <div class="not-found-state" v-else-if="notFound">
      <div class="not-found-icon">✦</div>
      <h2>Post Not Found</h2>
      <p>The post you're trying to edit doesn't exist or has been removed.</p>
      <NuxtLink to="/" class="back-home">
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getPost, updatePost, initializePosts } = usePosts()

const post = ref(null)
const notFound = ref(false)

definePageMeta({
  middleware: ['auth']
})

onMounted(() => {
  initializePosts()
  
  const postId = route.params.id
  post.value = getPost(postId)
  
  if (!post.value) {
    notFound.value = true
  }
})

const handleSubmit = (formData) => {
  updatePost(post.value.id, formData)
  navigateTo(`/posts/${post.value.id}`)
}

const handleCancel = () => {
  navigateTo(`/posts/${post.value.id}`)
}
</script>

<style scoped>
.edit-page {
  min-height: 100vh;
  padding: 120px 24px 80px;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(2, 1, 7, 0.15);
  border: 1px solid rgba(167, 139, 250, 0.3);
  border-radius: 20px;
  color: #03000a;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.page-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  color: #150101;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 18px;
  color: rgba(245, 240, 240, 0.6);
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 20px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(7, 1, 24, 0.2);
  border-top-color: #a78bfa;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: rgba(7, 4, 4, 0.6);
  font-size: 16px;
}

/* Not Found */
.not-found-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
  padding: 24px;
}

.not-found-icon {
  font-size: 64px;
  color: #0a090f;
  margin-bottom: 24px;
  opacity: 0.6;
}

.not-found-state h2 {
  font-size: 32px;
  color: #100e0e;
  margin: 0 0 12px 0;
}

.not-found-state p {
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 32px 0;
}

.back-home {
  padding: 14px 28px;
  background: linear-gradient(135deg, #050110 0%, #8b5cf6 100%);
  color: #141010;
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
  .edit-page {
    padding: 100px 24px 60px;
  }
}
</style>
