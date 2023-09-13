import { Block, Favorite, MoreHoriz } from '@mui/icons-material';
import {
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import { AxiosError } from 'axios';
import { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ProfileSocialMedia } from '../../../../components/ProfileSocialMedia';
import { MainButton } from '../../../../components/ui/MainButton';
import axiosInstance from '../../../../globals/axiosInstance';
import { User } from '../../../../types/user';

interface UserDetailsWideRibbonProps {
    user: User | undefined;
}

export function UserDetailsWideRibbon({ user }: UserDetailsWideRibbonProps) {
    const theme = useTheme();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [banDialogOpen, setBanDialogOpen] = useState<boolean>(false);
    const [banDate, setBanDate] = useState<Dayjs | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();
    const makeUserFavoriteMutation = useMutation({
        mutationKey: ['users', 'favorite'],
        mutationFn: async () => {
            setIsSubmitting(true);
            const { data } = await axiosInstance.post(
                `/users/${user?.pk ?? 0}/favorite/`
            );
            return data as User;
        },
        onSuccess: async () => {
            setIsSubmitting(false);
            enqueueSnackbar('تم التحديث بنجاح', { variant: 'success' });
            await queryClient.invalidateQueries('users');
            await queryClient.invalidateQueries(['users', user?.pk]);
        },
        onError: (err: AxiosError) => {
            setIsSubmitting(false);
            if (!err.response?.data) {
                enqueueSnackbar('لقد حدث خطأ، رجاء أعد المحاولة لاحقا', {
                    variant: 'error',
                });
                return;
            }
            //@ts-expect-error
            if (err.response.data.code === 'user_not_teacher') {
                //@ts-expect-error
                enqueueSnackbar(err.response.data.message, {
                    variant: 'error',
                });
            }
        },
    });

    const banUserMutation = useMutation({
        mutationKey: ['users', user?.pk, 'ban'],
        mutationFn: async (day: string) => {
            const { data } = await axiosInstance.post(`/ban/${user?.pk}/`, {
                duration: day,
            });
            return data;
        },
        onSuccess: async () => {
            setIsSubmitting(false);
            enqueueSnackbar('تم حظر المستخدم بنجاح', { variant: 'success' });
            await queryClient.invalidateQueries(['users', user?.pk]);
        },
        onError: (err: AxiosError) => {
            setIsSubmitting(false);
            //@ts-expect-error
            if (err.response?.data && err.response.data.code === 'ban_exists') {
                enqueueSnackbar('يوجد حظر جاري على هذا المستخدم', {
                    variant: 'error',
                });
                //@ts-expect-error
            } else if (err.response?.data && err.response.data.code === 'date_is_past') {
                enqueueSnackbar('مدة الحظر لا يمكن أن تكون في الماضي', {
                    variant: 'error',
                });
            } else if (
                err.response?.data &&
                //@ts-expect-error
                err.response.data.code === 'user_is_admin'
            ) {
                enqueueSnackbar('لا يمكنك حظر مسؤول آخر', {
                    variant: 'error',
                });
            } else if (
                err.response?.data &&
                //@ts-expect-error
                err.response.data.code === 'ban_self'
            ) {
                enqueueSnackbar('لا يمكنك حظر نفسك', {
                    variant: 'error',
                });
            } else {
                enqueueSnackbar('حدث خطأ', {
                    variant: 'error',
                });
            }
        },
    });
    const handleBanUser = () => {
        setIsSubmitting(true);
        banUserMutation.mutate(banDate?.format('YYYY-MM-DD') ?? '');
    };
    if (!user) return <></>;

    return (
        <>
            <Dialog
                open={banDialogOpen}
                onClose={() => setBanDialogOpen(false)}
            >
                <DialogTitle>حظر المستخدم {user.username}</DialogTitle>
                <DialogContent>
                    <DialogContentText>الرجاء اختيار مدة الحظر</DialogContentText>
                    <DatePicker
                        value={banDate}
                        onChange={e => setBanDate(d => e ?? d)}
                    ></DatePicker>
                </DialogContent>
                <DialogActions sx={{ gap: 2 }}>
                    <MainButton
                        text={'إلغاء'}
                        color={theme.palette.error.main}
                        onClick={() => setBanDialogOpen(false)}
                    />
                    <MainButton
                        text="حظر"
                        color={theme.palette.primary.main}
                        onClick={() => {
                            handleBanUser();
                            setBanDialogOpen(false);
                            setBanDate(null);
                        }}
                    />
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    bgcolor: user.is_banned
                        ? theme.palette.error.main
                        : theme.palette.secondary.main,
                    width: '100%',
                    height: 'auto',
                    minHeight: '100px',
                    borderRadius: theme.spacing(),
                    py: 4,
                    px: 4,
                    gap: 8,
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        color: 'white',
                        flexGrow: '3',
                    }}
                >
                    <Avatar
                        src={user.profile_image}
                        sx={{
                            height: 'auto',
                            width: '128px',
                            aspectRatio: '1',
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
                        <Typography
                            variant={'subtitle2'}
                            color={'gray.light'}
                        >
                            {user.speciality || 'speciality'}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1',
                        gap: 2,
                    }}
                >
                    <Typography>البريد الالكتروني</Typography>
                    <Typography>وسائل التواصل</Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography>{user.email}</Typography>
                    <ProfileSocialMedia user={user} />
                </Box>
                <Box
                    flexGrow="1"
                    display="flex"
                    alignItems={'center'}
                    gap={2}
                >
                    <IconButton
                        disabled={isSubmitting}
                        sx={{
                            color: user.is_favorite
                                ? theme.palette.error.light
                                : 'white',
                        }}
                        onClick={() => makeUserFavoriteMutation.mutate()}
                    >
                        <Favorite />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: 'white',
                        }}
                        onClick={e => {
                            setAnchorEl(e.currentTarget);
                            setMenuOpen(true);
                        }}
                    >
                        <MoreHoriz />
                    </IconButton>
                    <Menu
                        open={menuOpen}
                        onClose={() => {
                            setMenuOpen(false);
                            setAnchorEl(null);
                        }}
                        anchorEl={anchorEl ?? document.body}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                        sx={{
                            '& .MuiPaper-root': {
                                borderRadius: theme.spacing(),
                            },
                        }}
                    >
                        <Tooltip title={'حظر'}>
                            <MenuItem
                                disabled={user.is_banned}
                                sx={{
                                    color: theme.palette.error.main,
                                }}
                                onClick={() => {
                                    setMenuOpen(false);
                                    setAnchorEl(null);
                                    setBanDialogOpen(true);
                                }}
                            >
                                <Block fill={'inherit'} />
                            </MenuItem>
                        </Tooltip>
                    </Menu>
                </Box>
                {user.is_banned && (
                    <Box
                        width={'100%'}
                        flex={'1 1 100%'}
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        <Typography>{`تم حظر المستخدم لغاية ${user?.last_ban?.toLocaleString()}`}</Typography>
                    </Box>
                )}
            </Box>
        </>
    );
}
