import { Box, Typography } from '@mui/material';
import { ReactComponent as Arrow } from '../../../assets/svg/arrow.svg';
import Stack from '@mui/material/Stack';

export function FAQSection() {
    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            py={8}
            px={{
                xs: 8,
                lg: 45,
            }}
            gap={12}
        >
            <Typography
                variant="h5"
                color={'gray.dark'}
            >
                مقالات المساعدة
            </Typography>
            <Box
                display={'grid'}
                gap={8}
                justifyContent={'center'}
                alignItems={'center'}
                gridTemplateColumns={{
                    xs: 'repeat(1, minmax(0, 1fr))',
                    md: 'repeat(2, minmax(0, 1fr))',
                }}
                width={'100%'}
            >
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                    return (
                        <Stack
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            direction={'row'}
                            color={'gray.dark'}
                            width={'100%'}
                            gridColumn={{
                                md: (i % 2) + 1,
                                xs: 1,
                            }}
                        >
                            <Typography>هنا عنوان المقال أو السؤال كاملا</Typography>
                            <Arrow />
                        </Stack>
                    );
                })}
            </Box>
        </Stack>
    );
}
