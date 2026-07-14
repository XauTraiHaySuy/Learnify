<template>
  <div class="student-layout">
    
    <!-- THANH MENU TRÊN CÙNG (TOP NAVBAR) -->
    <header class="top-navbar">
      <div class="nav-left">
        <h2 class="logo">🎓 Learnify</h2>
        <nav class="nav-links">
          <router-link to="/" exact-active-class="active">Trang chủ</router-link>
          <router-link to="/my-courses" active-class="active">Khóa học của tôi</router-link>
        </nav>
      </div>
      
      <div class="nav-right">
        <div class="user-profile">
          <span class="avatar">👨‍🎓</span>
          <span class="user-name">Học sinh</span>
        </div>
        <button @click="handleLogout" class="btn-logout">Đăng xuất</button>
        <!-- Khoảng trống 80px bên phải để nhường chỗ cho nút gạt Sáng/Tối của App.vue -->
        <div class="theme-toggle-space"></div>
      </div>
    </header>

    <!-- KHU VỰC NỘI DUNG CHÍNH -->
    <main class="student-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('currentRole');
  router.push('/login');
};
</script>

<style scoped>
.student-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* --- TOP NAVBAR --- */
.top-navbar {
  height: 70px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  transition: background-color 0.3s, border-color 0.3s;
}

:global(html.theme-dark) .top-navbar {
  background-color: #181818;
  border-bottom-color: #33334d;
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.logo {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 22px;
  font-weight: 900;
  margin-right: 20px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #64748b;
  font-weight: bold;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s;
}

:global(html.theme-dark) .nav-links a {
  color: #94a3b8;
}

.nav-links a:hover {
  background-color: #f1f5f9;
}

:global(html.theme-dark) .nav-links a:hover {
  background-color: #2d2d52;
}

.nav-links a.active {
  color: #3b82f6;
  background-color: #eff6ff;
}

:global(html.theme-dark) .nav-links a.active {
  color: #60a5fa;
  background-color: #1e3a8a;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.avatar {
  font-size: 24px;
  background: #f1f5f9;
  border-radius: 50%;
  padding: 5px;
}

:global(html.theme-dark) .avatar {
  background: #2d2d52;
}

.btn-logout {
  padding: 8px 16px;
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #fecaca;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-logout:hover {
  background-color: #fee2e2;
}

:global(html.theme-dark) .btn-logout {
  border-color: #7f1d1d;
}

:global(html.theme-dark) .btn-logout:hover {
  background-color: #7f1d1d;
}

/* Nhường chỗ cho nút gạt ở App.vue */
.theme-toggle-space {
  width: 60px;
}

/* --- NỘI DUNG CHÍNH --- */
.student-content {
  flex: 1;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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