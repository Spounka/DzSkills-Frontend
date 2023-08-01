import {Avatar, ButtonGroup, useTheme} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {useSnackbar} from 'notistack';
import {FormEvent, useEffect, useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';
import {MainButton} from '../../components/ui/MainButton';
import UploadSvgIcon from '../../components/ui/UploadSvgIcon';
import axiosInstance from '../../globals/axiosInstance';
import {selectUser} from '../../redux/userSlice';
import {User} from '../../types/user';
import useLogin from '../authenticate/hooks/useLogin';
import SocialMediaInput from './SocialMediaInput';
import EditProfileField from './components/fields';
import EditProfileColumn from './components/fields-column';

export default function EditProfileContent({}) {
    const theme = useTheme();
    const [imageLink, setImageLink] = useState<string>();
    const [imageFile, setImageFile] = useState<File | null>(null)
    const user = useSelector(selectUser);
    const [query] = useLogin();
    const queryClient = useQueryClient();
    const {enqueueSnackbar} = useSnackbar();

    const updateProfileMutation = useMutation({
        mutationKey: ['profile', 'update'],
        mutationFn: async (body: FormData) => {
            const {data} = await axiosInstance.patch(`/rest-auth/user/`, body);
            return data as User;
        },
        onSuccess: () => {
            enqueueSnackbar('تم التحديث بنجاح', {variant: 'success'});
            queryClient.invalidateQueries(['user']);
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ ، يرجى المحاولة مرة أخرى', {variant: 'error'});
        },
    });

    useEffect(() => {
        setImageLink(query.data?.profile_image);
    }, []);

    const updateProfile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        for (let _field of e.currentTarget) {
            const field = _field as HTMLInputElement
            if (field.value)
                formData.set(field.name, field.value)
        }
        if (imageFile) {
            formData.set('profile_image', imageFile)
        }
        updateProfileMutation.mutate(formData);
        e.currentTarget.reset();
    };

    return (
        <form onSubmit={updateProfile}>
            <Card
                elevation={0}
                sx={{
                    maxWidth: '100%',
                    minHeight: '70vh',
                    py: theme.spacing(5),
                    px: {
                        xs: theme.spacing(2),
                        lg: theme.spacing(16),
                    },
                    borderRadius: theme.spacing(2),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(4),
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', lg: 'row'},
                        alignItems: 'center',
                        gap: theme.spacing(8),
                    }}
                >
                    <Avatar
                        src={imageLink}
                        sx={{
                            width: theme.spacing(26),
                            height: theme.spacing(26),
                        }}
                    />
                    <MainButton
                        sx={{
                            borderRadius: theme.spacing(2),
                            px: theme.spacing(6),
                            py: theme.spacing(1.5),
                        }}
                        {...{
                            component: 'label',
                            size: 'large',
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
                    >
                        <input
                            type="file"
                            style={{width: '1px', height: '1px'}}
                            accept="image/*"
                            onChange={e => {
                                const files = e.target.files;
                                if (
                                    !RegExp(/image\/*/i).exec(files?.item(0)?.type ?? '')
                                )
                                    enqueueSnackbar('الرجاء تحميل صورة', {
                                        variant: 'error',
                                    });
                                if (files?.item(0)) {
                                    //@ts-expect-error
                                    setImageLink(URL.createObjectURL(files.item(0)));
                                    setImageFile(files.item(0))
                                }
                            }}
                        />
                    </MainButton>
                </Box>

                <EditProfileColumn>
                    <EditProfileField
                        grow
                        name={'first_name'}
                        type={'text'}
                        placeholder={query.data?.first_name}
                        label={'الإسم الأول'}
                    />
                    <EditProfileField
                        grow
                        name={'last_name'}
                        type={'label'}
                        placeholder={query.data?.last_name}
                        label={'اسم العائلة'}
                    />
                </EditProfileColumn>
                <EditProfileColumn>
                    <EditProfileField
                        grow
                        name={'email'}
                        type={'email'}
                        placeholder={query.data?.email}
                        label={'البريد الإلكتروني'}
                    />
                    <EditProfileField
                        grow
                        name={'speciality'}
                        type={'label'}
                        placeholder={user.user.speciality || 'التخصص'}
                        label={'التخصص'}
                    />
                </EditProfileColumn>
                <EditProfileColumn>
                    <EditProfileField
                        grow
                        name={'description'}
                        type={'label'}
                        placeholder={user.user.description || 'وصف'}
                        label={'وصف'}
                        multiline
                    />
                </EditProfileColumn>
                <SocialMediaInput
                    text={'Facebook'}
                    name={'facebook_link'}
                    placeholder={query.data?.facebook_link || 'https://facebook.com/'}
                />
                <SocialMediaInput
                    text={'Twitter'}
                    name={'twitter_link'}
                    placeholder={query.data?.twitter_link || 'https://twitter.com/'}
                />
                <SocialMediaInput
                    text={'LinkedIn'}
                    name={'linkedin_link'}
                    placeholder={query.data?.linkedin_link || 'https://linkedin.com/'}
                />
                <SocialMediaInput
                    text={'Instagram'}
                    name={'instagram_link'}
                    placeholder={query.data?.instagram_link || 'https://instagram.com/'}
                />
                <ButtonGroup
                    sx={{
                        transition: 'all ease-in-out 300ms',
                        gap: 4,
                    }}
                >
                    <MainButton
                        {...{fullWidth: true}}
                        text={'إلغاء'}
                        color={theme.palette.error.main}
                    />
                    <MainButton
                        {...{fullWidth: true}}
                        text={'حفظ'}
                        type={'submit'}
                        color={theme.palette.primary.main}
                    />
                </ButtonGroup>
            </Card>
        </form>
    );
}
