import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button, Card, Stack, Typography, useTheme } from '@mui/material';
import { useRef, useState } from 'react';
import { Level } from '../../../types/course';
import { FilterPopper } from './FilterPopper';
import { MainButton } from '../../../components/ui/MainButton';

interface filterProps {
    levels: Level[];
    activeLevels: Level[];
    updateActiveLevels: (level: Level) => void;
}
export function FilterChip({ levels, activeLevels, updateActiveLevels }: filterProps) {
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
                <FilterLevels
                    levels={levels}
                    activeLevels={activeLevels}
                    updateActiveLevels={updateActiveLevels}
                />
            </FilterPopper>
        </>
    );
}

interface props {
    levels: Level[];
    activeLevels: Level[];
    updateActiveLevels: (level: Level) => void;
}
function FilterLevels({ levels, activeLevels, updateActiveLevels }: props) {
    const theme = useTheme();
    return (
        <Stack gap={1}>
            <Typography variant={'h6'}>Levels</Typography>
            <Stack gap={1}>
                {levels.map((level: any) => {
                    return (
                        <FilterLevelButton
                            key={level.id}
                            level={level}
                            isActive={activeLevels.includes(level)}
                            updateActiveLevels={updateActiveLevels}
                        />
                    );
                })}
            </Stack>
            <MainButton
                color={theme.palette.error.light}
                //@ts-expect-error
                onClick={() => updateActiveLevels({ id: 0, name: 'clear' })}
                sx={{
                    justifySelf: 'flex-start',
                }}
                text="Clear"
            />
        </Stack>
    );
}

interface prop {
    level: Level;
    isActive: boolean;
    updateActiveLevels: (level: Level) => void;
}
function FilterLevelButton({ level, isActive, updateActiveLevels }: prop) {
    const theme = useTheme();
    return (
        <Box
            width={'fit-content'}
            onClick={() => updateActiveLevels(level)}
            py={1}
            px={2}
            borderRadius={theme.spacing()}
            sx={{
                cursor: 'pointer',
                bgcolor: isActive ? 'transparetn' : 'gray.secondary',
                borderWidth: isActive ? '1px' : '0',
                borderColor: 'primary.main',
                color: isActive ? 'primary.main' : 'black',
                transition: 'all 50ms ease-in-out',
            }}
        >
            <Typography>{level.name}</Typography>
        </Box>
    );
}
