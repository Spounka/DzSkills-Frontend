import { ButtonGroup, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import { MainButton } from '../../components/ui/MainButton';
import EditProfileField from './components/fields';
import EditProfileColumn from './components/fields-column';

export function EditPasswordForm({}) {
    const theme = useTheme();
    return (
        <Card
            elevation={0}
            sx={{
                gridColumnStart: 5,
                gridColumnEnd: 14,
                maxWidth: '100%',
                py: theme.spacing(5),
                px: theme.spacing(16),
                borderRadius: theme.spacing(2),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(4),
            }}
        >
            <EditProfileColumn>
                <EditProfileField
                    name={'current_password'}
                    label={'كلمة السر الحالية'}
                    type={'password'}
                />
            </EditProfileColumn>
            <EditProfileColumn>
                <EditProfileField
                    name={'password1'}
                    label={'كلمة السر الجديدة'}
                    type={'password'}
                />
                <EditProfileField
                    grow
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
                    text={'حفظ'}
                    color={theme.palette.primary.main}
                />
                <MainButton
                    {...{
                        fullWidth: true,
                    }}
                    text={'إلغاء'}
                    color={theme.palette.error.main}
                />
            </ButtonGroup>
        </Card>
    );
}
