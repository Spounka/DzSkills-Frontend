import { Box, Stack } from '@mui/material';
import placeholderImage from '../../../../assets/png/placeholder.png';
import { Category } from '../../../../types/course';
import { SettingsSectionRowInput } from './SettingsSectionRowInput';
import { UploadImageInput } from './UploadImageInput';

interface CategoryItemProps {
    category?: Category;
}
export function CategoryItem({ category }: CategoryItemProps) {
    return (
        <>
            <Stack
                gap={3}
                width={'100%'}
                flex={'1 1 50%'}
            >
                <SettingsSectionRowInput
                    inputLabel={'عنوان القسم'}
                    titleInputName={'name'}
                    defaultValue={category?.name}
                    required
                />
                <SettingsSectionRowInput
                    inputLabel={'النص الثانوي'}
                    titleInputName={'description'}
                    defaultValue={category?.description}
                    multiline
                    required
                />
            </Stack>
            <Box flex={'0 1 20%'}>
                <UploadImageInput
                    src={category?.image || placeholderImage}
                    name={'image'}
                />
            </Box>
        </>
    );
}
