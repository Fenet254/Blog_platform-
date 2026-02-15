// Blog Platform - Posts Composable
// Handles all post-related logic with localStorage

export const usePosts = () => {
  const posts = useState('posts', () => [])
  const isLoading = useState('postsLoading', () => false)

  // Initialize posts from localStorage
  const initializePosts = () => {
    if (process.client) {
      const stored = localStorage.getItem('blog-posts')
      if (stored) {
        posts.value = JSON.parse(stored)
      } else {
        // Seed with sample posts if empty
        const samplePosts = [
          {
            id: '1',
            title: 'Getting Started with Modern Web Development',
            excerpt: 'Learn the fundamentals of building modern web applications with Vue.js and Nuxt.',
            content: 'Web development has evolved significantly over the years. Today, we have powerful frameworks like Vue.js and Nuxt that make building web applications easier and more enjoyable. In this comprehensive guide, we will explore the fundamentals of modern web development, from setting up your development environment to deploying your first application.\n\nModern web development is all about creating seamless user experiences. This means fast load times, responsive designs, and intuitive navigation. Vue.js provides a reactive data binding system that makes it easy to create dynamic user interfaces, while Nuxt adds server-side rendering, static site generation, and automatic routing.\n\nOne of the key benefits of using these technologies is the component-based architecture. Components allow you to break down your application into reusable pieces, making your code more maintainable and easier to test. Whether you\'re building a simple blog or a complex enterprise application, component-based development helps keep your code organized.\n\nIn conclusion, modern web development is an exciting field with constantly evolving tools and techniques. By learning frameworks like Vue.js and Nuxt, you\'re equipping yourself with skills that are in high demand and will serve you well in your career.',
            author: 'Alex Chen',
            date: '2026-02-10',
            category: 'Development',
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
            readTime: '8 min read'
          },
          {
            id: '2',
            title: 'The Art of Minimalist Design',
            excerpt: 'Discover how less can be more in the world of UI/UX design.',
            content: 'Minimalist design is not just about having less - it\'s about making every element count. In this article, we explore the principles of minimalist design and how you can apply them to create beautiful, functional interfaces.\n\nThe philosophy behind minimalist design stems from the Japanese concept of "ma" - the negative space that gives form to the positive. This approach emphasizes clarity, simplicity, and the essential. By removing unnecessary elements, you allow the important content to shine.\n\nOne of the key principles of minimalist design is the use of whitespace. Whitespace isn\'t empty space; it\'s a powerful design element that helps create visual hierarchy and improves readability. When used correctly, whitespace can guide the user\'s eye and create a sense of elegance and sophistication.\n\nColor in minimalist design is used sparingly but purposefully. A limited color palette with strategic accents can create a strong visual impact without overwhelming the user. Typography also plays a crucial role - choosing the right fonts and using them consistently can elevate your design significantly.\n\nRemember, minimalist design doesn\'t mean boring or sterile. It\'s about finding the perfect balance between simplicity and functionality, creating interfaces that feel effortless and intuitive to use.',
            author: 'Sarah Mitchell',
            date: '2026-02-08',
            category: 'Design',
            image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=400&fit=crop',
            readTime: '5 min read'
          },
          {
            id: '3',
            title: 'Building Scalable Applications',
            excerpt: 'Best practices for creating applications that grow with your business.',
            content: 'Scalability is one of the most important considerations when building modern applications. In this guide, we\'ll discuss best practices for creating applications that can handle growth and increased load.\n\nThe first step in building scalable applications is choosing the right architecture. Microservices architecture, for example, allows you to scale individual components of your application independently. This means you can allocate more resources to the parts of your application that need them most.\n\nCaching is another critical component of scalability. By storing frequently accessed data in memory, you can significantly reduce database load and improve response times. Modern caching solutions like Redis offer powerful features that go beyond simple key-value storage.\n\nDatabase optimization is equally important. This includes proper indexing, query optimization, and choosing the right type of database for your use case. Sometimes a combination of SQL and NoSQL databases can provide the best of both worlds.\n\nFinally, don\'t forget about monitoring and analytics. You can\'t improve what you don\'t measure. Implement robust logging and monitoring from the start, and you\'ll be able to identify bottlenecks and performance issues before they become critical.',
            author: 'David Park',
            date: '2026-02-05',
            category: 'Architecture',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
            readTime: '10 min read'
          },
          {
            id: '4',
            title: 'The Future of AI in Web Development',
            excerpt: 'Exploring how artificial intelligence is reshaping the web development landscape.',
            content: 'Artificial Intelligence is revolutionizing every industry, and web development is no exception. From automated code generation to intelligent user experience personalization, AI is changing how we build and interact with web applications.\n\nOne of the most exciting developments is AI-powered code assistance. Tools like GitHub Copilot can help developers write code faster and with fewer errors. These AI assistants can suggest code completions, identify potential bugs, and even refactor existing code.\n\nAI is also transforming the design process. Generative AI can create UI designs, suggest color palettes, and even generate entire layouts based on simple descriptions. While these tools won\'t replace human designers anytime soon, they can significantly speed up the design process.\n\nUser experience is another area where AI is making a big impact. Machine learning algorithms can analyze user behavior to personalize content, predict user needs, and optimize interfaces for better engagement. This level of personalization was previously impossible to achieve at scale.\n\nAs we look to the future, we can expect AI to become even more integrated into the web development workflow. The key is to embrace these new tools while maintaining the human touch that makes great products truly resonate with users.',
            author: 'Emily Zhang',
            date: '2026-02-01',
            category: 'AI',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
            readTime: '7 min read'
          }
        ]
        posts.value = samplePosts
        localStorage.setItem('blog-posts', JSON.stringify(samplePosts))
      }
    }
  }

  // Get all posts
  const getPosts = () => {
    return posts.value
  }

  // Get single post by ID
  const getPost = (id) => {
    return posts.value.find(post => post.id === id)
  }

  // Create new post
  const createPost = (postData) => {
    const newPost = {
      id: Date.now().toString(),
      ...postData,
      date: new Date().toISOString().split('T')[0],
      author: 'You'
    }
    posts.value.unshift(newPost)
    saveToStorage()
    return newPost
  }

  // Update existing post
  const updatePost = (id, postData) => {
    const index = posts.value.findIndex(post => post.id === id)
    if (index !== -1) {
      posts.value[index] = {
        ...posts.value[index],
        ...postData,
        date: new Date().toISOString().split('T')[0]
      }
      saveToStorage()
      return posts.value[index]
    }
    return null
  }

  // Delete post
  const deletePost = (id) => {
    const index = posts.value.findIndex(post => post.id === id)
    if (index !== -1) {
      posts.value.splice(index, 1)
      saveToStorage()
      return true
    }
    return false
  }

  // Save to localStorage
  const saveToStorage = () => {
    if (process.client) {
      localStorage.setItem('blog-posts', JSON.stringify(posts.value))
    }
  }

  // Get featured posts (latest 3)
  const getFeaturedPosts = () => {
    return posts.value.slice(0, 3)
  }

  // Get posts by category
  const getPostsByCategory = (category) => {
    return posts.value.filter(post => post.category === category)
  }

  // Get all categories
  const getCategories = () => {
    const categories = posts.value.map(post => post.category)
    return [...new Set(categories)]
  }

  return {
    posts,
    isLoading,
    initializePosts,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getFeaturedPosts,
    getPostsByCategory,
    getCategories
  }
}
