import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';
import useLogin from '../authenticate/hooks/useLogin';
import NotFound from '../not-found/NotFound';

import { ContactTeacherContent } from './ContactTeacherContent';
import { Box } from '@mui/material';

function ContactTeacher() {
    const params = useParams();

    if (!params || !params.id) return <Typography>Error</Typography>;

    if (isNaN(Number(params.id))) return <NotFound />;

    const id: number = parseInt(params.id);
    const [user] = useLogin();

    return (
        // <Grid
        //     container
        //     direction="row"
        //     spacing={5}
        //     id={'main-grid-container'}
        //     columns={14}
        //     sx={{
        //         backgroundColor: 'white',
        //         maxWidth: '100vw',
        //         // maxHeight: '100%',
        //         height: '100dvh',
        //     }}
        // >
        //     <Grid
        //         container
        //         item
        //         xs={14}
        //     >
        //         <AuthenticationTopBar />
        //     </Grid>

        //     <Grid
        //         item
        //         xs={14}
        //         container
        //         sx={{
        //             backgroundColor: 'gray.secondary',
        //         }}
        //     >
        //         <ContactTeacherContent
        //             id={id}
        //             user={user}
        //         />
        //     </Grid>
        // </Grid>
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
