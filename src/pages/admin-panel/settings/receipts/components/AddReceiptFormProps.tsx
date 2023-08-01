import { CloseOutlined } from '@mui/icons-material';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from 'react-query';
import { UploadFileInput } from '../../../../../components/form/UploadFileInput';
import { MainButton } from '../../../../../components/ui/MainButton';
import { createReceipt } from '../api/queries';

import {Receipt} from "../../../../../types/AdminConfig";

interface AddReceiptFormProps {
    id: number;
    selectedReceipt?: Receipt;
    mutation: (form: FormData) => void;
    closeDialog: () => void;
}
export function AddReceiptForm({
    id,
    selectedReceipt,
    mutation,
    closeDialog,
}: AddReceiptFormProps) {
    const theme = useTheme();
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = document.querySelector('form');
        if (form) {
            let data = new FormData(form);
            mutation(data);
        }
    }
    return (
        <form
            onSubmit={onSubmit}
            id={'add-receipt'}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={4}
                width={'100%'}
            >
                <Stack
                    gap={2}
                    width={'100%'}
                    flexBasis={'1/2'}
                >
                    <Stack
                        direction="row"
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                            color={'gray.main'}
                            sx={{
                                direction: 'rtl',
                            }}
                        >
                            رقم الوصل
                        </Typography>
                        <Typography
                            variant={'body2'}
                            color={'gray.main'}
                            sx={{
                                direction: 'rtl',
                            }}
                        >
                            {selectedReceipt?.id ?? id}
                        </Typography>
                    </Stack>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        sx={{
                            gap: 1,
                        }}
                    >
                        <MainButton
                            type="submit"
                            text={'تأكيد'}
                            color={theme.palette.primary.main}
                            sx={{
                                width: '100%',
                            }}
                        />
                        <MainButton
                            type={'button'}
                            sx={{
                                width: '100%',
                            }}
                            text={'إلغاء'}
                            color={theme.palette.error.main}
                            {...{ onClick: closeDialog }}
                        />
                    </Box>
                </Stack>
                <Stack
                    width="100%"
                    flexBasis={'1/2'}
                >
                    <Button
                        color={'gray'}
                        endIcon={<CloseOutlined />}
                        onClick={closeDialog}
                        sx={{
                            justifyContent: 'flex-end',
                        }}
                    />
                    <UploadFileInput inputName={'image'} />
                </Stack>
            </Stack>
        </form>
    );
}
