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
                px: 0,
            }}
                style={{
                    paddingLeft: '0',
                    paddingRight: '0',
                }}
            >
                <TopNavigationBar />
            </Grid>

            <Grid item xs={14} container
                sx={{
                    backgroundColor: 'gray.secondary',
                }}
                style={{
                    padding: 0,
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(15, minmax(0, 1fr))',
                        width: "100%",
                        maxWidth: '100%',
                        gap: theme.spacing(8),
                        marginBottom: '5rem',
                        paddingRight: theme.spacing(14),
                        paddingLeft: theme.spacing(14),
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            gridColumnStart: 6,
                            gridColumnEnd: 18,
                            maxWidth: '100%',
                            minHeight: "70vh",
                            marginTop: theme.spacing(10),
                            py: theme.spacing(5),
                            px: theme.spacing(16)

                        }}>
                        Hello There
                    </Card>
                </Box>
            </Grid>

        </Grid>
    )
}

export default EditProfile