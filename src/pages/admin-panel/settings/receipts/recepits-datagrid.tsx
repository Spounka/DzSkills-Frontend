import { Check } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { yellow } from '@mui/material/colors';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Receipt } from '../../../../types/admin_config';
import { AddButton } from '../../categories-hashtags/AddButton';
import { DisplayTableDataGrid } from '../../payment-management/DisplayTableDataGrid';
import AddItemPopup from '../AddItemPopup';
import { getAllReceipts } from './api/queries';
import { AddReceiptForm } from './components/AddReceiptFormProps';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',

        width: 60,
        headerClassName: 'super-app-theme--header',

        flex: 2,
    },
    {
        field: 'usage',
        headerName: 'الاستعمال',
        width: 60,
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'current',
        headerName: 'الحالي؟',
        width: 60,
        headerClassName: 'super-app-theme--header',
        flex: 1,
        renderCell: params => {
            return params.value ? <Check color="secondary" /> : <></>;
        },
    },
    {
        field: 'link',
        headerName: '',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        width: 130,
        align: 'left',
        renderCell: params => {
            return (
                <a
                    href={params.value}
                    target="_blank"
                >
                    <Typography
                        color={yellow[700]}
                        variant={'body2'}
                    >
                        إظهار الوصل
                    </Typography>
                </a>
            );
        },
    },
];

function ReceiptsDatagrid() {
    const [popupOpen, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const receiptsQuery = useQuery({
        queryKey: ['receipts'],
        queryFn: () => getAllReceipts(),
        refetchInterval: 1000 * 5,
        staleTime: 1000 * 3,
    });

    if (receiptsQuery.isFetching) return <>Fetching Receipts...</>;
    if (receiptsQuery.isError) return <>Error in Receipts</>;

    const rows = receiptsQuery.data?.map((receipt: Receipt) => {
        return {
            id: receipt.id,
            usage: receipt.count,
            current: receipt.is_current,
            link: receipt.image,
        };
    });
    let largestID = 0;
    if (rows) {
        largestID = rows.reduce((prev, current) => {
            return current.id > prev.id ? current : prev;
        }).id;
    }

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
                <Typography>الوصول</Typography>
                <AddButton
                    title={'اضف وصل جديد'}
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
                    width={
                        document.getElementById('main-container')
                            ?.offsetWidth || 0
                    }
                    closeDialog={() => setOpen(false)}
                >
                    <AddReceiptForm
                        id={largestID + 1}
                        closeDialog={() => setOpen(false)}
                        refetch={receiptsQuery.refetch}
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

export default ReceiptsDatagrid;
