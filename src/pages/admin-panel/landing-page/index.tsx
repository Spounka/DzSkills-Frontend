import Box from '@mui/material/Box';
import AdminDashboardLayout from '../layout';
import { InformationCards } from './InformationCards';

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
        </AdminDashboardLayout>
    );
}

export default AdminLandingPage;
