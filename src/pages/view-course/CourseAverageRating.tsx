import { Rating, Stack, Typography } from '@mui/material';

interface props {
    currentRating: number;
}
export function CourseAverageRating({ currentRating }: props) {
    return (
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
    );
}
