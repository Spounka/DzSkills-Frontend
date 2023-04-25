import { Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { SxProps, useTheme } from '@mui/material/styles';

interface InformationCardProps {
    title: string;
    subtitle: string;
    icon: string;
    sx?: SxProps;
}
export function InformationCard({ title, subtitle, icon, sx }: InformationCardProps) {
    const theme = useTheme();
    return (
        <Card
            elevation={0}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 4,
                px: 4,
                color: theme.palette.secondary.main,
                gap: 2,
                borderRadius: theme.spacing(),
                ...sx
            }}
        >
            <Box display={'flex'}
                flexDirection={'column'}
                gap={1}
            >
                <Typography variant={'subtitle2'}>
                    {title}
                </Typography>
                <Typography>
                    {subtitle}
                </Typography>
            </Box>
            <img
                src={icon} />
        </Card>
    );
}
