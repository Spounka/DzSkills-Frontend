import { Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Image from 'mui-image'
import logo from '../../assets/png/logo@2x.png'

function Footer() {
    const theme = useTheme()
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            gap={2}
            px={14}
            py={12}
            color={'white'}
            bgcolor={"#11111C"}
        >
            <Box
                flexGrow={1}
                display={'flex'}
                alignItems={'flex-start'}
                width={'100%'}
                gap={12}
                pb={12}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                    flexBasis={'25%'}
                    gap={4}
                    flexGrow={1}
                >
                    <Image src={logo} style={{ maxWidth: '150px', height: 'auto', marginLeft: 'auto' }} />
                    <Typography color={'white'} variant={'caption'}>
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={4} flexGrow={1}>
                    <Typography variant='h5' fontWeight={500}>
                        من نحن
                    </Typography>
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                        <Typography variant='caption'>
                            سياسة الخصوصية
                        </Typography>
                        <Typography variant='caption'>
                            الأسئلة الشائعة
                        </Typography>
                        <Typography variant='caption'>
                            شروط الإستخدام
                        </Typography>
                    </Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={4} flexGrow={1}>
                    <Typography variant='h5' fontWeight={500}>
                        الأقسام
                    </Typography>
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                        <Typography variant='caption'>
                            Graphic Design
                        </Typography>
                        <Typography variant='caption'>
                            Motion Graphic
                        </Typography>
                        <Typography variant='caption'>
                            3D Modeling
                        </Typography>
                        <Typography variant='caption'>
                            Freelance
                        </Typography>
                    </Box>
                </Box>

                <Box display={'flex'} flexDirection={'column'} gap={4} flexGrow={1}>
                    <Typography variant='h5' fontWeight={500}>
                        روابط
                    </Typography>
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                        <Typography variant='caption'>
                            مدونة الموقع
                        </Typography>
                        <Typography variant='caption'>
                            انضم الى المدربين
                        </Typography>
                        <Typography variant='caption'>
                            مركز المساعدة
                        </Typography>
                    </Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={4} flexGrow={1} alignItems={'flex-end'}>
                    <Typography variant='h5' fontWeight={500}>
                        تواصل معنا
                    </Typography>
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                        <Typography variant='caption' sx={{ direction: "ltr", textAlign: 'right' }}>
                            +213 555555555
                        </Typography>
                        <Typography variant='caption'>
                            slaxsifou@gmail.com
                        </Typography>
                        <Typography variant='caption'>
                            شروط الإستخدام
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Divider light={true} sx={{ borderColor: 'white' }} />
            <Box display={'flex'} justifyContent={'space-between'} sx={{ direction: 'ltr' }}>
                <Typography>
                    © Copyright {new Date().getFullYear()} <strong>brand.io</strong> All rights reserved.
                </Typography>

                <Box display={'flex'} gap={1}>
                    <Typography variant='body2'>
                        Contact us
                    </Typography>
                    <Typography variant='body2'>
                        Terms
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer