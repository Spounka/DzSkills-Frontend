import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
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
                            {category.name}
                        </Typography>
                    );
                })}
                {categoriesQuery.data && categoriesQuery.data.length > 3 && (
                    <Typography variant="caption">More...</Typography>
                )}
                {/* <Typography variant="caption">Graphic Design</Typography>
                <Typography variant="caption">Motion Graphic</Typography>
                <Typography variant="caption">3D Modeling</Typography>
                <Typography variant="caption">Freelance</Typography> */}
            </Box>
        </>
    );
}
