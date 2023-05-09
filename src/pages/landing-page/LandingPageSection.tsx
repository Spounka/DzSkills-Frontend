import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Image from "mui-image";
import { MainButton } from "../../components/ui/MainButton";

interface LandingPageSectionProps {
    image: string;
    title: string;
    description: string;
}
export function LandingPageSection({ image, title, description }: LandingPageSectionProps) {
    const theme = useTheme();
    return (
        <>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={6}
                alignItems={'center'}
                mb={4}
            >
                <Image
                    fit="contain" src={image}
                    width={'100'}
                    style={{
                        aspectRatio: '1/1',
                        height: 'auto'
                    }} />
                <Box display={'flex'} flexDirection={'column'} gap={4} alignItems={'center'} justifyContent={'end'}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" color="gray.main" textAlign={'center'}>
                        {description}
                    </Typography>

                </Box>
                <MainButton
                    color={theme.palette.primary.main}
                    text={'المزيد'} />

            </Box>
        </>
    );
}
