<template>
  <div class="auth-wrapper">
    <div class="auth-bg-glow glow-1"></div>
    <div class="auth-bg-glow glow-2"></div>
    
    <div class="auth-container">
      <div class="auth-card glass-panel">
        <div class="auth-header">
          <router-link to="/" class="logo-link">
            <div class="logo-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.18a2 2 0 0 0-1.66 0L2.6 7.08a2 2 0 0 0 0 3.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
            </div>
          </router-link>
          <h2 class="auth-title">Chào bạn mới!</h2>
          <p class="auth-subtitle">Vui lòng chọn vai trò của bạn trên <span class="gradient-text">Learnify</span></p>
        </div>

        <div class="role-selector">
          <label class="role-option" :class="{ active: role === 'student' }">
            <input type="radio" value="student" v-model="role" class="hidden-radio" /> 
            <div class="role-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-10 5-10-5v12Z"/><path d="m22 4-10 5L2 4l10-5 10 5Z"/></svg>
              Học sinh
            </div>
          </label>
          <label class="role-option" :class="{ active: role === 'teacher' }">
            <input type="radio" value="teacher" v-model="role" class="hidden-radio" /> 
            <div class="role-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Giáo viên
            </div>
          </label>
        </div>

        <button @click="continueRegistration" class="btn btn-primary btn-full">Tiếp tục</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const role = ref('student');

const name = ref('');
const email = ref('');
const picture = ref('');

onMounted(() => {
  if (route.query.name) name.value = route.query.name;
  if (route.query.email) email.value = route.query.email;
  if (route.query.picture) picture.value = route.query.picture;
});

const continueRegistration = () => {
  router.push({
    path: '/register',
    query: {
      name: name.value,
      email: email.value,
      picture: picture.value,
      role: role.value,
      isGoogle: true
    }
  });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

.auth-wrapper {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --primary-light: #eff6ff;
  --secondary: #8b5cf6;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --bg-main: #ffffff;
  --bg-sub: #f8fafc;
  --border: #e2e8f0;

  font-family: 'Inter', sans-serif;
  color: var(--text-main);
  background-color: var(--bg-sub);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
}

html.theme-dark .auth-wrapper {
  --primary: #60a5fa;
  --primary-dark: #3b82f6;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --bg-main: #0f172a;
  --bg-sub: #1e293b;
  --border: #334155;
}

.auth-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.auth-bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.6;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: var(--primary);
  top: -10%;
  left: -5%;
  opacity: 0.2;
}

.glow-2 {
  width: 300px;
  height: 300px;
  background: var(--secondary);
  bottom: -10%;
  right: -5%;
  opacity: 0.2;
}

.auth-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  padding: 0 1.5rem;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}

html.theme-dark .glass-panel {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-link {
  display: inline-block;
  margin-bottom: 1rem;
}

.logo-icon-wrapper {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.75rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  transition: transform 0.3s ease;
}

.logo-icon-wrapper:hover {
  transform: scale(1.05);
}

.auth-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

/* Role Selector Styles */
.role-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.hidden-radio {
  display: none;
}

.role-option {
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid var(--border);
  background-color: var(--bg-main);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.role-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-muted);
}

.role-option:hover {
  border-color: var(--primary-light);
  background-color: var(--bg-sub);
}

.role-option.active {
  border-color: var(--primary);
  background-color: var(--primary-light);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

html.theme-dark .role-option.active {
  background-color: rgba(59, 130, 246, 0.15);
}

.role-option.active .role-content {
  color: var(--primary);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.39);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.btn-full {
  width: 100%;
  margin-top: 0.5rem;
}
</style>
