import { Box } from '@mui/material';
import AdminDashboardLayout from '../layout';
import { Categories } from './Categories';
import { Hashtags } from './Hashtags';
import { Levels } from './Levels';

function HashtagsAndCategories() {
    return (
        <AdminDashboardLayout topbar_title={'الأقسام و الوسوم'}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    p: 0,
                    width: '100%',
                }}
            >
                <Categories />
                <Hashtags />
                <Levels />
            </Box>
        </AdminDashboardLayout>
    );
}
export default HashtagsAndCategories;
