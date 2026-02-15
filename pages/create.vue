<template>
  <div class="create-page">
    <div class="page-header">
      <div class="header-content">
        <span class="page-badge">✦ Create New</span>
        <h1 class="page-title">Write Your Story</h1>
        <p class="page-subtitle">
          Share your ideas, insights, and experiences with the world.
        </p>
      </div>
    </div>

    <div class="form-container">
      <PostForm @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>

<script setup>
const { createPost } = usePosts()

definePageMeta({
  middleware: ['auth']
})

const handleSubmit = (formData) => {
  const newPost = createPost(formData)
  navigateTo(`/posts/${newPost.id}`)
}

const handleCancel = () => {
  navigateTo('/')
}
</script>

<style scoped>
.create-page {
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
  background: rgba(167, 139, 250, 0.15);
  border: 1px solid rgba(167, 139, 250, 0.3);
  border-radius: 20px;
  color: #a78bfa;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.page-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  color: #fff;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .create-page {
    padding: 100px 24px 60px;
  }
}
</style>
