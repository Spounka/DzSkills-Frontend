import { CloseOutlined } from '@mui/icons-material';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from 'react-query';
import { StyledOutline } from '../../../../components/form/StyledOutline';
import { MainButton } from '../../../../components/ui/MainButton';
import { createHashtag } from '../api/queries';
import { Hashtag } from '../../../../types/course';

interface AddHashtagFormProps {
    selectedHashtag?: Hashtag;
    closeDialog: () => void;
    mutation: (form: FormData) => void;
}
export function AddHashtagForm({
    selectedHashtag,
    closeDialog,
    mutation,
}: AddHashtagFormProps) {
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
                        alignItems={'center'}
                        gap={1}
                    >
                        <Typography
                            variant={'body2'}
                            color={'gray.main'}
                            sx={{
                                direction: 'rtl',
                                width: '100%',
                                flexBasis: '1/2',
                            }}
                        >
                            اسم الوسم
                        </Typography>
                        <StyledOutline
                            placeholder={selectedHashtag?.name ?? ''}
                            name={'name'}
                            fullWidth
                            sx={{
                                flexBasis: '1/2',
                            }}
                        />
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
                <Button
                    color={'gray'}
                    endIcon={<CloseOutlined />}
                    onClick={closeDialog}
                    sx={{
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-start',
                        width: '100%',
                    }}
                />
            </Stack>
        </form>
    );
}
