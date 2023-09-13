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
                flex={'1 1 25%'}
                width={'100%'}
                onMouseLeave={() => setHovering(false)}
                gap={2}
                alignItems={'center'}
                mb={4}
                onMouseEnter={() => setHovering(true)}
                onClick={() => navigate(`/courses/categorized/?category=${title}`)}
                sx={{
                    cursor: 'pointer',
                    transition: 'all 200ms ease-in-out',
                    px: theme.spacing(2),
                    py: theme.spacing(4),
                    ':hover': {
                        backgroundColor: 'white',
                        transition: 'all 200ms ease-in-out',
                    },
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
                        errorIcon={false}
                        fit="contain"
                        src={image}
                        width={'100%'}
                        style={{
                            aspectRatio: '1/1',
                            height: '100%',
                            borderRadius: theme.spacing(),
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
                        gap: 3,
                        overflow: 'hidden',
                        width: '100%',
                    }}
                >
                    <Box
                        flex={'0 0 10%'}
                        width={'100%'}
                        textAlign={'center'}
                    >
                        {isLoading ? (
                            <Skeleton sx={{ width: '100%' }} />
                        ) : (
                            <Typography variant="h6">{title}</Typography>
                        )}
                    </Box>

                    <Box
                        alignItems={'center'}
                        flex={'1 1 40%'}
                        width="100%"
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
                    fullWidth
                    {...{
                        onClick: () => {
                            navigate(`/courses/categorized/?category=${title}`);
                        },
                        flex: '1 1 20%',
                        height: '100%',
                    }}
                />
            </Box>
        </>
    );
}
