import React from 'react';
import { useSelector } from 'react-redux';
import { useSetUserOptimistic } from '../globals/hooks';
const LandingPageNavbar = React.lazy(() => import('./landing-page-navbar'));
import { RootState } from '../stores/store';
const TopNavigationBar = React.lazy(() => import('./top-bar'));
import UserLayout from './user-layout';

function BlackNavbarLayout() {
    useSetUserOptimistic()
    const user = useSelector((state: RootState) => state.user)
    const token = localStorage.getItem('access')
    return (
        <React.Fragment>
            <UserLayout
                allowOffScreen={false}
                navBar={(token || (user.user && user.user.username !== "")) ?
                    <TopNavigationBar /> : <LandingPageNavbar />}
            />
        </React.Fragment>
    );
}
export { BlackNavbarLayout };
