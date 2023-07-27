import { Container, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import TopNavigationBar from '../../components/top-bar';
import { StyledCard } from '../../components/StyledCard';
import { useIsBanned } from '../banned-page/BannedPage';

function TeachersPage() {
    const theme = useTheme();
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
    return (
        <Stack
            height={'100dvh'}
            bgcolor={theme.palette.gray.secondary}
        >
            <TopNavigationBar />
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
