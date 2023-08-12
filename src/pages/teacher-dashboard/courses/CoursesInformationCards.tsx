import { Stack, useTheme } from '@mui/material';
import { ReactComponent as MoneyIcon } from '../../../assets/svg/money-white.svg';
import playButton from '../../../assets/svg/play-purple.svg';
import school from '../../../assets/svg/school-purple.svg';
import stars from '../../../assets/svg/stars-purple.svg';
import { InformationCard } from '../../../components/InformationCard';
import { User } from '../../../types/user';

export function CoursesInformationCards({
    user,
    coursesCount,
    studentsCount,
    earnings,
}: {
    coursesCount: number;
    user?: User;
    studentsCount?: number;
    earnings?: number;
}) {
    const theme = useTheme();

    return (
        <Stack
            direction={'row'}
            width={'100%'}
            gap={2}
        >
            <InformationCard
                title={'كورساتي'}
                subtitle={coursesCount.toString()}
                icon={playButton}
                link={'/dashboard/teacher/courses/'}
                sx={{
                    flex: '0 1 20%',
                    flexBasis: '20%',
                    flexShrink: '1',
                    color: theme.palette.purple.main,
                }}
            />
            <InformationCard
                title={'عدد الطلبة'}
                subtitle={studentsCount?.toString() ?? '0'}
                icon={school}
                sx={{
                    flex: '1 1 25%',
                    flexBasis: '25%',
                    flexGrow: '1',
                    color: theme.palette.purple.main,
                }}
            />

            <InformationCard
                title={'متوسط التقييم'}
                subtitle={user?.average_rating.toFixed(1) ?? '-'}
                icon={stars}
                sx={{
                    flex: '1 1 25%',
                    flexBasis: '25%',
                    flexGrow: '1',
                    color: theme.palette.purple.main,
                }}
            />

            <InformationCard
                title={'إجمالي الأرباح'}
                subtitle={earnings?.toString() ?? '0'}
                iconNode={<MoneyIcon fill="white" />}
                sx={{
                    flex: '0 1 20%',
                    flexBasis: '20%',
                    flexShrink: '1',
                    bgcolor: theme.palette.purple.main,
                    color: 'white',
                }}
            />
        </Stack>
    );
}
