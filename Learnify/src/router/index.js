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
import GoogleRoleSelect from '../views/GoogleRoleSelect.vue'
import UserProfile from '../views/UserProfile.vue'
import QuizDashboard from '../views/QuizDashboard.vue'
import LectureDetail from '../views/LectureDetail.vue'
import AiQuestions from '../views/AiQuestions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/quiz',
      name: 'quiz-dashboard',
      component: QuizDashboard,
      meta: { requiresAuth: true }
    },
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
      path: '/google-role-select',
      name: 'google-role-select',
      component: GoogleRoleSelect
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
        },
        {
          path: 'profile',
          name: 'student-profile',
          component: UserProfile
        },
        {
          path: 'lectures/:id',
          name: 'student-lecture-detail',
          component: LectureDetail
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
        { path: 'notifications', component: AdminNotifications, name: 'admin-notifications' },
        { path: 'lectures/:id', component: LectureDetail, name: 'admin-lecture-detail' }
      ]
    },
    {
      path: '/instructor',
      component: InstructorLayout,
      meta: { requiresAuth: true, roles: ['teacher', 'instructor'] },
      children: [
        { path: '', component: ManageCourses, name: 'instructor-courses' },
        { path: 'profile', component: UserProfile, name: 'instructor-profile' },
        { path: 'lectures/:id', component: LectureDetail, name: 'instructor-lecture-detail' },
        { path: 'ai-questions', component: AiQuestions, name: 'instructor-ai-questions' }
      ]
    }
  ]
})

// Cấu hình Global Navigation Guard
router.beforeEach((to, from) => {
  const currentRole = localStorage.getItem('currentRole')

  if (to.meta.requiresAuth) {
    if (!currentRole) {
      return '/login'
    } else if (to.meta.roles && !to.meta.roles.includes(currentRole)) {
      if (currentRole === 'admin') {
        return '/admin'
      } else if (currentRole === 'teacher' || currentRole === 'instructor') {
        return '/instructor'
      } else if (currentRole === 'student') {
        return '/student'
      } else {
        return '/'
      }
    }
  }
})

export default router