import { Rating, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Video } from '../../types/course';
import useLogin from '../authenticate/hooks/useLogin';
import { postRating } from './api/postRating';
import { useRouteID } from '../../globals/hooks';

interface addProps {
    video: Video;
}

export function AddRating({ video }: addProps) {
    const id: number = useRouteID();
    const user = useLogin();
    const [currentValue, setCurrentValue] = useState<any>(null);
    const [shouldUpdateOnSubmit, setShouldUpdateOnSubmit] = useState<boolean>(true);

    const queryClient = useQueryClient();
    const ratingMutation = useMutation({
        mutationKey: ['video', video.id, 'rating', user?.pk],
        mutationFn: (value: number) =>
            postRating(user?.pk, value, video.id, shouldUpdateOnSubmit),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['video', video.id, 'ratings'],
            });
            await queryClient.invalidateQueries({ queryKey: ['courses', id] });
        },
    });

    useEffect(() => {
        let rating = video.ratings?.filter(rating => rating.student === user?.pk)[0];
        if (rating) {
            setCurrentValue(rating.rating);
            setShouldUpdateOnSubmit(true);
        } else {
            setShouldUpdateOnSubmit(false);
            setCurrentValue(null);
        }
    }, [video.ratings, video]);
    useEffect(() => {
        if (currentValue) {
            setShouldUpdateOnSubmit(true);
            ratingMutation.mutate(currentValue);
        }
    }, [currentValue]);

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
                    if (!value || value < 0) setCurrentValue(1);
                    else setCurrentValue(value);
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
