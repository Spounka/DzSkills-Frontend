import {
    Autocomplete,
    Box,
    FormControl,
    OutlinedInput,
    SxProps,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ReactComponent as UploadImage } from '../../../../../assets/svg/Download.svg';
import { UploadFileInput } from '../../../../../components/form/UploadFileInput';
import { Course, Hashtag } from '../../../../../types/course';
import { getHashtags } from '../../../../admin-panel/categories-hashtags/api/queries';
import Image from 'mui-image';

interface props {
    course?: Course;
    readonly?: boolean;
    color?: string;
    stringColor?: string;
}

export function CourseFields({ color, stringColor, course, readonly }: props) {
    const theme = useTheme();
    const [selectedHashtags, setSelectedHashtags] = useState<Hashtag[]>(
        course?.hashtags || []
    );
    const hashtagsQuery = useQuery({
        queryFn: () => getHashtags(),
        queryKey: ['hashtags'],
    });
    return (
        <>
            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: 'span 1',
                    gridRow: '1',
                }}
            >
                عنوان الكورس
            </Typography>
            <OutlinedInput
                name={'title'}
                color={'secondary'}
                readOnly={readonly}
                placeholder={course?.title || ''}
                sx={{
                    gridColumn: '1',
                    gridRow: '2',
                }}
            />

            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '1',
                    gridRow: '3',
                }}
            >
                وصف
            </Typography>
            <OutlinedInput
                readOnly={readonly}
                placeholder={course?.description || ''}
                name={'description'}
                color={'secondary'}
                multiline
                rows={4}
                sx={{
                    gridColumn: '1',
                    gridRow: '4 / 8',
                }}
            />
            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '2',
                    gridRow: '1',
                }}
            >
                سعر الكورس
            </Typography>
            <OutlinedInput
                name={'price'}
                readOnly={readonly}
                placeholder={course?.price.toFixed(0) || ''}
                color={'secondary'}
                sx={{
                    gridColumn: '2',
                    px: 3,
                }}
                endAdornment={
                    <Typography
                        variant={'body2'}
                        color={'gray.dark'}
                    >
                        DA
                    </Typography>
                }
            />

            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '2',
                }}
            >
                هاشتاغ
            </Typography>
            <FormControl
                sx={{
                    gridColumn: '2',
                    gridRow: 'span 4',
                    height: '100%',
                    direction: 'ltr',
                }}
                //@ts-expect-error
                color={color || theme.palette.purple.main}
            >
                <Autocomplete
                    readOnly={readonly}
                    options={hashtagsQuery.data || []}
                    defaultValue={(readonly && selectedHashtags) || []}
                    multiple
                    limitTags={5}
                    filterSelectedOptions
                    getOptionLabel={hashtag => hashtag.name}
                    loading={hashtagsQuery.isFetching}
                    onChange={(e, newValue) => {
                        setSelectedHashtags(newValue);
                        console.log(newValue);
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            name={'hashtags'}
                            label="هاشتاغ"
                            placeholder="هاشتاغ"
                            //@ts-expect-error
                            color={stringColor || 'purple'}
                            sx={{
                                direction: 'ltr',
                                color: 'inherit',
                            }}
                        />
                    )}
                />
            </FormControl>
            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '1',
                }}
            >
                صورة مصغرة
            </Typography>
            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '2',
                }}
            >
                ملف التقديم
            </Typography>

            {readonly ? (
                <DisplayFileUrl
                    sx={{ gridColumn: '-2 / span 1', gridRow: '9' }}
                    url={course?.presentation_file || ''}
                />
            ) : (
                <UploadFileInput inputName="presentation_file" />
            )}

            {readonly ? (
                <Box
                    component={'a'}
                    download
                    href={course?.thumbnail || ''}
                    sx={{
                        border: '1px solid #CCC',
                        padding: 1,
                        display: 'flex',
                        gap: 2,
                        height: '100%',
                        p: theme.spacing(3),
                        borderRadius: theme.spacing(),
                        overflow: 'hidden',
                        px: 3,
                        gridColumn: 'span 1',
                        gridRow: '9 / 18',
                    }}
                >
                    <Image src={course?.thumbnail || ''} />
                </Box>
            ) : (
                <UploadFileInput
                    sx={{
                        gridColumn: 'auto',
                        gridRow: '9 / 12',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'center',
                    }}
                    containerSx={{
                        alignItems: 'center',
                        flexGrow: '0',
                    }}
                    buttonSx={{
                        height: 'auto',
                    }}
                    inputFileTypes="image/*"
                    inputName={'thumbnail'}
                />
            )}
        </>
    );
}
function DisplayFileUrl({ url, sx }: { url: string; sx?: SxProps }) {
    const theme = useTheme();
    function fileNameFromURL() {
        return url.slice(url.lastIndexOf('/') + 1);
    }
    return (
        <Box
            component={'a'}
            download
            href={url}
            sx={{
                border: '1px solid #CCC',
                padding: 1,
                display: 'flex',
                gap: 2,
                p: theme.spacing(3),
                borderRadius: theme.spacing(),
                overflow: 'hidden',
                px: 3,
                ...sx,
            }}
        >
            <UploadImage
                style={{
                    height: theme.spacing(8),
                    width: theme.spacing(8),
                    fill: theme.palette.gray.light,
                }}
            />

            <Box
                flexGrow={'1'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
            >
                <Typography
                    color={'gray.dark'}
                    variant={'caption'}
                >
                    اسحب الملفات إلى هنا
                </Typography>
                <Typography
                    color={'gray.main'}
                    variant={'caption'}
                    fontWeight={300}
                >
                    أو انقر للاختيار يدويا
                </Typography>
                <Typography
                    maxWidth={'250px'}
                    noWrap
                    color={'gray.main'}
                    variant={'subtitle2'}
                    fontWeight={400}
                >
                    {fileNameFromURL()}
                </Typography>
            </Box>
        </Box>
    );
}
