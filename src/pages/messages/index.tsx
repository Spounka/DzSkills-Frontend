import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';
import useLogin from '../authenticate/hooks/useLogin';

import { Box } from '@mui/material';
import { ContactContent } from './ContactContent';

function ContactTeacher() {
    const [user] = useLogin();

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
            <AuthenticationTopBar />
            <ContactContent user={user} />
        </Box>
    );
}

export default ContactTeacher;
