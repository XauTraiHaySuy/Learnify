<template>
  <div class="home-container">
    <div class="welcome-banner">
      <div class="banner-text">
        <h2>Chào mừng trở lại, Học sinh! 🚀</h2>
        <p>Hôm nay là một ngày tuyệt vời để học thêm kiến thức mới.</p>
      </div>
    </div>

    <h3 class="section-title">Khóa học nổi bật</h3>
    
    <div class="courses-grid">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <div class="course-thumb">📚</div>
        <div class="course-info">
          <span class="badge">{{ course.level }}</span>
          <h4>{{ course.title }}</h4>
          <p class="subject">Môn: {{ course.subject }}</p>
          <button class="btn-start">Bắt đầu học ngay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const courses = ref([
  { id: 1, title: 'Bài 1: Trật tự thế giới mới', level: 'Khối 12', subject: 'Lịch Sử' },
  { id: 2, title: 'Bài 2: Liên Hợp Quốc', level: 'Khối 12', subject: 'Lịch Sử' },
  { id: 3, title: 'Bài 3: ASEAN', level: 'Khối 12', subject: 'Lịch Sử' }
]);
</script>

<style scoped>
.welcome-banner {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  border-radius: 16px;
  padding: 40px;
  color: white;
  margin-bottom: 40px;
  box-shadow: 0 10px 20px rgba(0, 114, 255, 0.2);
  animation: fadeInDown 0.6s ease-out;
}

:global(html.theme-dark) .welcome-banner {
  background: linear-gradient(135deg, #1f1f1f, #181818, #121212);
  border: 1px solid #2f2f2f;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  color: #e5e5e5;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.welcome-banner h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.section-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: #334155;
}

:global(html.theme-dark) .section-title {
  color: #cbd5e1;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.course-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid transparent;
  animation: fadeInUp 0.6s ease-out backwards;
}

.course-card:nth-child(2) { animation-delay: 0.1s; }
.course-card:nth-child(3) { animation-delay: 0.2s; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

:global(html.theme-dark) .course-card {
  background: #181818;
  border-color: #2f2f2f;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
}

.course-thumb {
  height: 160px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
}

:global(html.theme-dark) .course-thumb {
  background: #121212;
}

.course-info {
  padding: 25px;
}

.badge {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

:global(html.theme-dark) .badge {
  background: #1e3a8a;
  color: #bfdbfe;
}

.course-info h4 {
  font-size: 18px;
  margin: 15px 0 5px 0;
}

.subject {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 20px;
}

.btn-start {
  width: 100%;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: bold;
  color: #3b82f6;
  cursor: pointer;
  transition: 0.3s;
}

.btn-start:hover {
  background: #3b82f6;
  color: white;
}

:global(html.theme-dark) .btn-start {
  background: #2b2b2b;
  border-color: #2f2f2f;
  color: #e5e5e5;
}

:global(html.theme-dark) .btn-start:hover {
  background: #3b82f6;
}
</style>