import { Box } from '@mui/material';
import { ContactContent } from '../../messages/ContactContent';
import { Helmet } from 'react-helmet';
import useReduxData from '../../../stores/reduxUser';

function ContactSupport() {
    const user = useReduxData().user.user;

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 4, md: 2, lg: 4, xl: 6 },
                pt: 5,
            }}
            bgcolor={'gray.secondary'}
        >
            <Helmet>
                <meta charSet="UTF-8" />
                <title>DzSkills | Contact </title>
            </Helmet>
            <ContactContent user={user} />
        </Box>
    );
}

export default ContactSupport;
