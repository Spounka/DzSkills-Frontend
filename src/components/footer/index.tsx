import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'mui-image';
// import logo from '../../assets/png/logo@2x.png';
import logo from '../../assets/svg/DzSkills-white.svg';
import { CategoriesFooterSection } from './CategoriesFooterSection';
import { ContactUsFooterSection } from './ContactUsFooterSection';
import { CopyrightFooterSection } from './CopyrightFooterSection';
import { MiscLinksFooterSection } from './MiscLinksFooterSection';
import { WhoAreWeFooterSection } from './WhoAreWeFooterSection';

function FooterSection() {
    return <></>;
}

function Footer() {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            gap={2}
            px={14}
            py={12}
            color={'white'}
            bgcolor={'#11111C'}
        >
            <Box
                flexGrow={1}
                display={'flex'}
                alignItems={'space-evenly'}
                width={'100%'}
                gap={'10%'}
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
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد
                        تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن
                        تولد مثل هذا النص
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
                    alignItems={'flex-end'}
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
