import Stack from '@mui/material/Stack';
import { FAQSection } from './FAQSection';
import { SupportSection } from './SupportSection';

function FAQ() {
    return (
        <Stack
            bgcolor={'white'}
            minHeight={'100vh'}
        >
            <SupportSection />
            <FAQSection />
        </Stack>
    );
}

export default FAQ;
