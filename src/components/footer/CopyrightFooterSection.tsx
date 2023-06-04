import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export function CopyrightFooterSection({}) {
    return (
        <>
            {' '}
            <Typography>
                © Copyright {new Date().getFullYear()}{' '}
                <strong>brand.io</strong> All rights reserved.
            </Typography>
            <Box
                display={'flex'}
                gap={1}
            >
                <Typography variant="body2">Contact us</Typography>
                <Typography variant="body2">Terms</Typography>
            </Box>
        </>
    );
}
