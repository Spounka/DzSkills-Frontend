import { Stack, useTheme } from '@mui/material';
import Footer from '../../../components/footer';
import TopNavigationBar from '../../../components/top-bar';
import useLogin from '../../authenticate/hooks/useLogin';
import { ContactSupportPanels } from './ContactSupportPanels';

export function SubmitReport() {
    const [user] = useLogin();
    const theme = useTheme();

    return (
        <Stack
            bgcolor={theme.palette.gray.secondary}
            minHeight={'100vh'}
            gap={{
                xs: theme.spacing(),
                lg: theme.spacing(12),
            }}
        >
            <TopNavigationBar />
            <ContactSupportPanels />
            <Footer />
        </Stack>
    );
}

export default SubmitReport;
