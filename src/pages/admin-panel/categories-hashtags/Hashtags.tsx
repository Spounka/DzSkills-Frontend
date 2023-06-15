import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useQuery } from 'react-query';
import { Hashtag } from '../../../types/course';
import { DisplayTableDataGrid } from '../payment-management/DisplayTableDataGrid';
import AddItemPopup from '../settings/AddItemPopup';
import { AddButton } from './AddButton';
import { getHashtags } from './api/queries';
import { AddHashtagForm } from './components/AddHashtagForm';

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
    const [popupOpen, setOpen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

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
            members: hashtag.courses,
        };
    });
    return (
        <Box
            id={'main-container'}
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
                <AddButton
                    title={'اضف وسم جديد'}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        setOpen(true);
                        setAnchorEl(e.currentTarget);
                    }}
                />
            </Box>
            <Box sx={{ bgcolor: 'white' }}>
                <AddItemPopup
                    isOpen={popupOpen}
                    root={anchorEl || document.body}
                    width={document.getElementById('main-container')?.offsetWidth || 0}
                    closeDialog={() => setOpen(false)}
                >
                    <AddHashtagForm
                        closeDialog={() => setOpen(false)}
                        refetch={hashtags.refetch}
                    />
                </AddItemPopup>
                <DisplayTableDataGrid
                    checkbox
                    rows={rows}
                    columns={columns}
                />
            </Box>
        </Box>
    );
}
