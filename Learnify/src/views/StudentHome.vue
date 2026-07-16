<template>
  <div class="home-container">
    <div class="welcome-banner glass-banner">
      <div class="banner-text">
        <h2 class="animate-title">Chào mừng trở lại, Học sinh! 🚀</h2>
        <p class="animate-subtitle">Hôm nay là một ngày tuyệt vời để học thêm kiến thức mới.</p>
      </div>
      <div class="banner-decoration"></div>
    </div>

    <div class="section-header">
      <h3 class="section-title">Khóa học nổi bật</h3>
      <button class="btn-view-all">Xem tất cả</button>
    </div>
    
    <div class="courses-grid">
      <div v-for="(course, index) in courses" :key="course.id" class="course-card glass-panel" :style="{ animationDelay: `${0.1 * (index + 1)}s` }" @click="goToLecture(course.id)">
        <div class="course-thumb">
          <div class="thumb-icon">📚</div>
        </div>
        <div class="course-info">
          <span class="badge">{{ course.level }}</span>
          <h4>{{ course.title }}</h4>
          <p class="subject">Môn: {{ course.subject }}</p>
          <button class="btn-start">
            Bắt đầu học ngay
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLecture = (id) => {
  router.push(`/student/lectures/${id}`);
};

const courses = ref([
  { id: 1, title: 'Bài 1: Trật tự thế giới mới', level: 'Khối 12', subject: 'Lịch Sử' },
  { id: 2, title: 'Bài 2: Liên Hợp Quốc', level: 'Khối 12', subject: 'Lịch Sử' },
  { id: 3, title: 'Bài 3: ASEAN', level: 'Khối 12', subject: 'Lịch Sử' }
]);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

.home-container {
  font-family: 'Inter', sans-serif;
  color: #0f172a;
}

h1, h2, h3, h4 {
  font-family: 'Outfit', sans-serif;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.welcome-banner {
  position: relative;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 24px;
  padding: 3rem;
  color: white;
  margin-bottom: 3rem;
  box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.4);
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out backwards;
}

.glass-banner {
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.banner-decoration {
  position: absolute;
  top: -50%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  pointer-events: none;
}

.banner-text {
  position: relative;
  z-index: 2;
}

.welcome-banner h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.welcome-banner p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.btn-view-all {
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  transition: all 0.2s ease;
}

.btn-view-all:hover {
  background: rgba(59, 130, 246, 0.1);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
}

.course-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s;
  animation: fadeInUp 0.6s ease-out backwards;
  display: flex;
  flex-direction: column;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.course-thumb {
  height: 180px;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb-icon {
  font-size: 4rem;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.course-card:hover .thumb-icon {
  transform: scale(1.1) rotate(5deg);
}

.course-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.badge {
  align-self: flex-start;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 0.35rem 0.85rem;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.course-info h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.subject {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.btn-start {
  width: 100%;
  padding: 0.85rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-weight: 600;
  color: #3b82f6;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-start svg {
  transition: transform 0.3s ease;
}

.btn-start:hover {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.btn-start:hover svg {
  transform: translateX(4px);
}
</style>

<style>
/* Đặt ở unscoped style block để tránh lỗi override biến CSS */
html.theme-dark .home-container {
  color: #f8fafc;
}

html.theme-dark .welcome-banner {
  background: linear-gradient(135deg, #1e3a8a, #4c1d95);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

html.theme-dark .section-title {
  color: #f8fafc;
}

html.theme-dark .btn-view-all:hover {
  background: rgba(59, 130, 246, 0.15);
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
  background: linear-gradient(135deg, #1e293b, #0f172a);
}

html.theme-dark .badge {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

html.theme-dark .subject {
  color: #94a3b8;
}

html.theme-dark .btn-start {
  background: rgba(15, 23, 42, 0.5);
  border-color: #334155;
  color: #e2e8f0;
}

html.theme-dark .btn-start:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
</style>