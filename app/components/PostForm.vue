<template>
  <form @submit.prevent="handleSubmit" class="post-form">
    <div class="form-group">
      <label for="title" class="form-label">
        <span class="label-icon">◈</span>
        Title
      </label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        class="form-input"
        placeholder="Enter your post title..."
        required
      />
    </div>

    <div class="form-group">
      <label for="excerpt" class="form-label">
        <span class="label-icon">◈</span>
        Excerpt
      </label>
      <textarea
        id="excerpt"
        v-model="formData.excerpt"
        class="form-textarea"
        placeholder="Write a brief summary of your post..."
        rows="3"
        required
      ></textarea>
    </div>

    <div class="form-group">
      <label for="content" class="form-label">
        <span class="label-icon">◈</span>
        Content
      </label>
      <textarea
        id="content"
        v-model="formData.content"
        class="form-textarea content-area"
        placeholder="Write your full content here..."
        rows="12"
        required
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group half">
        <label for="category" class="form-label">
          <span class="label-icon">◈</span>
          Category
        </label>
        <select
          id="category"
          v-model="formData.category"
          class="form-select"
          required
        >
          <option value="" disabled>Select a category</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Architecture">Architecture</option>
          <option value="AI">AI</option>
          <option value="Business">Business</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
      </div>

      <div class="form-group half">
        <label for="image" class="form-label">
          <span class="label-icon">◈</span>
          Cover Image URL
        </label>
        <input
          id="image"
          v-model="formData.image"
          type="url"
          class="form-input"
          placeholder="https://example.com/image.jpg"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="readTime" class="form-label">
        <span class="label-icon">◈</span>
        Read Time
      </label>
      <input
        id="readTime"
        v-model="formData.readTime"
        type="text"
        class="form-input"
        placeholder="e.g., 5 min read"
      />
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="handleCancel">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary">
        <span class="btn-icon">{{ isEditing ? '↻' : '✦' }}</span>
        {{ isEditing ? 'Update Post' : 'Publish Post' }}
      </button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  image: '',
  readTime: ''
})

// Initialize form with post data if editing
onMounted(() => {
  if (props.post) {
    formData.value = {
      title: props.post.title || '',
      excerpt: props.post.excerpt || '',
      content: props.post.content || '',
      category: props.post.category || '',
      image: props.post.image || '',
      readTime: props.post.readTime || ''
    }
  }
})

const handleSubmit = () => {
  // Calculate read time if not provided
  if (!formData.value.readTime && formData.value.content) {
    const words = formData.value.content.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    formData.value.readTime = `${minutes} min read`
  }
  
  // Set default image if not provided
  if (!formData.value.image) {
    formData.value.image = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop'
  }
  
  emit('submit', { ...formData.value })
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.post-form {
  background: rgba(30, 30, 40, 0.6);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.form-group {
  margin-bottom: 28px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.label-icon {
  color: #a78bfa;
  font-size: 12px;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 16px 20px;
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  color: #fff;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #050506;
  box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.15);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.content-area {
  min-height: 300px;
  line-height: 1.8;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 20px;
}

.form-select option {
  background: #1e1e28;
  color: #fff;
}

.form-row {
  display: flex;
  gap: 24px;
}

.form-group.half {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(167, 139, 250, 0.35);
}

.btn-icon {
  font-size: 14px;
}

@media (max-width: 768px) {
  .post-form {
    padding: 24px;
    border-radius: 20px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
