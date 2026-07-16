<template>
  <div class="page-container">
    <div class="header-section">
      <div class="header-content-left">
        <h2 class="page-title">Quản Lý Giảng Viên ✨</h2>
        <p class="page-desc">Thêm mới, chuyển đổi và quản lý tài khoản giảng viên trong hệ thống.</p>
      </div>
      <button class="btn-primary" @click="openAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Thêm Giảng Viên
      </button>
    </div>

    <!-- Thống kê nhỏ -->
    <div class="stats-row">
      <div class="stat-card glass-panel">
        <div class="stat-icon text-blue">👨‍🏫</div>
        <div class="stat-info">
          <h4>Tổng số giảng viên</h4>
          <p class="stat-num">{{ teachers.length }}</p>
        </div>
      </div>
      <div class="stat-card glass-panel">
        <div class="stat-icon text-green">✅</div>
        <div class="stat-info">
          <h4>Đang hoạt động</h4>
          <p class="stat-num">{{ teachers.filter(t => t.status === 'active').length }}</p>
        </div>
      </div>
      <div class="stat-card glass-panel">
        <div class="stat-icon text-orange">🔄</div>
        <div class="stat-info">
          <h4>Đã chuyển đổi</h4>
          <p class="stat-num">2</p>
        </div>
      </div>
    </div>

    <!-- Bảng danh sách giảng viên -->
    <div class="table-wrapper glass-panel mt-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>Giảng viên</th>
            <th>Email</th>
            <th>Môn chuyên môn</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers" :key="teacher.id">
            <td>
              <div class="user-info">
                <div class="user-avatar">{{ teacher.name.charAt(0) }}</div>
                <span class="user-name">{{ teacher.name }}</span>
              </div>
            </td>
            <td class="text-muted">{{ teacher.email }}</td>
            <td>
              <span class="subject-badge">{{ teacher.subject }}</span>
            </td>
            <td>
              <span :class="['status-badge', teacher.status]">
                {{ teacher.status === 'active' ? 'Hoạt động' : 'Tạm khóa' }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="btn-icon btn-schedule" @click="openScheduleModal(teacher)" title="Xem Lịch Dạy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </button>
                <button class="btn-icon btn-edit" @click="openEditModal(teacher)" title="Chuyển đổi/Sửa">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button class="btn-icon btn-delete" @click="deleteTeacher(teacher.id)" title="Xóa">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="teachers.length === 0">
            <td colspan="5" class="text-center py-4 text-muted">Không có dữ liệu giảng viên</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Thêm/Sửa Giảng Viên -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content glass-panel">
        <h3 class="modal-title">{{ isEdit ? 'Chuyển Đổi / Sửa Tài Khoản' : 'Thêm Giảng Viên Mới' }}</h3>
        
        <form @submit.prevent="saveTeacher" class="form-layout">
          <div class="form-group">
            <label>Họ và Tên</label>
            <input type="text" v-model="formData.name" required placeholder="Nhập tên giảng viên" />
          </div>
          
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="formData.email" required placeholder="Nhập email" />
          </div>
          
          <div class="form-group">
            <label>Môn chuyên môn</label>
            <input type="text" v-model="formData.subject" required placeholder="VD: Toán 12" />
          </div>
          
          <div class="form-group">
            <label>Trạng thái</label>
            <select v-model="formData.status">
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm khóa</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="closeModal">Hủy</button>
            <button type="submit" class="btn-primary">Lưu Thay Đổi</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Xem Lịch Dạy -->
    <div v-if="showScheduleModal" class="modal-overlay" @click.self="closeScheduleModal">
      <div class="modal-content glass-panel schedule-modal">
        <h3 class="modal-title">Lịch Dạy - {{ selectedTeacher?.name }}</h3>
        
        <div class="schedule-details">
          <div class="schedule-item">
            <div class="schedule-icon bg-blue">📅</div>
            <div class="schedule-info">
              <label>Tổng số lịch dạy trong tuần</label>
              <p><strong>{{ Math.floor(Math.random() * 10) + 5 }}</strong> buổi</p>
            </div>
          </div>
          
          <div class="schedule-item">
            <div class="schedule-icon bg-green">📚</div>
            <div class="schedule-info">
              <label>Hôm nay dạy môn</label>
              <p><strong>{{ selectedTeacher?.subject }}</strong></p>
            </div>
          </div>

          <div class="schedule-item">
            <div class="schedule-icon bg-purple">⏰</div>
            <div class="schedule-info">
              <label>Số tiết hôm nay</label>
              <p><strong>{{ Math.floor(Math.random() * 4) + 1 }}</strong> tiết</p>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-primary" @click="closeScheduleModal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const teachers = ref([
  { id: 1, name: 'Nguyễn Văn A', email: 'gva@gmail.com', subject: 'Lịch Sử 12', status: 'active' },
  { id: 2, name: 'Trần Thị B', email: 'gvb@gmail.com', subject: 'Toán 12', status: 'active' },
]);

const showModal = ref(false);
const isEdit = ref(false);
const formData = ref({ id: null, name: '', email: '', subject: '', status: 'active' });

const showScheduleModal = ref(false);
const selectedTeacher = ref(null);

const openScheduleModal = (teacher) => {
  selectedTeacher.value = teacher;
  showScheduleModal.value = true;
};

const closeScheduleModal = () => {
  showScheduleModal.value = false;
};

const openAddModal = () => {
  isEdit.value = false;
  formData.value = { id: null, name: '', email: '', subject: '', status: 'active' };
  showModal.value = true;
};

const openEditModal = (teacher) => {
  isEdit.value = true;
  formData.value = { ...teacher };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveTeacher = () => {
  if (isEdit.value) {
    const index = teachers.value.findIndex(t => t.id === formData.value.id);
    if (index !== -1) {
      teachers.value[index] = { ...formData.value };
    }
  } else {
    teachers.value.push({
      ...formData.value,
      id: Date.now()
    });
  }
  closeModal();
};

const deleteTeacher = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa giảng viên này? Hành động này không thể hoàn tác.')) {
    teachers.value = teachers.value.filter(t => t.id !== id);
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

h1, h2, h3, h4, .user-name {
  font-family: 'Outfit', sans-serif;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(59, 130, 246, 0.4);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 16px;
  gap: 1rem;
}

.stat-icon {
  font-size: 2rem;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
}

.stat-info h4 {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0 0 0.25rem 0;
  font-weight: 500;
}

.stat-num {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
}

.mt-4 {
  margin-top: 1.5rem;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
}

.data-table th, .data-table td {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.data-table th {
  background-color: rgba(248, 250, 252, 0.5);
  font-weight: 600;
  color: #475569;
  font-size: 0.95rem;
}

.data-table tbody tr {
  transition: background-color 0.2s;
}

.data-table tbody tr:hover {
  background-color: rgba(241, 245, 249, 0.5);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}

.user-name {
  font-weight: 600;
  color: #0f172a;
}

.text-muted {
  color: #64748b;
}

.text-center {
  text-align: center;
}
.py-4 {
  padding: 1rem 0;
}

.subject-badge {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.active {
  background-color: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.status-badge.inactive {
  background-color: rgba(239, 68, 68, 0.15);
  color: #dc2626;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.btn-edit:hover {
  background: #3b82f6;
  color: white;
}

.btn-schedule {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.btn-schedule:hover {
  background: #10b981;
  color: white;
}

.btn-delete {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.btn-delete:hover {
  background: #ef4444;
  color: white;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: scale(1);
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #0f172a;
}

.form-layout {
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
  font-size: 0.95rem;
  color: #475569;
}

.form-group input, .form-group select {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s;
  background: #f8fafc;
}

.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: white;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: #f1f5f9;
  color: #475569;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #e2e8f0;
  color: #0f172a;
}

/* Schedule Modal Styles */
.schedule-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.schedule-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.bg-blue { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
.bg-green { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.bg-purple { background: rgba(139, 92, 246, 0.15); color: #8b5cf6; }

.schedule-info {
  display: flex;
  flex-direction: column;
}

.schedule-info label {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.schedule-info p {
  margin: 0;
  font-size: 1.1rem;
  color: #0f172a;
}
</style>

<style>
html.theme-dark .page-container { color: #f8fafc; }
html.theme-dark .page-desc { color: #94a3b8; }
html.theme-dark .glass-panel {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
html.theme-dark .stat-num { color: #f8fafc; }
html.theme-dark .data-table th,
html.theme-dark .data-table td { border-bottom-color: rgba(255, 255, 255, 0.1); }
html.theme-dark .data-table th { background-color: rgba(30, 41, 59, 0.5); color: #cbd5e1; }
html.theme-dark .data-table tbody tr:hover { background-color: rgba(15, 23, 42, 0.3); }
html.theme-dark .user-name { color: #f8fafc; }
html.theme-dark .text-muted { color: #94a3b8; }
html.theme-dark .subject-badge { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
html.theme-dark .modal-content { background: #1e293b; color: #f8fafc; }
html.theme-dark .modal-title { color: #f8fafc; }
html.theme-dark .form-group label { color: #cbd5e1; }
html.theme-dark .form-group input, html.theme-dark .form-group select {
  background: #0f172a; border-color: #334155; color: #f8fafc;
}
html.theme-dark .form-group input:focus, html.theme-dark .form-group select:focus {
  border-color: #3b82f6; background: #1e293b;
}
html.theme-dark .btn-secondary { background: #334155; color: #cbd5e1; }
html.theme-dark .btn-secondary:hover { background: #475569; color: #f8fafc; }
html.theme-dark .schedule-item { background: #0f172a; border-color: #334155; }
html.theme-dark .schedule-info p { color: #f8fafc; }
html.theme-dark .schedule-info label { color: #94a3b8; }
</style>
