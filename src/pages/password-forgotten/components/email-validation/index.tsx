import { TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormEvent } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../../../components/ui/MainButton';
import axiosInstance from '../../../../globals/axiosInstance';
import theme from '../../../../theme';

function PasswordForgottenEmailSection({ onNextButtonClick }: any) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const sumbitEmailMutation = useMutation({
        mutationKey: ['user', 'password', 'reset'],
        mutationFn: async (body: FormData) => {
            const { data } = await axiosInstance.post(
                '/rest-auth/password/reset/',
                body
            );
            return data;
        },
        onSuccess: () => {
            enqueueSnackbar('تم إرسال البريد الإلكتروني بنجاح', { variant: 'success' });
            setTimeout(() => navigate('/login/'), 2000);
        },

        onError: () => {
            enqueueSnackbar('فشل إرسال البريد الإلكتروني', { variant: 'error' });
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        sumbitEmailMutation.mutate(formData);
    };

    return (
        <form
            onSubmit={onSubmit}
            style={{
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

            <TextField
                name="email"
                type={'email'}
                variant="outlined"
                fullWidth
                color="secondary"
                placeholder="البريد الإلكتروني"
                size="small"
                sx={{
                    fieldset: {
                        borderRadius: '0.5rem',
                        // @ts-ignore
                        borderColor: `${theme.palette.gray.light}`,
                        borderWidth: '2px',
                    },
                    '&:hover': {
                        // @ts-ignore
                        borderColor: `${theme.palette.gray.light}`,
                    },
                }}
                InputProps={{
                    sx: {
                        p: 1,
                        fontSize: '.8rem',
                    },
                }}
            />

            {
                <MainButton
                    type="submit"
                    text={'ارسال التأكيد'}
                    color={theme.palette.secondary.main}
                    // {...{ onClick: onNextButtonClick }}
                />
            }
        </form>
    );
}

export default PasswordForgottenEmailSection;
