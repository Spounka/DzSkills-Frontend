import { Button, OutlinedInput, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { UploadFileInput } from './UploadFileInput';

export function CourseDetails({ upload }: any) {
    const theme = useTheme();
    return (
        <>
            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '1',
                gridRow: '1'
            }}>
                عنوان الكورس
            </Typography>
            <OutlinedInput color={'secondary'} sx={{
                gridColumn: '1',
                gridRow: '2'
            }} />

            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '2',
                gridRow: '1'
            }}>
                هاشتاغ
            </Typography>
            <OutlinedInput color={'secondary'} size={'medium'} multiline rows={4} type={'text'} sx={{
                gridColumn: '2',
                gridRow: 'span 4',
                height: '100%'
            }} />

            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '1',
                gridRow: '3'
            }}>
                وصف
            </Typography>
            <OutlinedInput color={'secondary'} multiline rows={4} sx={{
                gridColumn: '1',
                gridRow: 'span 4'
            }} />
            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '2'
            }}>
                سعر الكورس
            </Typography>
            <OutlinedInput color={'secondary'} sx={{
                gridColumn: '2',
                px: 3
            }} endAdornment={<Typography variant={'body2'} color={'gray.dark'}>
                DA
            </Typography>} />
            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '1'
            }}>
                صورة مصغرة
            </Typography>
            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '2'
            }}>
                ملف التقديم
            </Typography>

            <UploadFileInput inputName='presentation_file' uploadImg={upload} />

            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '2'
            }}>
                ملفات إضافية ( اختياري )
            </Typography>


            <UploadFileInput inputName='additional' multipleFiles uploadImg={upload} />
            <Box sx={{
                border: '1px solid #CCC',
                padding: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(2),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: theme.spacing(),
                gridColumn: 1,
                gridRow: '9 / 12'
            }}>
                <Button variant='contained' component={"label"} sx={{
                    color: 'black',
                    bgcolor: 'gray.secondary',
                    borderRadius: "100%",
                    width: 'auto',
                    height: '30%',
                    aspectRatio: '1/1',
                    '&:hover': {
                        bgcolor: 'gray.secondary'
                    }
                }}>
                    <img src={upload} />
                    <input hidden accept='image/*' multiple type='file' />
                </Button>
                <Typography color={'gray.dark'} variant={'caption'}>
                    اسحب الملفات إلى هنا
                </Typography>
                <Typography color={'gray.main'} variant={'caption'} fontWeight={300}>
                    أو انقر للاختيار يدويا
                </Typography>

            </Box>
        </>
    );
}
