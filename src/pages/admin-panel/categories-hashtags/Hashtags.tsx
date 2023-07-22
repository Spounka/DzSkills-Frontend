import { Box, IconButton, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete-red.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg/edit.svg';
import axiosInstance from '../../../globals/axiosInstance';
import theme from '../../../theme';
import { Hashtag } from '../../../types/course';
import { DisplayTableDataGrid } from '../payment-management/DisplayTableDataGrid';
import AddItemPopup from '../settings/AddItemPopup';
import { AddButton } from './AddButton';
import { createHashtag, getHashtags } from './api/queries';
import { AddHashtagForm } from './components/AddHashtagForm';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'الاسم',

        width: 60,
        headerClassName: 'super-app-theme--header',

        flex: 1,
    },
    {
        field: 'members',
        headerName: 'الأعضاء',
        width: 60,
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'click',
        headerName: '',
        headerClassName: 'super-app-theme--header',
        flex: 0,
        width: 130,
        align: 'left',
        renderCell: params => {
            return (
                <Stack
                    direction="row"
                    gap={2}
                    justifyContent={'space-between'}
                >
                    <IconButton onClick={() => params.value.delete()}>
                        <DeleteIcon fill={'red'} />
                    </IconButton>
                    <IconButton
                        onClick={params.value.edit}
                        sx={{ maxHeight: theme.spacing(7), maxWidth: theme.spacing(7) }}
                    >
                        <EditIcon fill={theme.palette.secondary.main} />
                    </IconButton>
                </Stack>
            );
        },
    },
];
export function Hashtags() {
    const [popupOpen, setOpen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectedHashtag, setSelectedHashtag] = useState<Hashtag | undefined>(
        undefined
    );

    const { enqueueSnackbar } = useSnackbar();

    const hashtags = useQuery({
        queryKey: ['hashtags'],
        queryFn: () => getHashtags(),
    });

    const queryClient = useQueryClient();
    const hashtagMutation = useMutation({
        mutationFn: (data: FormData) => createHashtag(data),
        onSuccess: () => {
            enqueueSnackbar('تم إنشاء الهاشتاج بنجاح', { variant: 'success' });
            setOpen(false);
            queryClient.invalidateQueries('hashtags');
        },
    });

    const deleteHashtagMutation = useMutation({
        mutationKey: ['hashtags', 'delete'],
        mutationFn: async (id: number) => {
            const { data } = await axiosInstance.delete(`/courses/hashtags/${id}/`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['hashtags']);
            enqueueSnackbar('تمت إزالة الهاشتاج بنجاح', { variant: 'success' });
        },
        onError: () => {
            queryClient.invalidateQueries(['hashtags']);
            enqueueSnackbar('حدث خطأ ، حاول مرة أخرى في وقت لاحق', {
                variant: 'error',
            });
        },
    });

    const deleteSelectedHashtagsMutation = useMutation({
        mutationKey: ['hashtags', 'delete'],
        mutationFn: async (formData: FormData) => {
            const { data } = await axiosInstance.post(
                `/courses/hashtags/delete/`,
                formData
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['hashtags']);
            enqueueSnackbar('تمت إزالة الهاشتاج بنجاح', { variant: 'success' });
        },
        onError: () => {
            queryClient.invalidateQueries(['hashtags']);
            enqueueSnackbar('حدث خطأ ، حاول مرة أخرى في وقت لاحق', {
                variant: 'error',
            });
        },
    });
    const editHashtagMutation = useMutation({
        mutationKey: ['hashtags', 'edit'],
        mutationFn: async (values: FormData) => {
            const { data } = await axiosInstance.patch(
                `/courses/hashtags/${selectedHashtag?.id ?? ''}/`,
                values
            );
            return data;
        },
        onSuccess: () => {
            setAnchorEl(null);
            setSelectedHashtag(undefined);
            enqueueSnackbar('تم تحديث الهاشتاج بنجاح', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('فشل تحديث الهاشتاج', { variant: 'error' });
            setSelectedHashtag(undefined);
            setAnchorEl(null);
        },
    });

    const handleEditHashtag = (id: number, e: MouseEvent<HTMLElement>) => {
        const _hashtag = hashtags.data?.filter(h => h.id === id);
        if (_hashtag && _hashtag?.length > 0) {
            setSelectedHashtag(_hashtag[0]);
            setAnchorEl(e.currentTarget);
        }
    };

    const deleteHashtagArray = () => {
        const formData = new FormData();
        for (let i = 0; i < selectedRows.length; i++) {
            formData.set(`hashtags[${i}]`, selectedRows[i].toString());
        }
        deleteSelectedHashtagsMutation.mutate(formData);
    };

    const editHashtag = () => {
        const form = document.querySelector('form') as HTMLFormElement;
        if (!form) {
            enqueueSnackbar('حدث خطأ ، حاول مرة أخرى في وقت لاحق', { variant: 'error' });
            return;
        }
        const formData = new FormData(form);
        editHashtagMutation.mutate(formData);
    };

    useEffect(() => {
        if (selectedHashtag?.id) setOpen(true);
        else setOpen(false);
    }, [selectedHashtag?.id]);

    let rows = hashtags.data?.map((hashtag: Hashtag) => {
        return {
            id: hashtag.id,
            name: hashtag.name,
            members: hashtag.courses,
            click: {
                delete: () => deleteHashtagMutation.mutate(hashtag.id),
                edit: (e: MouseEvent<HTMLElement>) => handleEditHashtag(hashtag.id, e),
            },
        };
    });
    if (hashtags.isFetching || hashtags.isLoading) rows = [];
    return (
        <Box
            id={'main-container'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Typography>الوسوم</Typography>
                <Stack
                    direction={'row'}
                    gap={2}
                >
                    <IconButton
                        disableFocusRipple
                        disableRipple
                        disabled={selectedRows?.length === 0}
                        onClick={() => deleteHashtagArray()}
                        sx={{
                            fill: 'white',
                            color: 'white',
                            borderRadius: theme.spacing(0.5),
                            py: 1,
                            px: 2,
                            bgcolor: theme.palette.error.main,
                            transition: 'all 200ms ease',
                        }}
                    >
                        <Stack
                            direction="row"
                            gap={1}
                        >
                            <DeleteIcon fill="inherit" />
                            <Typography>حذف</Typography>
                        </Stack>
                    </IconButton>
                    <AddButton
                        title={'اضف وسم جديد'}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                            setOpen(true);
                            setAnchorEl(e.currentTarget);
                        }}
                    />
                </Stack>
            </Box>
            <Box sx={{ bgcolor: 'white' }}>
                <AddItemPopup
                    isOpen={popupOpen}
                    root={anchorEl ?? document.body}
                    width={document.getElementById('main-container')?.offsetWidth ?? 0}
                    closeDialog={() => setOpen(false)}
                >
                    <AddHashtagForm
                        selectedHashtag={selectedHashtag}
                        closeDialog={() => setOpen(false)}
                        mutation={
                            selectedHashtag
                                ? editHashtagMutation.mutate
                                : hashtagMutation.mutate
                        }
                    />
                </AddItemPopup>
                <DisplayTableDataGrid
                    checkbox
                    rows={rows}
                    columns={columns}
                    {...{
                        onRowSelectionModelChange: (newSelection: number[]) => {
                            setSelectedRows(newSelection);
                        },
                    }}
                />
            </Box>
        </Box>
    );
}
