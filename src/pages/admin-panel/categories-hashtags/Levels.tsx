import { Box, IconButton, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useQuery } from 'react-query';
import { Level } from '../../../types/course';
import { DisplayTableDataGrid } from '../payment-management/DisplayTableDataGrid';
import AddItemPopup from '../settings/AddItemPopup';
import { AddButton } from './AddButton';
import { getLevels } from './api/queries';
import { AddLevelForm } from './components/AddLevelForm';
import theme from '../../../theme';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete-red.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg/edit.svg';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'الاسم',

        width: 60,
        headerClassName: 'super-app-theme--header',

        flex: 1,
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
        flex: 0,
        width: 130,
        align: 'left',
        renderCell: params => {
            return (
                <Stack
                    direction="row"
                    gap={2}
                    justifyContent={'space-between'}
                >
                    <IconButton>
                        <DeleteIcon fill={'red'} />
                    </IconButton>
                    <IconButton
                        sx={{ maxHeight: theme.spacing(7), maxWidth: theme.spacing(7) }}
                    >
                        <EditIcon fill={theme.palette.secondary.main} />
                    </IconButton>
                </Stack>
            );
        },
    },
];
export function Levels() {
    const [popupOpen, setOpen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const levels = useQuery({
        queryKey: ['levels'],
        queryFn: () => getLevels(),
    });
    if (levels.isFetching) return <>Fetching levels...</>;
    if (levels.isError) return <>Error in levels</>;

    const rows = levels.data?.map((level: Level) => {
        return {
            id: level.id,
            name: level.name,
            members: level.courses,
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
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Typography>المستويات</Typography>
                <AddButton
                    title={'اضف مستوى جديد'}
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
                    <AddLevelForm
                        closeDialog={() => setOpen(false)}
                        refetch={levels.refetch}
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
