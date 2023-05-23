import Box from '@mui/material/Box';
import AdminDashboardLayout from '../../layout';
import { AdminInfoSidebar } from '../AdminInfoSidebar';
import ReceiptsDatagrid from './recepits-datagrid';

function Receipts() {

    return (
        <AdminDashboardLayout topbar_title={'الإعدادت'}>
            <Box
                display="flex"
                width={'100%'}
                gap={4}
            >
                <AdminInfoSidebar />
                <ReceiptsDatagrid />
            </Box>
        </AdminDashboardLayout>
    );
}

export default Receipts;
