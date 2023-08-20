import { useState, ReactNode, Suspense } from 'react';
import { useIsBanned } from '../pages/banned-page/BannedPage';
import Box from '@mui/material/Box';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
import { useGetUser } from '../globals/hooks';
import FullScreenLoadingFallback from './full-screen-loading-fallback';

interface Props {
    allowOffScreen?: boolean;
    navBar?: ReactNode;
}

const UserLayout = ({ allowOffScreen, navBar }: Props) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const { banned, BannedPageComponent } = useIsBanned();
    useGetUser({ onSuccess: () => setLoggedIn(true) })
    if (loggedIn && banned) return <BannedPageComponent />;
    return (
        <Box
            sx={{
                backgroundColor: '#F5F5F5',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: allowOffScreen ? 'auto' : '100vw',

            }}
        >
            {navBar}
            <Suspense fallback={<FullScreenLoadingFallback />}>
                <Outlet />
            </Suspense>
            <Footer />
        </Box>
    );
};
UserLayout.defaultProps = {
    allowOffScreen: true,
};

export default UserLayout;
