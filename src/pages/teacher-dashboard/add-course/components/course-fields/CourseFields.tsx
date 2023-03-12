import { OutlinedInput, Typography } from '@mui/material';
import { UploadFileInput } from '../../../../../components/form/UploadFileInput';

export function CourseFields() {
    return (
        <>
            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: 'span 1',
                gridRow: '1'
            }}>
                عنوان الكورس
            </Typography>
            <OutlinedInput
                name={'title'}
                color={'secondary'}
                sx={{
                    gridColumn: '1',
                    gridRow: '2'
                }} />

            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '1',
                gridRow: '3'
            }}>
                وصف
            </Typography>
            <OutlinedInput
                name={'description'}
                color={'secondary'}
                multiline
                rows={4}
                sx={{
                    gridColumn: '1',
                    gridRow: '4 / 8'
                }} />
            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '2',
                gridRow: '1'
            }}>
                سعر الكورس
            </Typography>
            <OutlinedInput
                name={'price'}
                color={'secondary'}
                sx={{
                    gridColumn: '2',
                    px: 3
                }}
                endAdornment={
                    <Typography variant={'body2'} color={'gray.dark'}>
                        DA
                    </Typography>
                }
            />

            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '2',
                }}>
                هاشتاغ
            </Typography>
            <OutlinedInput
                color={'secondary'}
                size={'medium'}
                multiline
                rows={4}
                type={'text'}
                name={'hashtags'}
                sx={{
                    gridColumn: '2',
                    gridRow: 'span 4',
                    height: '100%'
                }} />
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

            <UploadFileInput
                inputName='presentation_file' />

            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                gridColumn: '2'
            }}>
                ملفات إضافية ( اختياري )
            </Typography>


            <UploadFileInput inputName='additional' multipleFiles inputFileTypes='.pdf, .ppt' />
            <UploadFileInput
                sx={{
                    gridColumn: '1',
                    gridRow: '9 / 12',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',

                }}
                containerSx={{
                    alignItems: 'center',
                    flexGrow: '0',
                }}

                buttonSx={{
                    height: 'auto',
                }}
                inputFileTypes='image/*'
                inputName={'thumbnail'}
            />
        </>
    );
}
