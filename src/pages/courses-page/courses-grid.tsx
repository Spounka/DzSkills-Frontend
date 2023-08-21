import { Course } from '../../types/course';
import { SxProps, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CourseCard from './CourseCard';

interface gridProps {
    activeCourses: Course[] | undefined;
    cardsPerRow: any;
    sx?: SxProps;
    baseUrl?: string;
    useBoxShadow?: boolean;
}

export function CoursesGrid({
    activeCourses,
    cardsPerRow,
    baseUrl,
    useBoxShadow,
    sx,
}: gridProps) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: `repeat(${cardsPerRow.xs || cardsPerRow}, minmax(0, 1fr))`,
                    sm: `repeat(${cardsPerRow.sm || cardsPerRow}, minmax(0, 1fr))`,
                    md: `repeat(${cardsPerRow.md || cardsPerRow}, minmax(0, 1fr))`,
                    lg: `repeat(${cardsPerRow.lg || cardsPerRow}, minmax(0, 1fr))`,
                    xl: `repeat(${cardsPerRow.xl || cardsPerRow}, minmax(0, 1fr))`,
                },
                gridTemplateRows: 'auto auto 1fr',
                justifyContent: 'flex-start',
                flexFlow: 'wrap',
                px: { xs: theme.spacing(4), lg: theme.spacing(14) },
                pb: 5,
                gap: 2,
                // overflow: 'hidden',
                ...sx,
            }}
        >
            {activeCourses?.map((info: Course) => {
                return useBoxShadow ? (
                    <Box
                        key={info.id}
                        sx={{
                            width: '100%',
                            boxShadow: '0 5px 10px #0000001A',
                            borderRadius: theme.spacing(2),
                            // flex: '1 1 30%',
                            // aspecRatio: '16/10',
                        }}
                    >
                        <CourseCard
                            course={info}
                            link={(baseUrl ?? '') + info.id + '/'}
                        />
                    </Box>
                ) : (
                    <CourseCard
                        key={info.id}
                        course={info}
                        link={(baseUrl ?? '') + info.id + '/'}
                    />
                );
            })}
        </Box>
    );
}
