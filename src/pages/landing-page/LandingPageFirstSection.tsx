import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'mui-image';
import webDev from '../../assets/png/wd.png';
import { MainButton } from '../../components/ui/MainButton';
import { LoginButton } from './LoginButton';
import { RegisterButton } from './RegisterButton';

interface LandingPageFirstSectionProps {
    mainColor: string | undefined;
    mainText: string | undefined;
    secondaryColor: string | undefined;
    secondaryText: string | undefined;
}
export function LandingPageFirstSection({
    mainColor,
    mainText,
    secondaryColor,
    secondaryText,
}: LandingPageFirstSectionProps) {
    const theme = useTheme();
    return (
        <>
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
                        flexBasis: '60%',
                    }}
                >
                    <Typography
                        variant={'h4'}
                        fontWeight={600}
                        color={'gray.dark'}
                    >
                        فضاءك الافضل للوصول لدروس و كورسات في مجالات{' '}
                        <Box
                            component={'span'}
                            color={mainColor || 'primary.main'}
                        >
                            العمل الحر{' '}
                        </Box>
                    </Typography>
                    <Typography
                        variant={'subtitle2'}
                        color={secondaryColor || 'gray.main'}
                    >
                        {secondaryText}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: theme.spacing(4),
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        {/* <MainButton
                            color={theme.palette.primary.main}
                            text={'تسجيل الدخول'}

                        /> */}
                        {/* <MainButton
                            color="secondary"
                            text={'انشاء حساب'}
                            {...{
                                variant: 'outlined',
                                sx: {
                                    borderWidth: '2px',
                                    color: theme.palette.primary.main,
                                    bgcolor: 'white',
                                    fontSize: theme.typography.button,
                                },
                            }}
                        /> */}
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
                        src={webDev}
                        fit="contain"
                    />
                </Box>
            </Box>
        </>
    );
}
