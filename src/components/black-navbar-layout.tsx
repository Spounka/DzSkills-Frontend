import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LandingPageNavbar } from '../pages/landing-page/LandingPageNavbar';
import { selectUser } from '../redux/userSlice';
import TopNavigationBar from './top-bar';
import UserLayout from './user-layout';

function BlackNavbarLayout() {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (user.user.username !== "" && !user.user.email_valid)
            navigate('/register/verify-email/')
    }, [user.user?.email])

    return (
        <React.Fragment>
            <UserLayout
                navBar={user.user.username !== "" ? <TopNavigationBar /> : <LandingPageNavbar />}
            />
        </React.Fragment>
    );
}
export { BlackNavbarLayout };
