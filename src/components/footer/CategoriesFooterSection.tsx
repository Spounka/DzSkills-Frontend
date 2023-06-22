import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getCategories } from '../../pages/admin-panel/categories-hashtags/api/queries';

export function CategoriesFooterSection({}) {
    const categoriesQuery = useQuery({
        queryFn: () => getCategories(),
        queryKey: ['categories'],
    });

    return (
        <>
            <Typography
                variant="h5"
                fontWeight={500}
            >
                الأقسام
            </Typography>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={2}
            >
                {categoriesQuery.data?.slice(0, 4).map(category => {
                    return (
                        <Typography
                            key={category.image}
                            variant="caption"
                        >
                            <Link to={`/courses/categorized/?category=${category.name}`}>
                                {category.name}
                            </Link>
                        </Typography>
                    );
                })}
                {categoriesQuery.data && categoriesQuery.data.length > 3 && (
                    <Typography variant="caption">
                        <Link to={'/courses/'}>More...</Link>
                    </Typography>
                )}
            </Box>
        </>
    );
}
