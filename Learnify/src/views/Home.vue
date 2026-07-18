<template>
  <div class="home-wrapper">
    <!-- Header / Navbar -->
    <header class="navbar" :class="{ 'scrolled': isScrolled }">
      <div class="nav-container">
        <div class="logo">
          <div class="logo-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.18a2 2 0 0 0-1.66 0L2.6 7.08a2 2 0 0 0 0 3.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
          </div>
          <div class="logo-text-wrapper" style="display: flex; flex-direction: column;">
            <span class="logo-text">Learnify</span>
            <span class="real-time-clock" style="font-size: 0.75rem; color: var(--text-muted); line-height: 1; margin-top: 2px; font-weight: 500; font-family: 'Inter', sans-serif;">{{ currentTime }}</span>
          </div>
        </div>
        
        <nav class="nav-menu">
          <a href="#hero" class="nav-item">Trang chủ</a>
          <a href="#features" class="nav-item">Tính năng</a>
          <a href="#about" class="nav-item">Về chúng tôi</a>
        </nav>

        <div class="nav-actions">
          <template v-if="!currentRole">
            <router-link to="/login" class="btn btn-ghost">Đăng nhập</router-link>
            <router-link to="/register" class="btn btn-primary">Bắt đầu ngay</router-link>
          </template>
          <template v-else>
            <button @click="goToDashboard(currentRole === 'admin' || currentRole === 'teacher' ? '/admin' : '/student')" class="btn btn-primary">Vào hệ thống</button>
            <button @click="logout" class="btn btn-ghost">Đăng xuất</button>
          </template>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main>
      <!-- Hero Section -->
      <section id="hero" class="hero-section">
        <div class="hero-bg-glow glow-1"></div>
        <div class="hero-bg-glow glow-2"></div>
        <div class="hero-container">
          <div class="hero-content">
            <div class="badge-pill">✨ Nền tảng học tập chuẩn Bộ GD&ĐT</div>
            <h1 class="hero-title">
              Chinh phục tri thức từ <br/>
              <span class="gradient-text">Tiểu học đến THPT</span>
            </h1>
            <p class="hero-desc">
              Learnify đồng hành cùng các em học sinh trên mọi chặng đường. Từ xây dựng nền tảng vững chắc cấp 1 đến bứt phá điểm số kỳ thi THPT Quốc gia.
            </p>
            <div class="hero-buttons">
              <template v-if="!currentRole">
                <router-link to="/register" class="btn btn-primary btn-lg">Bắt đầu học thử miễn phí</router-link>
                <a href="#courses" class="btn btn-outline btn-lg">Khám phá lộ trình</a>
              </template>
              <template v-else>
                <button @click="goToDashboard(currentRole === 'admin' || currentRole === 'teacher' ? '/admin' : '/student')" class="btn btn-primary btn-lg">Đến Bảng Điều Khiển</button>
              </template>
            </div>
            
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-num">Cấp 1-3</span>
                <span class="stat-label">Chương trình toàn diện</span>
              </div>
              <div class="divider"></div>
              <div class="stat-item">
                <span class="stat-num">5.000+</span>
                <span class="stat-label">Bài giảng & Đề thi</span>
              </div>
              <div class="divider"></div>
              <div class="stat-item">
                <span class="stat-num">Top 1</span>
                <span class="stat-label">Nền tảng giáo dục số</span>
              </div>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="glass-mockup">
              <div class="mockup-header">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
              </div>
              <div class="mockup-body">
                <div class="mockup-course">
                  <div class="course-img skeleton-img"></div>
                  <div class="course-info">
                    <div class="skeleton-text w-full"></div>
                    <div class="skeleton-text w-half"></div>
                  </div>
                </div>
                <div class="mockup-course">
                  <div class="course-img skeleton-img"></div>
                  <div class="course-info">
                    <div class="skeleton-text w-full"></div>
                    <div class="skeleton-text w-half"></div>
                  </div>
                </div>
                <div class="mockup-course">
                  <div class="course-img skeleton-img"></div>
                  <div class="course-info">
                    <div class="skeleton-text w-full"></div>
                    <div class="skeleton-text w-half"></div>
                  </div>
                </div>
              </div>
              
              <div class="floating-element badge-online">
                <span class="pulse-dot"></span> 1,204 đang học
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-section">
        <div class="section-header">
          <h2 class="section-title">Phương pháp học tập <span class="gradient-text">vượt trội</span></h2>
          <p class="section-desc">Hệ thống giáo án được thiết kế cá nhân hóa, bám sát sách giáo khoa mới và cập nhật liên tục theo xu hướng giáo dục hiện đại.</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper bg-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </div>
            <h3 class="feature-title">Bám sát SGK & Chương trình mới</h3>
            <p class="feature-desc">Kho tài liệu từ Lớp 1 đến Lớp 12 được biên soạn bởi các giáo viên chuyên môn cao, đảm bảo chất lượng và bám sát kiến thức chuẩn.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper bg-purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="m4 6 8-4 8 4"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>
            </div>
            <h3 class="feature-title">Luyện thi chuyển cấp & THPTQG</h3>
            <p class="feature-desc">Hệ thống đề thi thử, luyện phản xạ giải đề và ngân hàng câu hỏi phân loại cao giúp các em tự tin chinh phục các kỳ thi lớn.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper bg-green">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 class="feature-title">Gia sư AI & Báo cáo học tập</h3>
            <p class="feature-desc">Phân tích điểm mạnh, điểm yếu của từng học sinh qua AI. Gửi báo cáo kết quả chi tiết hàng tuần cho phụ huynh để dễ dàng đồng hành.</p>
          </div>
        </div>
      </section>
      
      <!-- Popular Courses Section -->
      <section id="courses" class="courses-section">
        <div class="section-header">
          <h2 class="section-title">Lộ trình học <span class="gradient-text">Tiêu biểu</span></h2>
          <p class="section-desc">Các lớp học trực tuyến tương tác cao, thiết kế chuyên biệt cho từng cấp bậc để khơi dậy niềm đam mê học hỏi.</p>
        </div>

        <div class="courses-grid">
          <!-- Cấp 1 -->
          <div class="course-card">
            <div class="course-thumbnail skeleton-img">
              <div class="course-badge">Cấp 1 (Tiểu học)</div>
            </div>
            <div class="course-content">
              <div class="course-meta">
                <span class="course-category">Lớp 3 - Lớp 5</span>
                <span class="course-rating">⭐ 4.9 (2.1k)</span>
              </div>
              <h3 class="course-title">Toán Tư Duy & Tiếng Việt Khám Phá</h3>
              <p class="course-instructor">Giảng viên: Cô Thu Thủy</p>
              <div class="course-footer">
                <span class="course-price">399.000đ/tháng</span>
                <a href="#" class="btn btn-outline btn-sm">Xem chi tiết</a>
              </div>
            </div>
          </div>
          
          <!-- Cấp 2 -->
          <div class="course-card">
            <div class="course-thumbnail skeleton-img">
              <div class="course-badge">Cấp 2 (THCS)</div>
            </div>
            <div class="course-content">
              <div class="course-meta">
                <span class="course-category">Lớp 9</span>
                <span class="course-rating">⭐ 4.8 (3.5k)</span>
              </div>
              <h3 class="course-title">Luyện Thi Vào 10 Chuyên Toán - Lý</h3>
              <p class="course-instructor">Giảng viên: Thầy Minh Tuấn</p>
              <div class="course-footer">
                <span class="course-price">499.000đ/tháng</span>
                <a href="#" class="btn btn-outline btn-sm">Xem chi tiết</a>
              </div>
            </div>
          </div>
          
          <!-- Cấp 3 -->
          <div class="course-card">
            <div class="course-thumbnail skeleton-img">
              <div class="course-badge">Cấp 3 (THPT)</div>
            </div>
            <div class="course-content">
              <div class="course-meta">
                <span class="course-category">Lớp 12</span>
                <span class="course-rating">⭐ 5.0 (5.8k)</span>
              </div>
              <h3 class="course-title">Tổng Ôn & Luyện Đề THPT Quốc Gia (Khối A00)</h3>
              <p class="course-instructor">Giảng viên: Thầy Quốc Bảo</p>
              <div class="course-footer">
                <span class="course-price">599.000đ/tháng</span>
                <a href="#" class="btn btn-outline btn-sm">Xem chi tiết</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats / Trusted By -->
      <section class="stats-banner">
        <div class="stats-container">
          <div class="stat-box">
            <h3 class="stat-number">50+</h3>
            <p class="stat-text">Trường học đối tác</p>
          </div>
          <div class="stat-box">
            <h3 class="stat-number">100k+</h3>
            <p class="stat-text">Học viên toàn cầu</p>
          </div>
          <div class="stat-box">
            <h3 class="stat-number">98%</h3>
            <p class="stat-text">Tỷ lệ hài lòng</p>
          </div>
          <div class="stat-box">
            <h3 class="stat-number">24/7</h3>
            <p class="stat-text">Hỗ trợ học tập</p>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section id="testimonials" class="testimonials-section">
        <div class="section-header">
          <h2 class="section-title">Đồng hành cùng <span class="gradient-text">Học sinh & Phụ huynh</span></h2>
          <p class="section-desc">Sự tin tưởng và kết quả học tập vượt bậc của các em học sinh là minh chứng rõ nhất cho chất lượng tại Learnify.</p>
        </div>

        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="quote-icon">❝</div>
            <p class="testimonial-text">"Hệ thống bài giảng rất sinh động, con mình học lớp 4 rất hứng thú với các bài Toán tư duy. Tính năng báo cáo giúp mình nắm rõ tình hình học của con."</p>
            <div class="testimonial-author">
              <div class="author-avatar skeleton-img"></div>
              <div class="author-info">
                <h4 class="author-name">Chị Lan Phương</h4>
                <p class="author-role">Phụ huynh học sinh Tiểu học</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="quote-icon">❝</div>
            <p class="testimonial-text">"Nhờ các bộ đề luyện thi vào lớp 10 bám sát cấu trúc của Sở mà em đã tự tin thi đỗ vào trường chuyên đúng như nguyện vọng. Thầy cô giải đáp rất tận tình!"</p>
            <div class="testimonial-author">
              <div class="author-avatar skeleton-img"></div>
              <div class="author-info">
                <h4 class="author-name">Nguyễn Tuấn Kiệt</h4>
                <p class="author-role">Học sinh lớp 10 Chuyên Khoa Học Tự Nhiên</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="quote-icon">❝</div>
            <p class="testimonial-text">"Lộ trình ôn thi THPT Quốc gia vô cùng khoa học. Các mẹo giải nhanh trắc nghiệm môn Lý và Hóa đã giúp điểm thi của em cải thiện rõ rệt, đạt 26.5 khối A."</p>
            <div class="testimonial-author">
              <div class="author-avatar skeleton-img"></div>
              <div class="author-info">
                <h4 class="author-name">Hoàng Ngọc Hân</h4>
                <p class="author-role">Tân sinh viên Đại học Bách Khoa</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section id="about" class="cta-section">
        <div class="cta-container">
          <div class="cta-content">
            <h2 class="cta-title">Sẵn sàng bứt phá điểm số?</h2>
            <p class="cta-desc">Tham gia cùng hàng ngàn học sinh đang cải thiện thành tích mỗi ngày. Tạo tài khoản để nhận bộ tài liệu và bài giảng dùng thử ngay hôm nay.</p>
            <div class="cta-actions">
              <router-link to="/register" class="btn btn-primary btn-lg cta-btn">Đăng ký tài khoản miễn phí</router-link>
            </div>
          </div>
          <div class="cta-bg-shape"></div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <div class="logo">
            <div class="logo-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.18a2 2 0 0 0-1.66 0L2.6 7.08a2 2 0 0 0 0 3.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
            </div>
            <span class="logo-text">Learnify</span>
          </div>
          <p class="footer-bio">
            Nền tảng giáo dục tiên phong giúp việc học trở nên dễ dàng, linh hoạt và hiệu quả hơn.
          </p>
          <div class="social-links">
            <a href="#" class="social-btn" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" class="social-btn" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" class="social-btn" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="footer-col">
            <h4 class="footer-col-title">Sản phẩm</h4>
            <ul>
              <li><a href="#">Tính năng</a></li>
              <li><a href="#">Bảng giá</a></li>
              <li><a href="#">Hướng dẫn</a></li>
              <li><a href="#">Tài liệu API</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">Công ty</h4>
            <ul>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Tuyển dụng</a></li>
              <li><a href="#">Tin tức</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">Pháp lý</h4>
            <ul>
              <li><a href="#">Điều khoản</a></li>
              <li><a href="#">Bảo mật</a></li>
              <li><a href="#">Chính sách cookie</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Learnify Inc. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentRole = ref(null);
