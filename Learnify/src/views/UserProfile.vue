<template>
  <div class="profile-container">
    <div class="profile-header glass-panel">
      <h2>Thông tin cá nhân</h2>
      <p class="subtitle">Quản lý thông tin và hình ảnh đại diện của bạn</p>
    </div>

    <div class="profile-content glass-panel">
      <div class="profile-image-section">
        <div class="image-wrapper">
          <img :src="profileData.avatar" alt="Profile avatar" class="avatar-img" />
          <div class="overlay">
            <label for="avatar-upload" class="upload-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </label>
            <input type="file" id="avatar-upload" accept="image/*" @change="handleFileUpload" hidden />
          </div>
        </div>
        <p class="role-badge">{{ userRole === 'student' ? 'Sinh viên' : 'Giảng viên' }}</p>
      </div>

      <div class="profile-info-section">
        <form @submit.prevent="saveProfile" class="profile-form">
          <div class="form-group">
            <label for="fullName">Họ và tên</label>
            <input type="text" id="fullName" v-model="profileData.fullName" class="form-control" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="profileData.email" class="form-control" readonly disabled />
          </div>
          <div class="form-group">
            <label for="dateOfBirth">Ngày sinh</label>
            <input type="date" id="dateOfBirth" v-model="profileData.dateOfBirth" class="form-control" />
          </div>
          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input type="text" id="phone" v-model="profileData.phone" class="form-control" />
          </div>
          <div class="form-group">
            <label for="bio">Giới thiệu bản thân</label>
            <textarea id="bio" v-model="profileData.bio" rows="4" class="form-control"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

const userRole = ref('');

const profileData = ref({
  fullName: 'Người dùng',
  email: 'user@example.com',
  phone: '',
  dateOfBirth: '',
  bio: '',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
});

onMounted(() => {
  const role = localStorage.getItem('currentRole') || 'student';
  userRole.value = role;
  
  const userStr = localStorage.getItem('user');
  let userId = 'default';
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      userId = user.id || 'default';
    } catch (e) {}
  }
  
  // Load saved profile data if exists
  const savedProfile = localStorage.getItem(`userProfile_${userId}`);
  if (savedProfile) {
    try {
      profileData.value = { ...profileData.value, ...JSON.parse(savedProfile) };
    } catch (e) {
      console.error('Error parsing profile data', e);
    }
  } else {
    if (userStr) {
       const user = JSON.parse(userStr);
       profileData.value.fullName = user.name;
       if (user.email) profileData.value.email = user.email;
    } else {
       profileData.value.fullName = role === 'student' ? 'Sinh viên' : 'Giảng viên';
    }
    profileData.value.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`;
  }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileData.value.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  const userStr = localStorage.getItem('user');
  let userId = 'default';
  if (userStr) {
    try {
      userId = JSON.parse(userStr).id || 'default';
    } catch (e) {}
  }
  
  localStorage.setItem(`userProfile_${userId}`, JSON.stringify(profileData.value));
  
  // Emit custom event so layouts can update the avatar
  window.dispatchEvent(new Event('profileUpdated'));
  
  Swal.fire({
    title: 'Thành công!',
    text: 'Đã lưu thông tin thành công!',
    icon: 'success',
    confirmButtonText: 'Đóng'
  });
};
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border);
  padding: 2rem;
  margin-bottom: 2rem;
}

.profile-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 0.5rem 0;
}

.subtitle {
  color: var(--text-muted);
  margin: 0;
}

.profile-content {
  display: flex;
  gap: 3rem;
}

.profile-image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.image-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 4px solid white;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-wrapper:hover .overlay {
  opacity: 1;
}

.upload-btn {
  color: white;
  cursor: pointer;
  background: var(--primary);
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.upload-btn:hover {
  transform: scale(1.1);
}

.role-badge {
  display: inline-block;
  padding: 0.35rem 1rem;
  background-color: var(--primary-light);
  color: var(--primary-dark);
  border-radius: 99px;
  font-size: 0.9rem;
  font-weight: 600;
}

.profile-info-section {
  flex: 1;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: var(--text-main);
  font-size: 0.95rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--bg-sub);
  color: var(--text-main);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-control:read-only {
  background-color: #f1f5f9;
  color: var(--text-muted);
  cursor: not-allowed;
}

.form-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
    align-items: center;
  }
  
  .profile-info-section {
    width: 100%;
  }
}

html.theme-dark .glass-panel {
  background: rgba(30, 41, 59, 0.85);
  border-color: var(--border);
}

html.theme-dark .form-control {
  background-color: rgba(15, 23, 42, 0.5);
  border-color: var(--border);
}

html.theme-dark .form-control:read-only {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
