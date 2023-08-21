import { Box, Stack, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormEvent } from 'react';
import { useMutation, useQueryClient, UseQueryResult } from 'react-query';
import { MainButton } from '../../../../components/ui/MainButton';
import axiosInstance from '../../../../globals/axiosInstance';
import { AdminConfig } from '../../../../types/AdminConfig';
import { UploadImageInput } from './UploadImageInput';

interface CertificateProps {
    adminConfigQuery: UseQueryResult<AdminConfig, unknown>;
}
export function CertificateSection({ adminConfigQuery }: CertificateProps) {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const updateCertificateMutation = useMutation({
        mutationKey: ['categories', 'update'],
        mutationFn: async ({ formData }: { formData: FormData }) => {
            const { data } = await axiosInstance.patch(`/configs/`, formData);
            return data as AdminConfig;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['admin', 'configs']);
            enqueueSnackbar('تم التحديث بنجاح', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ أثناء معالجة طلبك', { variant: 'error' });
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        updateCertificateMutation.mutate({ formData: formData });
    };

    return (
        <form
            onSubmit={onSubmit}
            style={{
                width: '100%',
            }}
        >
            <Stack
                gap={2}
                px={24}
            >
                <Box width={'100%'}>
                    <UploadImageInput
                        name={'certificate_template.template'}
                        src={adminConfigQuery.data?.certificate_template?.template ?? ''}
                        maxSize={1024 * 1024 * 10}
                    />
                </Box>
                <MainButton
                    type={'submit'}
                    text={'حفظ'}
                    color={theme.palette.primary.main}
                />
            </Stack>
        </form>
    );
}
