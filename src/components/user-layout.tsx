import React, { ReactNode, Suspense } from 'react';
import { useIsBanned } from '../pages/banned-page/BannedPage';
import Box from '@mui/material/Box';
const Footer = React.lazy(() => import('./footer'));
import { Outlet } from 'react-router-dom';
import FullScreenLoadingFallback from './full-screen-loading-fallback';
import { Skeleton } from '@mui/material';

interface Props {
    allowOffScreen?: boolean;
    navBar?: ReactNode;
}

const UserLayout = ({ allowOffScreen, navBar }: Props) => {
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
    return (
        <Box
            sx={{
                backgroundColor: '#F5F5F5',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: allowOffScreen ? '100%' : '100vw',
                boxSizing: 'border-box',
            }}
        >

            <Suspense fallback={<Skeleton variant='rectangular' animation='pulse' sx={{ minHeight: '10dvh' }} />}>
                {navBar}
            </Suspense>
            <Suspense fallback={<FullScreenLoadingFallback />}>
                <Outlet />
            </Suspense>
            <Suspense fallback={<Skeleton variant='rectangular' animation='pulse' sx={{ minHeight: '10dvh' }} />}>
                <Footer />
            </Suspense>
        </Box>
    );
};
UserLayout.defaultProps = {
    allowOffScreen: true,
};

export default UserLayout;
