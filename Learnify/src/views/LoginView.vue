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
          <h2 class="auth-title">Đăng Nhập</h2>
          <p class="auth-subtitle">Chào mừng trở lại với <span class="gradient-text">Learnify</span></p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input 
                type="text" 
                id="username" 
                v-model="username" 
                placeholder="Ví dụ: admin, gv_ly, hoặc hocsinh1"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                placeholder="Nhập mật khẩu của bạn"
                required
              />
              <button type="button" class="btn-toggle-password" @click="showPassword = !showPassword" aria-label="Hiện/ẩn mật khẩu">
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-full">Đăng nhập ngay</button>

          <div class="divider">
            <span>hoặc</span>
          </div>

          <button type="button" class="btn btn-google btn-full" @click="handleGoogleLogin">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" aria-hidden="true" class="google-icon"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path></svg>
            Đăng nhập bằng Google
          </button>

          <p class="toggle-text">
            Chưa có tài khoản? 
            <router-link to="/register" class="link">Đăng ký ngay</router-link>
          </p>
        </form>
      </div>

      <!-- Toast Notification -->
      <div class="toast-container">
        <Transition name="toast-slide">
          <div v-if="showToast" class="toast-notification" :class="{ 'toast-error': isError }">
            <div class="toast-icon">
              <svg v-if="!isError" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
            <div class="toast-content">
              <h4>{{ isError ? 'Đăng nhập thất bại!' : 'Đăng nhập thành công!' }}</h4>
              <p>{{ toastText }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { googleTokenLogin } from 'vue3-google-login';

const router = useRouter();
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const showToast = ref(false);
const isError = ref(false);
const toastText = ref('');
const isLoading = ref(false);

const handleGoogleLogin = async () => {
  try {
    const response = await googleTokenLogin();
    if (!response.access_token) return;
    
    isLoading.value = true;
    const res = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: response.access_token,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      isError.value = true;
      toastText.value = data.message || 'Lỗi xác thực Google!';
      showToast.value = true;
      setTimeout(() => { showToast.value = false; }, 3000);
      return;
    }

    if (data.status === 'new') {
      // Need to register
      router.push({
        path: '/google-role-select',
        query: {
          name: data.payload.name,
          email: data.payload.email,
          picture: data.payload.picture
        }
      });
    } else if (data.status === 'exists') {
      // Logged in
      isError.value = false;
      const userRole = data.user.role;
      
      if (userRole === 'admin') {
        toastText.value = '👑 Chào mừng Hiệu trưởng (Admin) quay lại!';
      } else if (userRole === 'instructor' || userRole === 'teacher') {
        toastText.value = '🎓 Chào mừng Giảng viên quay lại!';
      } else {
        toastText.value = '📚 Chào mừng Học sinh quay lại!';
      }

      localStorage.setItem('currentRole', userRole);
      localStorage.setItem('user', JSON.stringify(data.user));

      const userId = data.user.id;
      const savedProfile = localStorage.getItem(`userProfile_${userId}`);
      let profileData = savedProfile ? JSON.parse(savedProfile) : {};
      profileData.fullName = data.user.name;
      if (data.googleEmail || data.user.email) profileData.email = data.googleEmail || data.user.email;
      if (data.googleAvatar) profileData.avatar = data.googleAvatar;
      localStorage.setItem(`userProfile_${userId}`, JSON.stringify(profileData));

      showToast.value = true;

      setTimeout(() => {
        showToast.value = false;
        if (userRole === 'admin') router.push('/admin');
        else if (userRole === 'instructor' || userRole === 'teacher') router.push('/instructor');
        else router.push('/student');
      }, 1500);
    }
  } catch (error) {
    isError.value = true;
    toastText.value = 'Không thể kết nối đến server!';
    showToast.value = true;
    setTimeout(() => { showToast.value = false; }, 3000);
  } finally {
    isLoading.value = false;
  }
};

const handleLogin = async () => {
  if (!username.value || !password.value) return;
  
  isLoading.value = true;
  
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      isError.value = true;
      toastText.value = data.message || 'Sai mật khẩu hoặc tài khoản!';
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
      return;
    }

    // Success
    isError.value = false;
    const userRole = data.user.role;
    
    if (userRole === 'admin') {
      toastText.value = '👑 Chào mừng Hiệu trưởng (Admin) quay lại!';
    } else if (userRole === 'instructor' || userRole === 'teacher') {
      toastText.value = '🎓 Chào mừng Giảng viên quay lại!';
    } else {
      toastText.value = '📚 Chào mừng Học sinh quay lại!';
    }

    localStorage.setItem('currentRole', userRole);
    localStorage.setItem('user', JSON.stringify(data.user));

    const userId = data.user.id;
    const savedProfile = localStorage.getItem(`userProfile_${userId}`);
    let profileData = savedProfile ? JSON.parse(savedProfile) : {};
    profileData.fullName = data.user.name;
    if (data.user.email) profileData.email = data.user.email;
    localStorage.setItem(`userProfile_${userId}`, JSON.stringify(profileData));

    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
      
      if (userRole === 'admin') {
        router.push('/admin');
      } else if (userRole === 'instructor' || userRole === 'teacher') {
        router.push('/instructor');
      } else {
        router.push('/student');
      }
    }, 1500);

  } catch (error) {
    isError.value = true;
    toastText.value = 'Không thể kết nối đến server!';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  } finally {
    isLoading.value = false;
  }
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
  padding: 2rem;
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

.auth-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
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

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-main);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 0.95rem;
  background-color: var(--bg-main);
  color: var(--text-main);
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.btn-toggle-password {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 6px;
  transition: color 0.2s;
}

.btn-toggle-password:hover {
  color: var(--primary);
  background: var(--bg-sub);
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

.toggle-text {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.link:hover {
  text-decoration: underline;
  color: var(--primary-dark);
}

.google-icon {
  margin-right: 0.25rem;
}

.btn-google {
  background-color: var(--bg-main);
  color: var(--text-main);
  border: 1px solid var(--border);
  display: flex;
  gap: 0.5rem;
  margin-top: 0;
}

.btn-google:hover {
  background-color: var(--bg-sub);
  border-color: #d1d5db;
}

.google-icon {
  margin-right: 0.25rem;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--border);
}

.divider span {
  padding: 0 1rem;
}

.btn-google:hover {
  background-color: var(--bg-sub);
  border-color: #d1d5db;
}

.google-icon {
  margin-right: 0.25rem;
}

/* Toast Notification Styles */
.toast-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
}

.toast-notification {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-main);
  border-left: 4px solid #10b981;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

html.theme-dark .toast-notification {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
}

.toast-icon {
  color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.1);
  padding: 0.5rem;
  border-radius: 50%;
}

.toast-error {
  border-left-color: #ef4444;
}

.toast-error .toast-icon {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.toast-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}

.toast-content p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>