<template>
  <div id="app-wrapper">
    
    <!-- KHỐI NÚT GẠT ĐÃ ĐƯỢC LÀM NỔI ĐỘC LẬP -->
    <div class="global-theme-toggle">
      <button 
        class="theme-toggle-switch"
        :class="{ 'is-dark': isDarkMode }"
        @click="toggleTheme($event)"
      >
        <span class="slider-circle"></span>
      </button>
    </div>

    <!-- KHU VỰC HIỂN THỊ CÁC TRANG -->
    <main class="main-content">
      <router-view></router-view>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDarkMode = ref(false);

const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('theme-dark');
    document.documentElement.classList.remove('theme-light');
  } else {
    document.documentElement.classList.add('theme-light');
    document.documentElement.classList.remove('theme-dark');
  }
};

const toggleTheme = (event) => {
  if (!document.startViewTransition) {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    applyTheme(isDarkMode.value);
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    applyTheme(isDarkMode.value);
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ];

    document.documentElement.animate(
      {
        clipPath: isDarkMode.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: isDarkMode.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      }
    );
  });
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  isDarkMode.value = savedTheme === 'dark';
  applyTheme(isDarkMode.value);
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html.theme-light {
  background-color: #f8fafc;
  color: #1e293b;
}

html.theme-dark {
  background-color: #121212;
  color: #e5e5e5;
}

#app-wrapper {
  min-height: 100vh;
}

/* 1. XÓA BỎ LỀ THỪA ĐỂ GIAO DIỆN KHÔNG BỊ ĐẨY XUỐNG */
.main-content {
  padding: 0 !important; 
}

/* 2. ĐỊNH VỊ THÔNG MINH CHO NÚT GẠT (NỔI LÊN TRÊN CÙNG) */
.global-theme-toggle {
  position: fixed;
  top: 23px; /* Nằm vừa vặn giữa thanh Header của Admin (cao 70px) */
  right: 30px; /* Cách lề phải 30px */
  z-index: 9999; /* Đảm bảo luôn nằm đè lên mọi Form */
}

/* 3. THU NHỎ KÍCH THƯỚC NÚT GẠT */
.theme-toggle-switch {
  position: relative;
  width: 44px; /* Giảm từ 60px xuống 44px */
  height: 24px; /* Giảm từ 32px xuống 24px */
  border-radius: 24px;
  background-color: #e2e8f0;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.theme-toggle-switch.is-dark {
  background-color: #2b2b2b;
}

/* 4. THU NHỎ HÌNH TRÒN BÊN TRONG */
.slider-circle {
  position: absolute;
  top: 3px; /* Canh lề trên */
  left: 3px; /* Canh lề trái */
  width: 18px; /* Giảm kích thước */
  height: 18px;
  border-radius: 50%;
  background-color: #0072ff;
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.theme-toggle-switch.is-dark .slider-circle {
  transform: translateX(20px); /* Canh lại tọa độ trượt cho chuẩn */
  background-color: #888888;
}

/* CSS cho View Transitions API (Hiệu ứng Sáng/Tối) */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) { 
  z-index: 1; 
}

::view-transition-new(root) { 
  z-index: 2; 
}

html.theme-dark::view-transition-old(root) { 
  z-index: 2; 
}

html.theme-dark::view-transition-new(root) { 
  z-index: 1; 
}
</style>