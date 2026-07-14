<template>
  <div class="page-container">
    <div class="header-actions">
      <div>
        <h2 class="page-title">Quản Lý Khóa Học</h2>
        <p class="page-desc">Tạo bài giảng, đăng tải Video/PDF và cấu hình AI chấm điểm.</p>
      </div>
      <button class="btn-primary" @click="showAddModal = true">
        + Thêm Khóa Học Mới
      </button>
    </div>

    <div class="courses-grid">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <div class="course-thumb">🎥</div>
        <div class="course-info">
          <h3>{{ course.title }}</h3>
          <p class="meta">Khối: {{ course.level }} | Môn: {{ course.subject }}</p>
          <div class="actions">
            <button class="btn-edit">Chỉnh sửa</button>
            <button class="btn-ai">🤖 Cấu hình AI</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal-content">
        <h3>Tạo Khóa Học Mới</h3>
        
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
            <label>Đăng tải Video Bài Giảng (MP4)</label>
            <input type="file" accept="video/mp4" />
          </div>

          <div class="form-group full-width upload-area">
            <label>Đăng tải Tài Liệu (PDF)</label>
            <input type="file" accept="application/pdf" />
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
.page-container {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 24px;
}

.page-desc {
  color: #64748b;
  font-size: 14px;
  margin-top: 5px;
}

:global(html.theme-dark) .page-desc { color: #94a3b8; }

.btn-primary {
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover { background-color: #2563eb; }

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.course-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: 0.3s;
  border: 1px solid transparent;
}

:global(html.theme-dark) .course-card {
  background: #242440;
  border-color: #33334d;
}

.course-card:hover { transform: translateY(-5px); }

.course-thumb {
  height: 120px;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

:global(html.theme-dark) .course-thumb { background: #1e1e38; }

.course-info { padding: 20px; }

.course-info h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.course-info .meta {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 15px;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn-edit, .btn-ai {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.btn-edit {
  background: #f1f5f9;
  color: #475569;
}

:global(html.theme-dark) .btn-edit {
  background: #334155;
  color: #cbd5e1;
}

.btn-ai {
  background: #10b981;
  color: #fff;
}

/* MODAL STYLES */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
  animation: scaleIn 0.3s ease-out;
}

:global(html.theme-dark) .modal-content {
  background: #1e1e38;
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-content h3 { margin-bottom: 20px; }

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.full-width { grid-column: 1 / -1; }

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
}

:global(html.theme-dark) .form-group input, 
:global(html.theme-dark) .form-group select {
  background: #242440;
  border-color: #444;
  color: #fff;
}

.upload-area input {
  padding: 8px;
  border: 1px dashed #3b82f6;
  background: #eff6ff;
  cursor: pointer;
}

:global(html.theme-dark) .upload-area input {
  background: #1e3a8a;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.btn-cancel {
  padding: 10px 15px;
  border: none;
  background: #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

:global(html.theme-dark) .btn-cancel {
  background: #334155;
  color: #fff;
}

.btn-submit {
  padding: 10px 15px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>