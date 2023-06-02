import React from 'react';
import TeacherDashboardLayout from '../layout';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

function TeacherLandingPage() {
    return (
        <TeacherDashboardLayout topbar_title={'main page'}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <Card sx={{
                    minHeight: '300px',
                    height: '100%',
                    width: '100%',
                }}>

                </Card>
            </Box>
        </TeacherDashboardLayout>
    );
}

export default TeacherLandingPage;
