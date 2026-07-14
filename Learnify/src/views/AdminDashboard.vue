<template>
  <div class="dashboard-container">
    <h2 class="animate-title">Bảng Điều Khiển Tổng Quan ✨</h2>
    <p class="animate-subtitle">Theo dõi các chỉ số và hoạt động mới nhất.</p>
    
    <div class="stats-grid">
      <!-- Thẻ 1 -->
      <div class="stat-card card-gradient-1">
        <div class="icon-wrapper">📚</div>
        <div class="stat-info">
          <h3>Khóa học</h3>
          <p class="number">12</p>
        </div>
        <div class="glow-effect"></div>
      </div>
      
      <!-- Thẻ 2 -->
      <div class="stat-card card-gradient-2">
        <div class="icon-wrapper">👨‍🎓</div>
        <div class="stat-info">
          <h3>Học sinh</h3>
          <p class="number">156</p>
        </div>
        <div class="glow-effect"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hiệu ứng xuất hiện từ dưới lên */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-title {
  font-size: 28px;
  animation: fadeInUp 0.6s ease-out backwards;
}

.animate-subtitle {
  color: #64748b;
  margin-bottom: 30px;
  animation: fadeInUp 0.6s ease-out 0.1s backwards;
}

:global(html.theme-dark) .animate-subtitle {
  color: #94a3b8;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

/* --- THIẾT KẾ THẺ CARD LUNG LINH --- */
.stat-card {
  position: relative;
  display: flex;
  align-items: center;
  padding: 25px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0,0,0,0.03);
  overflow: hidden;
  cursor: pointer;
  animation: fadeInUp 0.6s ease-out backwards;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

:global(html.theme-dark) .stat-card {
  background-color: #242440;
  border-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

/* Delay cho từng thẻ để xuất hiện nối tiếp nhau */
.stat-card:nth-child(1) { animation-delay: 0.2s; }
.stat-card:nth-child(2) { animation-delay: 0.3s; }

/* Hiệu ứng Hover nổi 3D */
.stat-card:hover {
  transform: translateY(-8px);
}

.card-gradient-1:hover {
  box-shadow: 0 20px 30px rgba(59, 130, 246, 0.15);
}

.card-gradient-2:hover {
  box-shadow: 0 20px 30px rgba(16, 185, 129, 0.15);
}

/* Icon thiết kế hiện đại */
.icon-wrapper {
  font-size: 36px;
  margin-right: 20px;
  padding: 15px;
  background: rgba(243, 244, 246, 0.8);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  z-index: 2;
}

:global(html.theme-dark) .icon-wrapper {
  background: rgba(255, 255, 255, 0.05);
}

.stat-info {
  z-index: 2;
}

.stat-info h3 {
  font-size: 15px;
  color: #64748b;
  margin-bottom: 5px;
}

:global(html.theme-dark) .stat-info h3 {
  color: #94a3b8;
}

.stat-info .number {
  font-size: 34px;
  font-weight: 800;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-gradient-2 .number {
  background: linear-gradient(45deg, #10b981, #3b82f6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Vệt sáng chéo chạy qua thẻ (Lung linh) */
.glow-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
  transform: skewX(-25deg);
  transition: all 0.7s;
  z-index: 1;
}

:global(html.theme-dark) .glow-effect {
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
}

.stat-card:hover .glow-effect {
  left: 200%;
}
</style>