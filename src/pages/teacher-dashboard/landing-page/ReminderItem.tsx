import { Box, Stack, Typography, useTheme } from '@mui/material';

interface itemProps {
    title: string;
    Icon: React.ReactNode;
    color: string;
    subtitle?: string;
    onClick?: () => void;
}

export function ReminderItem({ title, subtitle, Icon, color, onClick }: itemProps) {
    const theme = useTheme();
    return (
        <Stack
            direction={'row'}
            gap={3}
            alignItems={'center'}
            onClick={() => onClick && onClick()}
            sx={{
                ':hover': {
                    cursor: onClick ? 'pointer' : 'default',
                },
            }}
        >
            <Box maxWidth={theme.spacing(6)}>{Icon}</Box>
            <Stack
                gap={1}
                justifyContent={'center'}
            >
                <Typography
                    variant={'body1'}
                    fontWeight={500}
                    color={color}
                >
                    {title}
                </Typography>
                <Typography
                    variant={'subtitle2'}
                    color={'gray.light'}
                    fontWeight={300}
                >
                    {subtitle}
                </Typography>
            </Stack>
        </Stack>
    );
}
