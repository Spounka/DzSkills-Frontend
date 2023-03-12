import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { StyledOutline } from '../../../../../components/form/StyledOutline';
import { UploadFileInput } from '../../../../../components/form/UploadFileInput';
import { Video } from './LessonsAccordion';

export interface LessonProps {
    id: string,
    activeLesson: number,
    chapterIndex: number,
    videoIndex: number,
    getVideo: (param: number) => Video
    setVideo: (video: Video) => void,
}
export function LessonFields({ getVideo, activeLesson, chapterIndex, videoIndex, setVideo }: LessonProps) {
    const [title, setTitle] = useState(getVideo(videoIndex).title)
    const [description, setDescription] = useState(getVideo(videoIndex).description)
    const [vid, setVid] = useState<any>(getVideo(videoIndex).video)


    function handleTitleChange(event: any) {
        setTitle(event.target.value)
    }
    function handleDescriptionChange(event: any) {
        setDescription(event.target.value)
    }
    function handleVideoChange(event: any) {
        setVid(event.target.files[0])
    }

    function updateVideo() {
        let x = { id: getVideo(videoIndex).id, title: title, description: description, video: vid }
        setVideo(x)
    }

    function getTransformValue() {
        if (activeLesson === videoIndex)
            return 'translate(0, 0)'
        if (activeLesson > videoIndex) {
            return 'translate(200%, 0)'
        }
        if (activeLesson < videoIndex) {
            return 'translate(-200%, 0)'
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            transition: 'all ease 300ms',
            position: activeLesson === videoIndex ? 'unset' : 'absolute',
            transform: getTransformValue(),
            gap: 2,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: 2,
                width: '100%',
                flexGrow: '0',
                flexShrink: '1',
                flexBasis: 'auto',
            }}>
                <Typography variant={'subtitle2'} px={1}>
                    عنوان الدرس
                </Typography>

                <StyledOutline
                    name={`chapters[${chapterIndex}]videos[${videoIndex}]title`}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    onBlur={() => updateVideo()}
                    color={'secondary'}
                    sx={{
                        bgcolor: 'white',
                        width: '100%'
                    }} />

                <Typography variant={'subtitle2'} px={1}>
                    وصف
                </Typography>

                <StyledOutline
                    value={description}
                    onChange={handleDescriptionChange}
                    onBlur={() => updateVideo()}
                    name={`chapters[${chapterIndex}]videos[${videoIndex}]description`}
                    type="text" color={'secondary'}
                    sx={{
                        bgcolor: 'white',
                        flexGrow: '1',
                        width: '100%'
                    }} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: 2,
                width: '100%',
                flexBasis: 'auto',
                flexGrow: '0',
                flexShrink: '1',
            }}>
                <Typography variant={'subtitle2'} px={1}>
                    فيديو الدرس
                </Typography>

                <UploadFileInput
                    inputName={`chapters[${chapterIndex}]videos[${videoIndex}]video`}
                    onChange={handleVideoChange}
                    sx={{
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '100%',
                        bgcolor: 'white',
                        justifyContent: 'center'
                    }}
                    containerSx={{
                        alignItems: 'center',
                        flexGrow: '0'
                    }}
                    inputFileTypes='video/*' />
            </Box>
        </Box>
    );
}
