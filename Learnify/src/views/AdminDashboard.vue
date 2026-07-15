<template>
  <div class="dashboard-container">
    <div class="header-section">
      <h2 class="animate-title">Bảng Điều Khiển Tổng Quan ✨</h2>
      <p class="animate-subtitle">Theo dõi các chỉ số và hoạt động mới nhất.</p>
    </div>
    
    <div class="stats-grid">
      <!-- Thẻ 1 -->
      <div class="stat-card glass-card">
        <div class="icon-wrapper icon-blue">📚</div>
        <div class="stat-info">
          <h3>Tổng Khóa học</h3>
          <p class="number gradient-text-blue">12</p>
        </div>
        <div class="glow-effect"></div>
      </div>
      
      <!-- Thẻ 2 -->
      <div class="stat-card glass-card">
        <div class="icon-wrapper icon-green">👨‍🎓</div>
        <div class="stat-info">
          <h3>Tổng Học sinh</h3>
          <p class="number gradient-text-green">156</p>
        </div>
        <div class="glow-effect"></div>
      </div>
      
      <!-- Thẻ 3 -->
      <div class="stat-card glass-card">
        <div class="icon-wrapper icon-purple">👨‍🏫</div>
        <div class="stat-info">
          <h3>Giảng viên</h3>
          <p class="number gradient-text-purple">18</p>
        </div>
        <div class="glow-effect"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

.dashboard-container {
  font-family: 'Inter', sans-serif;
  color: #0f172a;
}



.header-section {
  margin-bottom: 2rem;
}

h1, h2, h3, .number {
  font-family: 'Outfit', sans-serif;
}

/* Hiệu ứng xuất hiện từ dưới lên */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  animation: fadeInUp 0.6s ease-out backwards;
}

.animate-subtitle {
  color: #64748b;
  font-size: 1rem;
  animation: fadeInUp 0.6s ease-out 0.1s backwards;
}



.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* --- THIẾT KẾ THẺ CARD LUNG LINH --- */
.stat-card {
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  animation: fadeInUp 0.6s ease-out backwards;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
}



/* Delay cho từng thẻ để xuất hiện nối tiếp nhau */
.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }

/* Hiệu ứng Hover nổi 3D */
.stat-card:hover {
  transform: translateY(-8px);
}

.stat-card:nth-child(1):hover {
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
}
.stat-card:nth-child(2):hover {
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
}
.stat-card:nth-child(3):hover {
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.15);
}

/* Icon thiết kế hiện đại */
.icon-wrapper {
  font-size: 2rem;
  margin-right: 1.5rem;
  padding: 1rem;
  border-radius: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-blue {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}
.icon-green {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}
.icon-purple {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}





.stat-info {
  z-index: 2;
}

.stat-info h3 {
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  margin: 0 0 0.5rem 0;
}



.stat-info .number {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  line-height: 1;
}

.gradient-text-blue {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-green {
  background: linear-gradient(135deg, #10b981, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-purple {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Vệt sáng chéo chạy qua thẻ (Lung linh) */
.glow-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
  transform: skewX(-25deg);
  transition: all 0.7s;
  z-index: 1;
}



.stat-card:hover .glow-effect {
  left: 200%;
}
</style>
<style>
/* Đặt ở unscoped style block để tránh lỗi override biến CSS */
html.theme-dark .dashboard-container {
  color: #f8fafc;
}

html.theme-dark .animate-subtitle {
  color: #94a3b8;
}

html.theme-dark .glass-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

html.theme-dark .icon-blue { background: rgba(59, 130, 246, 0.15); }

html.theme-dark .icon-green { background: rgba(16, 185, 129, 0.15); }

html.theme-dark .icon-purple { background: rgba(139, 92, 246, 0.15); }

html.theme-dark .stat-info h3 {
  color: #94a3b8;
}

html.theme-dark .glow-effect {
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
}
</style>
