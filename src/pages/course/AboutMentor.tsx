import { Avatar, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ProfileSocialMedia } from '../../components/ProfileSocialMedia';
import { User } from '../../types/user';

interface AboutMentorProps {
    user?: User;
}

export function AboutMentor({ user }: AboutMentorProps) {
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: {
                        xs: 1,
                        lg: 4,
                    },
                    flexBasis: '50%',
                    width: '100%',
                    px: {
                        xs: theme.spacing(2),
                        lg: theme.spacing(10),
                    },
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: theme.typography.body1,
                            lg: theme.typography.h3,
                        },
                    }}
                >
                    عن المرشد
                </Typography>
                <Typography
                    variant={'subtitle2'}
                    color={'gray.secondary'}
                    display={{ xs: 'none', lg: 'block' }}
                >
                    {user?.description}
                </Typography>
                <ProfileSocialMedia user={user} />
            </Box>
            <Box
                sx={{
                    flexBasis: '50%',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    src={user?.profile_image}
                    sx={{
                        width: '50%',
                        height: 'auto',
                        aspectRatio: '1/1',
                    }}
                />
            </Box>
        </>
    );
}
