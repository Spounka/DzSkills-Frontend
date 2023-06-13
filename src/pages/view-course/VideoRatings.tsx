import { Box } from '@mui/material';
import { Video } from '../../types/course';
import { AddRating } from './AddRating';
import { AllRatings } from './AllRatings';

interface props {
    video: Video;
}
export function VideoRatings({ video }: props) {
    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            width={'100%'}
            height={'100%'}
        >
            <AddRating video={video} />
            <AllRatings video={video} />
        </Box>
    );
}
