import { Card, Typography, useTheme } from '@mui/material';
import { Category } from '../../../types/course';

interface categoryProps {
    category: Category;
    defaultActive?: boolean;
    updateActiveCategories: (category: Category) => void;
}
export function CategoryChip({
    category,
    defaultActive,
    updateActiveCategories,
}: categoryProps) {
    const theme = useTheme();
    return (
        <Card
            elevation={0}
            onClick={() => updateActiveCategories(category)}
            sx={{
                userSelect: 'none',
                cursor: 'pointer',
                flex: '1 0 15%',
                boxShadow: defaultActive ? '0 5px 10px #0000001A' : 'none',
                bgcolor: defaultActive ? 'white' : 'gray.light',
                color: theme.palette.gray.dark,
                scrollSnapAlign: 'start',
                py: 2,
                px: 4,
                // width: 'auto',
                maxHeight: '100%',
                maxWidth: `calc(100dvw - ${theme.spacing(10)})`,
                borderRadius: theme.spacing(2),
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    textOverflow: 'ellipsis',
                    // maxWidth: '100%',
                }}
            >
                {category.name}
            </Typography>
        </Card>
    );
}
