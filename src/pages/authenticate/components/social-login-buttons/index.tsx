import { ReactComponent as FacebookSVG } from '../../../../assets/svg/icons8-facebook.svg';
import axiosInstance from '../../../../globals/axiosInstance';
import SocialMediaButton from '../social-media-button';
// import SocialMediaButton from '../social-media-button';
import { Circle, HighlightOff } from '@mui/icons-material';
import { Box, Paper, Snackbar, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import {
    LoginSocialFacebook,
    LoginSocialGoogle,
    objectType,
} from 'reactjs-social-login';
import { ReactComponent as GoogleSVG } from '../../../../assets/svg/icons8-google.svg';

import SvgIcon from '../svg-icon';

function ButtonSvg({ icon, ...other }: any) {
    return (
        <SvgIcon
            icon={icon}
            style={{
                maxHeight: '24px',
                alignSelf: 'center',
                marginLeft: '0.5rem',
                justifySelf: 'center',
            }}
            {...other}
        />
    );
}

async function facebookLogin(access_token: string) {
    const { data } = await axiosInstance.post('/rest-auth/facebook/', {
        access_token: access_token,
    });
    return data;
}
async function googleLogin(access_token: string) {
    const { data } = await axiosInstance.post('/rest-auth/google/', {
        access_token: access_token,
    });
    return data;
}

function SocialLoginButtons() {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState<string>('An error occured');

    const action = (
        <Paper
            elevation={0}
            sx={{
                color: 'white',
                bgcolor: 'white',
                display: 'flex',
            }}
        >
            <Circle sx={{ color: 'gray', bgcolor: 'gray' }}>
                <HighlightOff sx={{ color: 'white', bgcolor: 'white' }} />
            </Circle>
        </Paper>
    );

    return (
        <Box
            display={'flex'}
            flexDirection={{
                xs: 'column',
                md: 'row',
            }}
            width={'100%'}
            gap={2}
            justifyContent={'center'}
        >
            <Snackbar
                open={isOpen}
                onClose={() => setIsOpen(false)}
                autoHideDuration={4000}
                message={'Facebook init failed'}
                action={action}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
            <Box
                width={'100%'}
                sx={{ direction: 'rtl', textAlign: 'center' }}
            >
                <LoginSocialFacebook
                    appId={'885228976144174'}
                    version="v17.0"
                    scope={'email,public_profile'}
                    onReject={response => {
                        setIsOpen(true);
                    }}
                    onResolve={response => {
                        const data = async () =>
                            await facebookLogin(response.data?.accessToken).then(
                                response => {
                                    localStorage.setItem(
                                        'access',
                                        response.data.accessToken
                                    );
                                    return response;
                                }
                            );
                        data().finally();
                    }}
                >
                    <SocialMediaButton
                        variant="outlined"
                        color="gray"
                        sx={{ width: '100%' }}
                    >
                        <FacebookSVG
                            style={{ flex: '1 1 50%' }}
                            height={theme.spacing(3)}
                        />
                        <Typography
                            flex={'1 1 50%'}
                            variant={'caption'}
                        >
                            فايسبوك
                        </Typography>
                    </SocialMediaButton>
                </LoginSocialFacebook>
            </Box>

            <Box
                width={'100%'}
                sx={{ direction: 'rtl' }}
            >
                <LoginSocialGoogle
                    redirect_uri="http://localhost:3000/social/google/login/callback/"
                    client_id={
                        '497631069809-s8lrg6gs33p12mo7fuuola8occn2907p.apps.googleusercontent.com'
                    }
                    onResolve={response => {
                        const data = async () =>
                            await googleLogin(response.data?.access_token);
                        data()
                            .then(result => {
                                console.warn('result data:', result);
                                console.warn('response data: ', response.data);
                                localStorage.setItem(
                                    'access',
                                    response.data?.access_token
                                );
                                return response;
                            })
                            .catch(error => {
                                console.error('error occured', error);
                            });
                    }}
                    onReject={function (reject: string | objectType): void {
                        console.error(reject);
                    }}
                >
                    <SocialMediaButton
                        variant="outlined"
                        color="gray"
                    >
                        <GoogleSVG
                            style={{ flex: '0 1 50%' }}
                            height={theme.spacing(3)}
                        />
                        <Typography
                            flex={'1 1 50%'}
                            variant={'caption'}
                        >
                            غوغل
                        </Typography>
                    </SocialMediaButton>
                </LoginSocialGoogle>
            </Box>
        </Box>
    );
}
export default SocialLoginButtons;
