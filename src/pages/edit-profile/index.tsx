import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import TopNavigationBar from './components/top-bar';

function EditProfile() {
    const theme = useTheme()
    return (
        <Grid container columns={14} direction='column' spacing={5} id={'main-grid-container'}
            sx={{
                backgroundColor: "white",
                maxWidth: '100%',
                minHeight: '100vh',
            }}>

            <Grid item xs={14} sx={{
                width: '100%',
            }}
                style={{
                    paddingLeft: '0',
                    paddingRight: '0',
                }}
            >
                <TopNavigationBar />
            </Grid>

            <Grid item xs={13} container
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
                        width: "100%",
                        maxWidth: '100%',
                        gap: theme.spacing(2),
                        marginBottom: '5rem',
                        paddingRight: theme.spacing(14),
                        paddingLeft: theme.spacing(14),
                        pt: theme.spacing(10),
                    }}
                >
                    <Container sx={{ gridColumnStart: 1, gridColumnEnd: 4, }} style={{ paddingLeft: '0', paddingRight: '0', }} >
                        <SideBar />
                    </Container>
                    <EditProfileContent />

                        }}>
                        Hello There
                    </Card>
                </Box>
            </Grid>

        </Grid>
    )
}

export default EditProfile