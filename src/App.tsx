import { Route, Routes } from 'react-router-dom'
import AdminCourses from './pages/admin-panel/courses'
import AdminLandingPage from './pages/admin-panel/landing-page'
import PaymentManagement from './pages/admin-panel/payment-management'
import UserManagement from './pages/admin-panel/user-management'
import Authenticate from './pages/authenticate/Authenticate'
import BuyCourse from './pages/buy-course'
import ViewCourse from './pages/course'
import EditProfile from './pages/edit-profile'
import NotFound from './pages/not-found/NotFound'
import PasswordForgotten from './pages/password-forgotten'
import Profile from './pages/profile'
import Invoices from './pages/profile-invoices'
import TeacherAddCourse from './pages/teacher-dashboard/add-course'
import WatchCourse from './pages/view-course'
import CourseDetails from './pages/admin-panel/course-details'
import CoursesPage from "./pages/courses-page";
import UserDetails from './pages/admin-panel/user-details'
import LandingPage from './pages/landing-page'

function App() {

    return (
        <Routes>
            {/* User Application */}
            <Route path="" element={<LandingPage />} />
            <Route path="/login" element={<Authenticate />} />
            <Route path="/password-forgotten" element={<PasswordForgotten />} />
            <Route path="/profile">
                <Route path="" element={<Profile />} />
                <Route path="edit" element={<EditProfile />} />
                <Route path="cart" element={<Invoices />} />
            </Route>
            <Route path="/courses">
                <Route path="" element={<CoursesPage />} />
                <Route path=":id">
                    <Route path="" element={<ViewCourse />} />
                    <Route path="watch" element={<WatchCourse />} />
                    <Route path="buy" element={<BuyCourse />} />
                </Route>
            </Route>

            {/* Teacher Dashboard */}
            <Route path="/dashboard">
                <Route path="teacher">
                    <Route path="courses">
                        <Route path="" element={<span>Courses</span>} />
                        <Route path="add" element={<TeacherAddCourse />} />
                    </Route>
                    <Route path="messages" element={<span>Messages</span>} />
                    <Route path="statistics" element={<span>Statistics</span>} />
                    <Route path="accounts" element={<span>Account</span>} />
                </Route>
            </Route>

            {/* Admin Panel */}
            <Route path="/admin">
                <Route path="" element={<AdminLandingPage />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="courses/:id/" element={<CourseDetails />} />
                <Route path="payments" element={<PaymentManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="users/:id/" element={<UserDetails />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
