import { LinearProgress, Rating, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { Video } from '../../types/course';
import { getRatings } from './api/getRatings';

interface ratingsProps {
    video: Video;
}
export function AllRatings({ video }: ratingsProps) {
    const theme = useTheme();
    const [enabled, setEnabled] = useState(false);
    const ratingsQuery = useQuery({
        queryKey: ['video', video.id, 'ratings'],
        queryFn: () => getRatings(video.id),
        enabled: enabled,
        cacheTime: 1000 * 5,
    });
    const [currentRating, setCurrentRating] = useState(0);

    useEffect(() => setEnabled(true), []);
    useEffect(() => {
        setCurrentRating(video.average_rating);
    }, [video]);

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
            <Stack textAlign={'center'}>
                <Typography
                    variant="h2"
                    fontWeight={600}
                >
                    {currentRating.toFixed(1)}
                </Typography>
                <Rating
                    name={'average'}
                    precision={0.5}
                    size={'large'}
                    value={currentRating}
                    readOnly
                    sx={{
                        direction: 'ltr',
                    }}
                />
                <Typography
                    variant="body1"
                    fontWeight={600}
                >
                    تقييم الدرس
                </Typography>
            </Stack>
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
                        rating => Math.trunc(rating.rating) === value
                    ).length;
                    return (
                        <Stack
                            direction={'row'}
                            gap={2}
                            alignItems={'center'}
                        >
                            <LinearProgress
                                key={uuidv4()}
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
