<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Đăng Ký</h2>
      <p class="login-subtitle">Tạo tài khoản Learnify mới</p>

      <!-- Chọn Role -->
      <div class="role-selector">
        <label class="role-option">
          <input type="radio" value="student" v-model="role" /> Học sinh
        </label>
        <label class="role-option">
          <input type="radio" value="teacher" v-model="role" /> Giáo viên
        </label>
      </div>

      <form @submit.prevent="handleRegister" class="login-form">
        <div class="form-group">
          <label for="name">Họ và tên</label>
          <input type="text" id="name" v-model="name" placeholder="Nhập họ và tên" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Nhập email" required />
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input type="password" id="password" v-model="password" placeholder="Nhập mật khẩu" required />
        </div>

        <!-- Form động: Chỉ hiện khi chọn role là Giáo viên -->
        <div v-if="role === 'teacher'" class="form-group teacher-extra">
          <label for="subject">Môn giảng dạy (Chuyên môn)</label>
          <input type="text" id="subject" v-model="subject" placeholder="Ví dụ: Lịch Sử Khối 12" required />
        </div>

        <button type="submit" class="btn-submit">Tạo tài khoản</button>
        
        <p class="toggle-text">
          Đã có tài khoản? 
          <router-link to="/login" class="link">Đăng nhập</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('student');
const subject = ref(''); // Dành riêng cho giáo viên

const handleRegister = () => {
  // Tạm thời chưa có database nên ta giả lập đăng ký thành công
  alert(`Đăng ký thành công tài khoản ${role.value === 'teacher' ? 'Giáo viên' : 'Học sinh'}! Vui lòng đăng nhập.`);
  router.push('/login');
};
</script>

<style scoped>
/* Tái sử dụng CSS giao diện từ Login để đồng bộ */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
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
  margin-bottom: 20px;
  color: #666;
}

html.theme-dark .login-subtitle {
  color: #aaa;
}

.role-selector {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

html.theme-dark .role-selector {
  border-bottom-color: #444;
}

.role-option {
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.teacher-extra {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
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
  background-color: #10b981; /* Đổi màu xanh lá cho nút Đăng ký */
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
  background-color: #059669;
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
</style>