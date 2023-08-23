import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import IconFormPassword from '../../components/form/IconFormPassword';
import { MainButton } from '../../components/ui/MainButton';
import axiosInstance from '../../globals/axiosInstance';
import PasswordForgottenEmailSection from './components/email-validation';
import { useSnackbar } from 'notistack';

export function PasswordResetForm({
    userUID,
    token,
}: {
    userUID: string;
    token: string;
}) {
    const theme = useTheme();
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!userUID || userUID === '' || !token || token === '')
            navigate('/password/reset/');
    }, [userUID, token]);

    const submitPasswordMutation = useMutation({
        mutationKey: ['user', 'password', 'change'],
        mutationFn: async (body: FormData) => {
            return await axiosInstance.post(`/rest-auth/password/reset/confirm/`, body);
        },
        onSuccess: () => {
            enqueueSnackbar('تم تغيير كلمة المرور بنجاح', { variant: 'success' });
            setTimeout(() => navigate('/login/'), 2000);
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ أثناء تغيير كلمة المرور', { variant: 'error' });
            enqueueSnackbar('حاول مرة اخرى', { variant: 'error' });
        },
    });
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('uid', userUID);
        formData.set('token', token);
        submitPasswordMutation.mutate(formData);
    };
    return (
        <form
            onSubmit={onSubmit}
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <Typography
                textAlign={'center'}
                variant={'h5'}
                fontWeight={500}
                sx={{
                    textDecoration: 'underline',
                    padding: 0,
                }}
            >
                نسيت كلمة السر
            </Typography>

            <Typography
                textAlign={'center'}
                variant={'body2'}
                fontWeight={300}
                color={'gray.main'}
                style={{
                    whiteSpace: 'pre-wrap',
                }}
            >
                {
                    'قم بإدخال بريدك الإلكتروني حتى يتم إرسال\n رابط لإعادة تعيين كلمة السر الخاصة بك'
                }
            </Typography>
            <IconFormPassword
                name="new_password1"
                placeholder={'هنا كلمة السر'}
            />
            <IconFormPassword
                name="new_password2"
                placeholder={'تأكيد كلمة السر'}
            />
            <input
                hidden
                readOnly
                name={'uid'}
                value={userUID}
            />
            <input
                hidden
                readOnly
                name={'token'}
                value={token}
            />
            <MainButton
                color={theme.palette.secondary.main}
                type="submit"
                text="إرسال"
                {...{
                    sx: { alignSelf: 'flex-end' },
                }}
            />
        </form>
    );
}

function getStageComponent(
    stage: number,
    moveNextStage: any,
    token: string,
    uid: string
) {
    switch (stage) {
        case 0:
            return (
                <PasswordForgottenEmailSection
                    onNextButtonClick={() => moveNextStage(1)}
                />
            );
        case 1:
            return (
                <PasswordResetForm
                    token={token}
                    userUID={uid}
                />
            );
    }
}

interface props {
    stage?: number;
}
function PasswordForgotten({ stage }: props) {
    const [currentStage, setCurrentStage] = useState(stage ?? 0);
    const [uid, setUID] = useState('');
    const [token, setToken] = useState('');

    const url = new URL(location.href);
    useEffect(() => {
        if (url.searchParams.has('u') && url.searchParams.has('t')) {
            setCurrentStage(1);
            setUID(url.searchParams.get('u') ?? '');
            setToken(url.searchParams.get('t') ?? '');
        }
    }, [uid, token, currentStage]);

    return (
        <Grid
            container
            direction="column"
            spacing={5}
            id={'main grid container'}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100%',
                height: '100%',
                pt: 4,
            }}
        >

            <Grid
                item
                xs={12}
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
                        maxWidth: '100%',
                        marginBottom: '5rem',
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            gridColumnStart: { xs: 2, lg: 5 },
                            gridColumnEnd: { lg: 9, xs: -1 },
                            maxWidth: '100%',
                            minHeight: '70vh',
                            marginTop: 8,
                            py: 8,
                            px: 4,
                        }}
                    >
                        <Stack
                            spacing={4}
                            height={'100%'}
                        >
                            {getStageComponent(
                                currentStage,
                                setCurrentStage,
                                token,
                                uid
                            )}
                        </Stack>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}

export default PasswordForgotten;
