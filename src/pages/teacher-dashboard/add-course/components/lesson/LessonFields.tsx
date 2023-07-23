import { Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { StyledOutline } from '../../../../../components/form/StyledOutline';
import { UploadFileInput } from '../../../../../components/form/UploadFileInput';
import { CreationVideo } from '../../../../../types/course';
import { DisplayFileUrl } from '../course-fields/CourseFields';

export interface LessonProps {
    id: string | number;
    activeLesson: number;
    chapterIndex: number;
    videoIndex: number;
    video?: CreationVideo;
    readonly?: boolean;
    getVideo: (param: number) => CreationVideo;
    setVideo: (video: CreationVideo) => void;
}
export function LessonFields({
    activeLesson,
    chapterIndex,
    videoIndex,
    video,
    readonly,
    getVideo,
    setVideo,
}: LessonProps) {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [title, setTitle] = useState(getVideo(videoIndex).title);
    const [description, setDescription] = useState(getVideo(videoIndex).description);
    const [vid, setVid] = useState<CreationVideo>(video ?? getVideo(videoIndex));

    function handleTitleChange(event: any) {
        if (event.target.value > 300) {
            enqueueSnackbar('300 كلمة كحد أقصى', { variant: 'warning' });
            event.target.value = '';
        }
        setTitle(event.target.value);
    }
    function handleDescriptionChange(event: any) {
        if (event.target.value > 300) {
            enqueueSnackbar('300 كلمة كحد أقصى', { variant: 'warning' });
            event.target.value = '';
        }
        setDescription(event.target.value);
    }
    function handleVideoChange(event: any) {
        if (!RegExp('video/*').exec(event.target.files[0].type)) {
            enqueueSnackbar('الرجاء تحميل فيديو', {
                variant: 'warning',
                autoHideDuration: 2000,
            });
            return 'remove';
        }
        setVid(event.target.files[0]);
    }

    function updateVideo() {
        let x = {
            ...vid,
            title: title,
            description: description,
        };
        setVideo(x);
    }

    function getTransformValue() {
        if (activeLesson === videoIndex) return 'translate(0, 0)';
        if (activeLesson > videoIndex) {
            return 'translate(200%, 0)';
        }
        if (activeLesson < videoIndex) {
            return 'translate(-200%, 0)';
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'row',
                flexWrap: 'wrap',
                width: '100%',
                transition: 'all ease 300ms',
                position: activeLesson === videoIndex ? 'unset' : 'absolute',
                transform: getTransformValue(),
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minWidth: `calc(50% - ${theme.spacing()})`,
                }}
            >
                <Typography
                    variant={'subtitle2'}
                    px={1}
                >
                    عنوان الدرس
                </Typography>

                <StyledOutline
                    required
                    readOnly={video ? true : false}
                    name={`chapters[${chapterIndex}]videos[${videoIndex}]title`}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    onBlur={() => updateVideo()}
                    color={'secondary'}
                    sx={{
                        bgcolor: 'white',
                        width: '100%',
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minWidth: `calc(50% - ${theme.spacing()})`,
                }}
            >
                <Typography
                    variant={'subtitle2'}
                    px={1}
                >
                    وصف
                </Typography>

                <StyledOutline
                    value={description}
                    multiline
                    required
                    maxRows={3}
                    readOnly={video ? true : false}
                    onChange={handleDescriptionChange}
                    onBlur={() => updateVideo()}
                    name={`chapters[${chapterIndex}]videos[${videoIndex}]description`}
                    type="text"
                    color={'secondary'}
                    sx={{
                        bgcolor: 'white',
                        flexGrow: '1',
                        width: '100%',
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: `calc(50% - ${theme.spacing()})`,
                }}
            >
                <Typography
                    variant={'subtitle2'}
                    px={1}
                >
                    فيديو الدرس
                </Typography>

                {video ? (
                    <video
                        preload={'metadata'}
                        src={video.video ?? ''}
                    ></video>
                ) : (
                    <UploadFileInput
                        required
                        inputName={`chapters[${chapterIndex}]videos[${videoIndex}]video`}
                        onChange={handleVideoChange}
                        sx={{
                            alignItems: 'center',
                            flexDirection: 'column',
                            height: '100%',
                            bgcolor: 'white',
                            justifyContent: 'center',
                        }}
                        containerSx={{
                            alignItems: 'center',
                            flexGrow: '0',
                        }}
                        inputFileTypes="video/*"
                    />
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minWidth: `calc(50% - ${theme.spacing()})`,
                }}
            >
                <Typography
                    variant={'subtitle2'}
                    px={1}
                >
                    صورة مصغرة
                </Typography>
                {video ? (
                    <img
                        loading="lazy"
                        src={video.thumbnail ?? ''}
                    />
                ) : (
                    <UploadFileInput
                        required
                        inputName={`chapters[${chapterIndex}]videos[${videoIndex}]thumbnail`}
                        onChange={handleVideoChange}
                        sx={{
                            alignItems: 'center',
                            flexDirection: 'column',
                            bgcolor: 'white',
                            justifyContent: 'center',
                        }}
                        containerSx={{
                            alignItems: 'center',
                            flexGrow: '0',
                        }}
                        inputFileTypes="image/*"
                    />
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minWidth: '100%',
                }}
            >
                <Typography
                    variant={'subtitle2'}
                    color={'gray.main'}
                    sx={{
                        gridColumn: '2',
                    }}
                >
                    ملف التقديم
                </Typography>

                {video ? (
                    video.presentation_file ? (
                        <DisplayFileUrl
                            sx={{
                                gridColumn: '-2 / span 1',
                                gridRow: '9',
                                bgcolor: 'white',
                            }}
                            url={video.presentation_file}
                        />
                    ) : (
                        <Typography>لم يتم تحميل أي ملف</Typography>
                    )
                ) : (
                    <UploadFileInput
                        required
                        inputName={`chapters[${chapterIndex}]videos[${videoIndex}]presenation_file`}
                        sx={{ bgcolor: 'white' }}
                    />
                )}
            </Box>
        </Box>
    );
}
