import { Avatar, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { MainButton } from '../../../components/ui/MainButton';
import axiosInstance from '../../../globals/axiosInstance';
import theme from '../../../theme';
import { MoneyRequest } from '../../../types/account-balance';
import { Payment } from '../../../types/payment';
import AdminDashboardLayout from '../layout';
import AlertDialog from '../payment-management/AlertDialog';
import { DisplayTableDataGrid } from '../payment-management/DisplayTableDataGrid';

function MoneyRequests() {
    const columns: GridColDef[] = [
        {
            field: 'avatar',
            headerName: '',
            width: 24,
            sortable: false,
            align: 'center',
            headerClassName: 'super-app-theme--header',
            renderCell: params => {
                return (
                    <Avatar
                        src={params.value}
                        sx={{
                            alignItems: 'center',
                            justifyItems: 'center',
                            justifySelf: 'center',
                            placeSelf: 'center',
                            mx: 'auto',
                        }}
                    >
                        A
                    </Avatar>
                );
            },
        },
        {
            field: 'transactionNumber',
            headerName: 'رقم المعاملة',
            width: 160,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'date',
            headerName: 'تاريخ التسجيل',
            width: 160,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'username',
            headerName: 'اسم المستخدم',
            width: 150,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'fullname',
            headerName: 'الاسم الكامل',
            width: 50,
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'price',
            headerName: 'السعر',
            width: 100,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'status',
            headerName: 'الحالة',
            width: 100,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'actions',
            headerName: '',
            flex: 1,
            renderCell: params => {
                return (
                    <Stack
                        direction={'row'}
                        gap={2}
                        justifyContent={'flex-end'}
                        width={'100%'}
                        px={2}
                    >
                        <MainButton
                            color={theme.palette.error.main}
                            text="رفض"
                            disabled={params.value.status !== 'pending'}
                            {...{
                                sx: {
                                    py: 0.5,
                                    px: 3,
                                },
                                onClick: () => params.value.reject(),
                            }}
                        />
                        <MainButton
                            color={theme.palette.primary.main}
                            text={'قبول'}
                            disabled={params.value.status !== 'pending'}
                            {...{
                                sx: {
                                    py: 0.5,
                                    px: 3,
                                },
                                onClick: () => params.value.accept(),
                            }}
                        />
                    </Stack>
                );
            },
        },
    ];
    const [dialogOpen, setDialog] = useState<boolean>(false);

    function setDialogOpen() {
        setDialog(true);
    }

    function setDialogClosed() {
        setDialog(false);
    }

    const openDialog = useCallback(setDialogOpen, [dialogOpen]);
    const closeDialog = useCallback(setDialogClosed, [dialogOpen]);

    const [currentPayment, setCurrentPayment] = useState<Payment>();
    const [rows, setRows] = useState<any>([]);

    const moneyRequestsQuery = useQuery({
        queryKey: ['money', 'requests'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/balance/request/');
            return data as MoneyRequest[];
        },
        onSuccess: res =>
            setRows(
                res.map((request: MoneyRequest, index: number) => {
                    return {
                        id: index,
                        avatar: request.account.user.profile_image,
                        transactionNumber: request.id,
                        fullname: `${request.account.user.first_name} ${request.account.user.last_name}`,
                        date: dayjs(request.date).toDate().toLocaleDateString(),
                        username: request.account.user.username,
                        price: request.amount,
                        status: statusFromCode(request.status),
                        actions: {
                            accept: () =>
                                moneyRequestMutation.mutate({
                                    id: request.id,
                                    type: 'accept',
                                }),
                            reject: () =>
                                moneyRequestMutation.mutate({
                                    id: request.id,
                                    type: 'reject',
                                }),
                            status: request.status,
                        },
                    };
                })
            ),
    });

    const queryClient = useQueryClient();
    const moneyRequestMutation = useMutation({
        mutationKey: ['money', 'requests', 'mutate'],
        mutationFn: async ({ id, type }: { id: number; type: 'accept' | 'reject' }) => {
            const { data } = await axiosInstance.patch(
                `/balance/request/${id}/${type}/`
            );
            return data as MoneyRequest;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['money', 'request']);
            moneyRequestsQuery.refetch();
        },
    });

    if (moneyRequestsQuery.isLoading) return <>Loading...</>;
    if (moneyRequestsQuery.isError) return <>Error</>;
    if (!moneyRequestsQuery.data) return <>No data</>;

    function statusFromCode(status: string) {
        switch (status) {
            case 'pending':
                return 'معلق';
            case 'approved':
                return 'مكتمل';
            case 'rejected':
                return 'مرفوض';
        }
    }

    return (
        <AdminDashboardLayout topbar_title={'المعاملات المالية'}>
            <DisplayTableDataGrid
                rows={rows}
                columns={columns}
            />
            <AlertDialog
                open={dialogOpen}
                openDialog={openDialog}
                closeDialog={closeDialog}
                payment={currentPayment}
            />
        </AdminDashboardLayout>
    );
}

export default MoneyRequests;
