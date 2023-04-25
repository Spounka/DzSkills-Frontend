import { Divider, Stack, Typography } from '@mui/material';
import facebook from '../../../../assets/svg/icons8-facebook.svg';
import google from '../../../../assets/svg/icons8-google.svg';
import SocialMediaButton from '../social-media-button';
import SvgIcon from '../svg-icon';

interface props {
    title: string,
    subheader: string
}
function AuthFormsHeader({ title, subheader }: props) {
    return (
        <>
            <Typography textAlign={"center"} variant={'h5'} fontWeight={500} sx={{
                textDecoration: 'underline',
                padding: 0
            }}>
                {title}
            </Typography>

            <Typography textAlign={"center"} variant={'body2'} fontWeight={300} color={'gray.main'} style={{
                whiteSpace: 'pre-wrap'
            }} >
                {subheader}
            </Typography>

            <Stack direction={'row'} justifyContent={'center'} gap={2} sx={{ width: '100%', }}>
                <SocialLoginButtons />
            </Stack>

            <Divider sx={{
                fontSize: '12px',
                color: 'gray.dark',
                '::after, ::before': {
                    borderTopWidth: '2px',
                }
            }}>
                أو
            </Divider>
        </>
    )
}


function SocialLoginButtons() {
    return (<>
        <SocialMediaButton variant="outlined" color="gray">
            <SvgIcon icon={facebook} style={{
                maxHeight: '24px',
                marginLeft: '0.5rem',
                justifySelf: 'center'
            }} />
            متابعة بفايسبوك
        </SocialMediaButton>
        <SocialMediaButton variant="outlined" color="gray">
            <SvgIcon icon={google} style={{
                maxHeight: '24px',
                alignSelf: 'center',
                marginLeft: '0.5rem',
                justifySelf: 'center'
            }} />
            متابعة بغوغل
        </SocialMediaButton>
    </>
    );
}
export default AuthFormsHeader