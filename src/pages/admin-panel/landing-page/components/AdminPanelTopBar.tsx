import { Avatar, Badge, Card, OutlinedInput, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { MainButton } from '../../../../components/ui/MainButton';
import NotificationsIcon from '../../../../components/ui/NotificationsIcon';
import useLogin from '../../../authenticate/hooks/useLogin';
import { getCourses } from '../../../courses-page/api/getAllCourses';
import { useNavigate } from 'react-router-dom';

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
    const coursesQuery = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });

    const theme = useTheme();
    const navigate = useNavigate();
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
                    gridColumn: '11 / -8',
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
            {coursesQuery.data?.some(course => course.status === 'pend') ? (
                <Badge
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    // overlap={'circular'}
                    // badgeContent=" "
                    variant={'dot'}
                    color={'error'}
                    sx={{
                        gridColumn: '-7 / span 3',
                        width: '100%',
                        px: 0,
                        '.MuiBadge-dot': {
                            height: 12,
                            width: 12,
                            borderRadius: '50%',
                        },
                    }}
                >
                    <MainButton
                        color={theme.palette.secondary.light}
                        text="للمراجعة"
                        onClick={() => navigate('/admin/courses/pending/')}
                        sx={{
                            width: '100%',
                            px: 0,
                            py: 0.5,
                        }}
                    />
                </Badge>
            ) : (
                <></>
            )}

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