const isScrolled = ref(false);
const currentTime = ref('');
let timeInterval = null;

const updateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString('vi-VN');
  const time = now.toLocaleTimeString('vi-VN', { hour12: false });
  currentTime.value = `${time} | ${date}`;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  currentRole.value = localStorage.getItem('currentRole');
  window.addEventListener('scroll', handleScroll);
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (timeInterval) clearInterval(timeInterval);
});

const logout = () => {
  localStorage.removeItem('currentRole');
  currentRole.value = null;
  router.push('/');
};

const goToDashboard = (path) => {
  router.push(path);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

/* --- Reset & Base Variables --- */
.home-wrapper {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --primary-light: #eff6ff;
  --secondary: #8b5cf6;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --bg-main: #ffffff;
  --bg-sub: #f8fafc;
  --border: #e2e8f0;
  
  font-family: 'Inter', sans-serif;
  color: var(--text-main);
  background-color: var(--bg-main);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

h1, h2, h3, h4, .logo-text {
  font-family: 'Outfit', sans-serif;
}

html.theme-dark .home-wrapper {
  --primary: #60a5fa;
  --primary-dark: #3b82f6;
  --primary-light: rgba(59, 130, 246, 0.15);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --bg-main: #0f172a;
  --bg-sub: #1e293b;
  --border: #334155;
}

/* --- Utilities --- */
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border-radius: 99px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.btn-lg {
  padding: 0.8rem 2rem;
  font-size: 1.05rem;
  font-weight: 600;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.39);
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.btn-outline {
  background-color: transparent;
  color: var(--text-main);
  border: 1px solid var(--border);
}

.btn-outline:hover {
  border-color: var(--primary);
  color: var(--primary);
  background-color: var(--primary-light);
}

.btn-ghost {
  background-color: transparent;
  color: var(--text-main);
}

.btn-ghost:hover {
  background-color: var(--bg-sub);
}

/* --- Header / Navbar --- */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.3s ease;
  padding: 1.25rem 0;
  background-color: transparent;
}

.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0.8rem 0;
}

