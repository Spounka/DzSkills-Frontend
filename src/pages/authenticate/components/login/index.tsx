import { Stack, TextField, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import IconFormPassword from '../../../../components/form/IconFormPassword'
import { MainButton } from '../../../../components/ui/MainButton'
import AuthFormsHeader from '../form-header'

function Login() {
    const theme = useTheme()
    return (
        <Stack spacing={2} width={'100%'} sx={{
            py: 6,
            px: 4,
        }}>
            <AuthFormsHeader title="أنشئ حسابك الآن"
                subheader={`بناء المهارات لليوم وغدًا وما بعده\n\ منصتك الأفضل لبدأ أولى خطواتك في العمل الحر`}
            />
            <TextField name="email" type={'email'} variant="outlined"
                fullWidth color="secondary" placeholder="البريد الإلكتروني" />
            <IconFormPassword name="password" placeholder={"هنا كلمة السر"} />
            <MainButton text={'تسجيل الدخول'} color={theme.palette.secondary.main} />

            <Link to="password-reset" style={{
                color: `${theme.palette.secondary.main}`,
                alignSelf: 'center',
                marginTop: 40
            }}>
                نسيت كلمة السر ؟
            </Link>
        </Stack>
    )
}

export default Login