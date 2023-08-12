import {
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';
import { useIsBanned } from '../banned-page/BannedPage';
import TopNavigationBar from '../../components/top-bar';
import { Circle } from '@mui/icons-material';
import { StyledCard } from '../../components/StyledCard';

function PrivacyPolicy() {
    const theme = useTheme();
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
    return (
        <Stack
            gap={2}
            minHeight={'100dvh'}
            bgcolor={theme.palette.gray.secondary}
            sx={{
                pb: 2,
            }}
        >
            <TopNavigationBar />
            <Container sx={{ height: '100%' }}>
                <StyledCard
                    sx={{
                        height: '100%',
                        gap: 4,
                    }}
                >
                    <Stack
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Typography
                            variant="h3"
                            sx={{ direction: 'ltr' }}
                        >
                            Privacy Policy - سياسة الخصوصية
                        </Typography>
                    </Stack>
                    <Typography variant={'body1'}>
                        تلتزم إدارة موقع DZskills في حدود المسموح لها وفق القانون المنظم،
                        بعدم كشف أي معلومات شخصية عن المستخدم مثل العناوين وأرقام الهواتف
                        وعناوين البريد الإلكتروني . بالإضافة إلى ذلك، لن يتم تبادل، أو
                        تداول أي من تلك المعلومات أو بيعها لأي طرف آخر طالما كان ذلك في
                        حدود قدرات إدارة الموقع الممكنة، ولن يُسمح بالوصول إلى المعلومات
                        إلا للأشخاص المؤهلين والمحترفين الذين يشرفون على موقع DZskills
                        الإلكتروني.
                    </Typography>
                    <Typography variant={'h6'}>انتفاء المسؤولية القانونية</Typography>
                    <Typography>
                        يقر المستخدم بأنه المسؤول الوحيد عن طبيعة الاستخدام الذي يحدده
                        للموقع الإلكتروني DZskills ، وتخلي إدارة موقع DZskills طرفها إلى
                        أقصى مدى يجيزه القانون، من كامل المسؤولية عن أية خسائر أو أضرار
                        أو نفقات أو مصاريف يتكبدها المستخدم أو يتعرض لها هو أو أي طرف آخر
                        من جراء استخدام الموقع الإلكتروني DZskills ، أو العجز عن
                        استخدامه.
                    </Typography>
                    <Typography variant={'h6'}>
                        حالات انقطاع الخدمة والسهو والخطأ
                    </Typography>
                    <Typography>
                        تبذل إدارة الموقع قصارى جهدها للحرص والحفاظ على استمرار عمل
                        الموقع الإلكتروني بدون مشاكل، رغم ذلك قد تقع في أي وقت أخطاء
                        وحالات سهو وانقطاع للخدمة وتأخير لها، وفي مثل هذه الحالات سنتوقع
                        من المستخدمين الصبر حتى تعود الخدمة إلى الحالة الطبيعية.
                    </Typography>
                    <Typography variant={'h6'}>
                        حساب المشترك وكلمة السر وأمن المعلومات
                    </Typography>
                    <List sx={{ direction: 'rtl', textAlign: 'right' }}>
                        <ListItem sx={{ direction: 'rtl', textAlign: 'right' }}>
                            <ListItemIcon>
                                <Circle style={{ fill: 'black', height: '12px' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ direction: 'rtl' }}>
                                يختار المشترك كلمة سر / مرور لحسابه، وبريداً الكترونياً
                                خاصاً به لمراسلته عليه، وتكون مسؤولية حماية البريد وكلمة
                                السر وعدم مشاركتها أو نشرها على المشترك، في حال حدوث أي
                                معاملات باستخدام حسابه هذا سيتحمل المشترك كافة المسؤوليات
                                المترتبة على ذلك، دون أدنى مسؤولية على موقع DZskills
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{ direction: 'rtl', textAlign: 'right' }}>
                            <ListItemIcon>
                                <Circle style={{ fill: 'black', height: '12px' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ direction: 'rtl' }}>
                                يتحمل المشترك كامل المسؤولية عن جميع المحتويات الخاصة به،
                                التي يرفعها وينشرها عبر موقع DZskills
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{ direction: 'rtl', textAlign: 'right' }}>
                            <ListItemIcon>
                                <Circle style={{ fill: 'black', height: '12px' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ direction: 'rtl' }}>
                                يلتزم المشترك بشروط الاستخدام، وبعدم نشر أي محتوى مخالف
                                للشريعة الإسلامية أو استخدام الموقع لأغراض غير قانونية،
                                على سبيل المثال لا الحصر، مثل: القرصنة ونشر وتوزيع مواد
                                أو برامج منسوخة، أو الخداع والتزوير أو الاحتيال أو
                                التهديد أو إزعاج أي شخص أو شركة أو جماعة أو نشر مواد
                                إباحية أو جنسية أو نشر فيروسات أو ملفات تجسس أو وضع روابط
                                إلى مواقع تحتوي على مثل هذه المخالفات
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{ direction: 'rtl', textAlign: 'right' }}>
                            <ListItemIcon>
                                <Circle style={{ fill: 'black', height: '12px' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ direction: 'rtl' }}>
                                يمنع انتهاك حقوق الملكية الفكرية أو تشويه سمعة شخص أو
                                مؤسسة أو شركة أو تعمد نشر أي معلومات تسبب ضرراً لشركة أو
                                شخص أو دولة أو جماعة، ويكون المشترك مسؤولاً مسؤولية كاملة
                                عن كل ما يقدمه عبر حسابه في الموقع
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{ direction: 'rtl', textAlign: 'right' }}>
                            <ListItemIcon>
                                <Circle style={{ fill: 'black', height: '12px' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ direction: 'rtl' }}>
                                يمنع منعاً باتاً استخدام خدمات الموقع لأغراض سياسية،
                                ويمنع التعرض لأي دولة عربية أو إسلامية بأي شكل من الأشكال
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{ direction: 'rtl', textAlign: 'right' }}>
                            <ListItemIcon>
                                <Circle style={{ fill: 'black', height: '12px' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ direction: 'rtl' }}>
                                منع منعا باتا تسجيل او نشر و توزيع الموارد الخاصة بموقع
                                DZskills و من كل مخالف لهذا سوف يتعرض الى المساءلة
                                القانونية
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Typography variant={'h6'}>التسجيل</Typography>
                    <Typography>
                        بعض أجزاء الموقع لا تفتح إلا للأعضاء المشتركين المسجلين بعد تقديم
                        بعض المعلومات الشخصية عنهم. يوافق المشترك عند تسجيله في الموقع
                        بأن المعلومات المدخلة من طرفه هي كاملة ودقيقة، ويلتزم بأنه لن
                        يقوم بالتسجيل في الموقع أو يحاول دخوله منتحلاً اسم مشترك آخر ولن
                        يستخدم اسماً قد ترى الإدارة أنه غير مناسب، مثل أرقام الهواتف،
                        والأسماء المنتحلة لشخصيات شهيرة، وروابط المواقع، والأسماء غير
                        المفهومة، وما في حكمها. كذلك يلتزم بعدم تسجيل أكثر من حساب واحد
                        في موقع DZskills وعند استخدام نفس الشخص لأكثر من حساب فإنه يعرض
                        كافة حساباته للإيقاف بشكل نهائي دون العودة إليه.
                    </Typography>{' '}
                    <Typography variant={'h6'}>الرقابة على المحتوى</Typography>
                    <Typography>
                        تحتفظ إدارة موقع DZskills الإلكتروني بالحق في مراقبة أي محتوى
                        يدخله المشترك دون أن يكون ذلك لزاماً عليها، ذلك أنها لا تستطيع
                        مراقبة كل مدخلات المشتركين، لذا تحتفظ بالحق (من دون التزام) في
                        حذف أو إزالة أو تحرير أي مواد مدخلة من شأنها انتهاك شروط وأحكام
                        الموقع دون الرجوع للمستخدم. إن قوانين حقوق النشر والتأليف المحلية
                        و العالمية والأجنبية والمعاهدات الدولية تحمي جميع محتويات هذا
                        الموقع، ومن خلال الاشتراك فيه فإن المشترك يوافق ضمنياً وبشكل صريح
                        على الالتزام بإشعارات حقوق النشر التي تظهر على صفحاته.
                    </Typography>
                    <Typography>
                        هذه السياسة محل تغيير دائم وتطوير، نرجو مراجعتها بشكل دوري
                        والتواصل معنا عبر مركز المساعدة للاستفسار عن أي من بنودها.
                    </Typography>
                </StyledCard>
            </Container>
        </Stack>
    );
}

export { PrivacyPolicy };
