import { Divider, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import logo from '../../assets/svg/DzSkills-white.svg';
import { CategoriesFooterSection } from './CategoriesFooterSection';
import { ContactUsFooterSection } from './ContactUsFooterSection';
import { CopyrightFooterSection } from './CopyrightFooterSection';
import { MiscLinksFooterSection } from './MiscLinksFooterSection';
import { WhoAreWeFooterSection } from './WhoAreWeFooterSection';

function Footer() {
    const theme = useTheme();
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            gap={2}
            px={{ xs: 8, lg: 14 }}
            py={12}
            color={'white'}
            borderRadius={{ xs: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`, lg: 0 }}
            bgcolor={'#11111C'}
            sx={{
                placeSelf: 'flex-end',
            }}
        >
            <Box
                flexGrow={1}
                display={'flex'}
                flexDirection={{ xs: 'column', lg: 'row' }}
                alignItems={'space-evenly'}
                width={'100%'}
                gap={{ xs: theme.spacing(4), lg: '10%' }}
                pb={12}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignContent={'start'}
                    alignSelf={'start'}
                    flexBasis={'25%'}
                    gap={4}
                    flexGrow={1}
                >
                    <img
                        src={logo}
                        style={{
                            paddingTop: '1vmin',
                            maxWidth: '150px',
                            height: 'auto',
                            marginLeft: 'auto',
                        }}
                    />
                    <Typography
                        color={'white'}
                        variant={'caption'}
                    >
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
                        هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص
                    </Typography>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={4}
                    flexGrow={1}
                >
                    <WhoAreWeFooterSection />
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={4}
                    flexGrow={1}
                >
                    <CategoriesFooterSection />
                </Box>

                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={4}
                    flexGrow={1}
                >
                    <MiscLinksFooterSection />
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={4}
                    flexGrow={1}
                    alignItems={{ xs: 'flex-start', lg: 'flex-end' }}
                >
                    <ContactUsFooterSection />
                </Box>
            </Box>
            <Divider
                light={true}
                sx={{ borderColor: 'white' }}
            />
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                sx={{ direction: 'ltr' }}
            >
                <CopyrightFooterSection />
            </Box>
        </Box>
    );
}

export default Footer;
