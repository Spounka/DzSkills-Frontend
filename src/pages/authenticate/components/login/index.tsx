import { Paper, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import IconFormPassword from '../../../../components/form/IconFormPassword'
import { MainButton } from '../../../../components/ui/MainButton'
import { updateUser } from '../../../../redux/userSlice'
import { login } from '../../api/login'
import AuthFormsHeader from '../form-header'


const validationSchema = Yup.object({
    email: Yup.string()
        .email('البريد الإلكتروني غير صالح')
        .required('تعبئة الخانة اجبارية'),
    password: Yup.string()
        .min(8, 'يجب ألا يقل طول الحقل عن 8 أحرف')
        .required('تعبئة الخانة اجبارية')
})

const initialValues = {
    email: '',
    password: '',
}

interface props {
    errors?: string | any
}

function ErrorField({ errors }: props) {
    const theme = useTheme()
    return (
        <Paper elevation={0} sx={{
            bgcolor: theme.palette.error.light,
            py: theme.spacing(),
            px: theme.spacing(),
            borderRadius: theme.spacing(),
        }}>
            <Typography
                variant={'subtitle1'}
                color={'white'}
            >{errors}</Typography>
        </Paper>
    )

}
export default function Login() {
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ email, password }: { email: string, password: string }) => login({ email, password }),
        onSuccess: (response) => {
            dispatch(updateUser(response))
            navigate('/profile');
        }

    })
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: ({ email, password }) => query.mutate({ email, password })
    })
    return (
        <Stack spacing={2} width={'100%'} sx={{
            py: 6,
            px: 4,
        }}>
            <AuthFormsHeader title="أنشئ حسابك الآن"
                subheader={`بناء المهارات لليوم وغدًا وما بعده\n\ منصتك الأفضل لبدأ أولى خطواتك في العمل الحر`}
            />
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2} width={'100%'} >
                    <TextField
                        name="email"
                        type={'email'}
                        variant="outlined"
                        fullWidth color="secondary" placeholder="البريد الإلكتروني"
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
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        name="password" placeholder={"هنا كلمة السر"} />
                    {formik.touched.password && formik.errors.password ? <>
                        <Typography variant={'caption'} color={'error'} sx={{
                            px: theme.spacing(2),
                            m: 0
                        }} >{formik.errors.password}</Typography>
                    </> : null}
                    <MainButton type={'submit'} text={'تسجيل الدخول'} color={theme.palette.secondary.main} />

                    <Link to="password-reset" style={{
                        color: `${theme.palette.secondary.main}`,
                        alignSelf: 'center',
                        marginTop: 40
                    }}>
                        نسيت كلمة السر ؟
                    </Link>
                </Stack>
            </form>
        </Stack >
    )
}
