import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import StudentLayout from '../layouts/StudentLayout.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import ApproveTeachers from '../views/ApproveTeachers.vue'
import ManageCourses from '../views/ManageCourses.vue'
import StudentHome from '../views/StudentHome.vue'
import Home from '../views/Home.vue' // Trang chủ mới

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, roles: ['admin', 'teacher'] },
      children: [
        { path: '', component: AdminDashboard, name: 'admin-dashboard' },
        { path: 'approve-teachers', component: ApproveTeachers, name: 'admin-approve-teachers' },
        { path: 'courses', component: ManageCourses, name: 'admin-courses' }
      ]
    },
    {
      path: '/student',
      component: StudentLayout,
      meta: { requiresAuth: true, roles: ['student'] },
      children: [
        { path: '', component: StudentHome, name: 'student-home' }
      ]
    }
  ]
})

// Cấu hình Global Navigation Guard
router.beforeEach((to, from, next) => {
  const currentRole = localStorage.getItem('currentRole')

  if (to.meta.requiresAuth) {
    if (!currentRole) {
      // Chưa đăng nhập thì đẩy về trang login
      next('/login')
    } else if (to.meta.roles && !to.meta.roles.includes(currentRole)) {
      // Đã đăng nhập nhưng không có quyền truy cập
      // Nếu là admin/teacher cố vào trang học sinh -> đẩy về admin
      // Nếu là học sinh cố vào admin -> đẩy về student
      if (currentRole === 'admin' || currentRole === 'teacher') {
        next('/admin')
      } else if (currentRole === 'student') {
        next('/student')
      } else {
        next('/') // Role không hợp lệ, về trang chủ
      }
    } else {
      next() // Hợp lệ, cho qua
    }
  } else {
    // Không yêu cầu auth (trang chủ, login, register)
    next()
  }
})

export default router