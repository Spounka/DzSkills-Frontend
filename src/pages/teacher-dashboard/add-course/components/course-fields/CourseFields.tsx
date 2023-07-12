import {
    Autocomplete,
    FormControl,
    OutlinedInput,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { UploadFileInput } from '../../../../../components/form/UploadFileInput';
import { useQueries, useQuery } from 'react-query';
import { getHashtags } from '../../../../admin-panel/categories-hashtags/api/queries';
import { useState } from 'react';
import { Hashtag } from '../../../../../types/course';

export function CourseFields() {
    const theme = useTheme();
    const [selectedHashtags, setSelectedHashtags] = useState<Hashtag[]>([]);
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
                color={theme.palette.purple.main}
            >
                <Autocomplete
                    options={hashtagsQuery.data || []}
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
                            color={'purple'}
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

            <UploadFileInput inputName="presentation_file" />

            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '2',
                }}
            >
                ملفات إضافية ( اختياري )
            </Typography>

            <UploadFileInput
                inputName="additional"
                multipleFiles
                inputFileTypes=".pdf, .ppt"
                sx={{
                    gridColumn: 'auto',
                }}
            />
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
        </>
    );
}
