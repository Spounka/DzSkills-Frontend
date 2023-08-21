import { Stack, TextField, Typography, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import IconFormPassword from '../../../../components/form/IconFormPassword';
import { MainButton } from '../../../../components/ui/MainButton';
import axiosInstance from '../../../../globals/axiosInstance';
import { LoginUser, updateUser } from '../../../../redux/userSlice';
import { login } from '../../api/authenticate';
import AuthFormsHeader from '../form-header';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('البريد الإلكتروني غير صالح')
        .required('تعبئة الخانة اجبارية'),
    password: Yup.string()
        .min(8, 'يجب ألا يقل طول الحقل عن 8 أحرف')
        .required('تعبئة الخانة اجبارية'),
});

const initialValues = {
    email: '',
    password: '',
};

export default function Login() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const verifyEmail = useMutation({
    //     mutationKey: ['verify', 'email', 'mutation'],
    //     mutationFn: () => {
    //         const result = async () => {
    //             return axiosInstance.post('/rest-auth/registration/resend-email/', {
    //                 email: formik.values.email,
    //             });
    //         };
    //         return result();
    //     },
    //     onSuccess: () => {
    //         navigate('/register/verify-email/');
    //     },
    // });
    const query = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ email, password }: any) => {
            return login({ email, password });
        },
        onSuccess: (response: LoginUser) => {
            dispatch(updateUser(response));
            localStorage.setItem('access', response.access || '');
            localStorage.setItem('refresh', response.refresh || '');
            if (!response.user.email_valid) {
                navigate('/register/verify-email/');
            } else {
                const url = new URL(window.location.href);
                if (url.searchParams.get('next'))
                    navigate(url.searchParams.get('next') ?? '/');
                else navigate('/profile');
            }
        },
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async ({ email, password }, actions) => {
            actions.setSubmitting(true);

            async function fn() {
                query.mutate({ email, password });
                // actions.setSubmitting(false)
            }

            await fn();
        },
        validateOnMount: false,
    });

    useEffect(() => {
        const url = new URL(window.location.href);
        let next = '';
        if (url.searchParams.get('next')) next = `?next=${url.searchParams.get('next')}`;
        window.history.replaceState(null, '', `/login/${next}`);
    }, []);

    return (
        <Stack
            spacing={2}
            width={'100%'}
            sx={{
                py: 6,
                px: 4,
            }}
        >
            <Helmet>
                <meta charSet="utf-8" />
                <title>DzSkills | Login</title>
            </Helmet>
            <AuthFormsHeader
                title="سجل الدخول إلى حسابك"
                subheader={`بناء المهارات لليوم وغدًا وما بعده\n\ منصتك الأفضل لبدأ أولى خطواتك في العمل الحر`}
            />
            <form onSubmit={formik.handleSubmit}>
                <Stack
                    spacing={2}
                    width={'100%'}
                >
                    <TextField
                        name="email"
                        type={'email'}
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        placeholder="البريد الإلكتروني"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <>
                            <Typography
                                variant={'caption'}
                                color={'error'}
                                sx={{
                                    px: theme.spacing(2),
                                    m: 0,
                                }}
                            >
                                {formik.errors.email}
                            </Typography>
                        </>
                    ) : null}
                    <IconFormPassword
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password && Boolean(formik.errors.password)
                        }
                        name="password"
                        placeholder={'هنا كلمة السر'}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <>
                            <Typography
                                variant={'caption'}
                                color={'error'}
                                sx={{
                                    px: theme.spacing(2),
                                    m: 0,
                                }}
                            >
                                {formik.errors.password}
                            </Typography>
                        </>
                    ) : null}
                    <MainButton
                        type={'submit'}
                        color={theme.palette.secondary.main}
                        text={'تسجيل الدخول'}
                        spin={formik.isSubmitting}
                    />

                    <Link
                        to="/password/reset/"
                        style={{
                            color: `${theme.palette.secondary.main}`,
                            alignSelf: 'center',
                            marginTop: 40,
                        }}
                    >
                        نسيت كلمة السر ؟
                    </Link>
                </Stack>
            </form>
        </Stack>
    );
}
