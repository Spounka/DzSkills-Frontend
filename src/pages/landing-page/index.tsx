import { useQuery } from 'react-query';
import { getAdminConfigs } from '../admin-panel/settings/landing-page/api/query';
import { GetYourCertificate } from './GetYourCertificate';
import { LandingPageFirstSection } from './LandingPageFirstSection';
import { LandingPageSections } from './LandingPageSections';
import { MostSoldCourses } from './MostSoldCourses';
import { StudentRatings } from './Ratings';
import { Teachers } from './Teachers';

export default function LandingPage() {
    const adminConfigQuery = useQuery({
        queryKey: ['admin', 'configs'],
        queryFn: () => getAdminConfigs(),
    });

    return (
        <>
            <LandingPageFirstSection />
            <LandingPageSections />
            <MostSoldCourses />
            <GetYourCertificate
                certificate={adminConfigQuery.data?.certificate_template?.template}
            />
            <Teachers />
            <StudentRatings />
        </>
    );
}
