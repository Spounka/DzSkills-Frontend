import useLogin from '../authenticate/hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axiosInstance from '../../globals/axiosInstance';
import { useEffect } from 'react';
import { Box, Button, Card, Fab, Typography } from '@mui/material';
import theme from '../../theme';
import { Check } from '@mui/icons-material';

function EmailSendPage() {
    const user = useLogin();
    const navigate = useNavigate();

    const verifyEmail = useMutation({
        mutationKey: ['verify', 'email', 'mutation'],
        mutationFn: () => {
            const result = async () => {
                return axiosInstance.post('/rest-auth/registration/resend-email/', {
                    email: user?.email,
                });
            };
            return result();
        },
        onSuccess: () => {
            navigate('/register/verify-email/');
        },
    });
    if (user?.email === '') navigate('/login/');
    useEffect(() => {
        if (user?.email_valid) {
            navigate('/profile/');
        } else verifyEmail.mutate();
    }, [user?.email]);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                width: '100%',
                alignSelf: 'center',
                my: '5%',
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
                    {user?.email}
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
    );
}

export default EmailSendPage;
