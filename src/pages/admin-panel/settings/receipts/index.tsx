import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import AdminDashboardLayout from '../../layout';
import { AdminInfoSidebar } from '../AdminInfoSidebar';
import ReceiptsDatagrid from './recepits-datagrid';

function Receipts() {
    const theme = useTheme();

    return (
        <AdminDashboardLayout topbar_title={'الإعدادت'}>
            <Box
                display="flex"
                width={'100%'}
                gap={4}
            >
                <AdminInfoSidebar />
                <Box
                    sx={{
                        borderRadius: theme.spacing(),
                        width: '100%',
                    }}
                >
                    <ReceiptsDatagrid />
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}

export default Receipts;
