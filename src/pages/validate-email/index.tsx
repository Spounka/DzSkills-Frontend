import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import { CircularProgress, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';
import { getUser } from '../edit-profile/api/getUser';
import { validateEmail } from './api/query';

function EmailValidationPage() {
    const params = useParams();
    const key = params.key;
    if (!params || !params.key) return <>...</>;

    const token = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
    });

    const theme = useTheme();
    const [enabled, setEnabled] = useState<boolean>(false);
    const [successfull, setSuccessfull] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    const getEmailStatus = useQuery({
        queryKey: ['verify', 'email'],
        queryFn: () => validateEmail(key),
        onSuccess: () => {
            setSuccessfull(true);
            setTimeout(() => navigate('/profile/'), 3000);
        },
        onError: (errorM: AxiosError) => {
            setError(errorM.response);
            console.table(errorM);
        },
        enabled: enabled,
    });

    useEffect(() => {
        setTimeout(() => setEnabled(true), 1000);
    }, []);

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
                    height: '100%',
                    minHeight: '90dvh',
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        width: '100%',
                        alignSelf: 'center',
                        mt: '-20%',
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            gridColumnStart: 5,
                            gridColumnEnd: 9,
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: 'min-content',
                            gap: 8,
                            px: 4,
                            py: 6,
                            borderRadius: theme.spacing(),
                        }}
                    >
                        {successfull && (
                            <>
                                <Typography
                                    variant={'h6'}
                                    color={'secondary'}
                                >
                                    جاري التحقق من البريد الإلكتروني ، يرجى الانتظار
                                </Typography>
                                <CheckCircle color={'primary'} />
                            </>
                        )}
                        {error ? (
                            <>
                                <Typography
                                    variant={'h6'}
                                    color={'secondary'}
                                >
                                    فشل التحقق من البريد الإلكتروني
                                </Typography>
                                <ErrorOutline
                                    color="error"
                                    sx={{
                                        width: theme.spacing(10),
                                        height: 'auto',
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant={'h6'}
                                    color={'secondary'}
                                >
                                    جاري التحقق من البريد الإلكتروني ، يرجى الانتظار
                                </Typography>
                                <CircularProgress
                                    size={theme.spacing(8)}
                                    color={'secondary'}
                                />
                            </>
                        )}
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}

export default EmailValidationPage;
