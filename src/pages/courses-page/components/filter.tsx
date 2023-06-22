import { Box, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { Category, Level } from '../../../types/course';
import {
    getCategories,
    getHashtags,
    getLevels,
} from '../../admin-panel/categories-hashtags/api/queries';
import { CategoryChip } from './CategoryChip';
import { FilterChip } from './FilterChip';

interface props {
    activeLevels: Level[];
    activeCategories: Category[];
    updateActiveLevels: (level: Level) => void;
    updateActiveCategories: (category: Category) => void;
}
function FilterComponent({
    activeLevels,
    activeCategories,
    updateActiveLevels,
    updateActiveCategories,
}: props) {
    const theme = useTheme();

    const levelsQuery = useQuery({
        queryKey: ['levels'],
        queryFn: () => getLevels(),
    });
    const categoriesQuery = useQuery({
        queryFn: () => getCategories(),
        queryKey: ['categories'],
    });
    const hashtags = useQuery({
        queryKey: ['hashtags'],
        queryFn: () => getHashtags(),
    });

    if (!categoriesQuery.data) return <>Categories...</>;
    if (!levelsQuery.data) return <>Levels...</>;

    return (
        <Box
            mx={{ lg: theme.spacing(15), xs: theme.spacing(4) }}
            py={2}
            sx={{
                width: '100%',
                display: 'flex',
                direction: 'ltr',
                overflowX: 'scroll',
                scrollSnapType: 'y mandatory',
                gap: 2,

                cursor: 'grap',
                '&:active': {
                    cursor: 'grabbing',
                },
            }}
        >
            <Box
                py={2}
                sx={{
                    width: 'fit-content',
                    display: 'flex',
                    gap: 2,
                }}
            >
                <FilterChip
                    levels={levelsQuery.data}
                    activeLevels={activeLevels}
                    updateActiveLevels={updateActiveLevels}
                />
                <CategoryChip
                    category={{
                        name: 'All',
                        id: 0,
                        image: '',
                        description: '',
                        courses: 0,
                    }}
                    defaultActive={activeCategories.length === 0}
                    updateActiveCategories={updateActiveCategories}
                />
                {categoriesQuery.data.map(category => {
                    return (
                        <CategoryChip
                            key={category.id}
                            category={category}
                            defaultActive={activeCategories.includes(category)}
                            updateActiveCategories={updateActiveCategories}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}

export default FilterComponent;
