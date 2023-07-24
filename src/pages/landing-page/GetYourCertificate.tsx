import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Image from 'mui-image';
// import certificate from '../../assets/png/certificate.png';
import { LoginButton } from './LoginButton';
import { RegisterButton } from './RegisterButton';

export function GetYourCertificate({ certificate }: any) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    lg: 'row',
                },
                justifyContent: 'space-between',
                alignItems: { xs: 'center', lg: 'flex-start' },
                px: {
                    xs: 8,
                    lg: 14,
                },
                py: {
                    xs: 9,
                    lg: 36,
                },
                gap: {
                    xs: 4,
                    lg: 0,
                },
                bgcolor: theme.palette.gray.secondary,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: { xs: 'center', lg: 'flex-start' },
                    textAlign: {
                        xs: 'center',
                        lg: 'right',
                    },
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
