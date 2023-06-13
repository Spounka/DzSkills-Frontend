import { Rating, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Video } from '../../types/course';
import useLogin from '../authenticate/hooks/useLogin';
import { postRating } from './api/postRating';

interface addProps {
    video: Video;
}
export function AddRating({ video }: addProps) {
    const params = useParams();

    if (!params || !params.id) return <Typography>Error</Typography>;

    // @ts-ignore
    if (isNaN(params.id)) return <NotFound />;

    const id: number = parseInt(params.id);
    const [user] = useLogin();
    const [currentValue, setCurrentValue] = useState<any>(null);
    const [shouldUpdateOnSubmit, setShouldUpdateOnSubmit] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const ratingMutation = useMutation({
        mutationKey: ['video', video.id, 'rating', user.data?.pk],
        mutationFn: (value: number) =>
            postRating(user.data?.pk, video.id, value, shouldUpdateOnSubmit),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['video', video.id, 'ratings'] });
            console.log(video.id);
            queryClient.invalidateQueries({ queryKey: ['courses', id] });
        },
    });

    useEffect(() => {
        let rating = video.ratings.filter(rating => rating.student === user.data?.pk)[0];
        if (rating) {
            setCurrentValue(rating.rating);
            setShouldUpdateOnSubmit(true);
        } else {
            setShouldUpdateOnSubmit(false);
            setCurrentValue(null);
        }
    }, [video.ratings, video]);

    return (
        <Stack
            height={'100%'}
            // width={'100%'}
            flexBasis={'50%'}
        >
            <Typography variant={'h5'}>اضف تقييم</Typography>
            <Rating
                name={'rating'}
                precision={0.5}
                size={'large'}
                value={currentValue}
                onChange={(_, value) => {
                    setCurrentValue(value);
                    ratingMutation.mutate(value || 1);
                }}
                sx={{
                    direction: 'ltr',
                    scale: '-1 1',
                    width: 'min-content',
                    height: '100%',
                }}
            />
        </Stack>
    );
}
