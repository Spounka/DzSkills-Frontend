import { Avatar, Rating } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../../components/footer';
import { User } from '../../types/user';
import { getAdminConfigs } from '../admin-panel/settings/landing-page/api/query';
import { getAllUsers } from '../admin-panel/user-management/api/getUsers';
import { GetYourCertificate } from './GetYourCertificate';
import { LandingPageFirstSection } from './LandingPageFirstSection';
import { LandingPageNavbar } from './LandingPageNavbar';
import { LandingPageSections } from './LandingPageSections';
import { MostSoldCourses } from './MostSoldCourses';
import { Teachers } from './Teachers';

interface LandingPageProps {}

export default function LandingPage({}: LandingPageProps) {
    const adminConfigQuery = useQuery({
        queryKey: ['admin', 'configs'],
        queryFn: () => getAdminConfigs(),
    });

    if (adminConfigQuery.isError) return <>Error retrieving data...</>;
    if (adminConfigQuery.isLoading) return <>Loading...</>;
    return (
        <div
            style={{
                backgroundColor: '#F5F5F5',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <LandingPageNavbar />
            <LandingPageFirstSection
                mainColor={adminConfigQuery.data?.main_title_text.color}
                mainText={adminConfigQuery.data?.main_title_text.content}
                secondaryColor={adminConfigQuery.data?.secondary_title_text.color}
                secondaryText={adminConfigQuery.data?.secondary_title_text.content}
            />
            <LandingPageSections />
            <MostSoldCourses />
            <GetYourCertificate />
            <Teachers />
            <Ratings />
            <Footer />
        </div>
    );
}

function Ratings() {
    const theme = useTheme();
    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    });

    if (query.isLoading) return <>Loading users...</>;
    if (query.isError) return <>Error in users...</>;

    return (
        <>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                mt={theme.spacing(25)}
                pb={theme.spacing(12)}
                gap={16}
                px={16}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    gap={2}
                >
                    <Typography
                        variant={'h4'}
                        fontWeight={600}
                    >
                        تقييمات
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        color={'gray.main'}
                    >
                        آراء الطلبة و المشتركين في موقعنا هو افضل ما نقدمه لإثبات نجاحنا
                        في تقديم الغاية من الموقع
                    </Typography>
                </Box>
                <Box
                    display="grid"
                    gridTemplateColumns={'repeat(3, minmax(0, 1fr))'}
                    gap={8}
                    width={'100%'}
                >
                    {query.data?.slice(6, 9).map((user: User) => {
                        return (
                            <Box
                                key={uuidv4()}
                                sx={{
                                    bgcolor: 'white',
                                    p: 4,
                                    // pl: 0,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: 4,
                                    }}
                                >
                                    <Rating
                                        readOnly={true}
                                        value={5}
                                    />
                                    <Avatar
                                        src={user.profile_image}
                                        sx={{
                                            width: '15vmin',
                                            height: 'auto',
                                            maxWidth: '15vmin',
                                            maxHeight: '15vmin',
                                            aspectRatio: '1',
                                            pt: '-25%',
                                            mt: '-25%',
                                            ml: -4,
                                        }}
                                    />
                                </Box>
                                <Typography>
                                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
                                    لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك
                                    أن تولد مثل هذا النص أو العديد من النصوص
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        p: 2,
                                    }}
                                >
                                    <Typography
                                        fontWeight={600}
                                        variant="h6"
                                    >
                                        {`${user.first_name} ${user.last_name}`}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </>
    );
}
