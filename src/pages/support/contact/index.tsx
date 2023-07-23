import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import AuthenticationTopBar from '../../../components/ui/AuthenticationTopBar';
import useLogin from '../../authenticate/hooks/useLogin';
import { ContactContent } from '../../messages/ContactContent';
import NotFound from '../../not-found/NotFound';
import { Helmet } from 'react-helmet';

function ContactSupport() {
    const [user] = useLogin();

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 4, md: 2, lg: 4, xl: 6 },
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

export default ContactSupport;
