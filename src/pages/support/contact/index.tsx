import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import AuthenticationTopBar from '../../../components/ui/AuthenticationTopBar';
import useLogin from '../../authenticate/hooks/useLogin';
import { ContactContent } from '../../messages/ContactContent';
import NotFound from '../../not-found/NotFound';

function ContactSupport() {
    const params = useParams();

    if (!params?.id) return <Typography>Error</Typography>;

    if (isNaN(Number(params.id))) return <NotFound />;

    const id: number = parseInt(params.id);
    const [user] = useLogin();

    return (
        <Grid
            container
            direction="column"
            spacing={5}
            id={'main-grid-container'}
            columns={14}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100vw',
                maxHeight: '100%',
            }}
        >
            <Grid
                container
                item
                xs={14}
            >
                <AuthenticationTopBar />
            </Grid>

            <Grid
                item
                xs={14}
                container
                sx={{
                    backgroundColor: 'gray.secondary',
                }}
            >
                <ContactContent
                    id={id}
                    user={user}
                />
            </Grid>
        </Grid>
    );
}

export default ContactSupport;
