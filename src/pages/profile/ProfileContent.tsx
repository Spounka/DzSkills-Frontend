import { Avatar, Rating, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import facebook from '../../assets/svg/Facebook_Square.svg';
import instagram from '../../assets/svg/Instagram_Square.svg';
import linkedin from '../../assets/svg/LinkedIn_Square.svg';
import gps from '../../assets/svg/place gray.svg';
import twitter from '../../assets/svg/Twitter_Square.svg';
import { RootState } from '../../stores/store';
import { CoursePreview } from './CoursePreview';

export function ProfileContent() {
    const theme = useTheme();
    const user = useSelector((state: RootState) => state.user);
    return (
        <Card
            elevation={0}
            sx={{
                gridColumnStart: 4,
                gridColumnEnd: 11,
                maxWidth: '100%',
                minHeight: '70vh',
                py: theme.spacing(8),
                px: theme.spacing(12),
                borderRadius: theme.spacing(2),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(4),
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: theme.spacing(8),
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1',
                        justifyContent: 'center',
                        gap: theme.spacing(1),
                        height: '100%',
                    }}
                >
                    <Typography variant={'h5'}>
                        {`${user.user.first_name} ${user.user.last_name}`}
                    </Typography>
                    <Typography
                        variant={'subtitle2'}
                        color={'gray.light'}
                    >
                        {`${user.user.speciality || 'speciality'}`}
                    </Typography>
                    <Typography
                        variant={'body2'}
                        color={'gray.light'}
                        sx={{
                            display: 'flex',
                            gap: theme.spacing(),
                        }}
                    >
                        <img
                            src={gps}
                            alt=""
                        />
                        {`${user.user.nationality || ' الجنسية'}`}
                    </Typography>

                    <Box
                        display={'flex'}
                        mt={2}
                    >
                        <Box
                            flexGrow={'1'}
                            display={'flex'}
                            flexDirection={'column'}
                        >
                            <Typography
                                variant={'subtitle2'}
                                color={'gray.dark'}
                            >
                                اجمالي الطلبة
                            </Typography>
                            <Typography
                                variant={'subtitle2'}
                                color={'secondary.dark'}
                            >
                                166
                            </Typography>
                        </Box>

                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'flex-end'}
                            gap={0.5}
                        >
                            <Typography
                                px={0.5}
                                component="legend"
                                variant={'body2'}
                            >
                                3
                            </Typography>
                            <Rating
                                size={'small'}
                                name="read-only"
                                value={3}
                                dir={'ltr'}
                                readOnly
                                sx={{
                                    padding: 0,
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: 'auto',
                        gap: theme.spacing(6),
                    }}
                    flexGrow={'1'}
                >
                    <Avatar
                        src={user.user.profile_image}
                        sx={{
                            width: theme.spacing(26),
                            height: theme.spacing(26),
                        }}
                    />

                    <Box
                        display={'flex'}
                        gap={2}
                    >
                        <img
                            style={{
                                width: theme.spacing(4),
                                height: theme.spacing(4),
                            }}
                            src={instagram}
                            alt=""
                        />
                        <img
                            style={{
                                width: theme.spacing(4),
                                height: theme.spacing(4),
                            }}
                            src={linkedin}
                            alt=""
                        />
                        <img
                            style={{
                                width: theme.spacing(4),
                                height: theme.spacing(4),
                            }}
                            src={facebook}
                            alt=""
                        />
                        <img
                            style={{
                                width: theme.spacing(4),
                                height: theme.spacing(4),
                            }}
                            src={twitter}
                            alt=""
                        />
                    </Box>
                </Box>
            </Box>

            <Typography
                variant="body1"
                fontWeight={600}
                color={'secondary.dark'}
            >
                معلومات شخصية
            </Typography>
            <Typography
                variant="caption"
                fontWeight={400}
                color={'gray.dark'}
            >
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
                النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى
                يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك
                مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما
                ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على
                وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على
                صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا
                مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص
                العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له
                بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق. هذا النص
                يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص
                منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً
                بديلاً ومؤقتاً.
            </Typography>

            <Typography
                variant="body1"
                fontWeight={600}
                color={'secondary.dark'}
            >
                كورساتي
            </Typography>

            <Box
                display={'flex'}
                gap={2}
                flexWrap={'wrap'}
                sx={{
                    flex: '1',
                    width: '100%',
                }}
            >
                <CoursePreview />
                <CoursePreview />
                <CoursePreview />
                <CoursePreview />
                <CoursePreview />
                <CoursePreview />
            </Box>
        </Card>
    );
}
