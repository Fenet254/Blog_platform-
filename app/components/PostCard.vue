<template>
  <article class="post-card" @click="navigateToPost">
    <div class="card-image-wrapper">
      <img 
        :src="post.image" 
        :alt="post.title" 
        class="card-image"
        loading="lazy"
      />
      <div class="card-overlay"></div>
      <span class="card-category">{{ post.category }}</span>
    </div>
    
    <div class="card-content">
      <div class="card-meta">
        <span class="meta-date">{{ formatDate(post.date) }}</span>
        <span class="meta-divider">•</span>
        <span class="meta-read-time">{{ post.readTime }}</span>
      </div>
      
      <h3 class="card-title">{{ post.title }}</h3>
      
      <p class="card-excerpt">{{ post.excerpt }}</p>
      
      <div class="card-footer">
        <div class="card-author">
          <div class="author-avatar">
            {{ getAuthorInitial(post.author) }}
          </div>
          <span class="author-name">{{ post.author }}</span>
        </div>
        <button class="read-more">
          Read More
          <span class="arrow">→</span>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const navigateToPost = () => {
  navigateTo(`/posts/${props.post.id}`)
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const getAuthorInitial = (author) => {
  return author.charAt(0).toUpperCase()
}
</script>

<style scoped>
.post-card {
  background: rgba(8, 8, 9, 0.95);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.06);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
  border-color: rgba(167, 139, 250, 0.3);
}

.card-image-wrapper {
  position: relative;
  width: 500px;
  height: 150px;
  overflow: hidden;
}

.card-image {
 
  object-fit: cover;
  transition: transform 0.6s ease;
}

.post-card:hover .card-image {
  transform: scale(1.08);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(15, 15, 20, 0.4) 60%,
    rgba(15, 15, 20, 0.9) 100%
  );
}

.card-category {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 14px;
  background: rgba(237, 236, 241, 0.9);
  color: #100d0d;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  font-size: 13px;
  color: rgba(246, 244, 244, 0.5);
}

.meta-divider {
  opacity: 0.4;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #ebe3e3;
  line-height: 1.4;
  margin: 0 0 12px 0;
  display: -webkit-box;

  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.post-card:hover .card-title {
  color: #f2eded;
}

.card-excerpt {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.card-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 239, 243, 0.95);
  color: #9007f2;
  font-size: 13px;
  font-weight: 700;
  border-radius: 50%;
}

.author-name {
  font-size: 14px;
  font-weight: 500;
  color: rgba(242, 237, 237, 0.8);
}

.read-more {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #a78bfa;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.read-more:hover {
  gap: 12px;
}

.arrow {
  transition: transform 0.3s ease;
}

.read-more:hover .arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .card-image-wrapper {
    height: 180px;
  }

  .card-content {
    padding: 20px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-excerpt {
    font-size: 14px;
  }
}
</style>
