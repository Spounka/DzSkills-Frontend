import { Container, Stack, Typography, useTheme } from '@mui/material';
import { StyledCard } from '../../components/StyledCard';
import TopNavigationBar from '../../components/top-bar';

export function AboutUs() {
    const theme = useTheme();
    return (
        <Stack
            gap={2}
            height={'100dvh'}
            bgcolor={theme.palette.gray.secondary}
        >
            <TopNavigationBar />
            <Container sx={{ height: '100%' }}>
                <StyledCard
                    sx={{
                        height: '100%',
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
        </Stack>
    );
}
