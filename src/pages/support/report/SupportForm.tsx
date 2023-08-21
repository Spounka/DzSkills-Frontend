import {
    Card,
    FormControl,
    FormLabel,
    OutlinedInput,
    Stack,
    useTheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { MainButton } from '../../../components/ui/MainButton';
import { SupportAutocomplete } from './SupportAutocomplete';
import { SupportRadioGroup } from './SupportRadioGroup';
import { getReportTypes } from './api/getReportReason';
import { submitReport } from './api/submitReport';

export function SupportForm() {
    const theme = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const reportChoicesQuery = useQuery({
        queryKey: ['report', 'choices'],
        queryFn: () => getReportTypes(),
    });
    const submitReportMutation = useMutation({
        mutationKey: ['report', 'submit'],
        mutationFn: (body: FormData) => submitReport(body),
        onSuccess: () => {
            setIsSubmitting(false);
            enqueueSnackbar('تم إرسال البلاغ بنجاح', {
                variant: 'success',
            });
        },
        onError: () => {
            setIsSubmitting(false);
            enqueueSnackbar('حدث خطأ', {
                variant: 'error',
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
            });
        },
    });

    useEffect(() => {
        document.cookie = 'django_language=ar-ar; SmaeSite=None; Secure';
    }, []);

    if (reportChoicesQuery.isFetching) return <>...</>;
    if (reportChoicesQuery.isError) return <>Error?...</>;
    return (
        <Card
            elevation={0}
            sx={{
                width: '100%',
                height: '100%',
                flexBasis: '60%',
                py: 4,
                px: {
                    xs: 2,
                    lg: 3,
                },
            }}
        >
            <form
                onSubmit={f => {
                    f.preventDefault();
                    const form = document.querySelector('form');
                    if (form) {
                        setIsSubmitting(true);
                        const data = new FormData(form);
                        submitReportMutation.mutate(data);
                    }
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(2),
                }}
            >
                <Stack
                    direction={{
                        xs: 'column',
                        lg: 'row',
                    }}
                    gap={2}
                >
                    <FormControl
                        color="secondary"
                        sx={{
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormLabel>موضوع الطلب</FormLabel>
                        <SupportRadioGroup choices={reportChoicesQuery.data || []} />
                    </FormControl>
                    <FormControl
                        color="secondary"
                        sx={{
                            width: '100%',
                            color: 'purple',
                            gap: 2,
                        }}
                    >
                        <SupportAutocomplete />
                    </FormControl>
                </Stack>
                <FormControl
                    color={'secondary'}
                    sx={{ gap: 2, width: '100%' }}
                >
                    <FormLabel>وصف</FormLabel>
                    <OutlinedInput
                        fullWidth
                        multiline
                        rows={'6'}
                        sx={{
                            color: 'gray.main',
                            transition: 'color 100ms ease-in',
                            height: {
                                xs: 'min-content',
                                lg: '100%',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                transition: 'all 100ms ease-in',
                                borderColor: theme.palette.secondary.main,
                                color: 'gray.dark',
                            },
                            '&.Mui-focused': {
                                color: 'gray.dark',
                            },
                        }}
                    />
                </FormControl>
                <MainButton
                    text={'إرسال الطلب'}
                    spin={isSubmitting}
                    type={'submit'}
                    color={theme.palette.secondary.lighter}
                    sx={{
                        alignSelf: 'flex-end',
                    }}
                />
            </form>
        </Card>
    );
}
