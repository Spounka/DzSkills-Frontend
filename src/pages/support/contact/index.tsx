import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import useLogin from '../../authenticate/hooks/useLogin';
import NotFound from '../../not-found/NotFound';
import Grid from '@mui/material/Grid';
import AuthenticationTopBar from '../../../components/ui/AuthenticationTopBar';

export function ContactSupport() {
    const params = useParams();

    if (!params || !params.id) return <Typography>Error</Typography>;

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
            </Grid>
        </Grid>
    );
}

export default ContactSupport;
