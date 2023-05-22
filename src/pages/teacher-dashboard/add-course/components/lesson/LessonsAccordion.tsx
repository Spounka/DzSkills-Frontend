import { ExpandMore } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Typography,
} from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import addButton from '../../../../../assets/svg/add button (1).svg';
import rightArrow from '../../../../../assets/svg/add button.svg';
import { LessonFields } from './LessonFields';

export interface Video {
    id: string;
    title: string;
    description: string;
    video?: any;
}
export function LessonsAccordion({ expanded, chapterIndex }: any) {
    const theme = useTheme();
    const [activeLesson, setActiveLesson] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [videos, setVideos] = useState<Video[]>([
        { id: uuidv4(), title: '', description: '', video: undefined },
    ]);

    function getVideo(index: number) {
        return videos[index];
    }

    function handleChangeVideo(video: Video) {
        setVideos(v => {
            let t = [...v];
            return t.map(n =>
                n.id === video.id ? { ...video, id: n.id } : n
            );
        });
    }

    return (
        <Accordion
            expanded={isExpanded && expanded}
            onChange={(_, b) => setIsExpanded(b)}
            sx={{
                transform: expanded
                    ? 'translate(0, 0)'
                    : 'translate(-100%, -100%)',
                bgcolor: 'transparent',
                boxShadow: 'none',
                color: 'purple',
                px: 2,
                py: 2,
                ':before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary
                sx={{
                    color: 'red',
                    '&.Mui-expanded': {
                        transition: 'all 100ms ease',
                        minHeight: 'auto',
                    },
                }}
                expandIcon={
                    <ExpandMore
                        sx={{
                            color: 'gray.main',
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
                    <Typography></Typography>
                    <Typography>Kenobi!</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: theme.spacing(2),
                    color: 'gray.main',
                    px: 10,
                    flexWrap: 'wrap',
                    position: 'relative',
                }}
            >
                {activeLesson > 0 && (
                    <IconButton
                        onClick={() =>
                            setActiveLesson(l => (l > 0 ? l - 1 : 0))
                        }
                        sx={{
                            position: 'absolute',
                            right: '0%',
                            top: '50%',
                        }}
                    >
                        <img
                            src={rightArrow}
                            style={{
                                width: theme.spacing(4.5),
                                height: 'auto',
                            }}
                        />
                    </IconButton>
                )}
                {activeLesson === videos.length - 1 ? (
                    <IconButton
                        onClick={() => {
                            setVideos(vids => {
                                let v = [...vids];
                                v.push({
                                    id: uuidv4(),
                                    title: '',
                                    description: '',
                                });
                                setActiveLesson(v.length - 1);
                                return v;
                            });
                        }}
                        sx={{
                            position: 'absolute',
                            left: '0%',
                            top: '50%',
                        }}
                    >
                        <img
                            src={addButton}
                            style={{
                                width: theme.spacing(4.5),
                                height: 'auto',
                            }}
                        />
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() =>
                            setActiveLesson(l =>
                                l < videos.length - 1
                                    ? l + 1
                                    : videos.length - 1
                            )
                        }
                        sx={{
                            position: 'absolute',
                            left: '0%',
                            top: '50%',
                        }}
                    >
                        <img
                            src={rightArrow}
                            style={{
                                width: theme.spacing(4.5),
                                height: 'auto',
                                scale: '-1 1',
                            }}
                        />
                    </IconButton>
                )}
                <Typography
                    color={'purple.main'}
                    flexGrow={1}
                >
                    دروس الفصل
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    {videos.map((video, index) => {
                        return (
                            <LessonFields
                                key={video.id}
                                activeLesson={activeLesson}
                                chapterIndex={chapterIndex}
                                id={video.id}
                                getVideo={getVideo}
                                videoIndex={index}
                                setVideo={handleChangeVideo}
                            />
                        );
                    })}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}
