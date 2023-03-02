import { Link, Route, Routes } from 'react-router-dom'
import Authenticate from './pages/authenticate/Authenticate'
import EditProfile from './pages/edit-profile'
import NotFound from './pages/not-found/NotFound'
import PasswordForgotten from './pages/password-forgotten'

function App() {

    return (
        <Routes>
            <Route path="/login" element={<Authenticate />} />
            <Route path="/password-forgotten" element={<PasswordForgotten />} />
            <Route path="/profile">
                <Route path="" element={<EditProfile />} />
                <Route path="edit" element={<EditProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
