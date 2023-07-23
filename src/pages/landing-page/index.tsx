import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Footer from '../../components/footer';
import TopNavigationBar from '../../components/top-bar';
import { getAdminConfigs } from '../admin-panel/settings/landing-page/api/query';
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
    const token = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
        onSuccess: () => setLoggedIn(true),
        onError: () => setLoggedIn(false),
    });

    useEffect(() => {
        userQuery.refetch();
    }, []);

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
            <GetYourCertificate />
            <Teachers />
            <StudentRatings />
            <Footer />
        </Box>
    );
}
