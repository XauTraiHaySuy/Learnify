<template>
  <div class="quiz-dashboard">
    <!-- Header -->
    <header class="quiz-header">
      <div class="header-left">
        <h1 class="logo">Learnify<span class="logo-dot"></span><span class="logo-com"></span></h1>
      </div>
      <div class="header-center">
        <div class="join-banner">
          <span class="join-text">Join Game? Enter PIN:</span>
          <input type="text" class="join-input" placeholder="123 456" />
        </div>
      </div>
      <div class="header-right">
        <button class="icon-btn search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
        <button class="icon-btn profile-btn" style="padding: 0; overflow: hidden; border: 2px solid #ccc;">
          <img :src="profilePic" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;" />
        </button>
      </div>
    </header>

    <!-- 2. CONTENT -->
    <main class="quiz-content">

      <!-- Main Hero Cards -->
      <div class="hero-cards">
        <!-- Create Quiz Card -->
        <div class="hero-card create-card">
          <div class="card-content">
            <div class="card-text">
              <h2>Create a quiz</h2>
              <p>Play for free with<br/>300 participants</p>
              <button class="action-btn">Quiz editor</button>
            </div>
            <div class="card-illustration">
               <div class="illus-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                  </svg>
               </div>
            </div>
          </div>
        </div>
        
        <!-- AI Quiz Card -->
        <div class="hero-card ai-card">
          <div class="card-content">
            <div class="card-text">
              <h2>A.I.</h2>
              <p>Generate a quiz from<br/>any subject or pdf</p>
              <button class="action-btn" style="background-color: var(--quiz-ai-btn-bg);">Quiz generator</button>
            </div>
            <div class="card-illustration">
               <div class="illus-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    <path d="M5 3v4"/>
                    <path d="M19 17v4"/>
                    <path d="M3 5h4"/>
                    <path d="M17 19h4"/>
                  </svg>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recently Published Section -->
      <section class="section">
        <div class="section-header">
          <h3>Recently published</h3>
        </div>
        <div class="recent-grid">
          <div class="recent-item skeleton"></div>
          <div class="recent-item skeleton"></div>
          <div class="recent-item skeleton"></div>
          <div class="recent-item skeleton"></div>
        </div>
      </section>
    </main>

    <!-- 3. FOOTER -->
    <footer class="quiz-footer">
      <div class="footer-container">
        <div class="footer-brand">
          <h2 class="logo">Learnify<span class="logo-dot"></span><span class="logo-com"></span></h2>
          <p>The world's most engaging quiz platform.</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h4>About</h4>
            <a href="#">Company</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>
          <div class="link-group">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Learnify. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'QuizDashboard',
  data() {
    return {
      profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
    }
  },
  mounted() {
    // Dynamically inject the Fredoka font which perfectly matches the rounded, friendly style in the screenshot
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    this.loadProfilePic();
    window.addEventListener('profileUpdated', this.loadProfilePic);
  },
  beforeUnmount() {
    window.removeEventListener('profileUpdated', this.loadProfilePic);
  },
  methods: {
    loadProfilePic() {
      const userStr = localStorage.getItem('user');
      let userId = 'default';
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.id || 'default';
          // Set default seed based on role
          if (user.role === 'student') this.profilePic = 'https://api.dicebear.com/7.x/avataaars/svg?seed=student';
          else if (user.role === 'teacher' || user.role === 'instructor' || user.role === 'admin') this.profilePic = 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher';
        } catch (e) {}
      }
      
      const savedProfile = localStorage.getItem(`userProfile_${userId}`);
      if (savedProfile) {
        try {
          const data = JSON.parse(savedProfile);
          if (data.avatar) this.profilePic = data.avatar;
        } catch (e) {}
      }
    }
  }
}
</script>

<style scoped>

