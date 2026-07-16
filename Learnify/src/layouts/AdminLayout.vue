<template>
  <div class="app-layout">
    <aside class="sidebar glass-panel">
      <div class="sidebar-logo">
        <router-link to="/" class="logo-link">
          <div class="logo-icon-wrapper">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.18a2 2 0 0 0-1.66 0L2.6 7.08a2 2 0 0 0 0 3.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
          </div>
          <h2 class="logo-text">Learnify</h2>
        </router-link>
        
        <span class="role-badge badge-admin">Hiệu trưởng</span>
      </div>

      <nav class="sidebar-menu">
        <router-link to="/admin" class="menu-item" exact-active-class="active">
          <span class="menu-icon">📊</span>
          <span class="menu-text">Bảng điều khiển</span>
        </router-link>
        
        <router-link to="/admin/approve-teachers" class="menu-item" active-class="active">
          <span class="menu-icon">✅</span>
          <span class="menu-text">Duyệt TK Giảng viên</span>
          <span class="notif-badge">{{ pendingCount }}</span>
        </router-link>
        <router-link to="/admin/manage-users" class="menu-item" active-class="active">
          <span class="menu-icon">👥</span>
          <span class="menu-text">Quản lý Người dùng</span>
        </router-link>
        <router-link to="/admin/notifications" class="menu-item" active-class="active">
          <span class="menu-icon">🔔</span>
          <span class="menu-text">Thông báo</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn-logout">
          <span class="menu-icon">🚪</span>
          <span class="menu-text">Đăng xuất</span>
        </button>
      </div>
    </aside>

    <div class="main-wrapper">
      <header class="top-header glass-header">
        <div class="header-content">
          <h3 class="welcome-text">Xin chào, <span class="gradient-text">Hiệu trưởng</span>! 👋</h3>
        </div>
      </header>

      <main class="content-area">
        <router-view v-slot="{ Component, route }" @update-pending-count="fetchPendingCount">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" :key="route.fullPath" @update-pending-count="fetchPendingCount" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { io } from 'socket.io-client';

const router = useRouter();
const route = useRoute();
const pendingCount = ref(0);
let socket = null;

const fetchPendingCount = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/admin/pending-teachers');
    if (response.ok) {
      const data = await response.json();
      pendingCount.value = data.length;
    }
  } catch (error) {
    console.error('Error fetching pending count:', error);
  }
};

watch(
  () => route.path,
  () => {
    fetchPendingCount();
  }
);

onMounted(() => {
  fetchPendingCount();
  
  socket = io('http://localhost:5000');
  
  socket.on('newTeacherRegistered', () => {
    fetchPendingCount();
  });
  
  socket.on('teacherStatusUpdated', () => {
    fetchPendingCount();
  });
});

onUnmounted(() => {
  if (socket) {
    socket.disconnect();
  }
});

const handleLogout = () => {
  localStorage.removeItem('currentRole');
  router.push('/login');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

.app-layout {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --primary-light: #eff6ff;
  --secondary: #8b5cf6;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --bg-main: #f8fafc;
  --bg-sub: #ffffff;
  --border: #e2e8f0;
  
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: var(--text-main);
  background-color: var(--bg-main);
}

h1, h2, h3, h4, .logo-text, .welcome-text {
  font-family: 'Outfit', sans-serif;
}

/* Glassmorphism Sidebar */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  z-index: 50;
  border-right: 1px solid var(--border);
  transition: all 0.3s ease;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.sidebar-logo {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-icon-wrapper {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--primary-light);
  color: var(--primary-dark);
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.role-badge.badge-admin {
  background-color: #fef08a;
  color: #854d0e;
}

.sidebar-menu {
  flex: 1;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  text-decoration: none;
  color: var(--text-muted);
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: var(--bg-sub);
  color: var(--text-main);
  transform: translateX(4px);
}

.menu-item.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  font-weight: 600;
}

.notif-badge {
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
  margin-left: auto;
}

.sidebar-footer {
  padding: 1.5rem 1rem;
  border-top: 1px solid var(--border);
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.85rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid transparent;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background-color: #ef4444;
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Glassmorphism Header */
.top-header {
  height: 80px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid var(--border);
}

.glass-header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.welcome-text {
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content-area {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
  position: relative;
}

/* --- ANIMATION CHUYỂN TRANG --- */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}
</style>

<style>
/* Đặt ở unscoped style block để tránh lỗi override biến CSS */
html.theme-dark .app-layout {
  --primary: #60a5fa;
  --primary-dark: #3b82f6;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --bg-main: #0f172a;
  --bg-sub: #1e293b;
  --border: #334155;
}

html.theme-dark .glass-panel {
  background: rgba(30, 41, 59, 0.85);
}

html.theme-dark .role-badge {
  background-color: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
}

html.theme-dark .role-badge.badge-admin {
  background-color: rgba(234, 179, 8, 0.15);
  color: #fde047;
}

html.theme-dark .btn-logout {
  color: #f87171;
}

html.theme-dark .btn-logout:hover {
  color: white;
}

html.theme-dark .glass-header {
  background: rgba(15, 23, 42, 0.8);
}
</style>