import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export function CopyrightFooterSection({}) {
    return (
        <>
            {' '}
            <Typography>
                © Copyright {new Date().getFullYear()} <strong>brand.io</strong> All
                rights reserved.
            </Typography>
            <Box
                display={'flex'}
                gap={1}
            >
                <Typography variant="body2">
                    <Link to={'/support/'}>Contact us</Link>
                </Typography>
                <Typography variant="body2">
                    <Link to={'/privacy/'}>Terms</Link>
                </Typography>
            </Box>
        </>
    );
}
