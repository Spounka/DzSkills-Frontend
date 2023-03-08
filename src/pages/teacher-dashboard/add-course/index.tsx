import { Box, useTheme } from '@mui/system';
import upload from '../../../assets/svg/upload gray.svg';
import { AddCourseCard } from './AddCourseCard';
import DashboardSidebar from './components/side-navbar';
import { DashboardTopbar } from './components/top-navbar/DashboardTopbar';

function TeacherAddCourse() {
    const theme = useTheme()
    return (
        <Box sx={{
            flexGrow: 1,
            display: 'grid',
            width: '100%',
            minHeight: '100vh',
            gridTemplateColumns: 'repeat(26, 1fr)',
            gap: theme.spacing(1),
            rowGap: theme.spacing(2),
            bgcolor: theme.palette.gray.secondary,
        }}>
            <Box
                display={'grid'}
                gridColumn={'span 5'}
                height={'100%'}
                width={'100%'}
            >
                <DashboardSidebar />
            </Box>
            <Box
                display={'grid'}
                gridTemplateColumns={'repeat(26 , 1fr)'}
                // gridTemplateRows={'repeat(6, 1fr)'}
                gridColumn={'7 / -1'}
                rowGap={3}
                padding={0}
                paddingTop={4}
                width={'100%'}
                height={'100%'}
            >
                <DashboardTopbar />
                <Box sx={{
                    gridColumn: '1 / -8',
                    gridRow: '3'
                }}>
                    <AddCourseCard upload={upload} />
                </Box>
            </Box >
        </Box >
    )
}


export default TeacherAddCourse