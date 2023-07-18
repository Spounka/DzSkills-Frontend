import { Stack, Typography } from '@mui/material';
import { EditPasswordForm } from '../../edit-profile/EditPasswordForm';
import EditProfileContent from '../../edit-profile/EditProfileContent';
import TeacherDashboardLayout from '../layout';

function EditProfileTeacherDashboard() {
    return (
        <TeacherDashboardLayout
            topbar_title={'الحساب'}
            // fullScreen
        >
            <Stack gap={4}>
                <EditProfileContent />
                <Typography
                    sx={{
                        // gridColumnStart: 5,
                        // gridColumnEnd: 14,
                        px: 2,
                    }}
                    variant={'h5'}
                    fontWeight={500}
                    color={'gray.title'}
                >
                    كلمة السر
                </Typography>

                <EditPasswordForm />
            </Stack>
        </TeacherDashboardLayout>
    );
}

export default EditProfileTeacherDashboard;
