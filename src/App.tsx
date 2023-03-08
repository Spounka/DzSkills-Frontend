import { Route, Routes } from 'react-router-dom'
import Authenticate from './pages/authenticate/Authenticate'
import EditProfile from './pages/edit-profile'
import NotFound from './pages/not-found/NotFound'
import PasswordForgotten from './pages/password-forgotten'
import Profile from './pages/profile'
import TeacherAddCourse from './pages/teacher-dashboard/add-course'

function App() {

    return (
        <Routes>
            <Route path="/login" element={<Authenticate />} />
            <Route path="/password-forgotten" element={<PasswordForgotten />} />
            <Route path="/profile">
                <Route path="" element={<Profile />} />
                <Route path="edit" element={<EditProfile />} />
            </Route>
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

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
