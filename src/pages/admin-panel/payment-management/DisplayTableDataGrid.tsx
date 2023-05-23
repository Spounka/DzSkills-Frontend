import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { alpha } from '@mui/material/styles';

interface DipslayTableProps {
    rows: any;
    columns: GridColDef[];
    checkbox?: boolean;
}
export function DisplayTableDataGrid({
    rows,
    columns,
    checkbox,
}: DipslayTableProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 0,
                '& .super-app-theme--header': {
                    backgroundColor: 'black',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection={checkbox}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                sx={{
                    // width: '100%',
                    direction: 'rtl',
                    root: {
                        borderWidth: '0 !important',
                    },
                    '& .super-app-theme--header': {
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none !important',
                    },
                    '& .MuiDataGrid-cell:focus': {
                        borderColor: 'secondary.main',
                    },
                    '& .MuiDataGrid-cell:hover': {
                        // bgcolor: alpha(theme.palette.secondary.main, 0.3),
                    },
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    },
                }}
                pageSizeOptions={[5, 10, 15, 20, 25]}
                disableColumnFilter
                disableColumnSelector
                disableColumnMenu
                disableRowSelectionOnClick
                autoHeight
            />
        </Box>
    );
}
