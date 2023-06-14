import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Image from 'mui-image';
import certificate from '../../assets/png/certificate.png';
import { LoginButton } from './LoginButton';
import { RegisterButton } from './RegisterButton';

export function GetYourCertificate() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 15,
                py: 36,
                bgcolor: theme.palette.gray.secondary,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    flexBasis: '60%',
                }}
            >
                <Typography
                    variant={'h4'}
                    fontWeight={600}
                >
                    احصل على شهادة عند اتمامك لاي كورس لإثبات كفاءتك في المجال
                </Typography>
                <Typography variant={'subtitle2'}>
                    وثيقة تمنح للطلاب بعد الانتهاء من دراسة دورة أو برنامج تعليمي محدد
                    وتعتبر شهادة إتمام درس دليلا على مهارات الطالب ومستواه الأكاديمي في
                    الموضوع المدرس، كما يمكن استخدامها كإثبات لدى الجهات العامة أو الخاصة
                    عند الحاجة إليها
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: theme.spacing(4),
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <LoginButton />
                    <RegisterButton />
                </Box>
            </Box>
            <Box
                sx={{
                    flexBasis: '30%',
                }}
            >
                <Image
                    src={certificate}
                    fit="contain"
                />
            </Box>
        </Box>
    );
}
