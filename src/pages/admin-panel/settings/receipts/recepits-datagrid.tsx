import { Check } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { yellow } from '@mui/material/colors';
import { GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import React, { MouseEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-red.svg';
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit.svg';
import axiosInstance from '../../../../globals/axiosInstance';
import theme from '../../../../theme';
import { AddButton } from '../../categories-hashtags/AddButton';
import { DisplayTableDataGrid } from '../../payment-management/DisplayTableDataGrid';
import AddItemPopup from '../AddItemPopup';
import { createReceipt, getAllReceipts } from './api/queries';
import { AddReceiptForm } from './components/AddReceiptFormProps';
import { Receipt } from '../../../../types/AdminConfig';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',

        width: 60,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'usage',
        headerName: 'الاستعمال',
        width: 60,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'current',
        headerName: 'الحالي؟',
        width: 60,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        renderCell: params => {
            return params.value ? <Check color="secondary" /> : <></>;
        },
    },
    {
        field: 'link',
        headerName: '',
        headerClassName: 'super-app-theme--header',
        width: 100,
        align: 'left',
        flex: 1,
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
    {
        field: 'actions',
        headerName: '',
        headerClassName: 'super-app-theme--header',
        width: 120,
        flex: 0,
        align: 'left',
        renderCell: params => {
            return (
                <Stack
                    direction="row"
                    gap={2}
                    justifyContent={'space-between'}
                >
                    <IconButton onClick={() => params.value.delete()}>
                        <DeleteIcon fill={'red'} />
                    </IconButton>
                    <IconButton
                        onClick={params.value.edit}
                        sx={{ maxHeight: theme.spacing(7), maxWidth: theme.spacing(7) }}
                    >
                        <EditIcon fill={theme.palette.secondary.main} />
                    </IconButton>
                </Stack>
            );
        },
    },
];

function ReceiptsDatagrid() {
    const [popupOpen, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectedReceipt, setSelectedReceipt] = useState<Receipt | undefined>(
        undefined
    );
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const receiptsQuery = useQuery({
        queryKey: ['receipts'],
        queryFn: () => getAllReceipts(),
        refetchInterval: 1000 * 5,
        refetchIntervalInBackground: true,
    });

    const receiptMutation = useMutation({
        mutationFn: (data: FormData) => createReceipt(data),
        onSuccess: async () => {
            setOpen(false);
            await queryClient.invalidateQueries('receipts');
        },
    });

    const deleteReceiptMutation = useMutation({
        mutationKey: ['receipts', 'delete'],
        mutationFn: async (id: number) => {
            const { data } = await axiosInstance.delete(`/configs/receipts/${id}/`);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['receipts']);
            enqueueSnackbar('تمت إزالة الوصل بنجاح', { variant: 'success' });
        },
        onError: async () => {
            await queryClient.invalidateQueries(['receipts']);
            enqueueSnackbar('حدث خطأ ، حاول مرة أخرى في وقت لاحق', {
                variant: 'error',
            });
        },
    });

    const editReceiptMutation = useMutation({
        mutationKey: ['receipts', 'edit'],
        mutationFn: async (values: FormData) => {
            const { data } = await axiosInstance.patch(
                `/configs/receipts/${selectedReceipt?.id ?? ''}/`,
                values
            );
            return data;
        },
        onSuccess: () => {
            setAnchorEl(null);
            setOpen(false);
            setSelectedReceipt(undefined);
            enqueueSnackbar('تم تحديث الوصل بنجاح', { variant: 'success' });
        },
        onError: () => {
            setOpen(false);
            enqueueSnackbar('فشل تحديث الوصل', { variant: 'error' });
            setSelectedReceipt(undefined);
            setAnchorEl(null);
        },
    });
    const deleteSelectedReceiptsMutation = useMutation({
        mutationKey: ['receipts', 'delete'],
        mutationFn: async (formData: FormData) => {
            const { data } = await axiosInstance.post(
                `/configs/receipts/delete/`,
                formData
            );
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['receipts']);
            enqueueSnackbar('تمت إزالة الوصل بنجاح', { variant: 'success' });
        },
        onError: async () => {
            await queryClient.invalidateQueries(['receipts']);
            enqueueSnackbar('حدث خطأ ، حاول مرة أخرى في وقت لاحق', {
                variant: 'error',
            });
        },
    });

    const handleEditReceipt = (id: number, e: MouseEvent<HTMLElement>) => {
        const _receipt = receiptsQuery.data?.filter(h => h.id === id);
        if (_receipt && _receipt?.length > 0) {
            setOpen(true);
            setSelectedReceipt(_receipt[0]);
            setAnchorEl(e.currentTarget);
        }
    };

    const deleteReceiptArray = () => {
        const formData = new FormData();
        for (let i = 0; i < selectedRows.length; i++) {
            formData.set(`receipts[${i}]`, selectedRows[i].toString());
        }
        deleteSelectedReceiptsMutation.mutate(formData);
    };

    const rows = receiptsQuery.data?.map((receipt: Receipt) => {
        return {
            id: receipt.id,
            usage: receipt.count,
            current: receipt.is_current,
            link: receipt.image,
            actions: {
                delete: () => deleteReceiptMutation.mutate(receipt.id),
                edit: (e: MouseEvent<HTMLElement>) => handleEditReceipt(receipt.id, e),
            },
        };
    });
    let largestID = 0;
    if (rows && rows.length > 0) {
        largestID = rows?.reduce((prev, current) => {
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
                flex: '0 1 75%',
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
                <Stack
                    direction={'row'}
                    gap={2}
                >
                    <IconButton
                        disableFocusRipple
                        disableRipple
                        disabled={selectedRows?.length === 0}
                        onClick={() => deleteReceiptArray()}
                        sx={{
                            fill: 'white',
                            color: 'white',
                            borderRadius: theme.spacing(0.5),
                            py: 1,
                            px: 2,
                            bgcolor: theme.palette.error.main,
                            transition: 'all 200ms ease',
                        }}
                    >
                        <Stack
                            direction="row"
                            gap={1}
                        >
                            <DeleteIcon fill="inherit" />
                            <Typography>حذف</Typography>
                        </Stack>
                    </IconButton>
                    <AddButton
                        title={'اضف وصل جديد'}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                            setOpen(true);
                            setAnchorEl(e.currentTarget);
                        }}
                    />
                </Stack>
            </Box>
            <Box sx={{ bgcolor: 'white' }}>
                <AddItemPopup
                    isOpen={popupOpen}
                    root={anchorEl || document.body}
                    width={document.getElementById('main-container')?.offsetWidth || 0}
                    closeDialog={() => setOpen(false)}
                >
                    <AddReceiptForm
                        id={largestID + 1}
                        closeDialog={() => setOpen(false)}
                        selectedReceipt={selectedReceipt}
                        mutation={
                            selectedReceipt
                                ? editReceiptMutation.mutate
                                : receiptMutation.mutate
                        }
                    />
                </AddItemPopup>
                <DisplayTableDataGrid
                    checkbox
                    rows={rows ?? []}
                    columns={columns}
                    {...{
                        onRowSelectionModelChange: (newSelection: number[]) => {
                            setSelectedRows(newSelection);
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

export default ReceiptsDatagrid;
