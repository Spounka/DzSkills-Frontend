import { ArrowRightAlt } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useQuery } from "react-query";
import { getTrendingCourses } from "./api/getAllCourses";
import { BestCourseCard } from "./BestCourseCard";

export function TrendingCoursesCarousel({ }: any) {
    const [activeCourse, setActiveCourse] = useState<number>(0);

    const query = useQuery({
        queryKey: ['courses', 'trending'],
        queryFn: () => getTrendingCourses(),
        onSuccess: (data) => console.log(data),
        staleTime: 1000 * 60 * 5,
    })

    if (query.isError)
        return <Typography>Error</Typography>

    if (query.isLoading)
        return <Typography>Loading...</Typography>
    if (!query.isSuccess)
        return <Typography>Error</Typography>
    return (
        <Box id={'carouselContainer'} sx={{
            height: '100%',
            position: 'relative',
            width: '100%',
            zIndex: 0,
            display: 'flex',
        }}>
            <IconButton disableRipple onClick={() => setActiveCourse((l: any) => l < 2 ? l + 1 : 2)} sx={{
                zIndex: 4,
                position: 'absolute',
                right: '-1.5%',
                top: '50%',
                bgcolor: activeCourse === 2 ? 'gray.main' : 'primary.main',
                borderRadius: 0
            }}>
                <ArrowRightAlt sx={{
                    color: 'white'
                }} />
            </IconButton>

            <IconButton disableRipple onClick={() => setActiveCourse((l: any) => l > 0 ? l - 1 : 0)} sx={{
                zIndex: 4,
                position: 'absolute',
                bgcolor: activeCourse === 0 ? 'gray.main' : 'primary.main',
                borderRadius: 0,
                left: '-1.5%',
                top: '50%'
            }}>
                <ArrowRightAlt sx={{
                    scale: '-1 1',
                    color: 'white'
                }} />
            </IconButton>
            <BestCourseCard index={0} currentCourse={activeCourse} data={query.data?.data[0]} />
            <BestCourseCard index={1} currentCourse={activeCourse} data={query.data?.data[1]} />
            <BestCourseCard index={2} currentCourse={activeCourse} data={query.data?.data[2]} />
        </Box>
    );
}
