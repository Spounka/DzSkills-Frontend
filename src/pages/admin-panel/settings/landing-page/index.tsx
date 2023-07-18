import { Box, Card, IconButton, Stack, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import rightArrow from '../../../../assets/svg/arrow-right-blue.svg';
import useLogin from '../../../authenticate/hooks/useLogin';
import AdminDashboardLayout from '../../layout';
import { AdminInfoSidebar } from '../AdminInfoSidebar';
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

    if (adminConfigQuery.isError) return <>Admin Config Error...</>;
    if (adminConfigQuery.isLoading) return <>admin config loading...</>;

    return (
        <form
            style={{
                width: '100%',
                flexBasis: '100%',
                flexGrow: '0',
                flexShrink: '1',
            }}
        >
            <Card
                elevation={0}
                sx={{
                    borderRadius: theme.spacing(),
                    height: '100%',
                    width: '100%',
                    py: 2,
                    px: 4,
                }}
            >
                <Stack gap={5}>
                    <SettingsSection title={'الواجهة الاولى'}>
                        <FirstSectionConfig adminConfigQuery={adminConfigQuery} />
                    </SettingsSection>
                    <SettingsSection title={'الأقسام'}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                minHeight: '200px',
                            }}
                        >
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: '0%',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}
                            >
                                <img
                                    loading={'lazy'}
                                    src={rightArrow}
                                    style={{
                                        width: theme.spacing(12),
                                        aspectRatio: '1',
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    left: '0%',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}
                            >
                                <img
                                    loading={'lazy'}
                                    src={rightArrow}
                                    style={{
                                        width: theme.spacing(12),
                                        aspectRatio: '1',
                                        scale: '-1 1',
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </SettingsSection>
                </Stack>
            </Card>
        </form>
    );
}
