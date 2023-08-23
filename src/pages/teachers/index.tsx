import { Container, Stack, Typography, useTheme } from '@mui/material';
import { StyledCard } from '../../components/StyledCard';

function TeachersPage() {
    const theme = useTheme();
    return (
        <Stack
            height={'100dvh'}
            bgcolor={theme.palette.gray.secondary}
        >
            <Container sx={{ height: '100%', py: 2 }}>
                <StyledCard
                    sx={{
                        height: '100%',
                    }}
                >
                    <Stack
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Typography variant="h3">المدربون</Typography>
                    </Stack>
                </StyledCard>
            </Container>
        </Stack>
    );
}

export default TeachersPage;
