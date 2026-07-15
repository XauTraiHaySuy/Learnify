<template>
  <div class="page-container">
    <div class="header-section">
      <h2 class="page-title">Danh Sách Chờ Phê Duyệt</h2>
      <p class="page-desc">Quản lý và cấp quyền truy cập cho các giảng viên mới đăng ký.</p>
    </div>

    <div class="table-wrapper glass-panel">
      <table class="data-table">
        <thead>
          <tr>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Môn Giảng Dạy</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers" :key="teacher.id">
            <td>
              <div class="user-info">
                <div class="user-avatar">
                  {{ teacher.name.charAt(0) }}
                </div>
                <span class="user-name">{{ teacher.name }}</span>
              </div>
            </td>
            <td class="text-muted">{{ teacher.email }}</td>
            <td>
              <span class="subject-badge">{{ teacher.subject }}</span>
            </td>
            <td>
              <span :class="['status-badge', teacher.status]">
                {{ teacher.status === 'pending' ? 'Chờ duyệt' : 'Đã duyệt' }}
              </span>
            </td>
            <td>
              <button 
                v-if="teacher.status === 'pending'" 
                @click="approveTeacher(teacher.id)" 
                class="btn-approve"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Phê duyệt
              </button>
              <button v-else class="btn-disabled" disabled>
                Hoàn tất
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const teachers = ref([
  { id: 1, name: 'Nguyễn Văn A', email: 'gva@gmail.com', subject: 'Lịch Sử 12', status: 'pending' },
  { id: 2, name: 'Trần Thị B', email: 'gvb@gmail.com', subject: 'Toán 12', status: 'active' },
  { id: 3, name: 'Lê Văn C', email: 'gvc@gmail.com', subject: 'Vật Lý 11', status: 'pending' }
]);

const approveTeacher = (id) => {
  const teacher = teachers.value.find(t => t.id === id);
  if (teacher) {
    teacher.status = 'active';
    // alert(`Đã phê duyệt thành công cho giảng viên ${teacher.name}`);
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

.header-section {
  margin-bottom: 2rem;
}

h1, h2, h3, .user-name {
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



.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
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

.data-table tbody tr:last-child td {
  border-bottom: none;
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

.status-badge.pending {
  background-color: rgba(234, 179, 8, 0.15);
  color: #b45309;
}

.status-badge.active {
  background-color: rgba(16, 185, 129, 0.15);
  color: #059669;
}





.btn-approve {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
}

.btn-approve:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(16, 185, 129, 0.4);
}

.btn-disabled {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #e2e8f0;
  color: #94a3b8;
  border: none;
  border-radius: 8px;
  cursor: not-allowed;
  font-weight: 600;
  font-size: 0.9rem;
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

html.theme-dark .data-table th,
:global(html.theme-dark) .data-table td {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

html.theme-dark .data-table th {
  background-color: rgba(30, 41, 59, 0.5);
  color: #cbd5e1;
}

html.theme-dark .data-table tbody tr:hover {
  background-color: rgba(15, 23, 42, 0.3);
}

html.theme-dark .user-name {
  color: #f8fafc;
}

html.theme-dark .text-muted {
  color: #94a3b8;
}

html.theme-dark .subject-badge {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
}

html.theme-dark .status-badge.pending {
  background-color: rgba(234, 179, 8, 0.2);
  color: #fde047;
}

html.theme-dark .status-badge.active {
  background-color: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

html.theme-dark .btn-disabled {
  background-color: #334155;
  color: #64748b;
}
</style>
