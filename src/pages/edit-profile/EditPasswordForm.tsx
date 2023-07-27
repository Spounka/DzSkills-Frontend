import { ButtonGroup, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import { useSnackbar } from 'notistack';
import { FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { MainButton } from '../../components/ui/MainButton';
import { selectUser } from '../../redux/userSlice';
import { changePassword } from '../admin-panel/settings/edit/api/query';
import EditProfileField from './components/fields';
import EditProfileColumn from './components/fields-column';

export function EditPasswordForm({}) {
    const theme = useTheme();
    const user = useSelector(selectUser);
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const changePasswordMutation = useMutation({
        mutationKey: ['profile', 'password', 'update'],
        mutationFn: (data: FormData) => changePassword(data, user.user.pk ?? 0),
        onSuccess: () => {
            enqueueSnackbar('تم التحديث بنجاح', { variant: 'success' });
            queryClient.invalidateQueries(['user']);
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ ، يرجى المحاولة مرة أخرى', { variant: 'error' });
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        changePasswordMutation.mutate(data);
        e.currentTarget.reset();
    };
    return (
        <form onSubmit={onSubmit}>
            <Card
                elevation={0}
                sx={{
                    maxWidth: '100%',
                    py: theme.spacing(5),
                    borderRadius: theme.spacing(2),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(4),
                    px: {
                        xs: theme.spacing(2),
                        lg: theme.spacing(16),
                    },
                }}
            >
                <EditProfileColumn>
                    <EditProfileField
                        grow
                        required
                        name={'old_password'}
                        label={'كلمة السر الحالية'}
                        type={'password'}
                    />
                </EditProfileColumn>
                <EditProfileColumn>
                    <EditProfileField
                        grow
                        name={'password1'}
                        label={'كلمة السر الجديدة'}
                        type={'password'}
                    />
                    <EditProfileField
                        grow
                        required
                        name={'password2'}
                        label={'تأكيد كلمة السر'}
                        type={'password'}
                    />
                </EditProfileColumn>
                <ButtonGroup
                    sx={{
                        transition: 'all ease-in-out 300ms',
                        gap: 4,
                    }}
                >
                    <MainButton
                        {...{
                            fullWidth: true,
                        }}
                        text={'إلغاء'}
                        color={theme.palette.error.main}
                    />
                    <MainButton
                        {...{
                            fullWidth: true,
                        }}
                        text={'حفظ'}
                        type="submit"
                        color={theme.palette.primary.main}
                    />
                </ButtonGroup>
            </Card>
        </form>
    );
}
