import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import StudentLayout from '../layouts/StudentLayout.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import ApproveTeachers from '../views/ApproveTeachers.vue'
import ManageCourses from '../views/ManageCourses.vue'
import StudentHome from '../views/StudentHome.vue' // Import thêm dòng này

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: '', component: AdminDashboard },
        { path: 'approve-teachers', component: ApproveTeachers },
        { path: 'courses', component: ManageCourses }
      ]
    },
    {
      path: '/',
      component: StudentLayout,
      children: [
        { path: '', component: StudentHome } // Khai báo tại đây
      ]
    }
  ]
})

export default router