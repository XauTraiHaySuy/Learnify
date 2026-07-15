<template>
  <div class="page-container">
    <div class="header-actions">
      <div class="header-text">
        <h2 class="page-title">Quản Lý Khóa Học</h2>
        <p class="page-desc">Tạo bài giảng, đăng tải Video/PDF và cấu hình AI chấm điểm.</p>
      </div>
      <button class="btn-primary" @click="showAddModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Thêm Khóa Học
      </button>
    </div>

    <div class="courses-grid">
      <div v-for="course in courses" :key="course.id" class="course-card glass-panel">
        <div class="course-thumb">
          <div class="play-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </div>
        </div>
        <div class="course-info">
          <span class="level-badge">{{ course.level }}</span>
          <h3>{{ course.title }}</h3>
          <p class="meta">Môn: {{ course.subject }}</p>
          <div class="actions">
            <button class="btn-action btn-edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              Sửa
            </button>
            <button class="btn-action btn-ai">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              Cấu hình AI
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal-content glass-modal">
        <div class="modal-header">
          <h3>Tạo Khóa Học Mới</h3>
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

          <div class="form-group full-width upload-area">
            <div class="upload-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
              <p>Nhấp hoặc kéo thả Video Bài Giảng (MP4) vào đây</p>
            </div>
            <input type="file" accept="video/mp4" class="file-input" />
          </div>

          <div class="form-group full-width upload-area">
            <div class="upload-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              <p>Nhấp hoặc kéo thả Tài Liệu (PDF) vào đây</p>
            </div>
            <input type="file" accept="application/pdf" class="file-input" />
          </div>

          <div class="modal-actions full-width">
            <button type="button" class="btn-cancel" @click="showAddModal = false">Hủy</button>
            <button type="submit" class="btn-submit">Lưu Khóa Học</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showAddModal = ref(false);

const newCourse = ref({
  title: '',
  level: 'Khối 12',
  subject: ''
});

const courses = ref([
  { id: 1, title: 'Bài 1: Trật tự thế giới mới', level: 'Khối 12', subject: 'Lịch Sử' },
  { id: 2, title: 'Bài 2: Liên Hợp Quốc', level: 'Khối 12', subject: 'Lịch Sử' }
]);

const handleAddCourse = () => {
  courses.value.push({
    id: Date.now(),
    title: newCourse.value.title,
    level: newCourse.value.level,
    subject: newCourse.value.subject
  });
  showAddModal.value = false;
  newCourse.value.title = '';
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
  background: white;
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
:global(html.theme-dark) .form-group select {
  background: #0f172a;
  border-color: #334155;
  color: white;
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
</style>
