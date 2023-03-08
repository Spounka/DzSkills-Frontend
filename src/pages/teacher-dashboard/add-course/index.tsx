import { Avatar, Divider, OutlinedInput, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box, useTheme } from '@mui/system';
import purpleNotification from '../../../assets/svg/notification purple.svg';
import { MainButton } from '../../../components/ui/MainButton';
import DashboardSidebar from './components/side-navbar';

function TeacherAddCourse() {
    const theme = useTheme()
    return (
        <Box sx={{
            flexGrow: 1,
            display: 'grid',
            width: '100%',
            minHeight: '100vh',
            gridTemplateColumns: 'repeat(26, 1fr)',
            gap: theme.spacing(1),
            rowGap: theme.spacing(2),
            bgcolor: theme.palette.gray.secondary,
        }}>
            <Box
                display={'grid'}
                gridColumn={'span 5'}
                height={'100%'}
                width={'100%'}
            >
                <DashboardSidebar />
            </Box>
            <Box
                display={'grid'}
                gridTemplateColumns={'repeat(26 , 1fr)'}
                // gridTemplateRows={'repeat(6, 1fr)'}
                gridColumn={'7 / -1'}
                rowGap={3}
                padding={0}
                paddingTop={4}
                width={'100%'}
                height={'100%'}
            >
                <DashboardTopbar />
                <Box sx={{
                    gridColumn: '1 / -8',
                    gridRow: '3'
                }}>
                    <Card elevation={0} sx={{
                        px: theme.spacing(3),
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                        gap: theme.spacing(2),
                        boxShadow: '7px 20px 40px #00000014',
                        borderRadius: theme.spacing(),
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
                            rowGap: theme.spacing(2),
                            // height: '100%',
                        }}>
                            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                                gridColumn: '1',
                                gridRow: '1',
                            }}>
                                عنوان الكورس
                            </Typography>
                            <OutlinedInput
                                color={'secondary'}
                                sx={{
                                    gridColumn: '1',
                                    gridRow: '2',
                                }} />

                            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                                gridColumn: '2',
                                gridRow: '1',
                            }}>
                                هاشتاغ
                            </Typography>
                            <OutlinedInput color={'secondary'} size={'medium'} multiline rows={4} type={'text'} sx={{
                                gridColumn: '2',
                                gridRow: 'span 4',
                                height: '100%',
                            }} />

                            <Typography variant={'subtitle2'} color={'gray.main'} sx={{
                                gridColumn: '1',
                                gridRow: '3',
                            }}>
                                وصف
                            </Typography>
                            <OutlinedInput color={'secondary'} multiline rows={4} sx={{
                                gridColumn: '1',
                                gridRow: 'span 4',
                            }} />
                            <Typography
                                variant={'subtitle2'}
                                color={'gray.main'} sx={{
                                    gridColumn: '2',
                                }}>
                                سعر الكورس
                            </Typography>
                            <OutlinedInput color={'secondary'} sx={{
                                gridColumn: '2',
                                px: 3,
                            }}
                                endAdornment={<Typography variant={'body2'} color={'gray.dark'}>
                                    DA
                                </Typography>}
                            />
                            <Typography
                                variant={'subtitle2'}
                                color={'gray.main'} sx={{
                                    gridColumn: '1',
                                }}>
                                صورة مصغرة
                            </Typography>
                            <Typography
                                variant={'subtitle2'}
                                color={'gray.main'} sx={{
                                    gridColumn: '2',
                                }}>
                                ملف التقديم
                            </Typography>
                            <OutlinedInput
                                type='file'
                                color={'secondary'}
                                // multiline
                                // rows={3}
                                sx={{
                                    gridColumn: '2',
                                    gridRow: 'span 2',
                                    px: 3,
                                }}

                            />
                            <Typography
                                variant={'subtitle2'}
                                color={'gray.main'} sx={{
                                    gridColumn: '2',
                                }}>
                                ملف التقديم
                            </Typography>
                            <OutlinedInput
                                type='file'
                                // multiline
                                // rows={3}
                                color={'secondary'} sx={{
                                    gridColumn: '2',
                                    px: 3,
                                    gridRow: 'span 2',
                                }}

                            />
                            <OutlinedInput
                                type='file'
                                // multiline
                                // rows={10}
                                color={'secondary'} sx={{
                                    gridColumn: '1',
                                    px: 3,
                                    height: 'full',
                                    gridRow: '9 / 14',
                                }}

                            />
                        </Box>
                        <Typography color={'purple.main'}>
                            الفصول
                        </Typography>
                        <Divider />
                        <Box
                            gap={1}
                            sx={{
                                display: 'flex',
                                bgcolor: 'purple.light',
                                px: 14,
                                py: 6,
                                flexWrap: 'wrap',
                                borderRadius: theme.spacing(),
                            }}>

                            <Typography
                                variant={'subtitle2'}
                                color={'white'}
                                px={1}
                            >
                                عنوان الفصل
                            </Typography>
                            <OutlinedInput
                                type='text'
                                color={'secondary'}
                                sx={{
                                    flexGrow: '1',
                                    bgcolor: 'white',
                                    px: 3,
                                    width: '100%',
                                }}

                            />
                            <Box
                                gap={1.5}
                                sx={{
                                    flexGrow: '1',
                                    display: 'flex',
                                    width: '100%',
                                }}>
                                <Box flexGrow={'1'} width={'100%'} >
                                    <Typography
                                        variant={'subtitle2'}
                                        color={'white'}
                                        px={1}
                                    >
                                        وصف
                                    </Typography>
                                    <OutlinedInput
                                        type='text'
                                        multiline
                                        rows={5}
                                        color={'secondary'} sx={{
                                            bgcolor: 'white',
                                            flexGrow: '1',
                                            px: 3,
                                            height: 'full',
                                            width: '100%',
                                        }}

                                    />
                                </Box>
                                <Box flexGrow={'1'} width={'100%'} >
                                    <Typography
                                        variant={'subtitle2'}
                                        color={'white'}
                                        px={1}
                                    >
                                        صورة مصغرة
                                    </Typography>
                                    <OutlinedInput
                                        type='text'
                                        multiline
                                        rows={5}
                                        color={'secondary'} sx={{
                                            bgcolor: 'white',
                                            flexGrow: '1',
                                            px: 3,
                                            height: 'full',
                                            width: '100%',
                                        }}

                                    />
                                </Box>
                            </Box>
                            <Box flexGrow={'1'} display={'flex'} justifyContent={'flex-end'} sx={{
                                mt: 6,
                            }}>
                                <MainButton
                                    text='hello'
                                    {
                                    ...{
                                        flexGrow: '1',
                                        alignSelf: 'flex-end',
                                        placeSelf: 'flex-end'
                                    }
                                    }
                                />
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Box >
        </Box >
    )
}




