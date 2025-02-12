import { Stack, useTheme } from '@mui/material';
import money from '../../../assets/svg/money-white.svg';
import playButton from '../../../assets/svg/play-purple.svg';
import school from '../../../assets/svg/school-purple.svg';
import stars from '../../../assets/svg/stars-purple.svg';
import { InformationCard } from '../../../components/InformationCard';
import useReduxData from '../../../stores/reduxUser';

export function InformationCards() {
    const user = useReduxData().user.user;
    const theme = useTheme();
    return (
        <Stack
            direction={'row'}
            width={'100%'}
            gap={2}
        >
            <InformationCard
                title={'كورساتي'}
                subtitle={'124'}
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
                subtitle={'125'}
                icon={school}
                link={'/dashboard/teacher/students/'}
                sx={{
                    flex: '1 1 25%',
                    flexBasis: '25%',
                    flexGrow: '1',
                    color: theme.palette.purple.main,
                }}
            />

            <InformationCard
                title={'متوسط التقييم'}
                subtitle={user?.average_rating.toFixed(1) || '0.0'}
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
                subtitle={'250000DA'}
                icon={money}
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
