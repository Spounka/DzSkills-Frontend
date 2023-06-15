import { Check } from '@mui/icons-material';
import { Box, Button, Card, Fab, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import AuthenticationTopBar from '../../components/ui/AuthenticationTopBar';
import axiosInstance from '../../globals/axiosInstance';
import theme from '../../theme';
import useLogin from '../authenticate/hooks/useLogin';

function EmailSendPage() {
    const [user] = useLogin();
    const navigate = useNavigate();

    const verifyEmail = useMutation({
        mutationKey: ['verify', 'email', 'mutation'],
        mutationFn: () => {
            const result = async () => {
                return axiosInstance.post('/rest-auth/registration/resend-email/', {
                    email: user.data?.email,
                });
            };
            return result();
        },
        onSuccess: () => {
            navigate('/register/verify-email/');
        },
    });
    if (user.data?.email === '') navigate('/login/');
    useEffect(() => {
        if (user.data?.email_valid) {
            navigate('/profile/');
        } else verifyEmail.mutate();
    }, [user.data?.email]);

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
                        <Typography
                            variant={'h6'}
                            color={'secondary'}
                        >
                            تم إرسال رابط التأكيد إلى بريدك الإلكتروني
                            <br />
                            {user.data?.email}
                        </Typography>
                        <Fab
                            color={'secondary'}
                            disabled
                            disableTouchRipple
                            disableRipple
                            sx={{
                                // color: theme.palette.secondary.main,
                                bgcolor: theme.palette.secondary.main,
                                '&:disabled': {
                                    bgcolor: theme.palette.secondary.main,
                                    color: 'white',
                                },
                            }}
                        >
                            <Check />
                        </Fab>
                        <Button
                            color={'secondary'}
                            component={'label'}
                            disableRipple
                            onClick={() => verifyEmail.mutate()}
                        >
                            <Typography
                                sx={{
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '3px',
                                }}
                            >
                                لم يتم استلام الرابط؟ أعد الإرسال
                            </Typography>
                        </Button>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}

export default EmailSendPage;
