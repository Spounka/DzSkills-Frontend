import { Box, Divider, Stack, Typography } from '@mui/material';
import { StyledCard } from '../../../components/StyledCard';
import { data } from '../../teacher-dashboard/landing-page';
import { GraphData } from '../../teacher-dashboard/landing-page/GraphData';
import AdminDashboardLayout from '../layout';
import { InformationCards } from './InformationCards';
import { Reminders } from './Reminders';

function AdminLandingPage() {
    return (
        <AdminDashboardLayout topbar_title={'مرحبا بك'}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    p: 0,
                }}
            >
                <InformationCards />
            </Box>
            <Stack
                gap={4}
                height={'auto'}
            >
                <Stack
                    direction={'row'}
                    // alignItems={'stretch'}
                    gap={4}
                >
                    <Box
                        width={'100%'}
                        flex={'1 1 50%'}
                    >
                        <GraphData data={data} />
                    </Box>
                    <Stack
                        gap={2}
                        flex={'1 1 50%'}
                    >
                        <MostVisited />
                        <MostActive />
                    </Stack>
                </Stack>
                <Stack
                    direction={'row'}
                    gap={4}
                >
                    <MostSold />
                    <Reminders />
                </Stack>

                <StyledCard>
                    <Typography
                        variant={'h6'}
                        color={'secondary.main'}
                    >
                        المعاملات المالية
                    </Typography>
                    <Divider />
                    <Stack>
                        <Typography>No Data</Typography>
                    </Stack>
                </StyledCard>
            </Stack>
        </AdminDashboardLayout>
    );
}
export function MostSold({}) {
    return (
        <StyledCard
            sx={{
                flexBasis: '50%',
                // height: '100%',
                flexGrow: '1',
            }}
        >
            <Typography
                variant={'h6'}
                color={'secondary.main'}
            >
                الأكثر مبيعا
            </Typography>
            <Divider />
            <Stack>
                <Typography>No Data</Typography>
            </Stack>
        </StyledCard>
    );
}

export default AdminLandingPage;

function MostVisited({}) {
    return (
        <StyledCard
            sx={{
                flexBasis: '50%',
                // height: '100%',
                flexGrow: '1',
            }}
        >
            <Typography
                variant={'h6'}
                color={'secondary.main'}
            >
                الأكثر زيارة
            </Typography>
            <Divider />
            <Stack>
                <Typography>No Data</Typography>
            </Stack>
        </StyledCard>
    );
}

function MostActive({}) {
    return (
        <StyledCard
            sx={{
                flexBasis: '50%',
                // height: '100%',
                flexGrow: '1',
            }}
        >
            <Typography
                variant={'h6'}
                color={'secondary.main'}
            >
                الأكثر نشاطا
            </Typography>
            <Divider />
            <Stack>
                <Typography>No Data</Typography>
            </Stack>
        </StyledCard>
    );
}
