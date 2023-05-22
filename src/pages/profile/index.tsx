import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import bg from '../../assets/png/background.png';
import TopNavigationBar from '../../components/top-bar';
import useLogin from '../authenticate/hooks/useLogin';
import { ProfileContent } from './ProfileContent';

function Profile() {
    const theme = useTheme();
    const [query] = useLogin();
    if (!query.isSuccess) return <></>;
    return (
        <Grid
            container
            columns={14}
            direction="column"
            spacing={5}
            id={'main-grid-container'}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100%',
                minHeight: '100vh',
            }}
        >
            <Grid
                item
                xs={14}
                sx={{
                    width: '100%',
                }}
                style={{
                    paddingLeft: '0',
                    paddingRight: '0',
                }}
            >
                <TopNavigationBar />
            </Grid>

            <Grid
                item
                xs={13}
                container
                sx={{
                    backgroundColor: 'gray.secondary',
                    pt: theme.spacing(10),
                }}
                style={{
                    padding: 0,
                }}
            >
                <img
                    src={bg}
                    style={{
                        position: 'absolute',
                        zIndex: '0',
                        backgroundPosition: 'cover',
                        margin: 0,
                        backgroundAttachment: 'fixed',
                    }}
                />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        width: '100%',
                        maxWidth: '100%',
                        gap: theme.spacing(2),
                        marginBottom: '5rem',
                        paddingRight: theme.spacing(14),
                        paddingLeft: theme.spacing(14),
                        pt: theme.spacing(10),
                        zIndex: 1,
                    }}
                >
                    <ProfileContent />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Profile;
