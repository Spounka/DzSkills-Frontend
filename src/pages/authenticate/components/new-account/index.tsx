import { Stack, TextField, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import IconFormPassword from "../../../../components/form/IconFormPassword";
import { MainButton } from "../../../../components/ui/MainButton";
import AuthFormsHeader from "../form-header";




function NewAccount() {
    const theme = useTheme();
    return (
        <Stack spacing={2} width={'100%'} sx={{
            py: 6,
            px: 4
        }}>
            <AuthFormsHeader title="أنشئ حسابك الآن"
                subheader={`بناء المهارات لليوم وغدًا وما بعده\n\ منصتك الأفضل لبدأ أولى خطواتك في العمل الحر`}
            />
            <TextField name="first_name" variant="outlined" fullWidth color="secondary" placeholder="الاسم" />
            <TextField name="last_name" variant="outlined" fullWidth color="secondary" placeholder="اللقب" />
            <TextField name="email" type={'email'} variant="outlined"
                fullWidth color="secondary" placeholder="البريد الإلكتروني" />
            <IconFormPassword name="password1" placeholder={"هنا كلمة السر"} />
            <IconFormPassword name="password2" placeholder={"تأكيد كلمة السر"} />

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

            <MainButton text={'انشاء الحساب'} color={theme.palette.secondary.main} />
        </Stack>
    )
}

export default NewAccount