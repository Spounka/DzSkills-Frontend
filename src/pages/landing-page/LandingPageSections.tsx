import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import webDev from '../../assets/png/wd.png';
import { LandingPageSection } from "./LandingPageSection";

interface LandingPageSectionsProps {
}

export function LandingPageSections({ }: LandingPageSectionsProps) {
    const theme = useTheme();
    return (
        <>
            <Box
                display={'flex'}
                flexDirection={"column"}
                alignItems={'center'}
                mt={theme.spacing(25)}
                gap={8}
                px={16}
            >
                <Box
                    display={'flex'}
                    flexDirection={"column"}
                    alignItems={'center'}
                    gap={2}
                >

                    <Typography
                        variant={'h4'}
                        fontWeight={600}
                    >
                        الأقسام
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        color={'gray.main'}
                    >
                        يختلف تقسيم الموقع الى أقسام بحسب نوع المحتوى المتاح
                    </Typography>

                </Box>
                <Box
                    display="grid"
                    gridTemplateColumns={'repeat(4, minmax(0, 1fr))'}
                    gap={8}
                >
                    <LandingPageSection
                        image={webDev}
                        title={"تصميم الغرافيك"}
                        description={"تصميم وإنتاج الرسومات والصور والنصوص والرموز التي تستخدم في الإعلانات والتسويق والاتصال البصري"}
                    />
                    <LandingPageSection
                        image={webDev}
                        title={"اخراج و تصميم الفيديو"}
                        description={"إنتاج الرسوم المتحركة والأفلام القصيرة والفيديوهات التي تستخدم في الإعلانات والتسويق والترفيه"}
                    />
                    <LandingPageSection
                        image={webDev}
                        title={"تصميم ثلاثي الأبعاد"}
                        description={"إنشاء صور ونماذج واقعية للأشياء والمنتجات، ويستخدم في صناعات مختلفة مثل التصميم الصناعي والألعاب والأفلام والعمارة والهندسة"}
                    />
                    <LandingPageSection
                        image={webDev}
                        title={"العمل الحر"}
                        description={"نوع من العمل الذي يتم تنفيذه عن بعد وبشكل مستقل، حيث يعمل الفرد بمفرده بدون أن يكون مرتبطًا بشركة أو مؤسسة محددة"}
                    />
                </Box>
            </Box>
        </>
    );

}
