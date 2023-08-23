import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import { CircularProgress, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';

async function submitGoogle() { }
function GoogleCallbackView() {
    const [code, setCode] = useState<string | null>();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const theme = useTheme();
    const navigate = useNavigate();

    const submitUserLogin = useMutation({
        mutationKey: ['google', 'signup'],
        mutationFn: () => submitGoogle(),
        onSuccess: () => {
            setIsLoading(false);
            setTimeout(() => navigate('/profile/'), 3000);
        },
        onError: (errorM: AxiosError) => {
            console.error(errorM);
        },
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const _code = urlParams.get('code');
        if (!_code) navigate('/register/');
        setCode(_code);
        // setTimeout(() => setIsLoading(false), 2000);
    }, []);

    useEffect(() => {
        submitUserLogin.mutate();
    }, [code]);

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
                        <Typography>{code}</Typography>
                        {isLoading && (
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

export default GoogleCallbackView;
