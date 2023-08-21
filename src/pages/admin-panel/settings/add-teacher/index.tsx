import { Avatar, Box, Button, Card, Typography, useTheme } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { MainButton } from '../../../../components/ui/MainButton';
import useLogin from '../../../authenticate/hooks/useLogin';
import AdminDashboardLayout from '../../layout';
import { AdminInfoSidebar } from '../AdminInfoSidebar';
import { AddAdminUserInfo } from '../add-admin/AddAdminUserInfo';
import { AddAdminUserPassword } from '../add-admin/AddAdminUserPassword';
import axiosInstance from '../../../../globals/axiosInstance';
import { enqueueSnackbar } from 'notistack';

async function createTeacher(data: FormData) {
    return await axiosInstance.post('/users/teacher/create/', data);
}

function AddTeacher() {
    const theme = useTheme();
    useLogin();

    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('');
    function onProfileImageChange(e: ChangeEvent<HTMLInputElement>) {
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

    const createUserMutation = useMutation({
        mutationFn: (data: FormData) => createTeacher(data),
        mutationKey: ['admin', 'create'],
        onSuccess: () => {
            enqueueSnackbar('تمت إضافة المرشد بنجاح', { variant: 'success' });
        },
    });
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = document.querySelector('form');
        if (form) {
            const data = new FormData(form);
            createUserMutation.mutate(data);
        }
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
                    <form onSubmit={onSubmit}>
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
                                        type={'submit'}
                                        text={'حفظ'}
                                        color={theme.palette.primary.main}
                                    />
                                </Box>
                            </Box>
                        </Card>
                    </form>
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default AddTeacher;
