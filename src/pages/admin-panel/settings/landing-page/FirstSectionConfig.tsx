import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormEvent } from 'react';
import { UseQueryResult, useMutation, useQueryClient } from 'react-query';
import { v4 as uuid } from 'uuid';
import { MainButton } from '../../../../components/ui/MainButton';
import axiosInstance from '../../../../globals/axiosInstance';
import { AdminConfig } from '../../../../types/AdminConfig';
import { ColoredInputStack } from './ColoredInputStack';
import { SettingSectionRow } from './SettingSectionRow';
import { SettingsSectionRowInput } from './SettingsSectionRowInput';
import { UploadImageInput } from './UploadImageInput';
import { useSnackbar } from 'notistack';

interface FirstSectionProps {
    adminConfigQuery: UseQueryResult<AdminConfig, unknown>;
}
export function FirstSectionConfig({ adminConfigQuery }: FirstSectionProps) {
    const theme = useTheme();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const imagesWithUUID = adminConfigQuery.data?.images.map(image => {
        return { ...image, key: uuid() };
    });

    const submitHeaderSectionMutation = useMutation({
        mutationKey: ['admin', 'configs', 'update'],
        mutationFn: async (formData: FormData) => {
            const { data } = await axiosInstance.patch('/configs/', formData);
            return data as AdminConfig;
        },
        onSuccess: () => {
            enqueueSnackbar('تم التحديث بنجاح', { variant: 'success' });
            queryClient.invalidateQueries(['admin', 'configs']);
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ أثناء معالجة طلبك', { variant: 'error' });
        },
    });

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = document.getElementById('update-form') as HTMLFormElement;
        if (form) {
            const formData = new FormData(form);
            for (let i = 0; i < 3; i++) {
                const file = formData.get(`images[${i}]`) as File;
                if (file.size === 0 || file.name === '') {
                    formData.delete(`images[${i}]`);
                }
            }
            submitHeaderSectionMutation.mutate(formData);
        }
    };

    return (
        <form
            id={'update-form'}
            onSubmit={submitForm}
        >
            <Stack
                gap={6}
                justifyContent={'center'}
            >
                <SettingSectionRow>
                    <SettingsSectionRowInput
                        inputLabel={'العنوان الرئيسي'}
                        titleInputName={'main_title_text.content'}
                        multiline={false}
                        defaultValue={
                            adminConfigQuery.data?.main_title_text?.content ?? ''
                        }
                    />

                    <ColoredInputStack
                        inputName={'main_title_text.color'}
                        defaultValue={adminConfigQuery.data?.main_title_text?.color}
                    />
                </SettingSectionRow>
                <SettingSectionRow>
                    <SettingsSectionRowInput
                        inputLabel={'النص الثانوي'}
                        titleInputName={'secondary_title_text.content'}
                        multiline={true}
                        defaultValue={
                            adminConfigQuery.data?.secondary_title_text?.content
                        }
                    />

                    <ColoredInputStack
                        inputName={'secondary_title_text.color'}
                        defaultValue={adminConfigQuery.data?.secondary_title_text?.color}
                    />
                </SettingSectionRow>
                <>
                    <Typography color="gray.main">الصور الرئيسية</Typography>
                    <Stack
                        direction="row"
                        gap={4}
                        px={10}
                    >
                        {imagesWithUUID?.map((image, index) => {
                            return (
                                <Box
                                    width={'100%'}
                                    height={'100%'}
                                    key={image.key}
                                >
                                    <UploadImageInput
                                        src={image.image ?? ''}
                                        name={`images[${index}]`}
                                    />
                                </Box>
                            );
                        })}
                    </Stack>
                </>
                <MainButton
                    type={'submit'}
                    text={'حفظ'}
                    color={theme.palette.primary.main}
                />
            </Stack>
        </form>
    );
}
