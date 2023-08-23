import { Container, Stack, Typography, useTheme } from '@mui/material';
import { StyledCard } from '../../components/StyledCard';

export function AboutUs() {
    const theme = useTheme();
    return (
        <Stack
            gap={2}
            minHeight={'100dvh'}
            bgcolor={theme.palette.gray.secondary}
            sx={{ py: 4, }}
        >
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
        </Stack>
    );
}
