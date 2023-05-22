import { Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';
import FullWidthTab from '../../components/ui/FullWidthTab';
import Login from './components/login';
import NewAccount from './components/new-account';

interface props {}

function Autenticate({}: props) {
    const tabs = ['حساب جديد', 'تسجيل الدخول'];

    const panels = [<NewAccount />, <Login />];

    return (
        <Grid
            container
            direction="column"
            spacing={5}
            id={'main grid container'}
            columns={14}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100%',
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
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        width: '100%',
                        marginBottom: '2rem',
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            gridColumnStart: 5,
                            gridColumnEnd: 9,
                        }}
                    >
                        <FullWidthTab
                            tabLabels={tabs}
                            panels={panels}
                            startState={1}
                        />
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Autenticate;
