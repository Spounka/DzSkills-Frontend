import { useTheme } from "@mui/material/styles";
import { LandingPageFirstSection } from "./LandingPageFirstSection";
import { LandingPageNavbar } from "./LandingPageNavbar";
import { LandingPageSections } from "./LandingPageSections";


interface LandingPageProps {

}

export default function LandingPage({ }: LandingPageProps) {
    const theme = useTheme()
    return <div style={{
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',

    }}>
        <LandingPageNavbar />
        <LandingPageFirstSection />
        <LandingPageSections />
    </div>
}
