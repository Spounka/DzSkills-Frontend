import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';
import useLogin from '../authenticate/hooks/useLogin';
import NotFound from '../not-found/NotFound';

import { Box } from '@mui/material';
import { ContactTeacherContent } from './ContactTeacherContent';

function ContactTeacher() {
    const params = useParams();

    if (!params?.id) return <Typography>Error</Typography>;

    if (isNaN(Number(params.id))) return <NotFound />;

    const id: number = parseInt(params.id);
    const [user] = useLogin();

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}
            bgcolor={'gray.secondary'}
        >
            <AuthenticationTopBar />
            <ContactTeacherContent
                id={id}
                user={user}
            />
        </Box>
    );
}

export default ContactTeacher;
