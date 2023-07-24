import {
    Box,
    Card,
    Container,
    IconButton,
    Rating,
    Stack,
    Tooltip,
    useTheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import avatarPlaceholder from '../../../../assets/png/avatar-placeholder.png';
import { MainButton } from '../../../../components/ui/MainButton';
import axiosInstance from '../../../../globals/axiosInstance';
import { AdminRating as UserRating } from '../../../../types/AdminConfig';
import useLogin from '../../../authenticate/hooks/useLogin';
import AdminDashboardLayout from '../../layout';
import { AdminInfoSidebar } from '../AdminInfoSidebar';
import { CategoriesSection } from './CategoriesSection';
import { CertificateSection } from './CertificateSection';
import { FirstSectionConfig } from './FirstSectionConfig';
import { SettingsSection } from './SettingsSection';
import { SettingsSectionRowInput } from './SettingsSectionRowInput';
import { UploadImageInput } from './UploadImageInput';
import { getAdminConfigs } from './api/query';

import { ReactComponent as AddImage } from '../../../../assets/svg/add-button-blue.svg';
import { ReactComponent as RightArrow } from '../../../../assets/svg/arrow-right-blue.svg';

function LandingPageSettings() {
    useLogin();

    return (
        <AdminDashboardLayout topbar_title={'الإعدادت'}>
            <Box
                display="flex"
                width={'100%'}
                gap={4}
            >
                <AdminInfoSidebar />
                <LandingPageSettingsForm />
            </Box>
        </AdminDashboardLayout>
    );
}
export default LandingPageSettings;

function LandingPageSettingsForm() {
    const theme = useTheme();
    const adminConfigQuery = useQuery({
        queryFn: () => getAdminConfigs(),
        queryKey: ['admin', 'configs'],
    });

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: theme.spacing(),
                height: '100%',
                width: '100%',
                py: 3,
                px: 4,
            }}
        >
            <Stack gap={5}>
                <SettingsSection title={'الواجهة الاولى'}>
                    <FirstSectionConfig adminConfigQuery={adminConfigQuery} />
                </SettingsSection>
                <SettingsSection title={'الأقسام'}>
                    <CategoriesSection />
                </SettingsSection>
                <SettingsSection title={'الشهادة'}>
                    <CertificateSection adminConfigQuery={adminConfigQuery} />
                </SettingsSection>
                <SettingsSection title={'التقييمات'}>
                    <RatingsSection />
                </SettingsSection>
            </Stack>
        </Card>
    );
}

function RatingsSection() {
    const theme = useTheme();
    const [ratings, setRatings] = useState<UserRating[]>([]);
    const [currentRatingIndex, setCurrentRatingIndex] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<UserRating | undefined>();

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const getRatingsQuery = useQuery({
        queryKey: ['admin', 'configs', 'ratings'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/configs/ratings/');
            return data as UserRating[];
        },
        onSuccess: res => {
            setRatings(res);
            setSelectedRating(res.at(0) ?? undefined);
        },
    });
    const submitRatingMutation = useMutation({
        mutationKey: ['admin', 'configs', 'ratings', 'mutation'],
        mutationFn: async (body: FormData) => {
            const { data } = await axiosInstance.post('/configs/ratings/', body);
            return data as UserRating;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'configs', 'ratings']);
            enqueueSnackbar('تم إنشاء التقييم بنجاح', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ ، حاول مرة أخرى في وقت لاحق', {
                variant: 'error',
            });
        },
    });

    const upadateRatingMutation = useMutation({
        mutationKey: ['admin', 'configs', 'ratings', 'mutation'],
        mutationFn: async ({ id, body }: { id: number; body: FormData }) => {
            const { data } = await axiosInstance.patch(`/configs/ratings/${id}/`, body);
            return data as UserRating;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'configs', 'ratings']);
            enqueueSnackbar('تم تحديث التقييم بنجاح', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ ، حاول مرة أخرى في وقت لاحق', {
                variant: 'error',
            });
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const image = formData.get('image') as File;
        if (image.size === 0 || image.name === '') formData.delete('image');
        if (selectedRating?.image || selectedRating?.full_name)
            upadateRatingMutation.mutate({ id: selectedRating.id, body: formData });
        else submitRatingMutation.mutate(formData);
    };

    const nextRating = () => {
        setCurrentRatingIndex(i => ++i % ratings.length);
    };

    const previousRating = () => {
        setCurrentRatingIndex(i => --i % ratings.length);
    };

    const addRating = () => {
        setRatings(rates => [
            ...rates,
            { id: 0, description: '', image: '', rating: 0, full_name: '' },
        ]);
    };

    useEffect(() => {
        console.log('rating changed');
        setSelectedRating(ratings[currentRatingIndex]);
    }, [currentRatingIndex]);

    return (
        <Box
            sx={{
                position: 'relative',
                px: 8,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                gap: 4,
            }}
        >
            <form
                onSubmit={onSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
                <Stack
                    gap={8}
                    px={4}
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <UserRatingComponent rating={selectedRating} />
                </Stack>

                <Stack
                    direction="row"
                    gap={2}
                    justifyContent={'center'}
                >
                    {selectedRating && (
                        <MainButton
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
                </Stack>
            </form>
            {currentRatingIndex > 0 && (
                <Tooltip title={'القسم السابق'}>
                    <IconButton
                        disabled={currentRatingIndex === 0}
                        onClick={previousRating}
                        sx={{
                            position: 'absolute',
                            right: '0%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        {currentRatingIndex > 0 && <RightArrow />}
                    </IconButton>
                </Tooltip>
            )}

            {currentRatingIndex === ratings.length - 1 ? (
                selectedRating?.image && (
                    <Tooltip title={'إضافة قسم'}>
                        <IconButton
                            onClick={addRating}
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
                        onClick={nextRating}
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

interface UserRatingProps {
    rating?: UserRating;
}
function UserRatingComponent({ rating }: UserRatingProps) {
    const [currentRating, setCurrentRating] = useState(rating?.rating ?? 0);

    useEffect(() => {
        setCurrentRating(rating?.rating ?? 0);
    }, [rating?.rating]);

    return (
        <>
            <Stack
                gap={4}
                width={'100%'}
                alignContent={'center'}
                flex={'1 1 85%'}
            >
                <SettingsSectionRowInput
                    inputLabel={'الاسم الكامل'}
                    titleInputName={'full_name'}
                    defaultValue={rating?.full_name ?? ''}
                    required
                />
                <SettingsSectionRowInput
                    inputLabel={'وصف'}
                    titleInputName={'description'}
                    defaultValue={rating?.description ?? ''}
                    multiline
                    required
                />
            </Stack>
            <Stack
                gap={2}
                justifyItems={'center'}
                justifyContent={'center'}
                alignItems={'center'}
                alignContent={'center'}
                width={'100%'}
                flex={'0 1 15%'}
            >
                <Rating
                    name="rating"
                    max={5}
                    size="large"
                    value={currentRating}
                    onChange={(e, v) => setCurrentRating(v ?? 0)}
                />
                <UploadImageInput
                    src={rating?.image ?? avatarPlaceholder}
                    name={'image'}
                    required
                />
            </Stack>
        </>
    );
}
