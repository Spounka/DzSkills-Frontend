import {
    Backdrop,
    Button,
    Card,
    CircularProgress,
    Divider,
    Typography,
    useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AxiosError } from 'axios';
import Image from 'mui-image';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import pdf_icon from '../../assets/png/pdf@2x.png';
import uploadImg from '../../assets/svg/upload gray.svg';
import DownloadSvgIcon from '../../components/ui/DownloadSvgIcon';
import { MainButton } from '../../components/ui/MainButton';
import { getCourse } from '../course/api/getCourse';
import { createOrder, getCurrentReceipt } from './api/createOrder';
import { useIsBanned } from '../banned-page/BannedPage';
import { Receipt } from '../../types/AdminConfig';
import useLogin from '../authenticate/hooks/useLogin';
import { useRouteID } from '../../globals/hooks';

function BuyCourse() {
    const id: number = useRouteID();
    const theme = useTheme();
    useLogin();
    const [fileName, setFileName] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    function handleFilechange(event: any) {
        if (!RegExp('(image/*|application/pdf)').exec(event.target.files[0].type)) {
            enqueueSnackbar('الرجاء تحميل صورة', {
                variant: 'warning',
                autoHideDuration: 1000 * 2,
            });
            event.target.files[0] = '';
            return;
        }
        setFileName(event.target.files[0]);
    }

    const query = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
    });

    const mutation = useMutation({
        mutationKey: ['offers', id, 'create'],
        mutationFn: (data: any) => createOrder(data),
        onSuccess: () => {
            enqueueSnackbar('طلبك قيد المراجعة', { variant: 'warning' });
            setIsSubmitting(false);
            setTimeout(() => navigate(`/profile/cart/`), 1000);
        },
        onError: (err: AxiosError<{ message: string }>) => {
            if (err.response?.data.message === 'an existing order already exists') {
                enqueueSnackbar('هناك أمر دفع معلق قائم', {
                    variant: 'error',
                });
            } else {
                enqueueSnackbar('حدث خطأ', {
                    variant: 'error',
                });
            }
            setIsSubmitting(false);
            setTimeout(() => navigate(`/profile/cart/`), 1000);
        },
    });

    async function submitForm(e: any) {
        e.preventDefault();
        setIsSubmitting(true);

        const form = document.querySelector('form');
        if (form) {
            let formData = new FormData(form);
            formData.append('course', id.toString());
            mutation.mutate(formData);
        }
    }

    const [imageLink, setImageLink] = useState<string>('');
    useEffect(() => {
        const getReceipt = async () => await getCurrentReceipt();
        getReceipt()
            .then((data: Receipt) => {
                setImageLink(data.image);
            })
            .catch(err => console.error(err));
    }, []);

    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;

    if (query.isError) return <>Error</>;
    if (query.isLoading || query.isFetching) return <>Loading...</>;

    return (
        <>
            <Backdrop
                open={isSubmitting}
                sx={{ zIndex: 100 }}
            >
                <CircularProgress color={'secondary'} />
            </Backdrop>
            <Grid
                container
                direction="column"
                spacing={5}
                id={'main grid container'}
                columns={14}
                sx={{
                    backgroundColor: 'white',
                    maxWidth: '100%',
                    height: '100%',
                    pt: 4,
                }}
            >

                <Grid
                    item
                    xs={14}
                    container
                    sx={{
                        backgroundColor: 'gray.secondary',
                        height: '100%',
                        // minHeight: '100dvh',
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(26, minmax(0, 1fr))',
                            width: '100%',
                            marginBottom: '2rem',
                            height: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                gridColumnStart: 3,
                                gridColumnEnd: 26,
                            }}
                        >
                            <Typography
                                color={'secondary.dark'}
                                variant={'h6'}
                                fontWeight={600}
                                flexGrow={1}
                                width="100%"
                            >
                                تأكيد الشراء
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection={{
                                    xs: 'column-reverse',
                                    lg: 'row',
                                }}
                                gap={2}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexBasis: '33%',
                                        height: '100%',
                                        flexShrink: '1',
                                        gap: 4,
                                    }}
                                >
                                    <Image
                                        src={query.data?.thumbnail || ''}
                                        height={'40%'}
                                        errorIcon={false}
                                    />

                                    <Box
                                        display={'flex'}
                                        gap={2}
                                        flexDirection={'column'}
                                    >
                                        <Box
                                            display={'flex'}
                                            justifyContent={'space-between'}
                                            pl={4}
                                        >
                                            <Typography
                                                color={'gray.main'}
                                                variant={'h6'}
                                                fontWeight={500}
                                            >
                                                السعر
                                            </Typography>
                                            <Typography
                                                color={'secondary.dark'}
                                                variant={'h6'}
                                                fontWeight={500}
                                                sx={{
                                                    direction: 'ltr',
                                                }}
                                            >
                                                {query.data?.price} DA
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider />
                                    <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        pl={4}
                                    >
                                        <Typography
                                            color={'gray.main'}
                                            variant={'h6'}
                                            fontWeight={500}
                                        >
                                            المجموع
                                        </Typography>
                                        <Typography
                                            color={'secondary.dark'}
                                            variant={'h6'}
                                            fontWeight={500}
                                            sx={{
                                                direction: 'ltr',
                                            }}
                                        >
                                            {query.data?.price} DA
                                        </Typography>
                                    </Box>
                                </Box>
                                <Card
                                    elevation={0}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexBasis: '60%',
                                        width: '100%',
                                        height: {
                                            xs: '100%',
                                            lg: 'min-content',
                                        },
                                        // flexShrink: '1',
                                        borderRadius: theme.spacing(),
                                        py: {
                                            xs: 2,
                                            lg: 9,
                                        },
                                        px: {
                                            xs: 2,
                                            lg: 12,
                                        },
                                        gap: {
                                            xs: 2,
                                            lg: 6,
                                        },
                                    }}
                                >
                                    <Box
                                        display={'flex'}
                                        flexDirection={{
                                            xs: 'column',
                                            lg: 'row',
                                        }}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                        gap={2}
                                        pr={2}
                                    >
                                        <Typography
                                            color={'gray.main'}
                                            variant={'subtitle2'}
                                            fontWeight={400}
                                            maxWidth={'100%'}
                                        >
                                            يرجى تحميل معلومات الدفع الخاصة بالموقع من
                                            هنا
                                        </Typography>

                                        <MainButton
                                            sx={{
                                                borderRadius: theme.spacing(),
                                                gap: 2,
                                                width: {
                                                    xs: 'auto',
                                                    lg: '34%',
                                                },
                                            }}
                                            {...{
                                                component: 'a',
                                                href: imageLink,
                                                target: '_blank',
                                                download: true,
                                                size: 'large',
                                                endIcon: (
                                                    <DownloadSvgIcon
                                                        {...{
                                                            width: theme.spacing(2),
                                                            height: theme.spacing(2),
                                                        }}
                                                    />
                                                ),
                                            }}
                                            text={'تحميل'}
                                            color={theme.palette.primary.main}
                                        />
                                    </Box>

                                    <form
                                        onSubmit={submitForm}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            // height: 'min-content',
                                            borderRadius: theme.spacing(),
                                            paddingTop: 9,
                                            paddingBottom: 9,
                                            paddingRight: 12,
                                            gap: theme.spacing(2),
                                        }}
                                    >
                                        <Box
                                            display={'flex'}
                                            flexDirection={{
                                                xs: 'column',
                                                lg: 'row',
                                            }}
                                            justifyContent={'space-between'}
                                            alignItems={'center'}
                                            gap={{
                                                xs: 2,
                                                lg: 9,
                                            }}
                                        >
                                            <Typography
                                                color={'gray.main'}
                                                variant={'subtitle2'}
                                                fontWeight={400}
                                                maxWidth={{
                                                    xs: '80%',
                                                    lg: '60%',
                                                }}
                                            >
                                                عند إكمال الدفع يرجى ارفاق الوصل حتى
                                                نتمكن من تأكيد دفعكم . عملية التأكيد بين
                                                24/48 ساعة
                                                <br />
                                                يمكنكم العودة لهذه الصفحة عبر الولوج الى
                                                صفحة{' '}
                                                <strong> الطلبات و الفواتير </strong>
                                                من اعدادات حسابكم
                                            </Typography>
                                            <Button
                                                component={'label'}
                                                variant={'contained'}
                                                sx={{
                                                    // flexGrow: '1',
                                                    bgcolor: 'gray.secondary',
                                                    color: 'gray.main',
                                                    ':hover': {
                                                        bgcolor: 'gray.secondary',
                                                        color: 'gray.main',
                                                    },
                                                }}
                                            // endIcon={ }
                                            >
                                                رفع
                                                <img
                                                    alt={'icon for uploading an image'}
                                                    src={uploadImg}
                                                    style={{
                                                        width: '10%',
                                                        height: 'auto',
                                                        padding: 0,
                                                        // marginLeft: theme.spacing(),
                                                        marginRight: theme.spacing(),
                                                    }}
                                                />
                                                <input
                                                    // hidden
                                                    style={{
                                                        width: 1,
                                                        height: 1,
                                                    }}
                                                    required={true}
                                                    onChange={handleFilechange}
                                                    name={'payment.receipt'}
                                                    accept={'image/*,.pdf'}
                                                    type="file"
                                                />
                                            </Button>
                                        </Box>
                                        <Box
                                            sx={{
                                                bgcolor: 'gray.secondary',
                                                width: '100%',
                                                height: 'auto',
                                                borderRadius: theme.spacing(),
                                                py: theme.spacing(2),
                                                px: theme.spacing(3),
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                            }}
                                        >
                                            <img
                                                alt={'icon for the pdf logo'}
                                                src={pdf_icon}
                                                style={{
                                                    height: theme.spacing(4),
                                                }}
                                            />

                                            <Typography
                                                variant={'subtitle2'}
                                                color={'gray.main'}
                                            >
                                                {fileName?.name}
                                            </Typography>
                                        </Box>
                                        <Box
                                            display={'flex'}
                                            gap={2}
                                            justifyContent={'space-between'}
                                        >
                                            <MainButton
                                                type={'submit'}
                                                text={'شراء الآن'}
                                                color={theme.palette.primary.main}
                                                {...{
                                                    size: 'small',
                                                }}
                                            />

                                            <MainButton
                                                text={'إلغاء الطلب'}
                                                color={theme.palette.error.main}
                                                {...{
                                                    onClick: () => navigate('..'),
                                                    size: 'small',
                                                }}
                                            />
                                        </Box>
                                    </form>
                                </Card>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default BuyCourse;
