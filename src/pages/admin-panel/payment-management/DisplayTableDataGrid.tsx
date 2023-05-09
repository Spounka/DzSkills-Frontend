import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DipslayTableProps {
    rows: any;
    columns: GridColDef[];
}
export function DisplayTableDataGrid({ rows, columns }: DipslayTableProps) {

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
                        direction: 'rtl'
                    },
                    '& .super-app-theme--header': {
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none !important',
                    },
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
