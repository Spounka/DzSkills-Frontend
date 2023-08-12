import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { AboutUs } from './pages/about-us/about-us';

import HashtagsAndCategories from './pages/admin-panel/categories-hashtags';
import CourseDetails from './pages/admin-panel/course-details';
import AdminCourses from './pages/admin-panel/courses';
import AdminLandingPage from './pages/admin-panel/landing-page';
import { AdminMessages } from './pages/admin-panel/messages/AdminMessages';
import PaymentManagement from './pages/admin-panel/payment-management';
import PendingCourse from './pages/admin-panel/pending-course';
import PendingCoursesAdmin from './pages/admin-panel/pending-courses';
import AddAdmin from './pages/admin-panel/settings/add-admin';
import AddTeacher from './pages/admin-panel/settings/add-teacher';
import AdminPersonalDetails from './pages/admin-panel/settings/edit';
import LandingPageSettings from './pages/admin-panel/settings/landing-page';
import Receipts from './pages/admin-panel/settings/receipts';
import UserDetails from './pages/admin-panel/user-details';
import UserManagement from './pages/admin-panel/user-management';
import Authenticate from './pages/authenticate/Authenticate';
import BuyCourse from './pages/buy-course';
import CategorizedCoursesList from './pages/category-course';
import ViewCourse from './pages/course';
import CourseQuizz from './pages/course-quizz';
import CoursesPage from './pages/courses-page';
import EditProfile from './pages/edit-profile';
import GoogleCallbackView from './pages/google-callback';
import LandingPage from './pages/landing-page';
import Logout from './pages/logout/indext';
import ContactTeacher from './pages/messages';
import NotFound from './pages/not-found/NotFound';
import PasswordForgotten from './pages/password-forgotten';
import PermissionDeniedPage from './pages/permission-denied';
import Profile from './pages/profile';
import Invoices from './pages/profile-invoices';
import EmailSendPage from './pages/send-email';
import ContactSupport from './pages/support/contact';
import FAQ from './pages/support/faq';
import SubmitReport from './pages/support/report';
import TeacherAddCourse from './pages/teacher-dashboard/add-course';
import CourseDetailsTeacherDashboard from './pages/teacher-dashboard/course-details';
import { TeacherCourses } from './pages/teacher-dashboard/courses/TeacherCourses';
import EditProfileTeacherDashboard from './pages/teacher-dashboard/edit-profile';
import TeacherLandingPage from './pages/teacher-dashboard/landing-page';
import TeacherMessages from './pages/teacher-dashboard/messages';
import TeachersPage from './pages/teachers';
import EmailValidationPage from './pages/validate-email';
import ViewCertificate from './pages/view-certificate';
import WatchCourse from './pages/view-course';
import { Skeleton } from '@mui/material';

const LandingPageLazy = React.lazy(() => import('./pages/landing-page'));
const AboutUsLazy = lazy(() => import('./pages/about-us/'));
const HashtagsAndCategoriesLazy = React.lazy(
    () => import('./pages/admin-panel/categories-hashtags')
);
const MoneyRequests = React.lazy(() => import('./pages/admin-panel/money-requests'));

