import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'mui-image';
import VideoPlaceholder from '../../assets/png/video-placeholder.png';
import { Video } from '../../types/course';

export function CourseVideoShowcase({ video }: { video?: Video }) {
    return (
        <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            maxHeight={'300px'}
            gap={5}
            sx={{
                overflowY: 'hidden',
                textOverflow: 'ellipsis',
            }}
        >
            <Stack
                flex={'0 0 35%'}
                // width={'100%'}
                justifyContent={'center'}
                sx={{
                    fontSize: '1.3rem',
                    direction: 'rtl',
                    gap: {
                        xs: 1,
                        md: 2,
                        lg: 4,
                    },
                }}
            >
                <Stack>
                    <Typography color={'gray.main'}>{`#الدرس`}</Typography>
                    <Typography
                        color={'gray.dark'}
                        sx={{
                            fontSize: '1.55rem',
                        }}
                    >
                        {video?.title}
                    </Typography>
                </Stack>
                <Typography
                    color={'gray.main'}
                    variant={'body1'}
                    fontWeight={300}
                    maxHeight={'10vw'}
                >
                    {video?.description}
                </Typography>
            </Stack>
            <Box
                sx={{
                    width: '100%',
                    flex: {
                        xs: '0 1 65%',
                        lg: '0 1 50%',
                    },
                }}
            >
                <Image src={video?.thumbnail ?? VideoPlaceholder} />
            </Box>
        </Stack>
    );
}
