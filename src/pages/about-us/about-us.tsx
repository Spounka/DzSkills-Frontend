import { Container, Stack, Typography, useTheme } from '@mui/material';
import { StyledCard } from '../../components/StyledCard';
import TopNavigationBar from '../../components/top-bar';
import { useIsBanned } from '../banned-page/BannedPage';
import Footer from '../../components/footer';

export function AboutUs() {
    const theme = useTheme();
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
    return (
        <Stack
            gap={2}
            minHeight={'100dvh'}
            bgcolor={theme.palette.gray.secondary}
            sx={{
            }}
        >
            <TopNavigationBar />
            <Container sx={{ height: '80dvh' }}>
                <StyledCard
                    sx={{
                        height: '100%',
                        gap: 3,
                    }}
                >
                    <Stack
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Typography variant="h3">About Us</Typography>
                    </Stack>
                </StyledCard>
            </Container>
            <Footer />
        </Stack>
    );
}
