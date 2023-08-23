import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import SideBar from './components/side-bar';

import { EditPasswordForm } from './EditPasswordForm';
import EditProfileContent from './EditProfileContent';
import { useIsBanned } from '../banned-page/BannedPage';

function EditProfile() {
    const theme = useTheme();
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
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
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(13, minmax(0, 1fr))',
                        width: '100%',
                        maxWidth: '100%',
                        gap: theme.spacing(2),
                        marginBottom: '5rem',
                        px: {
                            xs: theme.spacing(2),
                            lg: theme.spacing(14),
                        },
                        pt: theme.spacing(10),
                    }}
                >
                    <Container
                        sx={{
                            display: { xs: 'none', lg: 'block' },
                            gridColumnStart: 1,
                            gridColumnEnd: 4,
                        }}
                        style={{ paddingLeft: '0', paddingRight: '0' }}
                    >
                        <SideBar />
                    </Container>
                    <Box
                        sx={{
                            gridColumnStart: { xs: 1, lg: 5 },
                            gridColumnEnd: -1,
                        }}
                    >
                        <EditProfileContent />
                    </Box>
                    <Typography
                        sx={{
                            gridColumnStart: { xs: 1, lg: 5 },
                            gridColumnEnd: 14,
                            px: 2,
                        }}
                        variant={'h5'}
                        fontWeight={500}
                        color={'gray.title'}
                    >
                        كلمة السر
                    </Typography>

                    <Box
                        sx={{
                            gridColumnStart: { xs: 1, lg: 5 },
                            gridColumnEnd: -1,
                        }}
                    >
                        <EditPasswordForm />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default EditProfile;
