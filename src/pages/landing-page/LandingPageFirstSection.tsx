import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'mui-image';
import webDev from '../../assets/png/wd.png';
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', lg: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: { xs: 4, lg: 30 },
                px: {
                    xs: theme.spacing(4),
                    sm: theme.spacing(4),
                    md: theme.spacing(8),
                    lg: theme.spacing(24),
                },
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', lg: 'flex-start' },
                    textAlign: {
                        xs: 'center',
                        lg: 'right',
                    },
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
    );
}