html.theme-dark .navbar.scrolled {
  background-color: rgba(15, 23, 42, 0.85);
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon-wrapper {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.4rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-main);
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-item:hover {
  color: var(--primary);
}

.nav-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

/* --- Hero Section --- */
.hero-section {
  position: relative;
  padding: 10rem 2rem 6rem;
  max-width: 1280px;
  margin: 0 auto;
}

.hero-bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.5;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: var(--primary);
  top: 5%;
  left: 10%;
  opacity: 0.15;
}

.glow-2 {
  width: 300px;
  height: 300px;
  background: var(--secondary);
  bottom: 10%;
  right: 5%;
  opacity: 0.15;
}

.hero-container {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.hero-content {
  flex: 1;
}

.badge-pill {
  display: inline-block;
  padding: 0.4rem 1rem;
  background-color: var(--primary-light);
  color: var(--primary-dark);
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 4rem;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
}

.hero-desc {
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  color: var(--text-main);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.divider {
  width: 1px;
  height: 40px;
  background-color: var(--border);
}

/* --- Hero Visual (Glassmorphism Mockup) --- */
.hero-visual {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
}

.glass-mockup {
  width: 100%;
  max-width: 460px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
  transition: transform 0.5s ease;
}

html.theme-dark .glass-mockup {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.glass-mockup:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-5px);
}

.mockup-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.mockup-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mockup-course {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-main);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.course-img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
}

