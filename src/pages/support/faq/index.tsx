import Stack from '@mui/material/Stack';
import Footer from '../../../components/footer';
import TopNavigationBar from '../../../components/top-bar';
import { FAQSection } from './FAQSection';
import { SupportSection } from './SupportSection';

function FAQ() {
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