.quiz-dashboard {
  --quiz-font: 'Fredoka', sans-serif;
  
  /* Colors */
  --quiz-bg: #f4f6f9;
  --quiz-text-main: #2c3e50;
  --quiz-text-light: #7f8c8d;
  
  /* Header */
  --quiz-banner-bg: #ffe066; /* Vibrant Yellow */
  --quiz-banner-text: #000000;
  
  /* Hero Cards */
  --quiz-card-create: #6a4c93; /* Deep Purple */
  --quiz-card-ai: #118ab2; /* Vibrant Teal/Blue */
  --quiz-card-text: #ffffff;
  
  /* Buttons */
  --quiz-primary-btn: #06d6a0; /* Mint Green */
  --quiz-ai-btn-bg: #ef476f;   /* Pink/Red */
  
  font-family: var(--quiz-font);
  background-color: var(--quiz-bg);
  color: var(--quiz-text-main);
  min-height: 100vh;
  padding-bottom: 50px;
}

/* Header */
.quiz-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background: white;
}

.logo {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -1px;
  color: #ff6b6b;
  text-shadow: 2px 2px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
.logo-dot { color: #fff; }
.logo-com { color: #fff; }

.join-banner {
  background-color: var(--quiz-banner-bg);
  padding: 20px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 600;
  font-size: 18px;
}

.join-input {
  width: 600px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid #000;
  font-family: var(--quiz-font);
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

.header-right {
  display: flex;
  gap: 10px;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}
.icon-btn:hover { background: #e0e0e0; }

/* Navigation Categories */
.category-nav {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
  overflow-x: auto;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--quiz-text-light);
  font-weight: 500;
  font-size: 14px;
}

.category-item .icon {
  font-size: 24px;
}

.category-item.active {
  color: var(--quiz-text-main);
  border-bottom: 3px solid var(--quiz-text-main);
  padding-bottom: 5px;
}

/* Hero Cards */
.hero-cards {
  margin-top: 20px;
  display: flex;
  gap: 30px;
  padding: 0 40px;
  margin-bottom: 50px;
}

.hero-card {
  flex: 1;
  border-radius: 24px;
  padding: 40px;
  color: var(--quiz-card-text);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.create-card {
  background: linear-gradient(135deg, var(--quiz-card-create), #4a336a);
}

.ai-card {
  background: linear-gradient(135deg, var(--quiz-card-ai), #0c617d);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.card-text h2 {
  font-size: 42px;
  margin: 0 0 15px 0;
  font-weight: 700;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.2);
}

.card-text p {
  font-size: 20px;
  margin: 0 0 25px 0;
  opacity: 0.95;
  line-height: 1.4;
}

.action-btn {
  background-color: var(--quiz-primary-btn);
  color: #fff;
  border: 2px solid rgba(255,255,255,0.5);
  border-radius: 30px;
  padding: 14px 28px;
  font-family: var(--quiz-font);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: all 0.2s ease;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.2);
}

.action-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  border-color: #fff;
}

.illus-placeholder {
  font-size: 80px;
  background: rgba(255,255,255,0.15);
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* Sections */
.section {
  padding: 0 40px;
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 22px;
  margin: 0;
}

.section-header .links a {
  color: #0088cc;
  font-weight: 600;
  margin-right: 15px;
  text-decoration: none;
}
.section-header .links a:hover { text-decoration: underline; }

.recent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.recent-item.skeleton {
  background-color: #f0f0f0;
  height: 150px;
  border-radius: 12px;
}

/* Responsive */
@media (max-width: 900px) {
  .hero-cards {
    flex-direction: column;
  }
  .join-banner {
    display: none; /* Hide on small screens for simplicity */
  }
  .footer-container {
    flex-direction: column;
    gap: 30px;
  }
}

/* Footer */
.quiz-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #eaeaea;
  padding: 40px 40px 20px 40px;
  margin-top: auto; /* Push to bottom if content is short */
}

.footer-container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-brand p {
  color: var(--quiz-text-light);
  margin-top: 10px;
  font-size: 16px;
}

.footer-links {
  display: flex;
  gap: 60px;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-group h4 {
  margin: 0 0 5px 0;
  font-size: 18px;
  color: var(--quiz-text-main);
}

.link-group a {
  text-decoration: none;
  color: var(--quiz-text-light);
  font-size: 15px;
  transition: color 0.2s;
}

.link-group a:hover {
  color: var(--quiz-primary-btn);
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eaeaea;
  color: #999;
  font-size: 14px;
}

/* Ensure flex layout for sticky footer */
.quiz-dashboard {
  display: flex;
  flex-direction: column;
}
.quiz-content {
  flex: 1;
}
</style>
