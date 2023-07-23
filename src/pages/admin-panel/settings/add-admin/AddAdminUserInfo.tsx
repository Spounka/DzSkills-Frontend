import { useTheme } from '@mui/material';
import EditProfileField from '../../../edit-profile/components/fields';

export function AddAdminUserInfo() {
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
