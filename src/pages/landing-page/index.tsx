import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Footer from '../../components/footer';
import TopNavigationBar from '../../components/top-bar';
import { getAdminConfigs } from '../admin-panel/settings/landing-page/api/query';
import { useIsBanned } from '../banned-page/BannedPage';
import { getUser } from '../edit-profile/api/getUser';
import { GetYourCertificate } from './GetYourCertificate';
import { LandingPageFirstSection } from './LandingPageFirstSection';
import { LandingPageNavbar } from './LandingPageNavbar';
import { LandingPageSections } from './LandingPageSections';
import { MostSoldCourses } from './MostSoldCourses';
import { StudentRatings } from './Ratings';
import { Teachers } from './Teachers';

export default function LandingPage() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const { banned, BannedPageComponent } = useIsBanned();
    const token = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
        onSuccess: () => setLoggedIn(true),
        onError: () => setLoggedIn(false),
    });

    const adminConfigQuery = useQuery({
        queryKey: ['admin', 'configs'],
        queryFn: () => getAdminConfigs(),
    });

    useEffect(() => {
        userQuery.refetch();
    }, []);
    if (loggedIn && banned) return <BannedPageComponent />;

    return (
        <Box
            sx={{
                backgroundColor: '#F5F5F5',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            {loggedIn ? <TopNavigationBar /> : <LandingPageNavbar />}
            <LandingPageFirstSection />
            <LandingPageSections />
            <MostSoldCourses />
            <GetYourCertificate
                certificate={adminConfigQuery.data?.certificate_template?.template}
            />
            <Teachers />
            <StudentRatings />
            <Footer />
        </Box>
    );
}
