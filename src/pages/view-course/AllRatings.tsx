import { LinearProgress, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { Video } from '../../types/course';
import { CourseAverageRating } from './CourseAverageRating';
import { getRatings } from './api/getRatings';

interface ratingsProps {
    video: Video;
}
export function AllRatings({ video }: ratingsProps) {
    const theme = useTheme();
    const ratingsQuery = useQuery({
        queryKey: ['video', video.id, 'ratings'],
        queryFn: () => getRatings(video.id || 0),
        cacheTime: 1000 * 5,
        onSuccess: () => setCurrentRating(video.average_rating || 0),
    });
    const [currentRating, setCurrentRating] = useState<number | undefined>(0);

    useEffect(() => {
        setCurrentRating(video.average_rating);
    }, [video.average_rating, ratingsQuery.data]);

    if (ratingsQuery.isLoading) return <>....</>;
    if (!ratingsQuery.data) return <>Error...</>;
    return (
        <Stack
            height={'100%'}
            width={'100%'}
            flexBasis={'50%'}
            direction="row"
            gap={2}
            sx={{
                direction: 'ltr',
                color: theme.palette.yellow.main,
                alignItems: 'center',
            }}
        >
            <CourseAverageRating currentRating={currentRating || 0} />
            <Stack
                width={'100%'}
                flexGrow={'1'}
                gap={0}
                sx={{
                    direction: 'ltr',
                    color: theme.palette.gray.dark,
                }}
            >
                {[5, 4, 3, 2, 1].map(value => {
                    const count = ratingsQuery.data?.filter(
                        rating => Math.floor(rating.rating) === value
                    ).length;
                    return (
                        <Stack
                            key={uuidv4()}
                            direction={'row'}
                            gap={2}
                            alignItems={'center'}
                        >
                            <LinearProgress
                                variant={'determinate'}
                                color="inherit"
                                value={(count / ratingsQuery.data?.length) * 100 || 0}
                                sx={{
                                    scale: '-1 1',
                                    borderRadius: 0,
                                    bgcolor: theme.palette.gray.light,
                                    height: theme.spacing(0.6),
                                    width: '100%',
                                }}
                            />
                            <Typography variant="subtitle2">{count}</Typography>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
}
