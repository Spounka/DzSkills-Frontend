import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const CourseDetailsLazy = React.lazy(() => import('./pages/admin-panel/course-details'))
const AdminCoursesLazy = React.lazy(() => import('./pages/admin-panel/courses'))
const AdminLandingPageLazy = React.lazy(() => import('./pages/admin-panel/landing-page'))
const AdminMessagesLazy = React.lazy(() => import('./pages/admin-panel/messages/'))
const PaymentManagementLazy = React.lazy(() => import('./pages/admin-panel/payment-management'))
const PendingCourseLazy = React.lazy(() => import('./pages/admin-panel/pending-course'))
const AddAdminLazy = React.lazy(() => import('./pages/admin-panel/settings/add-admin'))
const AddTeacherLazy = React.lazy(() => import('./pages/admin-panel/settings/add-teacher'));
const AdminPersonalDetailsLazy = React.lazy(() => import('./pages/admin-panel/settings/edit'))
const LandingPageSettingsLazy = React.lazy(() => import('./pages/admin-panel/settings/landing-page'))
const ReceiptsLazy = React.lazy(() => import('./pages/admin-panel/settings/receipts'))
const UserDetailsLazy = React.lazy(() => import('./pages/admin-panel/user-details'))
const UserManagementLazy = React.lazy(() => import('./pages/admin-panel/user-management'))
const BuyCourseLazy = React.lazy(() => import('./pages/buy-course'))
const CategorizedCoursesListLazy = React.lazy(() => import('./pages/category-course'))
const ViewCourseLazy = React.lazy(() => import('./pages/course'))
const CourseQuizzLazy = React.lazy(() => import('./pages/course-quizz'))
const CoursesPageLazy = React.lazy(() => import('./pages/courses-page'))
const GoogleCallbackViewLazy = React.lazy(() => import('./pages/google-callback'))
const LogoutLazy = React.lazy(() => import('./pages/logout'))
const ContactTeacherLazy = React.lazy(() => import('./pages/messages'))
const TeacherAddCourseLazy = React.lazy(() => import('./pages/teacher-dashboard/add-course'))
const CourseDetailsTeacherDashboardLazy = React.lazy(() => import('./pages/teacher-dashboard/course-details'))
const TeacherCoursesLazy = React.lazy(() => import('./pages/teacher-dashboard/courses/'))
const EditProfileTeacherDashboardLazy = React.lazy(() => import('./pages/teacher-dashboard/edit-profile'))
const TeacherLandingPageLazy = React.lazy(() => import('./pages/teacher-dashboard/landing-page'));
const TeacherMessagesLazy = React.lazy(() => import('./pages/teacher-dashboard/messages'));
const ViewCertificateLazy = React.lazy(() => import('./pages/view-certificate'))
const WatchCourseLazy = React.lazy(() => import('./pages/view-course'))
import FullScreenLoadingFallback from './components/full-screen-loading-fallback';
import { BlackNavbarLayout } from './components/black-navbar-layout';
import { WhiteNavbarLayout } from './components/white-bar-layout';
import { useGetUser } from './globals/hooks';
const PendingCoursesAdminLazy = React.lazy(() => import('./pages/admin-panel/pending-courses'))

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

const TeachersPage = React.lazy(() => import('./pages/teachers'));

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
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <GoogleCallbackViewLazy />
                            </Suspense>
                        }
                    />
                </Route>

                <Route
                    path="logout"
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <LogoutLazy />
                        </Suspense>
                    }
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
                        element={<CoursesPageLazy />}
                    />
                    <Route
                        path="categorized"
                        element={<CategorizedCoursesListLazy />}
                    />
                    <Route path=":id">
                        <Route
                            path=""
                            element={<ViewCourseLazy />}
                        />

                        <Route
                            path="watch"
                            element={<WatchCourseLazy />}
                        />
                        <Route
                            path="quizz"
                            element={<CourseQuizzLazy />}
                        />
                        <Route
                            path="certificate"
                            element={<ViewCertificateLazy />}
                        />
                        <Route
                            path="buy"
                            element={<BuyCourseLazy />}
                        />
                        <Route
                            path="contact"
                            element={<ContactTeacherLazy />}
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
                        element={<Suspense fallback={<FullScreenLoadingFallback />}>
                            <TeacherLandingPageLazy />
                        </Suspense>}
                    />
                    <Route path="courses/*">
                        <Route
                            path=""
                            element={<Suspense fallback={<FullScreenLoadingFallback />}>
                                <TeacherCoursesLazy />
                            </Suspense>}
                        />
                        <Route
                            path="add"
                            element={<Suspense fallback={<FullScreenLoadingFallback />}>
                                <TeacherAddCourseLazy />
                            </Suspense>}
                        />
                        <Route
                            path=":id"
                            element={<Suspense fallback={<FullScreenLoadingFallback />}>
                                <CourseDetailsTeacherDashboardLazy />
                            </Suspense>}
                        />
                    </Route>
                    <Route
                        path="messages"
                        element={<Suspense fallback={<FullScreenLoadingFallback />}>
                            <TeacherMessagesLazy />
                        </Suspense>}
                    />
                    <Route
                        path="account"
                        element={<Suspense fallback={<FullScreenLoadingFallback />}>
                            <EditProfileTeacherDashboardLazy />
                        </Suspense>}
                    />
                </Route>
            </Route>

            {/* Admin Panel */}
            <Route path="/admin">
                <Route
                    path=""
                    element={<Suspense fallback={<FullScreenLoadingFallback />}>
                        <AdminLandingPageLazy />
                    </Suspense>}
                />
                <Route
                    path="courses"
                    element={<Suspense fallback={<FullScreenLoadingFallback />}>
                        <AdminCoursesLazy />
                    </Suspense>}
                />
                <Route
                    path="courses/pending"
                    element={<Suspense fallback={<FullScreenLoadingFallback />}>
                        <PendingCoursesAdminLazy />
                    </Suspense>}
                />
                <Route
                    path="courses/pending/:id/"
                    element={<Suspense fallback={<FullScreenLoadingFallback />}>
                        <PendingCourseLazy />
                    </Suspense>}
                />
                <Route
                    path="courses/:id/"
                    element={<Suspense fallback={<FullScreenLoadingFallback />}>
                        <CourseDetailsLazy />
                    </Suspense>}
                />

                <Route
                    path="messages"
                    element={<Suspense fallback={<FullScreenLoadingFallback />}>
                        <AdminMessagesLazy />
                    </Suspense>}
                />
                <Route
                    path="hashtags-categories"
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <HashtagsAndCategoriesLazy />
                        </Suspense>
                    }
                />
                <Route
                    path="payments"
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <PaymentManagementLazy />
                        </Suspense>
                    }
                />
                <Route
                    path="money-requests"
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <MoneyRequests />
                        </Suspense>
                    }
                />
                <Route
                    path="users"
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <UserManagementLazy />
                        </Suspense>
                    }
                />
                <Route
                    path="users/:id/"
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <UserDetailsLazy />
                        </Suspense>
                    }
                />
                <Route
                    path="settings/"
                    element={
                        <Suspense fallback={<FullScreenLoadingFallback />}>
                            <AdminPersonalDetailsLazy />
                        </Suspense>
                    }
                />
                <Route path="settings">
                    <Route
                        path="add-admin"
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <AddAdminLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="add-teacher"
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <AddTeacherLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="receipts"
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <ReceiptsLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path={'landing-page'}
                        element={
                            <Suspense fallback={<FullScreenLoadingFallback />}>
                                <LandingPageSettingsLazy />
                            </Suspense>
                        }
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
        </Routes >
    );
}

export default App;
