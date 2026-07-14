<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Đăng Nhập</h2>
      <p class="login-subtitle">Chào mừng bạn trở lại với Learnify</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="Nhập email của bạn (Thử gõ gv@gmail.com)"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <button type="submit" class="btn-submit">Đăng nhập</button>

        <p class="toggle-text">
          Chưa có tài khoản? 
          <router-link to="/register" class="link">Đăng ký ngay</router-link>
        </p>
      </form>
    </div>

    <!-- Thông báo góc màn hình -->
    <div :class="['toast-message', { 'show': showToast }]">
      {{ toastText }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const showToast = ref(false);
const toastText = ref('');

const handleLogin = () => {
  let userRole = 'student';
  
  // GIẢ LẬP CHECK DATABASE (Phân tách rõ 3 quyền)
  if (email.value.includes('admin')) {
    userRole = 'admin';
    toastText.value = '👑 Chào mừng Hiệu trưởng (Admin) quay lại!';
  } else if (email.value.includes('gv')) {
    userRole = 'teacher';
    toastText.value = '🎓 Chào mừng Giảng viên quay lại!';
  } else {
    toastText.value = '📚 Chào mừng Học sinh quay lại!';
  }

  // Lưu quyền vào trình duyệt để Sidebar biết đường hiển thị menu
  localStorage.setItem('currentRole', userRole);

  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
    
    if (userRole === 'admin' || userRole === 'teacher') {
      router.push('/admin');
    } else {
      router.push('/student');
    }
  }, 1500);
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  position: relative;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: background-color 0.3s, box-shadow 0.3s;
}

html.theme-dark .login-card {
  background-color: #242440;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.login-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 5px;
}

.login-subtitle {
  text-align: center;
  font-size: 14px;
  margin-bottom: 25px;
  color: #666;
}

html.theme-dark .login-subtitle {
  color: #aaa;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s, background-color 0.3s;
}

html.theme-dark .form-group input {
  background-color: #1a1a2e;
  border-color: #444;
  color: #fff;
}

.form-group input:focus {
  border-color: #3b82f6;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.btn-submit:hover {
  background-color: #2563eb;
}

.toggle-text {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}

/* CSS cho thông báo Toast */
.toast-message {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #10b981;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.toast-message.show {
  transform: translateY(0);
  opacity: 1;
}
</style>