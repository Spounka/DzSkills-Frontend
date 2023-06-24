import { Divider, Stack, Typography } from '@mui/material';
import { StyledCard } from '../../../components/StyledCard';

export function MostSold({}) {
    return (
        <StyledCard
            sx={{
                flexBasis: '60%',
                // height: '100%',
                flexGrow: '1',
            }}
        >
            <Typography
                variant={'h6'}
                color={'purple.main'}
            >
                الأكثر مبيعا
            </Typography>
            <Divider />
            <Stack>
                <Typography>No Data</Typography>
            </Stack>
        </StyledCard>
    );
}
