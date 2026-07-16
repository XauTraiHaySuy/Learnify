<template>
  <div class="page-container">
    <div class="header-actions">
      <div class="header-text">
        <h2 class="page-title">Quản Lý Khóa Học</h2>
        <p class="page-desc">Tạo bài giảng, đăng tải Video/PDF và cấu hình AI chấm điểm.</p>
      </div>
      <button class="btn-primary" @click="openAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Đăng video bài giảng
      </button>
    </div>

    <div class="courses-grid">
      <div v-for="course in courses" :key="course._id" class="course-card glass-panel" @click="goToLecture(course._id)">
        <div class="course-thumb">
          <div v-if="course.isPrivate" class="private-badge">🔒 Chỉ mình tôi</div>
          <img v-if="course.thumbnail" :src="course.thumbnail" class="course-thumbnail" alt="Thumbnail" />
          <div v-else class="play-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </div>
        </div>
        <div class="course-info">
          <span class="level-badge">{{ course.level }}</span>
          <h3>{{ course.title }}</h3>
          <p class="meta">Môn: {{ course.subject }}</p>
          <p class="time-ago">{{ formatTimeAgo(course.createdAt) }}</p>
          <div class="actions">
            <button class="btn-action btn-edit" @click.stop="openEditModal(course)">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              Sửa
            </button>
            <button class="btn-action btn-delete" @click.stop="deleteCourse(course)">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              Xóa
            </button>
            <button class="btn-action btn-toggle-privacy" @click.stop="togglePrivacy(course)">
              <template v-if="course.isPrivate">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Riêng tư
              </template>
              <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                Công khai
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal-content glass-modal">
        <div class="modal-header">
          <h3>{{ isEditMode ? 'Sửa thông tin bài giảng' : 'Đăng video bài giảng mới' }}</h3>
          <button class="btn-close" @click="showAddModal = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <form @submit.prevent="handleAddCourse" class="form-grid">
          <div class="form-group full-width">
            <label>Tên bài giảng</label>
            <input type="text" v-model="newCourse.title" placeholder="VD: Bài 1: Sự kiện lịch sử 1945" required />
          </div>

          <div class="form-group">
            <label>Cấp học</label>
            <select v-model="newCourse.level">
              <option value="Khối 10">Khối 10</option>
              <option value="Khối 11">Khối 11</option>
              <option value="Khối 12">Khối 12</option>
            </select>
          </div>

          <div class="form-group">
            <label>Môn học</label>
            <input type="text" v-model="newCourse.subject" placeholder="VD: Lịch Sử" required />
          </div>

          <template v-if="!isEditMode">
            <div class="form-group full-width upload-area" :class="{ disabled: selectedDocument }">
              <div class="upload-content">
                <template v-if="selectedVideo">
                  <div class="file-preview">
                    <p class="file-name">{{ selectedVideo.name }}</p>
                    <p class="file-size">{{ (selectedVideo.size / (1024 * 1024)).toFixed(2) }} MB</p>
                    <img v-if="videoThumbnail" :src="videoThumbnail" class="thumbnail-preview" alt="Video Thumbnail" />
                  </div>
                </template>
                <template v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  <p>Nhấp hoặc kéo thả Video Bài Giảng (MP4) vào đây</p>
                </template>
              </div>
              <input type="file" accept="video/mp4" class="file-input" @change="handleVideoUpload" :disabled="!!selectedDocument" />
            </div>

            <div class="form-group full-width upload-area" :class="{ disabled: selectedVideo }">
              <div class="upload-content">
                <template v-if="selectedDocument">
                  <div class="file-preview">
                    <p class="file-name">{{ selectedDocument.name }}</p>
                    <p class="file-size">{{ (selectedDocument.size / (1024 * 1024)).toFixed(2) }} MB</p>
                  </div>
                </template>
                <template v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <p>Nhấp hoặc kéo thả Tài Liệu (PDF) vào đây</p>
                </template>
              </div>
              <input type="file" accept="application/pdf" class="file-input" @change="handleDocumentUpload" :disabled="!!selectedVideo" />
            </div>

            <div v-if="selectedVideo || selectedDocument" class="full-width flex-center">
              <button type="button" class="btn-clear" @click="clearFiles">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                Xóa / Chọn lại
              </button>
            </div>
          </template>

          <div class="modal-actions full-width">
            <button type="button" class="btn-cancel" @click="showAddModal = false">Hủy</button>
            <button type="submit" class="btn-submit" :disabled="isUploading">
              {{ isUploading ? 'Đang lưu...' : (isEditMode ? 'Lưu thay đổi' : 'Đăng tải') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Confirm Modal -->
    <div v-if="confirmModal.show" class="modal-overlay" @click.self="closeConfirm">
      <div class="modal-content glass-modal confirm-modal">
        <div class="modal-header">
          <h3>Xác nhận</h3>
          <button class="btn-close" @click="closeConfirm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <p class="confirm-message">{{ confirmModal.message }}</p>
        <div class="modal-actions full-width">
          <button class="btn-cancel" @click="closeConfirm">Hủy</button>
          <button class="btn-submit btn-danger" @click="executeConfirm">Xác nhận</button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" class="toast-notification" :class="toast.type">
      {{ toast.message }}
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const showAddModal = ref(false);
const isEditMode = ref(false);
const editCourseId = ref(null);
const isUploading = ref(false);
const selectedVideo = ref(null);
const selectedDocument = ref(null);
const videoThumbnail = ref('');

const confirmModal = ref({
  show: false,
  message: '',
  action: null
});

const toast = ref({
  show: false,
  message: '',
  type: 'success'
});

const showConfirm = (message, action) => {
  confirmModal.value = { show: true, message, action };
};

const closeConfirm = () => {
  confirmModal.value.show = false;
};

const executeConfirm = async () => {
  if (confirmModal.value.action) {
    await confirmModal.value.action();
  }
  closeConfirm();
};

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const newCourse = ref({
  title: '',
  level: 'Khối 12',
  subject: ''
});

const courses = ref([]);

const formatTimeAgo = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'Vừa xong';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} tháng trước`;
  const years = Math.floor(months / 12);
  return `${years} năm trước`;
};

const fetchCourses = async () => {
  try {
    const userStr = localStorage.getItem('user');
    let instructorId = '';
    if (userStr) {
      const user = JSON.parse(userStr);
      instructorId = user.id;
    }
    const res = await fetch(`http://localhost:5000/api/courses?role=instructor&instructor=${instructorId}`);
    if (res.ok) {
      courses.value = await res.json();
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

onMounted(() => {
  fetchCourses();
});

const generateVideoThumbnail = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.style.display = 'none';
    document.body.appendChild(video);
    video.preload = 'metadata';
    video.src = URL.createObjectURL(file);
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      video.currentTime = 1;
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL('image/jpeg');
      URL.revokeObjectURL(video.src);
      if (document.body.contains(video)) document.body.removeChild(video);
      resolve(base64);
    };

    video.onerror = (e) => {
      URL.revokeObjectURL(video.src);
      if (document.body.contains(video)) document.body.removeChild(video);
      reject(e);
    };
  });
};

