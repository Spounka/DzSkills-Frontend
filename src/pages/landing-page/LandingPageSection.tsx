import { Skeleton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Image from 'mui-image';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/ui/MainButton';

interface LandingPageSectionProps {
    image: string;
    title: string;
    description: string;
    isLoading: boolean;
}
export function LandingPageSection({
    image,
    title,
    description,
    isLoading,
}: LandingPageSectionProps) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [hovering, setHovering] = useState(false);
    return (
        <>
            <Box
                display={'flex'}
                flexDirection={'column'}
                flex={'1 1'}
                width={'100%'}
                onMouseLeave={() => setHovering(false)}
                gap={6}
                alignItems={'center'}
                mb={4}
                onMouseEnter={() => setHovering(true)}
                onClick={() => navigate(`/courses/categorized/?category=${title}`)}
                sx={{
                    cursor: 'pointer',
                }}
            >
                {isLoading ? (
                    <Skeleton
                        variant="rounded"
                        animation="pulse"
                        sx={{
                            width: '100%',
                            aspectRatio: '1',
                            height: 'auto',
                        }}
                    />
                ) : (
                    <Image
                        fit="contain"
                        src={image ?? `https://picsum.photos/300/300/?random=1`}
                        width={'100%'}
                        style={{
                            aspectRatio: '1/1',
                            height: '100%',
                            flex: '1 0 60%',
                            opacity: hovering ? 1 : '.7',
                            transition: 'opacity 200ms ease-in-out',
                        }}
                    />
                )}
                <Stack
                    sx={{
                        flex: '0 0 35%',
                        alignItems: 'center',
                        gap: 8,
                        overflow: 'hidden',
                    }}
                >
                    <Box flex={'0 0 10%'}>
                        {isLoading ? (
                            <Skeleton sx={{ width: '100%' }} />
                        ) : (
                            <Typography variant="h6">{title}</Typography>
                        )}
                    </Box>

                    <Box
                        alignItems={'center'}
                        flex={'1 1 40%'}
                    >
                        {isLoading ? (
                            <Skeleton sx={{ width: '100%' }} />
                        ) : (
                            <Typography
                                variant="subtitle2"
                                color="gray.main"
                                textAlign={'center'}
                                sx={{
                                    verticalAlign: 'baseline',
                                    textOverflow: 'ellipsis',
                                    color: hovering ? 'black' : 'gray.main',
                                    transition: 'color 200ms ease-in-out',
                                }}
                            >
                                {description}
                            </Typography>
                        )}
                    </Box>
                </Stack>
                <MainButton
                    color={theme.palette.primary.main}
                    text={'المزيد'}
                    {...{
                        onClick: () => {
                            navigate(`/courses/categorized/?category=${title}`);
                        },
                        flex: '1 1 25%',
                        height: '100%',
                    }}
                />
            </Box>
        </>
    );
}
