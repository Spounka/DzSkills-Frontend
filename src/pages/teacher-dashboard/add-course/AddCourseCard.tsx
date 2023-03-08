import { Button, Divider, OutlinedInput, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box, useTheme } from '@mui/system';
import { MainButton } from '../../../components/ui/MainButton';

export function AddCourseCard({ upload }: any) {
    const theme = useTheme();
    return (
        <Card elevation={0} sx={{
            px: theme.spacing(3),
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            gap: theme.spacing(2),
            boxShadow: '7px 20px 40px #00000014',
            borderRadius: theme.spacing()
        }}>
            <Typography color={'purple.main'}>
                معلومات الكورس
            </Typography>
            <Divider />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                columnGap: theme.spacing(),
                flexGrow: '1',
                alignContent: 'center',
                alignItems: 'center',
                rowGap: theme.spacing(2) // height: '100%',
            }}>
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
                <Box sx={{
                    border: '1px solid #CCC',
                    padding: 1,
                    display: 'flex',
                    gap: 2,
                    // justifyContent: 'center',
                    p: theme.spacing(3),
                    borderRadius: theme.spacing()
                }}>
                    <Button variant='contained' component={"label"} sx={{
                        color: 'black',
                        bgcolor: 'gray.secondary',
                        borderRadius: "100%",
                        width: 'auto',
                        height: '100%',
                        aspectRatio: '1/1',
                        '&:hover': {
                            bgcolor: 'gray.secondary'
                        }
                    }}>
                        <img src={upload} />
                        <input hidden accept='image/*' multiple type='file' />
                    </Button>
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Typography color={'gray.dark'} variant={'caption'}>
                            اسحب الملفات إلى هنا
                        </Typography>
                        <Typography color={'gray.main'} variant={'caption'} fontWeight={300}>
                            أو انقر للاختيار يدويا
                        </Typography>
                    </Box>
                </Box>
                <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                    gridColumn: '2'
                }}>
                    ملفات إضافية ( اختياري )
                </Typography>
                <Box sx={{
                    border: '1px solid #CCC',
                    padding: 1,
                    display: 'flex',
                    gap: theme.spacing(2),
                    p: theme.spacing(3),
                    borderRadius: theme.spacing()
                }}>
                    <Button variant='contained' component={"label"} sx={{
                        color: 'black',
                        bgcolor: 'gray.secondary',
                        borderRadius: "100%",
                        width: 'auto',
                        height: '100%',
                        aspectRatio: '1/1',
                        '&:hover': {
                            bgcolor: 'gray.secondary'
                        }
                    }}>
                        <img src={upload} />
                        <input hidden accept='image/*' multiple type='file' />
                    </Button>

                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Typography color={'gray.dark'} variant={'caption'}>
                            اسحب الملفات إلى هنا
                        </Typography>
                        <Typography color={'gray.main'} variant={'caption'} fontWeight={300}>
                            أو انقر للاختيار يدويا
                        </Typography>
                    </Box>
                </Box>
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
            </Box>
            <Typography color={'purple.main'}>
                الفصول
            </Typography>
            <Divider />
            <Box gap={2} sx={{
                display: 'flex',
                bgcolor: 'purple.light',
                px: 14,
                py: 6,
                flexWrap: 'wrap',
                borderRadius: theme.spacing()
            }}>

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
            </Box>
        </Card>);
}
