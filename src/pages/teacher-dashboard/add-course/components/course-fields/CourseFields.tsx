import {
    Autocomplete,
    Box,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import Image from 'mui-image';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, useEffect } from 'react';
import { useQuery } from 'react-query';
import { UploadFileInput } from '../../../../../components/form/UploadFileInput';
import { Category, Course, Hashtag, Level } from '../../../../../types/course';
import { getCategories, getHashtags, getLevels } from '../../../../admin-panel/categories-hashtags/api/queries';
import { FileUrlField } from '../file-url-field/FileUrlField';

interface props {
    course?: Course;
    readonly?: boolean;
    color?: string;
    stringColor?: string;
    setHashtags?: (h: Hashtag[]) => void;
    setLevel?: (l: Level) => void;
    setCategory?: (c: Category) => void;
}

function englishToArabicLang(lang: string): string {
    switch (lang) {
        case 'Arabic':
            return 'العربية';
        case 'English':
            return 'الإنجليزية';
        case 'French':
            return 'الفرنسية';
        default:
            return lang;

    }
}
export function CourseFields({
    color,
    stringColor,
    course,
    readonly,
    setHashtags,
    setLevel,
    setCategory,
}: props) {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    const [courseLang, setCourseLang] = React.useState<string>(course?.language ?? 'Arabic');
    const [localHashtags, setLocalHashtags] = React.useState<Hashtag[]>(course?.hashtags ?? []);
    const [localLevel, setLocalLevel] = React.useState<Level | undefined>(course?.course_level ?? {
        courses: 0,
        id: 0,
        name: '',
    });
    const [localCategory, setLocalCategory] = React.useState<Category | undefined>(course?.category ?? {
        courses: 0,
        description: '',
        image: '',
        name: '',
        id: 0,
    });

    const hashtagsQuery = useQuery({
        queryFn: () => getHashtags(),
        queryKey: ['hashtags'],
        enabled: !readonly,
    });
    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        enabled: !readonly,
    });
    const levelsQuery = useQuery({
        queryKey: ['levels'],
        queryFn: () => getLevels(),
        enabled: !readonly,
    });

    useEffect(() => {
        setHashtags?.(localHashtags);
    }, [localHashtags]);
    useEffect(() => {
        if (setLevel && localLevel) setLevel(localLevel);
    }, [localLevel?.name]);
    useEffect(() => {
        if (setCategory && localCategory) setCategory(localCategory);
    }, [localCategory?.name]);

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
                required
                name={'title'}
                color={'secondary'}
                readOnly={readonly}
                defaultValue={course?.title ?? ''}
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
                required
                readOnly={readonly}
                defaultValue={course?.description ?? ''}
                name={'description'}
                color={'secondary'}
                onBlur={e => {
                    if (e.target.value.length > 300) {
                        enqueueSnackbar('300 كلمة كحد أقصى', { variant: 'warning' });
                        e.target.value = e.target.value.slice(0, 299);
                    }
                }}
                multiline
                rows={7}
                sx={{
                    gridColumn: '1',
                    gridRow: '4 / span 3',
                    height: '100%',
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
                required
                name={'price'}
                readOnly={readonly}
                defaultValue={course?.price ?? 0}
                onBlur={e => {
                    if (isNaN(Number(e.target.value))) {
                        enqueueSnackbar('الرجاء إدخال رقم', { variant: 'warning' });
                        e.target.value = '';
                    }
                }}
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
                    gridRow: '4 / span 1',
                    height: '100%',
                    direction: 'ltr',
                }}
                //@ts-expect-error
                color={color ?? theme.palette.purple.main}
            >
                <Autocomplete
                    readOnly={readonly}
                    options={hashtagsQuery.data ?? []}
                    multiple
                    defaultValue={localHashtags}
                    limitTags={4}
                    filterSelectedOptions
                    getOptionLabel={hashtag => hashtag.name}
                    loading={hashtagsQuery.isFetching}
                    onChange={
                        readonly
                            ? () => {
                            }
                            : (_, newValue, reason) => {
                                if (reason === 'clear')
                                    setLocalHashtags([])
                                else
                                    setLocalHashtags(newValue);
                            }
                    }
                    renderOption={(props, option) => {
                        return (
                            <li
                                {...props}
                                key={option.id}
                            >
                                {option.name}
                            </li>
                        );
                    }}
                    renderInput={params => (
                        <TextField
                            required={localHashtags.length === 0}
                            {...params}
                            label="هاشتاغ"
                            placeholder="هاشتاغ"
                            //@ts-expect-error
                            color={stringColor ?? 'purple'}
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
                    gridColumn: '2',
                    gridRow: '5 / span 1',
                }}
            >
                مستوى
            </Typography>
            <FormControl
                sx={{
                    gridColumn: '2',
                    gridRow: '6 / span 1',
                    height: '100%',
                    direction: 'ltr',
                }}
                //@ts-expect-error
                color={color ?? theme.palette.purple.main}
            >
                <Autocomplete
                    readOnly={readonly}
                    options={levelsQuery.data ?? []}
                    defaultValue={localLevel}
                    filterSelectedOptions
                    getOptionLabel={level => level.name}
                    loading={levelsQuery.isFetching}
                    onChange={
                        readonly
                            ? () => {
                            }
                            : (_, value, reason) => {
                                if (reason === 'clear')
                                    setLocalLevel({ id: 0, name: '', courses: 0 })
                                else
                                    setLocalLevel(value ?? undefined);
                            }
                    }
                    renderInput={params => (
                        <TextField
                            required={localLevel === undefined || localLevel?.id === 0}
                            {...params}
                            label="مستوى"
                            placeholder="مستوى"
                            //@ts-expect-error
                            color={stringColor ?? 'purple'}
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
                    gridColumn: '2',
                    gridRow: '7 / span 1',
                }}
            >
                فئة
            </Typography>
            <FormControl
                sx={{
                    gridColumn: '2',
                    gridRow: '8 / span 1',
                    height: '100%',
                    direction: 'ltr',
                }}
                //@ts-expect-error
                color={color ?? theme.palette.purple.main}
            >
                <Autocomplete
                    readOnly={readonly}
                    options={categoriesQuery.data ?? []}
                    defaultValue={localCategory}
                    filterSelectedOptions
                    getOptionLabel={category => category.name}
                    loading={categoriesQuery.isFetching}
                    onChange={
                        readonly
                            ? () => {
                            }
                            : (_, value, reason) => {
                                if (reason === 'clear')
                                    setLocalCategory({ name: '', id: 0, image: '', courses: 0, description: '' })
                                else
                                    setLocalCategory(value ?? undefined)
                            }
                    }
                    renderInput={params => (
                        <TextField
                            required={localCategory?.id === 0}
                            {...params}
                            label="فئة"
                            placeholder="فئة"
                            //@ts-expect-error
                            color={stringColor ?? 'purple'}
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
                صورة مصغرة (640x360)
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
                <FileUrlField
                    sx={{ gridColumn: '2', gridRow: '10 / span 5' }}
                    url={course?.presentation_file ?? ''}
                />
            ) : (
                <UploadFileInput
                    sx={{ gridRow: '10 / span 5', gridColumn: '2', height: '100%' }}
                    inputName="presentation_file"
                    inputFileTypes=".pdf,.pptx,.ppt,.pptm"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const files = e.currentTarget?.files;
                        if (files) {
                            const file = files[0];
                            if (
                                ![
                                    'application/vnd.ms-powerpoint',
                                    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    'application/pdf',
                                ].includes(file.type)
                            ) {
                                enqueueSnackbar('لم يتم قبول نوع الملف', {
                                    variant: 'error',
                                    autoHideDuration: 1000,
                                });
                                return 'remove';
                            }
                        }
                    }}
                />
            )}

            {readonly ? (
                <Box
                    component={'a'}
                    download
                    href={course?.thumbnail ?? ''}
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
                        gridRow: '8 / span 7',
                    }}
                >
                    <Image
                        src={course?.thumbnail ?? ''}
                        errorIcon={false}
                    />
                </Box>
            ) : (
                <UploadFileInput
                    required
                    sx={{
                        gridColumn: 'auto',
                        gridRow: '8 / span 7',
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
                    inputFileTypes="image/png,image/jpg,image/jpeg,image/bmp"
                    inputName={'thumbnail'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const regex = /image\/(png|jpg|jpeg|bmp)/;
                        const file = e.currentTarget.files && e.currentTarget.files[0];
                        if (!file || !RegExp(regex).exec(file.type)) {
                            enqueueSnackbar('الرجاء تحميل صورة', {
                                variant: 'warning',
                                autoHideDuration: 1000 * 3,
                            });
                            return 'remove';
                        }
                    }}
                />
            )}

            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '1',
                }}
            >
                مدة الدورة
            </Typography>
            {
                <TextField
                    name={'duration'}
                    disabled={readonly}
                    defaultValue={course?.duration}
                    //@ts-ignore
                    color='purple'
                    sx={{
                        gridColumn: '1',
                    }}
                />
            }
            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '2',
                    gridRow: '15',
                }}
            >
                لغة الدورة
            </Typography>
            {
                <Select
                    displayEmpty
                    name={'language'}
                    disabled={readonly}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setCourseLang(e.target.value);
                    }}
                    value={courseLang}
                    //@ts-expect-error
                    color='purple'
                    sx={{
                        gridColumn: '2',
                    }}
                >
                    <MenuItem value={'Arabic'} color={'purple'}>
                        {englishToArabicLang('Arabic')}
                    </MenuItem>
                    <MenuItem value={'English'}>
                        {englishToArabicLang('English')}
                    </MenuItem>
                    <MenuItem value={'French'}>
                        {englishToArabicLang('French')}
                    </MenuItem>
                </Select>
            }
            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: '1',
                }}
            >
                البرامج المستخدمة
            </Typography>
            {
                <TextField
                    disabled={readonly}
                    name={'used_programs'}
                    defaultValue={course?.used_programs}
                    //@ts-ignore
                    color='purple'
                    sx={{
                        gridColumn: '1',
                    }}
                />
            }

        </>
    );
}

