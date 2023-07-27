import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import bg from '../../assets/png/background.png';
import TopNavigationBar from '../../components/top-bar';
import useLogin from '../authenticate/hooks/useLogin';
import { ProfileContent } from './ProfileContent';
import Footer from '../../components/footer';
import { useIsBanned } from '../banned-page/BannedPage';

function Profile() {
    const theme = useTheme();
    const [userQuery] = useLogin();
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
    if (!userQuery.isSuccess) return <></>;
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
                        // paddingRight: theme.spacing(14),
                        // paddingLeft: theme.spacing(14),
                        px: {
                            xs: theme.spacing(0),
                            md: theme.spacing(3),
                            lg: theme.spacing(7),
                            xl: theme.spacing(7),
                        },
                        pt: theme.spacing(10),
                        zIndex: 1,
                    }}
                >
                    <ProfileContent />
                </Box>
                <Footer />
            </Grid>
        </Grid>
    );
}

export default Profile;
