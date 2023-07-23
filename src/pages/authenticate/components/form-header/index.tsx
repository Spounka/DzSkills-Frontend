import { Divider, Stack, Typography } from '@mui/material';
// import facebook from '../../../../assets/svg/icons8-facebook.svg';
// import google from '../../../../assets/svg/icons8-google.svg';
// import SocialMediaButton from '../social-media-button';
// import SvgIcon from '../svg-icon';
import SocialLoginButtons from '../social-login-buttons';
import SocialMediaButton from '../social-media-button';

interface props {
    title: string;
    subheader: string;
}
function AuthFormsHeader({ title, subheader }: props) {
    return (
        <>
            <Typography
                textAlign={'center'}
                variant={'h5'}
                fontWeight={500}
                sx={{
                    textDecoration: 'underline',
                    padding: 0,
                }}
            >
                {title}
            </Typography>

            <Typography
                textAlign={'center'}
                variant={'body2'}
                fontWeight={300}
                color={'gray.main'}
                style={{
                    whiteSpace: 'pre-wrap',
                }}
            >
                {subheader}
            </Typography>

            <Stack
                direction={'row'}
                justifyContent={'center'}
                gap={{ xs: 4, md: 6 }}
                sx={{ width: '100%' }}
            >
                <SocialLoginButtons />
            </Stack>

            <Divider
                sx={{
                    fontSize: '12px',
                    color: 'gray.dark',
                    '::after, ::before': {
                        borderTopWidth: '2px',
                    },
                }}
            >
                أو
            </Divider>
        </>
    );
}

export default AuthFormsHeader;
