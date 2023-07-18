import { Stack } from '@mui/material';
import IconFormPassword from '../../../../components/form/IconFormPassword';

export function AddAdminUserPassword({}) {
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
