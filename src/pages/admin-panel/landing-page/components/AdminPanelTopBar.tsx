import { Avatar, Card, OutlinedInput, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { MainButton } from '../../../../components/ui/MainButton';
import NotificationsIcon from '../../../../components/ui/NotificationsIcon';
import useLogin from '../../../authenticate/hooks/useLogin';

interface props {
    onNotificationClick: () => void;
    title: string;
    subtitle?: string;
    mainColor: string;
}
export function AdminPanelTopBar({
    onNotificationClick,
    title,
    subtitle,
    mainColor,
}: props) {
    const [user] = useLogin();

    const theme = useTheme();
    if (!user?.isSuccess) return <></>;
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
                gridRow: '1',
                py: '1rem',
            }}
        >
            <Box gridColumn={'span 6'}>
                <Typography
                    variant={'h6'}
                    fontWeight={600}
                    color={mainColor}
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
                color={'secondary'}
                sx={{
                    gridColumn: '11 / -5',
                    borderRadius: theme.spacing(),
                    pr: theme.spacing(2),
                    pl: theme.spacing(),
                    py: theme.spacing(0.5),
                    maxHeight: theme.spacing(6),
                    color: 'gray.main',
                    fontWeight: 400,
                    // @ts-ignore
                    fontSize: theme.typography.subtitle2,
                }}
                endAdornment={
                    <MainButton
                        text={'بحث'}
                        color={mainColor}
                        sx={{
                            height: theme.spacing(4),
                            width: 'auto',
                        }}
                    />
                }
            />

            <span
                onClick={onNotificationClick}
                style={{
                    gridColumn: '-3',
                    cursor: 'pointer',
                }}
            >
                <NotificationsIcon
                    width={'20'}
                    height={'26'}
                    fill={mainColor}
                />
            </span>

            <Avatar
                src={user.data?.profile_image}
                sx={{
                    gridColumn: '-1',
                }}
            />
        </Card>
    );
}
