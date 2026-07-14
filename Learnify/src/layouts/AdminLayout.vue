<template>
  <div class="admin-layout">
    
    <aside class="sidebar">
      <div class="sidebar-logo">
        <h2>🎓 Learnify</h2>
        <!-- Tự động đổi tên huy hiệu theo quyền -->
        <span class="role-badge" :class="{ 'badge-admin': currentRole === 'admin' }">
          {{ currentRole === 'admin' ? 'Hiệu trưởng' : 'Giảng viên' }}
        </span>
      </div>

      <nav class="sidebar-menu">
        <router-link to="/admin" class="menu-item" exact-active-class="active">
          📊 Bảng điều khiển
        </router-link>
        
        <!-- MENU CHỈ DÀNH CHO ADMIN -->
        <template v-if="currentRole === 'admin'">
          <router-link to="/admin/approve-teachers" class="menu-item" active-class="active">
            ✅ Duyệt TK Giảng viên
          </router-link>
          <router-link to="/admin/manage-users" class="menu-item" active-class="active">
            👥 Quản lý Người dùng
          </router-link>
        </template>

        <!-- MENU CHỈ DÀNH CHO GIẢNG VIÊN -->
        <template v-if="currentRole === 'teacher'">
          <router-link to="/admin/courses" class="menu-item" active-class="active">
            📚 Quản lý Khóa học
          </router-link>
          <router-link to="/admin/ai-questions" class="menu-item" active-class="active">
            🤖 Ngân hàng Câu hỏi AI
          </router-link>
        </template>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn-logout">
          🚪 Đăng xuất
        </button>
      </div>
    </aside>

    <div class="main-wrapper">
      <header class="top-header">
        <h3>Xin chào, {{ currentRole === 'admin' ? 'Hiệu trưởng' : 'Giảng viên' }}!</h3>
      </header>

      <main class="content-area">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentRole = ref('teacher');

onMounted(() => {
  // Lấy quyền từ localStorage khi trang vừa load
  const role = localStorage.getItem('currentRole');
  if (role) {
    currentRole.value = role;
  }
});

const handleLogout = () => {
  localStorage.removeItem('currentRole');
  router.push('/login');
};
</script>

<style scoped>
/* Giữ nguyên toàn bộ CSS cũ của AdminLayout ở đây */
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s, border-color 0.3s;
}

:global(html.theme-dark) .sidebar {
  background-color: #1e1e38;
  border-right-color: #33334d;
}

.sidebar-logo {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  text-align: center;
}

:global(html.theme-dark) .sidebar-logo {
  border-bottom-color: #33334d;
}

.role-badge {
  display: inline-block;
  margin-top: 5px;
  padding: 4px 10px;
  background-color: #dbeafe;
  color: #1d4ed8;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.role-badge.badge-admin {
  background-color: #fef08a;
  color: #854d0e;
}

:global(html.theme-dark) .role-badge {
  background-color: #1e3a8a;
  color: #bfdbfe;
}

:global(html.theme-dark) .role-badge.badge-admin {
  background-color: #713f12;
  color: #fef08a;
}

.sidebar-menu {
  flex: 1;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  padding: 12px 15px;
  text-decoration: none;
  color: #475569;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

:global(html.theme-dark) .menu-item {
  color: #cbd5e1;
}

.menu-item:hover {
  background-color: #f1f5f9;
}

:global(html.theme-dark) .menu-item:hover {
  background-color: #2d2d52;
}

.menu-item.active {
  background-color: #3b82f6;
  color: #ffffff !important;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #e2e8f0;
}

:global(html.theme-dark) .sidebar-footer {
  border-top-color: #33334d;
}

.btn-logout {
  width: 100%;
  padding: 10px;
  background-color: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background-color: #fecaca;
}

:global(html.theme-dark) .btn-logout {
  background-color: #7f1d1d;
  color: #fca5a5;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-header {
  height: 70px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  transition: background-color 0.3s, border-color 0.3s;
}

:global(html.theme-dark) .top-header {
  background-color: #1e1e38;
  border-bottom-color: #33334d;
}

.content-area {
  padding: 30px;
  flex: 1;
  overflow-y: auto;
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