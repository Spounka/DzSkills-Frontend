import { Box, IconButton, Stack, Switch, Typography } from '@mui/material';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete-red.svg'

import { GridColDef } from '@mui/x-data-grid';
import axiosInstance from '../../../globals/axiosInstance';
import { TeacherCourses } from './TeacherCourses';

export async function handleCourseStateChange(id: number) {
    const { data } = await axiosInstance.patch(`/courses/${id}/flip/`);
    return data;
}

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 40,
    },
    {
        field: 'name',
        headerName: 'الاسم',
        width: 200,
        flex: 0,
    },
    {
        field: 'sales',
        headerName: 'المبيعات',
        width: 100,
    },
    {
        field: 'rating',
        headerName: 'التقييم',
        width: 100,
    },
    {
        field: 'profit',
        headerName: 'المداخيل',
        width: 150,
    },
    {
        field: 'visits',
        headerName: 'الزيارات',
        width: 100,
        // flex: 1,
    },
    {
        field: 'status',
        headerName: 'الوضعية',
        width: 10,
        flex: 1,
    },
    {
        field: 'action',
        headerName: '',
        type: 'actions',
        width: 150,
        sortable: false,
        filterable: false,
        flex: 1,
        renderCell: params => {
            return (
                <Stack
                    width={'100%'}
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    gap={4}
                >
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Typography
                            variant={'subtitle2'}
                            color={params.value.checked ? 'gray.main' : 'inherit'}
                        >
                            {params.value.state === 'blocked' ? 'محظور' : 'متوقف مؤقتا'}
                        </Typography>
                        <Switch
                            sx={{ scale: '-1 1' }}
                            //@ts-expect-error
                            color="purple"
                            checked={params.value.checked}
                            onChange={params.value.handleChange}
                            disabled={params.value.blocked || params.value.isSubmitting}
                        />
                        <Typography
                            variant={'subtitle2'}
                            color={params.value.checked ? 'inherit' : 'gray.main'}
                        >
                            جار
                        </Typography>
                    </Box>
                    <IconButton onClick={() => params.value.destroy()}>
                        <DeleteIcon fill={'red'} />
                    </IconButton>
                </Stack>
            );
        },
    },
];

export default TeacherCourses;
