import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Category, Hashtag } from '../../../types/course';
import { DisplayTableDataGrid } from '../payment-management/DisplayTableDataGrid';
import { AddButton } from './AddButton';
import { getHashtags } from './api/queries';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'الاسم',

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
export function Hashtags() {
    const theme = useTheme();
    const hashtags = useQuery({
        queryKey: ['hashtags'],
        queryFn: () => getHashtags(),
    });
    if (hashtags.isFetching) return <>Fetching hashtags...</>;
    if (hashtags.isError) return <>Error in hashtags</>;

    const rows = hashtags.data?.map((hashtag: Hashtag) => {
        return {
            id: hashtag.id,
            name: hashtag.name,
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
                    width: '100%',
                }}
            >
                <Typography>الوسوم</Typography>
                <AddButton title={'اضف وسم جديد'} />
            </Box>
            <Box sx={{ bgcolor: 'white' }}>
                <DisplayTableDataGrid
                    checkbox
                    rows={rows}
                    columns={columns}
                />
            </Box>
        </Box>
    );
}
