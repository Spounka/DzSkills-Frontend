import { Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { SxProps, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface InformationCardProps {
    title: string;
    subtitle: string;
    icon: string;
    link?: string;
    sx?: SxProps;
}
export function InformationCard({
    title,
    subtitle,
    icon,
    link,
    sx,
}: InformationCardProps) {
    const theme = useTheme();
    return (
        <Link
            to={link || '.'}
            style={{
                width: '100%',
                // cursor: link ? 'pointer' : 'default',
                pointerEvents: link ? 'auto' : 'none',
            }}
        >
            <Card
                elevation={0}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '100%',
                    alignItems: 'center',
                    p: 3,
                    color: theme.palette.secondary.main,
                    gap: 2,
                    borderRadius: theme.spacing(),
                    ...sx,
                }}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={1}
                >
                    <Typography variant={'subtitle2'}>{title}</Typography>
                    <Typography>{subtitle}</Typography>
                </Box>
                <img src={icon} />
            </Card>
        </Link>
    );
}
