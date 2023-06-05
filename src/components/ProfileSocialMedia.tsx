import Box from '@mui/material/Box';
import { ReactComponent as FacebookSquare } from '../assets/svg/Facebook_Square.svg';
import { ReactComponent as InstagramSquare } from '../assets/svg/Instagram_Square.svg';
import { ReactComponent as LinkedInSquare } from '../assets/svg/LinkedIn_Square.svg';
import { ReactComponent as TwitterSquare } from '../assets/svg/Twitter_Square.svg';

export function ProfileSocialMedia({}) {
    return (
        <Box
            display={'flex'}
            gap={2}
        >
            <InstagramSquare />
            <LinkedInSquare />
            <FacebookSquare />
            <TwitterSquare />
        </Box>
    );
}
