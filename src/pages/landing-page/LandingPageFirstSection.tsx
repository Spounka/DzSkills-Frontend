import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "mui-image";
import webDev from '../../assets/png/wd.png';
import { MainButton } from "../../components/ui/MainButton";

interface LandingPageFirstSectionProps {
}
export function LandingPageFirstSection() {
    const theme = useTheme();
    return <>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pt: 30,
                px: 30,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    flexBasis: '50%',
                }}>
                <Typography variant={'h4'} fontWeight={600} color={'gray.dark'}>
                    فضاءك الافضل للوصول لدروس و كورسات في مجالات <Box component={'span'} color={'primary.main'}>العمل الحر </Box>
                </Typography>
                <Typography variant={'subtitle2'}>
                    يوفر للمستخدمين فرصة الوصول إلى مجموعة متنوعة من الدروس في مختلف المواضيع والمجالات، وذلك بسهولة ومن أي مكان وفي أي وقت.
                    كما يوفر هذا الموقع للمستخدمين المرونة في اختيار المحتوى الذي يرغبون في دراسته والدراسة بهدوء وفي جو من الراحة في المنزل.
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: theme.spacing(4),
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>

                    <MainButton
                        color={theme.palette.primary.main}
                        text={'تسجيل الدخول'} />
                    <MainButton
                        color="secondary"
                        text={'انشاء حساب'}
                        {...{
                            variant: 'outlined',
                            sx: {
                                borderWidth: '2px',
                                color: theme.palette.primary.main,
                                bgcolor: 'white',
                                fontSize: theme.typography.button
                            }
                        }} />
                </Box>
            </Box>
            <Box
                sx={{
                    flexBasis: '30%',
                }}
            >
                <Image src={webDev}
                    fit="contain" />
            </Box>

        </Box>
    </>;

}
