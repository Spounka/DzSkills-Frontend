import { Avatar, ButtonGroup, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useSelector } from 'react-redux';
import { MainButton } from '../../components/ui/MainButton';
import UploadSvgIcon from '../../components/ui/UploadSvgIcon';
import { selectUser } from '../../redux/userSlice';
import EditProfileField from './components/fields';
import EditProfileColumn from './components/fields-column';
import SocialMediaInput from './SocialMediaInput';

export default function EditProfileContent({ }) {
    const theme = useTheme();
    const user = useSelector(selectUser)
    return (
        <Card elevation={0} sx={{
            gridColumnStart: 5,
            gridColumnEnd: 14,
            maxWidth: '100%',
            minHeight: "70vh",
            py: theme.spacing(5),
            px: theme.spacing(16),
            borderRadius: theme.spacing(2),
            display: 'flex',
            flexDirection: "column",
            gap: theme.spacing(4),
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: theme.spacing(8),
            }}>
                <Avatar sx={{
                    width: theme.spacing(26),
                    height: theme.spacing(26),
                }} />
                <MainButton sx={{ borderRadius: theme.spacing(2), px: theme.spacing(6), py: theme.spacing(1.5) }}
                    {...{
                        size: "large",
                        endIcon: <UploadSvgIcon {...{
                            width: theme.spacing(2),
                            height: theme.spacing(1),
                            style: {
                                margin: `0 1rem 0 0`
                            }
                        }} />
                    }}
                    text={'تحميل صورة'} color={theme.palette.primary.main} />
            </Box>

            <EditProfileColumn>
                <EditProfileField
                    grow
                    name={'first_name'}
                    type={'text'}
                    placeholder={user.user.first_name}
                    label={'الإسم الأول'} />
                <EditProfileField
                    grow
                    name={'last_name'}
                    type={'label'}
                    placeholder={user.user.last_name}
                    label={'اسم العائلة'} />
            </EditProfileColumn>
            <EditProfileColumn>
                <EditProfileField
                    grow
                    name={'email'}
                    type={'email'}
                    placeholder={user.user.email}
                    label={'البريد الإلكتروني'} />
                <EditProfileField
                    grow
                    name={'speciality'}
                    type={'label'}
                    placeholder={user.user.speciality}
                    label={'التخصص'} />
            </EditProfileColumn>
            <EditProfileColumn>
                <EditProfileField
                    grow
                    name={'description'}
                    type={'label'}
                    placeholder={user.user.description}
                    label={'وصف'}
                    multiline />
            </EditProfileColumn>
            <SocialMediaInput text={'Facebook'} name={'facebook_url'} placeholder={'https://facebook.com/'} />
            <SocialMediaInput text={'Behance'} name={'bahance_url'} placeholder={'https://behance.com/'} />
            <SocialMediaInput text={'LinkedIn'} name={'linkedin_url'} placeholder={'https://linkedin.com/'} />
            <ButtonGroup sx={{
                transition: 'all ease-in-out 300ms',
                gap: 4,
            }}>
                <MainButton {...{ fullWidth: true }} text={'حفظ'} color={theme.palette.primary.main} />
                <MainButton {...{ fullWidth: true }} text={'نبذ'} color={theme.palette.error.main} />
            </ButtonGroup>
        </Card>
    );
}