const handleVideoUpload = async (event) => {
  if (event.target.files.length > 0) {
    selectedVideo.value = event.target.files[0];
    try {
      videoThumbnail.value = await generateVideoThumbnail(selectedVideo.value);
    } catch (err) {
      console.error('Error extracting thumbnail:', err);
    }
  }
};

const handleDocumentUpload = (event) => {
  if (event.target.files.length > 0) {
    selectedDocument.value = event.target.files[0];
  }
};

const clearFiles = () => {
  selectedVideo.value = null;
  selectedDocument.value = null;
  videoThumbnail.value = '';
  const fileInputs = document.querySelectorAll('.file-input');
  fileInputs.forEach(input => input.value = '');
};

const goToLecture = (id) => {
  router.push(`/instructor/lectures/${id}`);
};

const openAddModal = () => {
  isEditMode.value = false;
  editCourseId.value = null;
  newCourse.value = { title: '', level: 'Khối 12', subject: '' };
  clearFiles();
  showAddModal.value = true;
};

const openEditModal = (course) => {
  isEditMode.value = true;
  editCourseId.value = course._id;
  newCourse.value = { title: course.title, level: course.level, subject: course.subject };
  showAddModal.value = true;
};

const deleteCourse = (course) => {
  showConfirm(`Bạn có chắc chắn muốn xóa bài giảng: ${course.title} không?`, async () => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${course._id}`);
      fetchCourses();
      showToast(`Đã xóa bài giảng: ${course.title}`);
    } catch (error) {
      console.error('Error deleting course:', error);
      showToast('Lỗi khi xóa bài giảng', 'error');
    }
  });
};

const togglePrivacy = (course) => {
  const actionText = course.isPrivate ? 'công khai' : 'riêng tư';
  showConfirm(`Bạn có chắc chắn muốn chuyển bài giảng: ${course.title} sang ${actionText} không?`, async () => {
    try {
      await axios.put(`http://localhost:5000/api/courses/${course._id}/toggle-privacy`);
      fetchCourses();
      showToast('Cập nhật trạng thái thành công');
    } catch (error) {
      console.error('Error toggling privacy:', error);
      showToast('Lỗi khi đổi trạng thái', 'error');
    }
  });
};

