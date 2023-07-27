import Stack from '@mui/material/Stack';
import Footer from '../../../components/footer';
import TopNavigationBar from '../../../components/top-bar';
import { FAQSection } from './FAQSection';
import { SupportSection } from './SupportSection';
import { useIsBanned } from '../../banned-page/BannedPage';

function FAQ() {
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
    return (
        <Stack
            bgcolor={'white'}
            minHeight={'100vh'}
        >
            <TopNavigationBar />
            <SupportSection />
            <FAQSection />
            <Footer />
        </Stack>
    );
}

export default FAQ;
