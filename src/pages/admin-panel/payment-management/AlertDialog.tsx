import { CloseOutlined } from '@mui/icons-material';
import { Avatar, Box, Divider, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useQueryClient } from 'react-query';
import pdfIcon from '../../../assets/png/pdf@2x.png';
import downloadIcon from '../../../assets/svg/Download.svg';
import { MainButton } from '../../../components/ui/MainButton';
import { Payment } from '../../../types/payment';
import { acceptPayment, rejectPayment } from './api/payments';

interface dialogProps {
    open: boolean;
    openDialog: () => void;
    closeDialog: () => void;
    payment: Payment | undefined;
}

export default function AlertDialog({ open, closeDialog, payment }: dialogProps) {
    const theme = useTheme();
    const client = useQueryClient();
    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={'md'}
            sx={{
                width: '100vw',
            }}
        >
            <DialogContent
                sx={{
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 4,
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {payment && (
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
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                }}
                            >
                                <Avatar src={payment?.order.buyer.profile_image} />
                                <Typography flexBasis={'20%'}>
                                    {payment.order.course.title}
                                </Typography>
                                <Typography>{payment.id}</Typography>
                                <Typography>{payment.order.date_issued}</Typography>
                                <Typography flexBasis={'20%'}>
                                    {payment.order.buyer.username}
                                </Typography>
                                <Typography
                                    flexGrow={'1'}
                                    mr={'auto'}
                                >
                                    {payment.order.course.price}
                                </Typography>
                                <Button
                                    color={'gray'}
                                    endIcon={<CloseOutlined sx={{ mx: 'auto' }} />}
                                    onClick={closeDialog}
                                    sx={{
                                        justifyContent: 'center',
                                    }}
                                />
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <div></div>
                                <div></div>
                                <Button
                                    component={'a'}
                                    download={'file.png'}
                                    href={payment.receipt}
                                    target={'_blank'}
                                    sx={{
                                        width: '100%',
                                        bgcolor: theme.palette.gray.secondary,
                                        flexGrow: 1,
                                        py: 1,
                                        px: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        borderRadius: theme.spacing(),
                                        '&:hover': {
                                            bgcolor: theme.palette.gray.secondary,
                                        },
                                    }}
                                >
                                    <img
                                        loading={'lazy'}
                                        src={pdfIcon}
                                        style={{
                                            height: theme.spacing(5),
                                        }}
                                    />
                                    <Typography
                                        flexGrow={'1'}
                                        variant={'subtitle2'}
                                        color={'gray.dark'}
                                    >
                                        {payment.receipt?.substring(
                                            payment.receipt.lastIndexOf('/') + 1
                                        )}
                                    </Typography>
                                    <img
                                        loading={'lazy'}
                                        src={downloadIcon}
                                        style={{
                                            height: theme.spacing(3),
                                        }}
                                    />
                                </Button>
                                <div></div>
                                <div></div>
                                <Box
                                    display={'flex'}
                                    gap={1}
                                >
                                    <MainButton
                                        color={theme.palette.primary.main}
                                        text="تأكيد"
                                        {...{
                                            onClick: () => {
                                                const result = async () =>
                                                    acceptPayment(
                                                        payment.id
                                                    ).finally(() => {
                                                        closeDialog();
                                                        client.invalidateQueries([
                                                            'payments',
                                                        ]);
                                                    });
                                                result();
                                            },
                                        }}
                                    />
                                    <MainButton
                                        color={theme.palette.error.main}
                                        text="رفض"
                                        {...{
                                            onClick: () => {
                                                const result = async () =>
                                                    await rejectPayment(
                                                        payment.id
                                                    ).finally(() => {
                                                        closeDialog();
                                                        client.invalidateQueries([
                                                            'payments',
                                                        ]);
                                                    });
                                                result();
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
