import { Box, Typography, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Category } from '../../../types/course';
import { DisplayTableDataGrid } from '../payment-management/DisplayTableDataGrid';
import { AddButton } from './AddButton';
import { getCategories } from './api/queries';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: "الاسم",

        width: 60,
        headerClassName: 'super-app-theme--header',

        flex: 2,
    },
    {
        field: 'members',
        headerName: 'الأعضاء',
        width: 60,
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'click',
        headerName: '',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        width: 130,
        align: 'left',
        // width: 160,
    },
];
export function Categories() {
    const theme = useTheme();
    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    });
    if (categories.isFetching)
        return <>Fetching Categories...</>;
    if (categories.isError)
        return <>Error in categories</>;


    const rows = categories.data?.map((category: Category) => {
        return {
            id: category.id,
            name: category.name,
            members: 12,
        };
    });
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <Typography>
                    الأقسام
                </Typography>
                <AddButton title={'اضف قسم جديد'} />
            </Box>
            <Box sx={{ bgcolor: 'white' }}>
                <DisplayTableDataGrid checkbox rows={rows} columns={columns} />
            </Box>


        </Box>
    );
}
