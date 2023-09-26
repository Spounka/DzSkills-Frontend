import { ExpandMore } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MainButton } from '../../../../../components/ui/MainButton';
import { CreationChapter } from '../../../../../types/course';
import { LessonsAccordion } from '../lesson/LessonsAccordion';
import { ChapterFields } from './ChapterFields';

interface props {
    chapterIndex: number;
    uuid: string;
    readonly?: boolean;
    color?: string;
    courseChapter?: CreationChapter;
    removeChapter?: (param: string) => void;
    setChapters: React.Dispatch<React.SetStateAction<CreationChapter[]>>;
}

export function ChapterDetails({
    chapterIndex,
    uuid,
    readonly,
    color,
    courseChapter,
    removeChapter,
    setChapters,
}: props) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [hasAddedLessons, setHasAddedLessons] = useState<boolean>(
        (readonly || (courseChapter?.videos?.length ?? 0) > 0) ?? false
    );
    const [chapter, setChapter] = useState<CreationChapter>(
        courseChapter ?? {
            title: '',
            description: '',
            uuid: uuidv4(),
        }
    );
    const theme = useTheme();

    function handleChapterChange(c: CreationChapter) {
        setChapter({ ...chapter, ...c });
    }

    const memo = useMemo(() => {
        return { title: chapter.title, description: chapter.description };
    }, [chapter.title, chapter.description]);

    useEffect(() => {
        setChapters((chaps: CreationChapter[]) => {
            const f = chaps.filter(chap => chap.uuid !== chapter.uuid);
            f.push({ ...chapter });
            return f;
        });
    }, [memo.description, memo.title]);

    function handleChapterRemove() {
        if (removeChapter) removeChapter(uuid);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'gray.secondary',
                borderRadius: theme.spacing(),
                width: '100%',
                overflowX: 'hidden',
            }}
        >
            <Box
                sx={{
                    padding: 0,
                    bgcolor: color ?? 'purple.light',
                    width: '100%',
                    borderRadius: theme.spacing(),
                    p: 2,
                }}
            >
                <Accordion
                    expanded={expanded}
                    onChange={(_, b) => setExpanded(b)}
                    sx={{
                        bgcolor: 'transparent',
                        border: 'unset',
                        outline: 'none',
                        boxShadow: 'none',
                        borderTop: 'none',
                        color: 'white',
                        width: '100%',
                        px: 2,
                        py: 2,
                        ':before': { display: 'none' },
                    }}
                >
                    <AccordionSummary
                        sx={{
                            color: 'white',
                            '&.Mui-expanded': {
                                transition: 'all 100ms ease',
                                minHeight: 'auto',
                                // mx: -4,
                                // my: -2,
                            },
                        }}
                        expandIcon={
                            <ExpandMore
                                sx={{
                                    color: 'white',
                                    width: '36px',
                                    height: '36px',
                                }}
                            />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Box
                            sx={{
                                display: `${expanded ? 'none' : 'block'}`,
                            }}
                        >
                            <Typography>{chapter.title || 'عنوان الفصل'}</Typography>
                            <Typography
                                maxWidth={'450px'}
                                noWrap
                            >
                                {chapter.description || 'وصف الفصل'}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: theme.spacing(2),
                        }}
                    >
                        <ChapterFields
                            readonly={readonly}
                            index={chapterIndex}
                            chapter={chapter}
                            setChapter={handleChapterChange}
                        />
                        {!readonly && (
                            <>
                                <Box
                                    flexGrow={'1'}
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    sx={{
                                        mt: 0,
                                        width: '100%',
                                    }}
                                >
                                    <MainButton
                                        text="اضف الدروس"
                                        type={'button'}
                                        color={theme.palette.primary.light}
                                        spin={false}
                                        sx={{
                                            px: theme.spacing(8),
                                        }}
                                        {...{
                                            onClick: () => {
                                                setHasAddedLessons(true);
                                            },
                                        }}
                                    />

                                    <MainButton
                                        text="حذف الفصل"
                                        type={'button'}
                                        color={theme.palette.error.light}
                                        spin={false}
                                        sx={{
                                            px: theme.spacing(8),
                                        }}
                                        {...{
                                            onClick: () => handleChapterRemove(),
                                        }}
                                    />
                                </Box>
                            </>
                        )}
                    </AccordionDetails>
                </Accordion>
            </Box>
            {hasAddedLessons && (
                <LessonsAccordion
                    expanded={expanded}
                    chapterIndex={chapterIndex}
                    readonly={readonly}
                    chapter={chapter}
                />
            )}
        </Box>
    );
}
