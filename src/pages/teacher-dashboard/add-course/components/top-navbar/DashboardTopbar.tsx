import { Avatar, OutlinedInput, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import purpleNotification from '../../../../../assets/svg/notification purple.svg';
import { MainButton } from '../../../../../components/ui/MainButton';
import useLogin from '../../../../authenticate/hooks/useLogin';

interface props {
    title: string;
    subtitle?: string;
    onNotificationClick: () => void;
}

export function DashboardTopbar({
    title,
    subtitle,
    onNotificationClick,
}: props) {
    const [query] = useLogin();

    const theme = useTheme();
    if (!query.isSuccess) return <></>;
    return (
        <Card
            elevation={0}
            sx={{
                px: theme.spacing(3),
                display: 'grid',
                gap: theme.spacing(),
                gridTemplateColumns: 'repeat(26, 1fr)',
                alignItems: 'center',
                boxShadow: '7px 20px 40px #00000014',
                borderRadius: theme.spacing(),
                gridColumn: '1 / -3',
                gridRow: 'span 2',
                py: '1rem',
            }}
        >
            <Box gridColumn={'span 6'}>
                <Typography
                    variant={'h6'}
                    fontWeight={600}
                    color={'purple.main'}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant={'caption'}
                        fontWeight={300}
                        color={'gray.main'}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
            <OutlinedInput
                placeholder={'ابحث عن الدورة المناسبة لك'}
                sx={{
                    gridColumn: '11 / -5',
                    borderRadius: theme.spacing(),
                    pr: theme.spacing(2),
                    pl: theme.spacing(),
                    py: theme.spacing(0.5),
                    maxHeight: theme.spacing(6),
                    color: 'gray.main',
                    fontWeight: 400,
                    fontSize: theme.typography.subtitle2,
                }}
                endAdornment={
                    <MainButton
                        text={'بحث'}
                        color={theme.palette.purple.main}
                        sx={{
                            height: theme.spacing(4),
                            width: 'auto',
                        }}
                    />
                }
            />
            <img
                onClick={onNotificationClick}
                src={purpleNotification}
                alt=""
                style={{
                    gridColumn: '-3',
                    cursor: 'pointer',
                }}
            />
            <Avatar
                src={query.data?.profile_image}
                sx={{
                    gridColumn: '-1',
                }}
            />
        </Card>
    );
}