function App() {
    return (
        <Routes>
            {/* User Application */}
            <Route
                path=""
                // element={<LandingPage />}
                element={
                    <Suspense fallback={<Skeleton height={'100dvh'} />}>
                        <LandingPageLazy />
                    </Suspense>
                }
            />
            <Route
                path="login"
                element={<Authenticate startPanel={1} />}
            />
            <Route path="register">
                <Route
                    path=""
                    element={<Authenticate startPanel={0} />}
                />
                <Route
                    path="verify-email/"
                    element={<EmailSendPage />}
                />
                <Route
                    path="verify-email/:key/"
                    element={<EmailValidationPage />}
                />
                <Route
                    path="google"
                    element={<GoogleCallbackView />}
                />
            </Route>

            <Route
                path="logout"
                element={<Logout />}
            />
            <Route path="password">
                <Route path="reset">
                    <Route
                        path=""
                        element={<PasswordForgotten />}
                    />
                    <Route
                        path="confirm"
                        element={<PasswordForgotten stage={1} />}
                    />
                </Route>
            </Route>
            <Route path="/profile">
                <Route
                    path=""
                    element={<Profile />}
                />
                <Route
                    path="edit"
                    element={<EditProfile />}
                />
                <Route
                    path="cart"
                    element={<Invoices />}
                />
            </Route>
            <Route path="support">
                <Route
                    path=""
                    element={<FAQ />}
                />
                <Route
                    path="report"
                    element={<SubmitReport />}
                />
                <Route
                    path="contact"
                    element={<ContactSupport />}
                />
            </Route>
            <Route path="/courses">
                <Route
                    path=""
                    element={<CoursesPage />}
                />
                <Route
                    path="categorized"
                    element={<CategorizedCoursesList />}
                />
                <Route path=":id">
                    <Route
                        path=""
                        element={<ViewCourse />}
                    />

                    <Route
                        path="watch"
                        element={<WatchCourse />}
                    />
                    <Route
                        path="quizz"
                        element={<CourseQuizz />}
                    />
                    <Route
                        path="certificate"
                        element={<ViewCertificate />}
                    />
                    <Route
                        path="buy"
                        element={<BuyCourse />}
                    />
                    <Route
                        path="contact"
                        element={<ContactTeacher />}
                    />
                </Route>
            </Route>

            <Route
                path={'about'}
                //     element={
                //     <AboutUs />
                // }
                element={
                    <Suspense fallback={<Skeleton sx={{ height: '100%' }} />}>
                        <AboutUsLazy />
                    </Suspense>
                }
            />
            <Route
                path={'teachers'}
                element={<TeachersPage />}
            />

            {/* Teacher Dashboard */}
            <Route path="/dashboard">
                <Route path="teacher">
                    <Route
                        path={''}
                        element={<TeacherLandingPage />}
                    />
                    <Route path="courses/*">
                        <Route
                            path=""
                            element={<TeacherCourses />}
                        />
                        <Route
                            path="add"
                            element={<TeacherAddCourse />}
                        />
                        <Route
                            path=":id"
                            element={<CourseDetailsTeacherDashboard />}
                        />
                    </Route>
                    <Route
                        path="messages"
                        element={<TeacherMessages />}
                    />
                    <Route
                        path="account"
                        element={<EditProfileTeacherDashboard />}
                    />
                </Route>
            </Route>

            {/* Admin Panel */}
            <Route path="/admin">
                <Route
                    path=""
                    element={<AdminLandingPage />}
                />
                <Route
                    path="courses"
                    element={<AdminCourses />}
                />
                <Route
                    path="courses/pending"
                    element={<PendingCoursesAdmin />}
                />
                <Route
                    path="courses/pending/:id/"
                    element={<PendingCourse />}
                />
                <Route
                    path="courses/:id/"
                    element={<CourseDetails />}
                />

                <Route
                    path="messages"
                    element={<AdminMessages />}
                />
                <Route
                    path="hashtags-categories"
                    // element={<HashtagsAndCategories />}
                    element={
                        <Suspense fallback={<Skeleton />}>
                            <HashtagsAndCategoriesLazy />
                        </Suspense>
                    }
                />
                <Route
                    path="payments"
                    element={<PaymentManagement />}
                />
                <Route
                    path="money-requests"
                    element={
                        <Suspense fallback={<>Loading...</>}>
                            <MoneyRequests />
                        </Suspense>
                    }
                />
                <Route
                    path="users"
                    element={<UserManagement />}
                />
                <Route
                    path="users/:id/"
                    element={<UserDetails />}
                />
                <Route
                    path="settings/"
                    element={<AdminPersonalDetails />}
                />
                <Route path="settings">
                    <Route
                        path="add-admin"
                        element={<AddAdmin />}
                    />
                    <Route
                        path="add-teacher"
                        element={<AddTeacher />}
                    />
                    <Route
                        path="receipts"
                        element={<Receipts />}
                    />
                    <Route
                        path={'landing-page'}
                        element={<LandingPageSettings />}
                    />
                </Route>
            </Route>

            <Route
                path="/permission-denied/"
                element={<PermissionDeniedPage />}
            />
            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    );
}

export default App;
