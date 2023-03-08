import { Stack, TextField, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import IconFormPassword from "../../../../components/form/IconFormPassword";
import { MainButton } from "../../../../components/ui/MainButton";
import { signUp } from "../../api/authenticate";
import AuthFormsHeader from "../form-header";

const validationSchema = Yup.object({
    first_name: Yup.string()
        .required('تعبئة الخانة اجبارية'),
    last_name: Yup.string()
        .required('تعبئة الخانة اجبارية'),
    email: Yup.string()
        .email('البريد الإلكتروني غير صالح')
        .required('تعبئة الخانة اجبارية'),
    password1: Yup.string()
        .min(8, 'يجب ألا يقل طول الحقل عن 8 أحرف')
        .required('تعبئة الخانة اجبارية'),
    password2: Yup.string()
        .oneOf([Yup.ref('password1'), undefined], 'كلمات السر لا تتطابق')
        .required('تعبئة الخانة اجبارية'),

})

const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
}


function NewAccount() {
    const theme = useTheme();
    const navigate = useNavigate()
    const query = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (values: any) => signUp(values),
        onSuccess: (values) => {
            localStorage.setItem('access_token', values.access_token)
            localStorage.setItem('refresh_token', values.refresh_token)
            return navigate("/profile")
        }
    })
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => query.mutate(values)
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} width={'100%'} sx={{
                py: 6,
                px: 4
            }}>
                <AuthFormsHeader title="أنشئ حسابك الآن"
                    subheader={`بناء المهارات لليوم وغدًا وما بعده\n\ منصتك الأفضل لبدأ أولى خطواتك في العمل الحر`}
                />
                <TextField
                    name="first_name"
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    placeholder="الاسم"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                />
                {formik.touched.first_name && formik.errors.first_name ? <>
                    <Typography variant={'caption'} color={'error'} sx={{
                        px: theme.spacing(2),
                        m: 0
                    }} >{formik.errors.first_name}</Typography>
                </> : null}

                <TextField
                    name="last_name"
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    placeholder="اللقب"

                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                />
                {formik.touched.last_name && formik.errors.last_name ? <>
                    <Typography variant={'caption'} color={'error'} sx={{
                        px: theme.spacing(2),
                        m: 0
                    }} >{formik.errors.last_name}</Typography>
                </> : null}

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
                {formik.touched.email && formik.errors.email ? <>
                    <Typography variant={'caption'} color={'error'} sx={{
                        px: theme.spacing(2),
                        m: 0
                    }} >{formik.errors.email}</Typography>
                </> : null}

                <IconFormPassword
                    name="password1"
                    placeholder={"هنا كلمة السر"}
                    value={formik.values.password1}
                    onChange={formik.handleChange}
                    error={formik.touched.password1 && Boolean(formik.errors.password1)}
                />
                {formik.touched.password1 && formik.errors.password1 ? <>
                    <Typography variant={'caption'} color={'error'} sx={{
                        px: theme.spacing(2),
                        m: 0
                    }} >{formik.errors.password1}</Typography>
                </> : null}

                <IconFormPassword
                    name="password2"
                    placeholder={"تأكيد كلمة السر"}
                    value={formik.values.password2}
                    onChange={formik.handleChange}
                    error={formik.touched.password2 && Boolean(formik.errors.password2)}
                />
                {formik.touched.password2 && formik.errors.password2 ? <>
                    <Typography variant={'caption'} color={'error'} sx={{
                        px: theme.spacing(2),
                        m: 0
                    }} >{formik.errors.password2}</Typography>
                </> : null}


                <Typography textAlign={"center"} variant="caption" color={'gray.main'}>
                    بالضغط على انشاء حساب انت توافق على
                    <Link to="/terms" style={{
                        textDecoration: 'underline',
                    }}>
                        {' شروط الإستخدام '}
                    </Link>
                    و
                    <Link to="/privacy" style={{
                        textDecoration: 'underline',
                    }}>
                        {' سياسة الخصوصية '}
                    </Link>
                </Typography>

                <MainButton type={'submit'} text={'انشاء الحساب'} color={theme.palette.secondary.main} />
            </Stack >
        </form>
    )
}

export default NewAccount