import { useQuery } from 'react-query';
import Footer from '../../components/footer';
import { getAdminConfigs } from '../admin-panel/settings/landing-page/api/query';
import { GetYourCertificate } from './GetYourCertificate';
import { LandingPageFirstSection } from './LandingPageFirstSection';
import { LandingPageNavbar } from './LandingPageNavbar';
import { LandingPageSections } from './LandingPageSections';
import { MostSoldCourses } from './MostSoldCourses';
import { StudentRatings } from './Ratings';
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
            <StudentRatings />
            <Footer />
        </div>
    );
}
