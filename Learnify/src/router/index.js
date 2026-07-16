import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import InstructorLayout from '../layouts/InstructorLayout.vue'
import StudentLayout from '../layouts/StudentLayout.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import ApproveTeachers from '../views/ApproveTeachers.vue'
import ManageCourses from '../views/ManageCourses.vue'
import StudentHome from '../views/StudentHome.vue'
import Home from '../views/Home.vue'
import ManageUsers from '../views/ManageUsers.vue'
import AdminNotifications from '../views/AdminNotifications.vue'

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
      path: '/student',
      component: StudentLayout,
      meta: { requiresAuth: true, roles: ['student'] },
      children: [
        { 
          path: '', 
          name: 'student-home', 
          component: StudentHome
        }
      ]
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, roles: ['admin'] },
      children: [
        { path: '', component: AdminDashboard, name: 'admin-dashboard' },
        { path: 'approve-teachers', component: ApproveTeachers, name: 'admin-approve-teachers' },
        { path: 'manage-users', component: ManageUsers, name: 'admin-manage-users' },
        { path: 'notifications', component: AdminNotifications, name: 'admin-notifications' }
      ]
    },
    {
      path: '/instructor',
      component: InstructorLayout,
      meta: { requiresAuth: true, roles: ['teacher', 'instructor'] },
      children: [
        { path: '', component: ManageCourses, name: 'instructor-courses' }
      ]
    }
  ]
})

// Cấu hình Global Navigation Guard
router.beforeEach((to, from, next) => {
  const currentRole = localStorage.getItem('currentRole')

  if (to.meta.requiresAuth) {
    if (!currentRole) {
      next('/login')
    } else if (to.meta.roles && !to.meta.roles.includes(currentRole)) {
      if (currentRole === 'admin') {
        next('/admin')
      } else if (currentRole === 'teacher' || currentRole === 'instructor') {
        next('/instructor')
      } else if (currentRole === 'student') {
        next('/student')
      } else {
        next('/')
      }
    } else {
      next()
    }
  } else {
    // Không yêu cầu auth (trang chủ, login, register)
    next()
  }
})

export default router