import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Skeleton } from '@mui/material';
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
import BuyCourse from './pages/buy-course';
import CategorizedCoursesList from './pages/category-course';
import ViewCourse from './pages/course';
import CourseQuizz from './pages/course-quizz';
import CoursesPage from './pages/courses-page';
import GoogleCallbackView from './pages/google-callback';
import Logout from './pages/logout';
import ContactTeacher from './pages/messages';
import TeacherAddCourse from './pages/teacher-dashboard/add-course';
import CourseDetailsTeacherDashboard from './pages/teacher-dashboard/course-details';
import { TeacherCourses } from './pages/teacher-dashboard/courses/TeacherCourses';
import EditProfileTeacherDashboard from './pages/teacher-dashboard/edit-profile';
import TeacherLandingPage from './pages/teacher-dashboard/landing-page';
import TeacherMessages from './pages/teacher-dashboard/messages';
import TeachersPage from './pages/teachers';
import ViewCertificate from './pages/view-certificate';
import WatchCourse from './pages/view-course';
import FullScreenLoadingFallback from './components/full-screen-loading-fallback';
import { BlackNavbarLayout } from './components/black-navbar-layout';
import { WhiteNavbarLayout } from './components/white-bar-layout';
import { useGetUser } from './globals/hooks';

const LandingPageLazy = React.lazy(() => import('./pages/landing-page'));
const AboutUsLazy = lazy(() => import('./pages/about-us/'));
const HashtagsAndCategoriesLazy = React.lazy(
    () => import('./pages/admin-panel/categories-hashtags')
);
const MoneyRequests = React.lazy(() => import('./pages/admin-panel/money-requests'));
const PrivacyPolicy = React.lazy(() => import('./pages/privacy-policy'));
const AuthenticateLazy = React.lazy(() => import('./pages/authenticate/'));
const EmailSendPageLazy = React.lazy(() => import('./pages/send-email'));
const EmailValidationPageLazy = React.lazy(() => import('./pages/validate-email'));
const PasswordForgottenLazy = React.lazy(() => import('./pages/password-forgotten'));

const ProfileLazy = React.lazy(() => import('./pages/profile'));
const InvoicesLazy = React.lazy(() => import('./pages/profile-invoices'));
const EditProfileLazy = React.lazy(() => import('./pages/edit-profile'));

const ContactSupportLazy = React.lazy(() => import('./pages/support/contact'));
const FAQLazy = React.lazy(() => import('./pages/support/faq'));
const SubmitReportLazy = React.lazy(() => import('./pages/support/report'));

const PermissionDeniedPageLazy = React.lazy(() => import('./pages/permission-denied'));
const NotFoundLazy = React.lazy(() => import('./pages/not-found/NotFound'));

function App() {
    useGetUser({})
    return (
        <Routes>
            {/* User Application */}
            <Route element={<WhiteNavbarLayout />}>
                <Route
                    path="login"
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <AuthenticateLazy startPanel={1} />
                        </Suspense>
                    }
                />
                <Route path="register">
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <AuthenticateLazy startPanel={0} />
                            </Suspense>
                        }
                    />
                    <Route
                        path="verify-email/"
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <EmailSendPageLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="verify-email/:key/"
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <EmailValidationPageLazy />
                            </Suspense>
                        }
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
                            element={
                                <Suspense fallback={<FullScreenLoadingFallback />}>
                                    <PasswordForgottenLazy />
                                </Suspense>
                            }
                        />
                        <Route
                            path="confirm"
                            element={
                                <Suspense fallback={<FullScreenLoadingFallback />}>
                                    <PasswordForgottenLazy stage={1} />
                                </Suspense>
                            }
                        />
                    </Route>
                </Route>
            </Route>
            <Route element={<BlackNavbarLayout />}>
                <Route
                    path=""
                    // element={<LandingPage />}
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <LandingPageLazy />
                        </Suspense>
                    }
                />
                <Route path="/profile">
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <ProfileLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="edit"
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <EditProfileLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="cart"
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <InvoicesLazy />
                            </Suspense>
                        }
                    />
                </Route>
                <Route path="support">
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <FAQLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="report"
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <SubmitReportLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="contact"
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <ContactSupportLazy />
                            </Suspense>
                        }
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
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <AboutUsLazy />
                        </Suspense>
                    }
                />
                <Route
                    path={'privacy'}
                    //     element={
                    //     <AboutUs />
                    // }
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <PrivacyPolicy />
                        </Suspense>
                    }
                />

                <Route
                    path={'teachers'}
                    element={<TeachersPage />}
                />
            </Route>

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
                element={
                    <Suspense fallback={<FullScreenLoadingFallback />}>
                        <PermissionDeniedPageLazy />
                    </Suspense>
                }
            />
            <Route
                path="*"
                element={
                    <Suspense fallback={<FullScreenLoadingFallback />}>
                        <NotFoundLazy />
                    </Suspense>
                }
            />
        </Routes>
    );
}

export default App;
