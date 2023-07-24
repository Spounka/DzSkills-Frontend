import { Box, Card, Stack, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import useLogin from '../../../authenticate/hooks/useLogin';
import AdminDashboardLayout from '../../layout';
import { AdminInfoSidebar } from '../AdminInfoSidebar';
import { CategoriesSection } from './CategoriesSection';
import { CertificateSection } from './CertificateSection';
import { FirstSectionConfig } from './FirstSectionConfig';
import { SettingsSection } from './SettingsSection';
import { getAdminConfigs } from './api/query';

function LandingPageSettings() {
    useLogin();

    return (
        <AdminDashboardLayout topbar_title={'الإعدادت'}>
            <Box
                display="flex"
                width={'100%'}
                gap={4}
            >
                <AdminInfoSidebar />
                <LandingPageSettingsForm />
            </Box>
        </AdminDashboardLayout>
    );
}
export default LandingPageSettings;

function LandingPageSettingsForm() {
    const theme = useTheme();
    const adminConfigQuery = useQuery({
        queryFn: () => getAdminConfigs(),
        queryKey: ['admin', 'configs'],
    });

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: theme.spacing(),
                height: '100%',
                width: '100%',
                py: 3,
                px: 4,
            }}
        >
            <Stack gap={5}>
                <SettingsSection title={'الواجهة الاولى'}>
                    <FirstSectionConfig adminConfigQuery={adminConfigQuery} />
                </SettingsSection>
                <SettingsSection title={'الأقسام'}>
                    <CategoriesSection />
                </SettingsSection>
                <SettingsSection title={'الشهادة'}>
                    <CertificateSection adminConfigQuery={adminConfigQuery} />
                </SettingsSection>
            </Stack>
        </Card>
    );
}