const handleAddCourse = async () => {
  if (isEditMode.value) {
    isUploading.value = true;
    try {
      await axios.put(`http://localhost:5000/api/courses/${editCourseId.value}`, {
        title: newCourse.value.title,
        level: newCourse.value.level,
        subject: newCourse.value.subject
      });
      await fetchCourses();
      showAddModal.value = false;
      showToast(`Đã cập nhật bài giảng: ${newCourse.value.title} thành công!`);
    } catch (error) {
      console.error('Error updating:', error);
      alert('Lỗi cập nhật');
    } finally {
      isUploading.value = false;
    }
    return;
  }

  if (!selectedVideo.value && !selectedDocument.value) {
    alert('Vui lòng chọn video hoặc tài liệu!');
    return;
  }

  // BẮT BUỘC kiểm tra file.size trước khi gửi
  const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB
  if (selectedVideo.value && selectedVideo.value.size > MAX_FILE_SIZE) {
    alert('Dung lượng video vượt quá 30MB. Vui lòng nâng cấp gói Premium để tải lên file lớn hơn!');
    return;
  }
  if (selectedDocument.value && selectedDocument.value.size > MAX_FILE_SIZE) {
    alert('Dung lượng tài liệu vượt quá 30MB. Vui lòng nâng cấp gói Premium để tải lên file lớn hơn!');
    return;
  }

  isUploading.value = true;
  try {
    const formData = new FormData();
    formData.append('title', newCourse.value.title);
    formData.append('level', newCourse.value.level);
    formData.append('subject', newCourse.value.subject);
    
    if (selectedVideo.value) {
      formData.append('video', selectedVideo.value);
      // Đảm bảo lấy được Base64 trước khi gửi
      if (!videoThumbnail.value) {
        try {
          videoThumbnail.value = await generateVideoThumbnail(selectedVideo.value);
        } catch (err) {
          console.error('Error generating thumbnail on submit:', err);
        }
      }
      if (videoThumbnail.value) {
        console.log('Thumbnail Base64 generated:', videoThumbnail.value.substring(0, 50) + '...');
        formData.append('thumbnail', videoThumbnail.value);
      }
    }
    if (selectedDocument.value) {
      formData.append('document', selectedDocument.value);
    }

    // Dùng instructor tạm thời (ví dụ lấy từ localStorage)
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      formData.append('instructor', user.id);
    }

    const res = await axios.post('http://localhost:5000/api/courses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (res.status === 201 || res.status === 200) {
      await fetchCourses(); // Tải lại danh sách từ server
      showAddModal.value = false;
      newCourse.value.title = '';
      clearFiles();
    }
  } catch (error) {
    console.error('Error uploading:', error);
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert('Lỗi hệ thống khi tải lên.');
    }
  } finally {
    isUploading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

.page-container {
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  animation: fadeIn 0.4s ease-out backwards;
}



@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1, h2, h3 {
  font-family: 'Outfit', sans-serif;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-desc {
  color: #64748b;
  font-size: 1rem;
}



.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.39);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}



.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}



.course-thumb {
  height: 160px;
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}



.play-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.3s;
}

.course-card:hover .play-icon {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.4);
}

.course-info {
  padding: 1.5rem;
}

.level-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}



