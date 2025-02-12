import { Avatar, Box, Button, Card, Stack, Typography, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { FormEvent, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import IconFormPassword from '../../../../components/form/IconFormPassword';
import { MainButton } from '../../../../components/ui/MainButton';
import axiosInstance from '../../../../globals/axiosInstance';
import { User } from '../../../../types/user';
import useLogin from '../../../authenticate/hooks/useLogin';
import EditProfileField from '../../../edit-profile/components/fields';
import AdminDashboardLayout from '../../layout';
import { AdminInfoSidebar } from '../AdminInfoSidebar';
import { changePassword } from './api/query';

function AdminPersonalDetails() {
    const theme = useTheme();
    const user = useLogin();

    const avatarImage = React.useRef(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const [imageSrc, setImageSrc] = React.useState<string | ArrayBuffer | null>('');
    function onProfileImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputElement = e.target;
        let files: FileList | null = inputElement.files;
        if (files) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(files[0]);
        }
    }

    const queryClient = useQueryClient();
    const updateProfileMutation = useMutation({
        mutationKey: ['user', 'profile', 'edit'],
        mutationFn: async (body: FormData) => {
            return (await axiosInstance.patch(`/rest-auth/user/`, body)) as User;
        },
        onSuccess: async () => {
            enqueueSnackbar('تم تحديث الملف الشخصي بنجاح', { variant: 'success' });
            await queryClient.invalidateQueries(['user']);
        },
        onError: () => {
            enqueueSnackbar('فشل التحديث', { variant: 'error' });
        },
    });

    const onProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get('email')) {
            formData.append('email', user?.email ?? '');
        }
        for (const key of formData.keys()) {
            if (formData.get(key) === '' || !formData.get(key)) {
                formData.delete(key);
            }
        }
        if (imageRef.current?.files?.item(0)) {
            formData.append('profile_image', imageRef.current.files[0]);
        }
        updateProfileMutation.mutate(formData);
        e.currentTarget.reset();
    };

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
                                id={'avatar-image'}
                                ref={avatarImage}
                                src={imageSrc?.toString() || user?.profile_image}
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
                                    ref={imageRef}
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
                            <form
                                id={'edit-form'}
                                onSubmit={onProfileSubmit}
                                style={{
                                    display: 'flex',
                                    gap: '16px',
                                    flexDirection: 'column',
                                }}
                            >
                                <EditProfileField
                                    name={'username'}
                                    type={'text'}
                                    label={'إسم المستخدم'}
                                    placeholder={user?.username}
                                />
                                <EditProfileField
                                    name={'email'}
                                    type={'email'}
                                    label={'البريد الإلكتروني'}
                                    placeholder={user?.email}
                                />

                                <Box
                                    display={'flex'}
                                    justifyContent={'flex-end'}
                                >
                                    <MainButton
                                        type={'submit'}
                                        text={'حفظ'}
                                        color={theme.palette.primary.main}
                                    />
                                </Box>
                            </form>

                            <Typography
                                variant="h6"
                                mt={4}
                            >
                                كلمة السر
                            </Typography>

                            <form
                                id={'password-form'}
                                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                                    e.preventDefault();
                                    const htmlForm = document.getElementById(
                                        'password-form'
                                    ) as HTMLFormElement;
                                    const data = new FormData(htmlForm);
                                    const result = async () =>
                                        await changePassword(
                                            data,
                                            user?.pk ?? 0
                                        );
                                    result()
                                        .catch(error => Promise.reject(error))
                                        .then(() => {
                                            window.location.reload();
                                        });
                                }}
                            >
                                <Stack gap={4}>
                                    <IconFormPassword
                                        name="old_password"
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
                                            type={'submit'}
                                        />
                                    </Box>
                                </Stack>
                            </form>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default AdminPersonalDetails;
