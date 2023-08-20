import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';

import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import { ContactContent } from './ContactContent';
import { useIsBanned } from '../banned-page/BannedPage';
import useReduxData from '../../stores/reduxUser';

function ContactTeacher() {
    const user = useReduxData().user.user;
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 1, md: 2, lg: 4, xl: 6 },
            }}
            bgcolor={'gray.secondary'}
        >
            <Helmet>
                <meta charSet="UTF-8" />
                <title>DzSkills | Contact </title>
            </Helmet>
            <AuthenticationTopBar />
            <ContactContent user={user} />
        </Box>
    );
}

export default ContactTeacher;
