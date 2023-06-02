import { Divider, Stack, Typography, useTheme } from '@mui/material';

export function SettingsSectionHeader({ title }: { title: string }) {
    const theme = useTheme();
    return (
        <Stack gap={2}>
            <Typography
                color={theme.palette.secondary.main}
                variant={'h6'}
            >
                {title}
            </Typography>
            <Divider />
        </Stack>
    );
}
