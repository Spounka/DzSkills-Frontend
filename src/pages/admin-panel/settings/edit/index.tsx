import { Avatar, Box, Card, Stack, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import IconFormPassword from '../../../../components/form/IconFormPassword';
import { MainButton } from '../../../../components/ui/MainButton';
import UploadSvgIcon from '../../../../components/ui/UploadSvgIcon';
import useLogin from '../../../authenticate/hooks/useLogin';
import EditProfileField from '../../../edit-profile/components/fields';
import AdminDashboardLayout from '../../layout';
import { AdminInfoNavbar } from '../AdminInfoNavbar';
import { AdminInfoSidebar } from '../AdminInfoSidebar';

function AdminPersonalDetails() {
    const theme = useTheme();
    const user = useLogin();

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
                                src={user[0].data?.profile_image || ''}
                                sx={{
                                    width: '50%',
                                    height: 'auto',
                                    aspectRatio: '1/1',
                                }}
                            />
                            <MainButton
                                sx={{
                                    borderRadius: theme.spacing(),
                                    // px: theme.spacing(6),
                                    // py: theme.spacing(1)
                                }}
                                {...{
                                    size: 'small',
                                    endIcon: (
                                        <UploadSvgIcon
                                            {...{
                                                width: theme.spacing(2),
                                                height: theme.spacing(1),
                                                style: {
                                                    margin: `0 1rem 0 0`,
                                                },
                                            }}
                                        />
                                    ),
                                }}
                                text={'تحميل صورة'}
                                color={theme.palette.primary.main}
                            />
                        </Box>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            flexBasis={'70%'}
                            gap={2}
                        >
                            <EditProfileField
                                name={'username'}
                                type={'text'}
                                label={'إسم المستخدم'}
                                placeholder={user[0].data?.username}
                            />
                            <EditProfileField
                                name={'email'}
                                type={'email'}
                                label={'البريد الإلكتروني'}
                                placeholder={user[0].data?.email}
                            />

                            <Box
                                display={'flex'}
                                justifyContent={'flex-end'}
                            >
                                <MainButton
                                    text={'حفظ'}
                                    color={theme.palette.primary.main}
                                />
                            </Box>

                            <Typography
                                variant="h6"
                                mt={4}
                            >
                                كلمة السر
                            </Typography>

                            <Stack gap={4}>
                                <IconFormPassword
                                    name="password_old"
                                    placeholder={'كلمة السر الحالية'}
                                />
                                <IconFormPassword
                                    name="password1"
                                    placeholder={'كلمة السر الجديدة'}
                                />
                                <IconFormPassword
                                    name="password2"
                                    placeholder={'تأكيد كلمة السر'}
                                />
                                <Box
                                    display={'flex'}
                                    justifyContent={'flex-end'}
                                >
                                    <MainButton
                                        text={'حفظ'}
                                        color={theme.palette.primary.main}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default AdminPersonalDetails;
