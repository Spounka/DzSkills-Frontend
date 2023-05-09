import { LandingPageFirstSection } from "./LandingPageFirstSection";
import { LandingPageNavbar } from "./LandingPageNavbar";
import { LandingPageSections } from "./LandingPageSections";


interface LandingPageProps {

}

export default function LandingPage({ }: LandingPageProps) {
    return <div style={{
        backgroundColor: '#F5F5F5'
    }}>
        <LandingPageNavbar />
        <LandingPageFirstSection />
        <LandingPageSections />
    </div>
}
