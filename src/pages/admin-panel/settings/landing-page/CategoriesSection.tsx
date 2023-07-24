import {
    Box,
    ButtonGroup,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ReactComponent as AddImage } from '../../../../assets/svg/add-button-blue.svg';
import { ReactComponent as RightArrow } from '../../../../assets/svg/arrow-right-blue.svg';
import { MainButton } from '../../../../components/ui/MainButton';
import axiosInstance from '../../../../globals/axiosInstance';
import { Category } from '../../../../types/course';
import { getCategories } from '../../categories-hashtags/api/queries';
import { CategoryItem } from './CategoryItemProps';

export function CategoriesSection() {
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const theme = useTheme();

    const getCategoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        onSuccess: res =>
            setCategoriesList(_ => {
                setSelectedCategory(res[0]);
                return res;
            }),
    });
    const updateCategoryMutation = useMutation({
        mutationKey: ['categories', 'update'],
        mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
            const { data } = await axiosInstance.patch(
                `/courses/categories/${id}/`,

                formData
            );
            return data as Category;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            enqueueSnackbar('تم تحديث القسم بنجاح', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ أثناء معالجة طلبك', { variant: 'error' });
        },
    });
    const createCategoryMutation = useMutation({
        mutationKey: ['categories', 'create'],
        mutationFn: async (body: FormData) => {
            const { data } = await axiosInstance.post(`/courses/categories/`, body);
            return data as Category;
        },
        onSuccess: () => {
            enqueueSnackbar('تم إنشاء القسم بنجاح', { variant: 'success' });
            queryClient.invalidateQueries('categories');
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ أثناء معالجة طلبك', { variant: 'error' });
        },
    });

    const deleteCategoryMutation = useMutation({
        mutationKey: ['categories', 'delete'],
        mutationFn: async (id: number) => {
            const { data } = await axiosInstance.delete(`/courses/categories/${id}/`);
            return data;
        },
        onSuccess: () => {
            enqueueSnackbar('تم حذف القسم بنجاح', { variant: 'success' });
            queryClient.invalidateQueries('categories');
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ أثناء معالجة طلبك', { variant: 'error' });
        },
    });

    const nextCategory = () => {
        setCurrentCategoryIndex(i => ++i % categoriesList.length);
    };
    const previousCategory = () => {
        setCurrentCategoryIndex(i => Math.abs(--i % categoriesList.length));
    };
    const addCategory = () => {
        setCategoriesList(l => [
            ...l,
            { name: '', courses: 0, id: 0, image: '', description: '' },
        ]);
        setCurrentCategoryIndex(c => ++c);
    };
    const removeCategory = () => {
        deleteCategoryMutation.mutate(selectedCategory?.id ?? 0);
    };

    const updateOrCreateCategory = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (selectedCategory?.name)
            updateCategoryMutation.mutate({
                id: selectedCategory?.id ?? 0,
                formData: formData,
            });
        else createCategoryMutation.mutate(formData);
    };

    useEffect(() => {
        if (categoriesList.length > 0)
            setSelectedCategory(categoriesList[currentCategoryIndex]);
    }, [getCategoriesQuery.data]);

    useEffect(() => {
        setCategoriesList(getCategoriesQuery.data ?? []);
        setSelectedCategory(categoriesList.at(0));
    }, []);
    useEffect(() => {
        if (isNaN(currentCategoryIndex)) setCurrentCategoryIndex(0);
        else if (currentCategoryIndex < 0)
            setCurrentCategoryIndex(categoriesList.length - 1);
        else setSelectedCategory(categoriesList[currentCategoryIndex]);
    }, [currentCategoryIndex]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                position: 'relative',
                width: '100%',
                minHeight: '200px',
                pb: 4,
            }}
        >
            {currentCategoryIndex > 0 && (
                <Tooltip title={'القسم السابق'}>
                    <IconButton
                        disabled={currentCategoryIndex === 0}
                        onClick={previousCategory}
                        sx={{
                            position: 'absolute',
                            righ: '0%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        {currentCategoryIndex > 0 && <RightArrow />}
                    </IconButton>
                </Tooltip>
            )}

            <form
                onSubmit={updateOrCreateCategory}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(3),
                    width: '100%',
                }}
            >
                <Box px={10}>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        gap={15}
                    >
                        <CategoryItem category={selectedCategory} />
                    </Stack>
                </Box>

                <Typography
                    textAlign={'center'}
                    color={'purple.main'}
                >
                    {`${currentCategoryIndex + 1} / ${categoriesList.length}`}
                </Typography>
                <ButtonGroup
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    {selectedCategory?.name && (
                        <MainButton
                            onClick={() => removeCategory()}
                            type="button"
                            text={'حذف'}
                            color={theme.palette.error.main}
                        />
                    )}

                    <MainButton
                        type="submit"
                        text={'حفظ'}
                        color={theme.palette.primary.main}
                    />
                </ButtonGroup>
            </form>

            {currentCategoryIndex === categoriesList.length - 1 ? (
                selectedCategory?.image && (
                    <Tooltip title={'إضافة قسم'}>
                        <IconButton
                            onClick={addCategory}
                            sx={{
                                position: 'absolute',
                                left: '0%',
                                top: '50%',
                                scale: '-1 1',
                                transform: 'translateY(-50%)',
                            }}
                        >
                            <AddImage />
                        </IconButton>
                    </Tooltip>
                )
            ) : (
                <Tooltip title={'القسم التالي'}>
                    <IconButton
                        onClick={nextCategory}
                        sx={{
                            position: 'absolute',
                            left: '0%',
                            top: '50%',
                            scale: '-1 1',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <RightArrow />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}
