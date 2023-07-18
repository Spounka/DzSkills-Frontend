import { Card, useTheme } from '@mui/material';
import { AdminInfoSidebarLink } from './AdminInfoSidebarLink';

export function AdminInfoNavbar({}) {
    const theme = useTheme();
    return (
        <Card
            elevation={0}
            sx={{
                py: 4,
                px: 1,
                borderRadius: theme.spacing(),
            }}
        >
            <AdminInfoSidebarLink
                url={'/admin/settings/'}
                label={'الملف الشخصي'}
            />
            <AdminInfoSidebarLink
                url={'/admin/settings/add-admin'}
                label={'إضافة مسؤول'}
            />
            <AdminInfoSidebarLink
                url={'/admin/settings/add-teacher'}
                label={'اضافة مدرب'}
            />
            <AdminInfoSidebarLink
                url={'/admin/settings/receipts'}
                label={'الوصول'}
            />
            <AdminInfoSidebarLink
                url={'/admin/settings/landing-page'}
                label={'تعديل صفحة الهبوط'}
            />
        </Card>
    );
}
