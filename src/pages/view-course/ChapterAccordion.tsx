import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chapter, Video } from '../../types/course';
import { VideoChapterItem } from './VideoChapterItem';

interface props {
    chapter: Chapter;
    setCurrentVideo: any;
    activeVideo?: Video;
    locked: boolean;
    progressionVideoIndex: number;
    progresssionChapterIndex: number;
    chapterIndex: number;
}

export function ChapterAccordion({
    locked,
    chapterIndex,
    progressionVideoIndex,
    progresssionChapterIndex,
    chapter,
    setCurrentVideo,
    activeVideo,
}: props) {
    const theme = useTheme();
    const [expanded, setExpanded] = useState<boolean>(false);
    const videosWithUUID = chapter.videos?.map((v: any) => {
        return { ...v, key: uuidv4() };
    });
    return (
        <Accordion
            expanded={expanded}
            disabled={locked}
            onChange={(_, v) => setExpanded(v)}
            sx={{
                border: 'unset',
                outline: 'none',
                boxShadow: 'none',
                borderTop: 'none',
                ':before': {
                    display: 'none',
                },
                '& .Mui-expanded': {
                    transition: 'all ease 500ms',
                },
            }}
        >
            <AccordionSummary
                sx={{
                    bgcolor: locked
                        ? theme.palette.gray.main
                        : theme.palette.primary.main,
                    color: 'white',
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
            >
                {chapter.title}
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                {videosWithUUID?.map((video: any, index: number) => {
                    return (
                        <React.Fragment key={video.key}>
                            <VideoChapterItem
                                locked={
                                    locked ||
                                    (index > progressionVideoIndex &&
                                        progresssionChapterIndex <= chapterIndex)
                                }
                                video={video}
                                setCurrentVideo={setCurrentVideo}
                                activeVideo={activeVideo}
                            />
                            {'length' in chapter.videos &&
                                index < chapter.videos?.length - 1 && <Divider />}
                        </React.Fragment>
                    );
                })}
            </AccordionDetails>
        </Accordion>
    );
}
