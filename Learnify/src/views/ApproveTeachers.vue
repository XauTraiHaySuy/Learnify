<template>
  <div class="page-container">
    <h2 class="page-title">Danh Sách Chờ Phê Duyệt</h2>
    <p class="page-desc">Quản lý và cấp quyền truy cập cho các giảng viên mới đăng ký.</p>

    <div class="table-wrapper">
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
          <!-- Giả lập dữ liệu tĩnh để test giao diện -->
          <tr v-for="teacher in teachers" :key="teacher.id">
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.email }}</td>
            <td>{{ teacher.subject }}</td>
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

// Giả lập dữ liệu từ Database
const teachers = ref([
  { id: 1, name: 'Nguyễn Văn A', email: 'gva@gmail.com', subject: 'Lịch Sử 12', status: 'pending' },
  { id: 2, name: 'Trần Thị B', email: 'gvb@gmail.com', subject: 'Toán 12', status: 'active' },
  { id: 3, name: 'Lê Văn C', email: 'gvc@gmail.com', subject: 'Vật Lý 11', status: 'pending' }
]);

const approveTeacher = (id) => {
  const teacher = teachers.value.find(t => t.id === id);
  if (teacher) {
    teacher.status = 'active';
    // Sau này nối Backend, chỗ này sẽ gọi API cập nhật Database
    alert(`Đã phê duyệt thành công cho giảng viên ${teacher.name}`);
  }
};
</script>

<style scoped>
.page-container {
  background-color: transparent;
}

.page-title {
  font-size: 24px;
  margin-bottom: 5px;
}

.page-desc {
  color: #64748b;
  margin-bottom: 25px;
  font-size: 14px;
}

:global(html.theme-dark) .page-desc {
  color: #94a3b8;
}

.table-wrapper {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: background-color 0.3s;
}

:global(html.theme-dark) .table-wrapper {
  background-color: #242440;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th, .data-table td {
  padding: 15px 20px;
  border-bottom: 1px solid #e2e8f0;
}

:global(html.theme-dark) .data-table th,
:global(html.theme-dark) .data-table td {
  border-bottom-color: #33334d;
}

.data-table th {
  background-color: #f8fafc;
  font-weight: bold;
  color: #475569;
}

:global(html.theme-dark) .data-table th {
  background-color: #1e1e38;
  color: #cbd5e1;
}

.status-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.pending {
  background-color: #fef08a;
  color: #854d0e;
}

.status-badge.active {
  background-color: #bbf7d0;
  color: #166534;
}

:global(html.theme-dark) .status-badge.pending {
  background-color: #713f12;
  color: #fef08a;
}

:global(html.theme-dark) .status-badge.active {
  background-color: #14532d;
  color: #bbf7d0;
}

.btn-approve {
  padding: 8px 15px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-approve:hover {
  background-color: #2563eb;
}

.btn-disabled {
  padding: 8px 15px;
  background-color: #cbd5e1;
  color: #64748b;
  border: none;
  border-radius: 6px;
  cursor: not-allowed;
  font-weight: bold;
}

:global(html.theme-dark) .btn-disabled {
  background-color: #334155;
  color: #94a3b8;
}
</style>