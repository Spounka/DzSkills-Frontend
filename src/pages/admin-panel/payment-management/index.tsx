import { Button, colors } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { GridColDef } from '@mui/x-data-grid';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Payment } from '../../../types/payment';
import useLogin from '../../authenticate/hooks/useLogin';
import { AdminPanelTopBar } from '../landing-page/components/AdminPanelTopBar';
import { NotificationsBar } from '../landing-page/components/NotificationsBar';
import { AdminPanelSidebar } from '../landing-page/components/Sidebar';
import AlertDialog from './AlertDialog';
import { DisplayTableDataGrid } from './DisplayTableDataGrid';
import { getAllPayments } from './api/payments';

function PaymentManagement() {
    const columns: GridColDef[] = [
        {
            field: 'avatar',
            headerName: '',
            width: 24,
            sortable: false,
            align: 'center',
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return <Avatar
                    src={params.value}
                    sx={{
                        alignItems: 'center',
                        justifyItems: 'center',
                        justifySelf: 'center',
                        placeSelf: 'center',
                        mx: 'auto'
                    }}
                >
                    A
                </Avatar>
            }
        },
        {
            field: 'courseName',
            headerName: 'عنوان الكورس',
            width: 160,
            headerClassName: 'super-app-theme--header',
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
            field: 'price',
            headerName: 'السعر',
            width: 200,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'status',
            headerName: 'الحالة',
            width: 100,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'link',
            headerName: '',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            align: 'right',
            renderCell: (params) => {
                return <>
                    <Button
                        sx={{
                            color: colors.yellow[700],
                        }}
                        onClick={() => {
                            console.log(params);
                            setCurrentPayment(params.value)
                            openDialog()
                        }}>
                        عرض
                    </Button >
                </>
            },
            // width: 160,
        },
    ]
    const [dialogOpen, setDialog] = useState<boolean>(false)
    useLogin()

    function setDialogOpen() {
        setDialog(true)
    }

    function setDialogClosed() {
        setDialog(false)
    }

    const openDialog = useCallback(setDialogOpen, [dialogOpen]);
    const closeDialog = useCallback(setDialogClosed, [dialogOpen]);

    const [currentPayment, setCurrentPayment] = useState<Payment>()

    const theme = useTheme()
    const [drawerOpen, setDrawerOpen] = useState(false);

    const paymentsQuery = useQuery({
        queryKey: ['payments'],
        queryFn: () => getAllPayments(),
    })

    function toggleDrawer() {
        setDrawerOpen(val => !val)
    }

    if (paymentsQuery.isLoading)
        return <>Loading...</>
    if (paymentsQuery.isError)
        return <>Error</>
    if (!paymentsQuery.data)
        return <>No data</>

    function statusFromCode(status: string) {
        switch (status) {
            case 'p':
                return 'معلق';
            case 'a':
                return 'مكتمل';
            case 'r':
                return 'مرفوض'
        }
    }

    const rows = paymentsQuery.data?.map((payment: any, index: number) => {
        return {
            id: index,
            avatar: payment.order.buyer.profile_image,
            courseName: payment.order.course.title,
            transactionNumber: payment.id,
            date: new Date(payment.order.date_issued).toDateString(),
            username: payment.order.buyer.username,
            price: payment.order.course.price,
            status: statusFromCode(payment.status),
            link: payment,
        }
    })

    return (
        <Box sx={{
            p: 0,
            flexGrow: 1,
            display: 'grid',
            width: '100%',
            minHeight: '100vh',
            gridTemplateColumns: 'repeat(26, 1fr)',
            gap: theme.spacing(1),
            rowGap: theme.spacing(2),
            bgcolor: theme.palette.gray.secondary,
        }}>

            <Box
                display={'grid'}
                gridColumn={'span 5'}
                height={'100%'}
                width={'100%'}
            >
                <AdminPanelSidebar />
            </Box>
            <Box
                display={'grid'}
                gridTemplateColumns={'repeat(26 , 1fr)'}
                gridColumn={'7 / -1'}
                gridRow={1}
                rowGap={3}
                padding={0}
                pb={8}
                paddingTop={4}
                width={'100%'}
                height={'100%'}
            >

                <AdminPanelTopBar onNotificationClick={toggleDrawer}
                    title={'المعاملات المالية'}
                    subtitle={''}
                    mainColor={theme.palette.secondary.main} />
                <Box sx={{
                    gridColumn: '1 / -3',
                    gridRow: '2 / 16',
                    height: '100%',
                    width: '100%',

                }}>
                    <DisplayTableDataGrid rows={rows} columns={columns} />
                    <AlertDialog
                        open={dialogOpen}
                        openDialog={openDialog}
                        closeDialog={closeDialog}
                        payment={currentPayment}
                    />
                </Box>
                <Box sx={{
                    gridColumn: '-1 / -7',
                    gridRow: '2',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    overflow: 'hidden',
                }}>
                    <NotificationsBar mainColor={theme.palette.secondary.main} drawerOpen={drawerOpen} />
                </Box>
            </Box >
        </Box >
    )

}


export default PaymentManagement