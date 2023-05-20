import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DipslayTableProps {
    rows: any;
    columns: GridColDef[];
    checkbox?: boolean
}
export function DisplayTableDataGrid({ rows, columns, checkbox }: DipslayTableProps) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 0,
                '& .super-app-theme--header': {
                    backgroundColor: 'black'
                }
            }}
        >

            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection={checkbox}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10
                        }
                    }
                }}
                sx={{
                    direction: 'rtl',
                    root: {
                        direction: 'rtl',
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
                    '&.MuiDataGrid-cell:focus, &.MuiDataGrid-cell.Mui-selected': {
                        color: theme.palette.secondary.main,
                    }
                }}
                pageSizeOptions={[10]}
                disableColumnFilter
                disableColumnSelector
                disableColumnMenu
                disableRowSelectionOnClick
                autoHeight />
        </Box>
    );
}