.course-info h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.course-info .meta {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.time-ago {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 1.25rem;
}



.actions {
  display: flex;
  gap: 0.75rem;
}

.btn-action {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-edit {
  background: rgba(226, 232, 240, 0.8);
  color: #475569;
}

.btn-edit:hover {
  background: #cbd5e1;
}





.btn-ai {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
}

.btn-ai:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(16, 185, 129, 0.4);
}

/* MODAL STYLES */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.glass-modal {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 2rem;
  border-radius: 24px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}



@keyframes scaleIn {
  from { transform: scale(0.95) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  font-size: 1.5rem;
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.btn-close:hover {
  background-color: #f1f5f9;
  color: #ef4444;
}




.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.full-width { grid-column: 1 / -1; }

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #475569;
}



.form-group input[type="text"], 
.form-group select {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: var(--bg-color, white);
  color: var(--text-color, #0f172a);
}



.form-group input[type="text"]:focus, 
.form-group select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.upload-area {
  position: relative;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  background: #f8fafc;
  transition: all 0.2s ease;
  overflow: hidden;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}





.upload-content {
  padding: 2rem 1rem;
  text-align: center;
  color: #64748b;
  pointer-events: none;
}

.upload-icon {
  color: #94a3b8;
  margin-bottom: 0.5rem;
}




.file-input {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-cancel {
  padding: 0.75rem 1.5rem;
  border: none;
  background: #f1f5f9;
  color: #475569;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.btn-cancel:hover { background: #e2e8f0; }




.btn-submit {
  padding: 0.75rem 1.5rem;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;
}

.btn-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}
.upload-area.disabled {
  opacity: 0.5;
  pointer-events: none;
  background: #f1f5f9;
}

.file-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.file-name {
  font-weight: 600;
  color: #1e293b;
}

.file-size {
  font-size: 0.85rem;
  color: #64748b;
}

.thumbnail-preview {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 0.5rem;
  border: 1px solid #e2e8f0;
}

/* Custom Confirm Modal */
.confirm-modal {
  max-width: 400px;
  text-align: center;
}

.confirm-message {
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-danger:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-notification.success {
  background: linear-gradient(135deg, #10b981, #059669);
}

.toast-notification.error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-clear {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-clear:hover {
  background: #fecaca;
}

.flex-center {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.course-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.play-icon {
  z-index: 2;
}

.private-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(15, 23, 42, 0.75);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
  z-index: 10;
}

.btn-delete {
  background: rgba(254, 226, 226, 0.8);
  color: #ef4444;
}

.btn-delete:hover {
  background: #fecaca;
}

.btn-toggle-privacy {
  background: rgba(254, 243, 199, 0.8);
  color: #d97706;
}

.btn-toggle-privacy:hover {
  background: #fde68a;
}
</style>
<style>
/* Đặt ở unscoped style block để tránh lỗi override biến CSS */
html.theme-dark .page-container {
  color: #f8fafc;
}

html.theme-dark .page-desc {
  color: #94a3b8;
}

html.theme-dark .glass-panel {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

html.theme-dark .course-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

html.theme-dark .course-thumb {
  background: linear-gradient(135deg, #334155, #1e293b);
}

html.theme-dark .level-badge {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

html.theme-dark .meta {
  color: #94a3b8;
}

html.theme-dark .btn-edit {
  background: rgba(51, 65, 85, 0.8);
  color: #e2e8f0;
}

html.theme-dark .btn-edit:hover {
  background: #475569;
}

html.theme-dark .glass-modal {
  background: rgba(30, 41, 59, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

html.theme-dark .btn-close { color: #94a3b8; }

html.theme-dark .btn-close:hover { background-color: #334155; }

html.theme-dark .form-group label { color: #cbd5e1; }

html.theme-dark .form-group input[type="text"], 
html.theme-dark .form-group select {
  background: var(--bg-color, #0f172a);
  border-color: #334155;
  color: var(--text-color, white);
}

html.theme-dark .upload-area {
  border-color: #475569;
  background: rgba(15, 23, 42, 0.5);
}

html.theme-dark .upload-area:hover {
  border-color: #3b82f6;
  background: rgba(30, 58, 138, 0.2);
}

html.theme-dark .upload-content { color: #94a3b8; }

html.theme-dark .upload-icon { color: #64748b; }

html.theme-dark .btn-cancel {
  background: #334155;
  color: #e2e8f0;
}

html.theme-dark .btn-cancel:hover { background: #475569; }

html.theme-dark .btn-delete {
  background: rgba(127, 29, 29, 0.4);
  color: #f87171;
}

html.theme-dark .btn-delete:hover {
  background: rgba(127, 29, 29, 0.6);
}

html.theme-dark .btn-toggle-privacy {
  background: rgba(120, 53, 15, 0.4);
  color: #fbbf24;
}

html.theme-dark .btn-toggle-privacy:hover {
  background: rgba(120, 53, 15, 0.6);
}
</style>
