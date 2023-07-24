import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'mui-image';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getAdminConfigs } from '../admin-panel/settings/landing-page/api/query';
import { LoginButton } from './LoginButton';
import { RegisterButton } from './RegisterButton';

export function LandingPageFirstSection({}) {
    const theme = useTheme();

    const adminConfigQuery = useQuery({
        queryKey: ['admin', 'configs'],
        queryFn: () => getAdminConfigs(),
        onSuccess: res => setImageSources(res.images.map(i => i.image)),
    });

    const [imageSources, setImageSources] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [currentImage, setCurrentImage] = useState<string>('');

    const mainText = adminConfigQuery.data?.main_title_text?.content;
    const mainColor = adminConfigQuery.data?.main_title_text?.color;

    const secondaryText = adminConfigQuery.data?.secondary_title_text?.content;
    const secondaryColor = adminConfigQuery.data?.secondary_title_text?.color;

    const main_split_index = mainText?.indexOf('\\') ?? 0;
    const secondary_split_index = secondaryText?.indexOf('\\') ?? 0;

    useEffect(() => {
        const timeout = setInterval(
            () => setCurrentImageIndex(i => ++i % imageSources.length),
            3000
        );

        return () => clearInterval(timeout);
    }, [imageSources.length, adminConfigQuery.data?.images]);

    useEffect(() => {
        if (imageSources.length > 0) setCurrentImage(imageSources[0]);
    }, [imageSources?.length]);
    useEffect(() => {
        setCurrentImage(imageSources[currentImageIndex]);
    }, [currentImageIndex]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', lg: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: { xs: '15dvh', md: '5%', lg: 0 },
                pb: { xs: 5, lg: 0 },
                gap: {
                    xs: 4,
                    lg: 0,
                },
                px: {
                    xs: theme.spacing(4),
                    sm: theme.spacing(4),
                    md: theme.spacing(8),
                    lg: theme.spacing(24),
                },
                width: '100%',
                height: {
                    xs: '110dvh',
                    lg: `calc(100dvh - 5dvh)`,
                },
                bgcolor: {
                    xs: theme.palette.gray.light,
                    md: 'transparent',
                },
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
                    {mainText?.substring(0, main_split_index ?? mainText?.length)}{' '}
                    <Box
                        component={'span'}
                        color={mainColor ?? 'primary.main'}
                    >
                        {mainText?.substring((main_split_index ?? 0) + 1)}{' '}
                    </Box>
                </Typography>
                <Typography
                    variant={'subtitle2'}
                    color={'gray.main'}
                >
                    {secondaryText?.substring(
                        0,
                        secondary_split_index ?? secondaryText?.length
                    )}{' '}
                    <Box
                        component={'span'}
                        color={secondaryColor ?? 'primary.main'}
                    >
                        {secondaryText?.substring((secondary_split_index ?? 0) + 1)}{' '}
                    </Box>
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
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: {
                        xs: '55dvw',
                        lg: '100%',
                    },
                }}
            >
                {imageSources.map(source => {
                    return (
                        <ImageSwitcher
                            key={source}
                            currentImage={currentImage}
                            source={source}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}

function ImageSwitcher({
    source,
    currentImage,
}: {
    source: string;
    currentImage: string;
}) {
    return currentImage === source ? (
        <Image
            src={source}
            fit="contain"
            duration={650}
            easing="ease-in-out"
            style={{
                width: '100%',
                height: 'auto',
            }}
        />
    ) : (
        <></>
    );
}
