import { Card, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import theme from '../../../theme';

interface SupportCardProps {
    href: string;
    title: string;
    subtitle: string;
    Icon?: any;
    hoverColor?: string;
}
export function SupportCard({
    Icon,
    hoverColor,
    title,
    subtitle,
    href,
}: SupportCardProps) {
    return (
        <Card
            elevation={0}
            component={'a'}
            sx={{
                width: '100%',
                borderRadius: theme.spacing(),
                color: theme.palette.gray.dark,
                transition: 'fill 100ms ease-in-out, transform 200ms ease-in-out',
                boxShadow: 'none',
                ':hover': {
                    cursor: 'pointer',
                    color: hoverColor || theme.palette.secondary.main,
                    fill: hoverColor || theme.palette.secondary.main,
                    transform: 'translateY(-5%)',
                    boxShadow: '20px 7px 40x #00000014',
                    transition: 'fill 100ms ease-in-out, transform 200ms ease-in-out',
                },
            }}
            href={href}
        >
            <Stack
                alignItems={'center'}
                width={'100%'}
                px={theme.spacing(4)}
                py={theme.spacing(8)}
                gap={2}
            >
                <Icon
                    height={theme.spacing(6)}
                    width={theme.spacing(6)}
                    fill={'inherit'}
                    color={'inherit'}
                />
                <Typography
                    variant={'h6'}
                    color={'inherit'}
                >
                    {title}
                </Typography>
                <Typography
                    variant={'subtitle2'}
                    color={'gray.main'}
                >
                    {subtitle}
                </Typography>
            </Stack>
        </Card>
    );
}
