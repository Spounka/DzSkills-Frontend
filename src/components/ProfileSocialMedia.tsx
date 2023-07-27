import Box from '@mui/material/Box';
import { ReactComponent as FacebookSquare } from '../assets/svg/Facebook_Square.svg';
import { ReactComponent as InstagramSquare } from '../assets/svg/Instagram_Square.svg';
import { ReactComponent as LinkedInSquare } from '../assets/svg/LinkedIn_Square.svg';
import { ReactComponent as TwitterSquare } from '../assets/svg/Twitter_Square.svg';
import { User } from '../types/user';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface Props {
    user?: Partial<User>;
}
export function ProfileSocialMedia({ user }: Props) {
    return (
        <Box
            display={'flex'}
            gap={2}
        >
            <SocialMediaLink
                icon={<LinkedInSquare style={{ maxWidth: '5vw' }} />}
                link={user?.linkedin_link ?? ''}
            />
            <SocialMediaLink
                icon={<FacebookSquare style={{ maxWidth: '5vw' }} />}
                link={user?.facebook_link ?? ''}
            />
            <SocialMediaLink
                icon={<TwitterSquare style={{ maxWidth: '5vw' }} />}
                link={user?.twitter_link ?? ''}
            />
            <SocialMediaLink
                icon={<InstagramSquare style={{ maxWidth: '5vw' }} />}
                link={user?.instagram_link ?? ''}
            />
        </Box>
    );
}

interface LinkProps {
    link: string;
    icon: ReactNode;
}
function SocialMediaLink({ link, icon }: LinkProps) {
    return <Link to={link}>{icon}</Link>;
}
