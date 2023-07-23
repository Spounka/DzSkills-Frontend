import { Block, Favorite, MoreHoriz } from '@mui/icons-material';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ProfileSocialMedia } from '../../../../components/ProfileSocialMedia';
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
        onSuccess: () => {
            setIsSubmitting(false);
            enqueueSnackbar('تم التحديث بنجاح', { variant: 'success' });
            queryClient.invalidateQueries('users');
            queryClient.invalidateQueries(['users', user?.pk]);
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

    if (!user) return <></>;

    return (
        <Box
            sx={{
                display: 'flex',
                bgcolor: theme.palette.secondary.main,
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
                <ProfileSocialMedia />
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
                        color: user.is_favorite ? theme.palette.error.light : 'white',
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
                    <MenuItem>
                        <Tooltip title={'حظر'}>
                            <IconButton sx={{ color: theme.palette.error.main }}>
                                <Block />
                            </IconButton>
                        </Tooltip>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
