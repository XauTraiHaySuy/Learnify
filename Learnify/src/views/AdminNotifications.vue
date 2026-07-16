<template>
  <div class="page-container">
    <div class="header-section">
      <div class="header-content-left">
        <h2 class="page-title">Thông Báo Hệ Thống 🔔</h2>
        <p class="page-desc">Quản lý và phản hồi các yêu cầu từ giảng viên và sinh viên.</p>
      </div>
    </div>

    <!-- Danh sách thông báo -->
    <div class="notifications-list">
      <div v-for="notif in notifications" :key="notif.id" :class="['notif-card glass-panel', { 'is-resolved': notif.status !== 'pending' }]">
        
        <div class="notif-header">
          <div class="sender-info">
            <div :class="['sender-avatar', notif.role === 'teacher' ? 'bg-purple' : 'bg-green']">
              {{ notif.sender.charAt(0) }}
            </div>
            <div>
              <h4 class="sender-name">{{ notif.sender }} <span class="role-badge">{{ notif.role === 'teacher' ? 'Giảng viên' : 'Sinh viên' }}</span></h4>
              <span class="notif-time">{{ notif.time }}</span>
            </div>
          </div>
          <div v-if="notif.status !== 'pending'" :class="['status-badge', notif.status]">
            {{ notif.status === 'accepted' ? 'Đã tiếp nhận' : 'Đã từ chối' }}
          </div>
        </div>

        <div class="notif-body">
          <p class="notif-content">{{ notif.content }}</p>
        </div>

        <div class="notif-actions" v-if="notif.status === 'pending'">
          <button class="btn-decline" @click="handleResponse(notif.id, 'declined')">
            Từ chối
          </button>
          <button class="btn-accept" @click="handleResponse(notif.id, 'accepted')">
            Xác nhận tiếp nhận giải quyết
          </button>
        </div>

      </div>

      <div v-if="notifications.length === 0" class="empty-state text-muted text-center">
        Không có thông báo nào mới.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notifications = ref([
  {
    id: 1,
    sender: 'Nguyễn Văn A',
    role: 'teacher',
    time: '10 phút trước',
    content: 'Xin chào Admin, tôi gặp sự cố với hệ thống điểm danh lớp Toán 12 sáng nay. Vui lòng kiểm tra lại giúp tôi.',
    status: 'pending'
  },
  {
    id: 2,
    sender: 'Lê Thị C',
    role: 'student',
    time: '1 giờ trước',
    content: 'Thưa thầy/cô, em không thể truy cập vào bài giảng môn Vật lý tuần 3, hệ thống báo lỗi quyền truy cập.',
    status: 'pending'
  },
  {
    id: 3,
    sender: 'Trần Văn B',
    role: 'teacher',
    time: 'Hôm qua',
    content: 'Yêu cầu mở thêm khóa học luyện thi khối A cho học sinh lớp 12.',
    status: 'accepted'
  }
]);

const handleResponse = (id, status) => {
  const notif = notifications.value.find(n => n.id === id);
  if (notif) {
    notif.status = status;
    const actionText = status === 'accepted' ? 'tiếp nhận giải quyết' : 'từ chối';
    alert(`Đã thông báo lại cho ${notif.role === 'teacher' ? 'giảng viên' : 'sinh viên'} ${notif.sender} rằng yêu cầu đã được ${actionText}.`);
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

h1, h2, h3, h4 {
  font-family: 'Outfit', sans-serif;
}

.header-section {
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

.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
}

.notif-card {
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.notif-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px -10px rgba(0, 0, 0, 0.1);
}

.notif-card.is-resolved {
  opacity: 0.75;
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.sender-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sender-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
}

.bg-purple { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
.bg-green { background: linear-gradient(135deg, #10b981, #059669); }

.sender-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.role-badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  background: #f1f5f9;
  color: #475569;
  border-radius: 99px;
  font-weight: 500;
}

.notif-time {
  font-size: 0.85rem;
  color: #64748b;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.accepted {
  background-color: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.status-badge.declined {
  background-color: rgba(239, 68, 68, 0.15);
  color: #dc2626;
}

.notif-body {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(248, 250, 252, 0.5);
  border-radius: 12px;
  border-left: 3px solid #3b82f6;
}

.notif-content {
  margin: 0;
  line-height: 1.6;
  color: #334155;
}

.notif-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-accept, .btn-decline {
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-accept {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.25);
}

.btn-accept:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(59, 130, 246, 0.4);
}

.btn-decline {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.btn-decline:hover {
  background: #ef4444;
  color: white;
}

.text-muted { color: #64748b; }
.text-center { text-align: center; }
.empty-state { padding: 3rem 0; font-size: 1.1rem; }
</style>

<style>
html.theme-dark .page-container { color: #f8fafc; }
html.theme-dark .page-desc { color: #94a3b8; }
html.theme-dark .glass-panel {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
html.theme-dark .role-badge { background: #334155; color: #cbd5e1; }
html.theme-dark .notif-time { color: #94a3b8; }
html.theme-dark .notif-body { background: rgba(15, 23, 42, 0.5); }
html.theme-dark .notif-content { color: #cbd5e1; }
html.theme-dark .btn-decline { background: rgba(239, 68, 68, 0.15); color: #f87171; }
html.theme-dark .btn-decline:hover { background: #ef4444; color: white; }
</style>