.skeleton-img {
  background: var(--bg-sub);
}

.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-text {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
}
.w-full { width: 100%; }
.w-half { width: 50%; }

.floating-element {
  position: absolute;
  bottom: -20px;
  left: -30px;
  background: var(--bg-main);
  padding: 0.8rem 1.25rem;
  border-radius: 99px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: float 5s ease-in-out infinite;
}

html.theme-dark .floating-element {
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse 2s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

/* --- Features Section --- */
.features-section {
  padding: 6rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-desc {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--bg-sub);
  padding: 2.5rem;
  border-radius: 20px;
  transition: transform 0.3s ease, background-color 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: var(--bg-main);
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
}

html.theme-dark .feature-card:hover {
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.3);
}

.feature-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
}

.bg-blue { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
.bg-purple { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
.bg-green { background: linear-gradient(135deg, #10b981, #34d399); }

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-desc {
  color: var(--text-muted);
  line-height: 1.6;
}

/* --- New Content Sections CSS --- */
/* Courses Section */
.courses-section {
  padding: 4rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.course-card {
  background: var(--bg-main);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
  border-color: var(--primary-light);
}

html.theme-dark .course-card:hover {
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.4);
  border-color: rgba(59, 130, 246, 0.3);
}

.course-thumbnail {
  height: 200px;
  width: 100%;
  position: relative;
}

.course-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #f59e0b;
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.course-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.8rem;
}

.course-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.course-instructor {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  flex: 1;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--bg-sub);
}

.course-price {
  font-weight: 700;
  color: var(--primary);
  font-size: 1.1rem;
}

.btn-sm {
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
}

/* Stats Banner */
.stats-banner {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  padding: 4rem 2rem;
  color: white;
  margin: 4rem 0;
}

.stats-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-box {
  padding: 1rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.stat-text {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 500;
}

/* Testimonials */
.testimonials-section {
  padding: 4rem 2rem 6rem;
  max-width: 1280px;
  margin: 0 auto;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: var(--bg-sub);
  padding: 2.5rem;
  border-radius: 24px;
  position: relative;
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  background: var(--bg-main);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
}

html.theme-dark .testimonial-card:hover {
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.2);
}

.quote-icon {
  font-size: 4rem;
  color: var(--primary-light);
  line-height: 1;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  font-family: serif;
}

html.theme-dark .quote-icon {
  color: rgba(59, 130, 246, 0.1);
}

.testimonial-text {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-main);
  margin-bottom: 2rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.author-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.author-role {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* --- CTA Section --- */
.cta-section {
  padding: 4rem 2rem 6rem;
  max-width: 1280px;
  margin: 0 auto;
}

.cta-container {
  position: relative;
  background: var(--bg-main);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 5rem 3rem;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
}

html.theme-dark .cta-container {
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.3);
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.cta-desc {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.cta-bg-shape {
  position: absolute;
  top: -50%;
  left: -10%;
  width: 120%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, var(--primary-light) 0%, transparent 60%);
  z-index: 1;
  opacity: 0.5;
}

/* --- Footer --- */
.footer {
  background: var(--bg-sub);
  border-top: 1px solid var(--border);
  padding: 4rem 2rem 1.5rem;
  margin-top: auto;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-brand .logo {
  margin-bottom: 1.5rem;
}

.footer-bio {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 300px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-main);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.2s;
}

.social-btn:hover {
  color: var(--primary);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-col-title {
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-col a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: var(--primary);
}

.footer-bottom {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

/* --- Responsive --- */
@media (max-width: 1024px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-desc {
    margin: 0 auto 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .floating-element {
    bottom: -15px;
    left: 10%;
  }
}

@media (max-width: 768px) {
  .nav-menu {
    display: none; /* In a real app, you'd add a hamburger menu */
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .footer-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hero-buttons {
    flex-direction: column;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .divider {
    width: 40px;
    height: 1px;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>
