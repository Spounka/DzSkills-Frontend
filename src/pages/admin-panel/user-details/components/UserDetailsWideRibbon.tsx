import { MoreHoriz } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import facebook from '../../../../assets/svg/Facebook_Square.svg';
import instagram from '../../../../assets/svg/Instagram_Square.svg';
import linkedin from '../../../../assets/svg/LinkedIn_Square.svg';
import twitter from '../../../../assets/svg/Twitter_Square.svg'
import { User } from '../../../../types/user';



interface UserDetailsWideRibbonProps {
    user: User | undefined
}

export function UserDetailsWideRibbon({ user }: UserDetailsWideRibbonProps) {
    const theme = useTheme();
    if (!user)
        return <></>

    return (<Box sx={{
        display: 'flex',
        bgcolor: theme.palette.secondary.main,
        width: '100%',
        height: 'auto',
        minHeight: '100px',
        borderRadius: theme.spacing(),
        py: 4,
        px: 4,
        gap: 8,
        alignItems: 'center',
        color: 'white'
    }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: 'white',
            flexGrow: '3'
        }}>
            <Avatar src={user.profile_image} sx={{
                height: 'auto',
                width: '128px',
                aspectRatio: '1'
            }} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                <Typography>
                    {`${user.first_name} ${user.last_name}`}
                </Typography>
                <Typography variant={'subtitle2'} color={'gray.light'}>
                    {user.speciality || 'speciality'}
                </Typography>
            </Box>
        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            gap: 2
        }}>
            <Typography>البريد الالكتروني</Typography>
            <Typography>وسائل التواصل</Typography>
        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            alignItems: 'center',
            gap: 2
        }}>
            <Typography>{user.email}</Typography>
            <Box display={'flex'} justifyContent={'center'} gap={1}>
                <img style={{
                    width: theme.spacing(3),
                    height: theme.spacing(3)
                }} src={instagram} alt="" />
                <img style={{
                    width: theme.spacing(3),
                    height: theme.spacing(3)
                }} src={linkedin} alt="" />
                <img style={{
                    width: theme.spacing(3),
                    height: theme.spacing(3)
                }} src={facebook} alt="" />
                <img style={{
                    width: theme.spacing(3),
                    height: theme.spacing(3)
                }} src={twitter} alt="" />
            </Box>
        </Box>
        <Box flexGrow="1">
            <MoreHoriz />
        </Box>


    </Box>);
}
