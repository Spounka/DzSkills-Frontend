import { Button, OutlinedInput, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { MainButton } from '../../../components/ui/MainButton';

export function ChapterDetails({ upload }: any) {
    const theme = useTheme();

    return (
        <>
            <Typography variant={'subtitle2'} color={'white'} px={1}>
                عنوان الفصل
            </Typography>
            <OutlinedInput type='text' color={'secondary'} sx={{
                flexGrow: '1',
                bgcolor: 'white',
                px: 3,
                width: '100%'
            }} />
            <Box gap={1.5} sx={{
                flexGrow: '1',
                display: 'flex',
                width: '100%'
            }}>
                <Box flexGrow={'1'} width={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
                    <Typography variant={'subtitle2'} color={'white'} px={1}>
                        وصف
                    </Typography>
                    <OutlinedInput type='text' multiline rows={5} color={'secondary'} sx={{
                        bgcolor: 'white',
                        flexGrow: '1',
                        px: 3,
                        height: 'full',
                        width: '100%'
                    }} />
                </Box>
                <Box flexGrow={'1'} width={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
                    <Typography variant={'subtitle2'} color={'white'} px={1}>
                        صورة مصغرة
                    </Typography>
                    <Box sx={{
                        bgcolor: 'white',
                        border: '1px solid #CCC',
                        padding: 1,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: theme.spacing()
                    }}>
                        <Button variant='contained' component={"label"} sx={{
                            flexGrow: '1',
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
                </Box>
            </Box>
            <Box flexGrow={'1'} display={'flex'} justifyContent={'flex-end'} sx={{
                mt: 3
            }}>
                <MainButton color={'primary.light'} text='اضف الدروس' spin={false} sx={{
                    border: `${theme.palette.primary.light} 2px solid`,
                    // width: 'full',
                    // flexGrow: '1',
                    alignSelf: 'flex-end',
                    placeSelf: 'flex-end',
                    px: theme.spacing(8)
                }} />
            </Box>
        </>
    );
}
