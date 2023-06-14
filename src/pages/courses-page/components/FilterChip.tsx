import { ArrowDropDown } from '@mui/icons-material';
import { Box, Card, Stack, Typography, useTheme } from '@mui/material';
import { useRef, useState } from 'react';
import { Level } from '../../../types/course';
import { FilterPopper } from './FilterPopper';

interface filterProps {
    levels: Level[];
    activeLevels: Level[];
    updateActiveLevels: (level: Level) => void;
}
export function FilterChip({ levels }: filterProps) {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const cardRef = useRef(null);
    return (
        <>
            <Card
                elevation={0}
                onClick={() => setDrawerOpen(prev => !prev)}
                ref={cardRef}
                sx={{
                    userSelect: 'none',
                    scrollSnapAlign: 'start',
                    flex: '1 0 15%',
                    boxShadow: drawerOpen ? '0 5px 10px #0000001A' : 'none',
                    bgcolor: 'white',
                    cursor: 'pointer',
                    color: theme.palette.gray.dark,
                    py: 2,
                    px: 4,
                    width: '100%',
                    borderRadius: theme.spacing(2),
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    root: {
                        '& ::-webkit-scrollbar': {
                            display: 'none',
                        },
                    },
                }}
            >
                <Typography
                    ml={'auto'}
                    variant="body1"
                >
                    Filter
                </Typography>
                <ArrowDropDown
                    sx={{
                        ml: 'auto',
                    }}
                />
            </Card>
            <FilterPopper
                isOpen={drawerOpen}
                cardRef={cardRef}
            >
                <FilterLevels levels={levels} />
            </FilterPopper>
        </>
    );
}

interface props {
    levels: Level[];
}
function FilterLevels({ levels }: props) {
    const theme = useTheme();
    return (
        <Stack gap={1}>
            <Typography variant={'h6'}>Levels</Typography>
            <Stack gap={1}>
                {levels.slice(0, 8).map((level: any) => {
                    return (
                        <FilterLevelButton
                            key={level.id}
                            level={level}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
}

interface prop {
    level: Level;
}
function FilterLevelButton({ level }: prop) {
    const theme = useTheme();
    const [selected, setSelected] = useState(false);
    return (
        <Box
            width={'fit-content'}
            onClick={() => setSelected(val => !val)}
            py={1}
            px={2}
            borderRadius={theme.spacing()}
            sx={{
                cursor: 'pointer',
                bgcolor: selected ? 'transparetn' : 'gray.secondary',
                borderWidth: selected ? '1px' : '0',
                borderColor: 'primary.main',
                color: selected ? 'primary.main' : 'black',
                transition: 'all 50ms ease-in-out',
            }}
        >
            <Typography>{level.name}</Typography>
        </Box>
    );
}
