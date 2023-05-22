import {
    Avatar,
    Box,
    Button,
    Card,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import IconFormPassword from '../../../../components/form/IconFormPassword';
import { MainButton } from '../../../../components/ui/MainButton';
import useLogin from '../../../authenticate/hooks/useLogin';
import EditProfileField from '../../../edit-profile/components/fields';
import AdminDashboardLayout from '../../layout';
import { AdminInfoSidebar } from '../AdminInfoSidebar';

function AddAdmin() {
    const theme = useTheme();
    const user = useLogin();

    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('');
    function onProfileImageChange(e: ChangeEvent<HTMLInputElement>) {
        const inputElement = e.target;
        let files: FileList | null = inputElement.files;
        if (files) {
            console.log('dela3a');
            console.log(files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(files[0]);
        } else console.log('oulach dela3');
    }

    return (
        <AdminDashboardLayout topbar_title={'الإعدادت'}>
            <Box
                display="flex"
                width={'100%'}
                gap={4}
            >
                <AdminInfoSidebar />
                <Box
                    flexGrow={1}
                    width={'100%'}
                >
                    <Card
                        elevation={0}
                        sx={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            gap: 2,
                            pr: 4,
                            pl: 12,
                            py: 3,
                        }}
                    >
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            flexBasis={'30%'}
                            alignItems={'center'}
                            gap={4}
                        >
                            <Avatar
                                src={imageSrc?.toString() || ''}
                                sx={{
                                    width: '50%',
                                    height: 'auto',
                                    aspectRatio: '1/1',
                                }}
                            />

                            <Button
                                component={'label'}
                                variant={'contained'}
                                size={'small'}
                                sx={{
                                    color: 'white',
                                    borderRadius: theme.spacing(),
                                    border: `${theme.palette.primary.main} 2px solid`,
                                    px: 4,
                                    py: 0.5,
                                    '&:hover': {
                                        bgcolor: 'white',
                                        border: `${theme.palette.primary.main} 2px solid`,
                                        color: `${theme.palette.primary.main}`,
                                    },
                                }}
                            >
                                <input
                                    onChange={onProfileImageChange}
                                    style={{
                                        width: 1,
                                        height: 1,
                                    }}
                                    required={false}
                                    type={'file'}
                                    name={'profile_image'}
                                    accept={'image/*'}
                                />
                                تحميل صورة
                            </Button>
                        </Box>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            flexBasis={'70%'}
                            gap={2}
                        >
                            <AddAdminUserInfo />

                            <Typography
                                variant="h6"
                                mt={4}
                            >
                                كلمة السر
                            </Typography>

                            <AddAdminUserPassword />
                            <Box
                                display={'flex'}
                                justifyContent={'flex-end'}
                            >
                                <MainButton
                                    text={'حفظ'}
                                    color={theme.palette.primary.main}
                                />
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

function AddAdminUserInfo({}) {
    const theme = useTheme();
    return (
        <>
            <EditProfileField
                name={'username'}
                type={'text'}
                label={'إسم المستخدم'}
                placeholder={'إسم المستخدم'}
            />
            <EditProfileField
                name={'email'}
                type={'email'}
                label={'البريد الإلكتروني'}
                placeholder={'البريد الإلكتروني'}
            />
        </>
    );
}

function AddAdminUserPassword({}) {
    return (
        <Stack gap={4}>
            <IconFormPassword
                name="password1"
                placeholder={'كلمة السر'}
            />
            <IconFormPassword
                name="password2"
                placeholder={'تأكيد كلمة السر'}
            />
        </Stack>
    );
}
export default AddAdmin;