function DashboardTopbar({ }) {
    const theme = useTheme();
    return (<Card elevation={0} sx={{
        px: theme.spacing(3),
        display: 'grid',
        gap: theme.spacing(),
        gridTemplateColumns: 'repeat(26, 1fr)',
        alignItems: 'center',
        boxShadow: '7px 20px 40px #00000014',
        borderRadius: theme.spacing(),
        gridColumn: '1 / -3',
        gridRow: 'span 2',
        py: '1rem',

    }}>
        <Box gridColumn={'span 6'}>
            <Typography variant={'h6'} fontWeight={600} color={'purple.main'}>
                اضف كورس جديد
            </Typography>
            <Typography variant={'caption'} fontWeight={300} color={'gray.main'}>
                كلها في مكـــــان واحد لك
            </Typography>
        </Box>
        <OutlinedInput placeholder={'ابحث عن الدورة المناسبة لك'}
            sx={{
                gridColumn: '11 / -5',
                borderRadius: theme.spacing(),
                pr: theme.spacing(2),
                pl: theme.spacing(),
                py: theme.spacing(.5),
                maxHeight: theme.spacing(6),
                color: 'gray.main',
                fontWeight: 400,
                // @ts-ignore
                fontSize: theme.typography.subtitle2
            }}
            endAdornment={
                <MainButton text={'بحث'} color={theme.palette.purple.main}
                    sx={{
                        height: theme.spacing(4),
                        width: 'auto'
                    }}
                />}
        />
        <img src={purpleNotification} alt="" style={{
            gridColumn: '-3',
        }}
        />
        <Avatar sx={{
            gridColumn: '-1',
        }} />

    </Card>
    );
}
export default TeacherAddCourse