import { Card, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
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
    const [active, setActive] = useState(defaultActive || false);
    return (
        <Card
            elevation={0}
            onClick={() => updateActiveCategories(category)}
            sx={{
                userSelect: 'none',
                cursor: 'pointer',
                flex: '1 0 15%',
                boxShadow: active ? '0 5px 10px #0000001A' : 'none',
                bgcolor: active ? 'white' : 'gray.light',
                color: theme.palette.gray.dark,
                scrollSnapAlign: 'start',
                py: 2,
                px: 4,
                width: '100%',
                borderRadius: theme.spacing(2),
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="body1">{category.name}</Typography>
        </Card>
    );
}
