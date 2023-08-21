import { Box, IconButton, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete-red.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg/edit.svg';
import axiosInstance from '../../../globals/axiosInstance';
import theme from '../../../theme';
import { Level } from '../../../types/course';
import { DisplayTableDataGrid } from '../payment-management/DisplayTableDataGrid';
import AddItemPopup from '../settings/AddItemPopup';
import { AddButton } from './AddButton';
import { createLevel, getLevels } from './api/queries';
import { AddLevelForm } from './components/AddLevelForm';

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
export function Levels() {
    const [popupOpen, setOpen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectedLevel, setSelectedLevel] = useState<Level | undefined>(undefined);
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const levels = useQuery({
        queryKey: ['levels'],
        queryFn: () => getLevels(),
    });

    const levelMutation = useMutation({
        mutationFn: (data: FormData) => createLevel(data),
        onSuccess: async () => {
            enqueueSnackbar('تم إنشاء الهاشتاج بنجاح', { variant: 'success' });
            setOpen(false);
            await queryClient.invalidateQueries('levels');
        },
    });

    const deleteLevelMutation = useMutation({
        mutationKey: ['levels', 'delete'],
        mutationFn: async (id: number) => {
            const { data } = await axiosInstance.delete(`/courses/levels/${id}/`);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['levels']);
            enqueueSnackbar('تمت إزالة المستوى بنجاح', { variant: 'success' });
        },
        onError: async () => {
            await queryClient.invalidateQueries(['hashtags']);
            enqueueSnackbar('حدث خطأ ، حاول مرة أخرى في وقت لاحق', {
                variant: 'error',
            });
        },
    });

    const deleteSelectedLevelsMutation = useMutation({
        mutationKey: ['levels', 'delete'],
        mutationFn: async (formData: FormData) => {
            const { data } = await axiosInstance.post(
                `/courses/levels/delete/`,
                formData
            );
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['hashtags']);
            enqueueSnackbar('تمت إزالة المستويات بنجاح', { variant: 'success' });
            setSelectedRows([]);
            setSelectedLevel(undefined);
        },
        onError: async () => {
            await queryClient.invalidateQueries(['hashtags']);
            enqueueSnackbar('حدث خطأ ، حاول مرة أخرى في وقت لاحق', {
                variant: 'error',
            });
            setSelectedRows([]);
            setSelectedLevel(undefined);
        },
    });
    const editLevelMutation = useMutation({
        mutationKey: ['level', 'edit'],
        mutationFn: async (values: FormData) => {
            const { data } = await axiosInstance.patch(
                `/courses/levels/${selectedLevel?.id ?? ''}/`,
                values
            );
            return data;
        },
        onSuccess: () => {
            setAnchorEl(null);
            setSelectedLevel(undefined);
            enqueueSnackbar('تم تحديث المستوى بنجاح', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('فشل تحديث المستوى', { variant: 'error' });
            setSelectedLevel(undefined);
            setAnchorEl(null);
        },
    });

    const handleEditLevel = (id: number, e: MouseEvent<HTMLElement>) => {
        const _level = levels.data?.filter(h => h.id === id);
        if (_level && _level?.length > 0) {
            setOpen(true);
            setSelectedLevel(_level[0]);
            setAnchorEl(e.currentTarget);
        }
    };

    const deleteLevelArray = () => {
        const formData = new FormData();
        for (let i = 0; i < selectedRows.length; i++) {
            formData.set(`levels[${i}]`, selectedRows[i].toString());
        }
        deleteSelectedLevelsMutation.mutate(formData);
    };
    useEffect(() => {
        if (selectedLevel?.id) setOpen(true);
        else setOpen(false);
    }, [selectedLevel?.id]);

    let rows = levels.data?.map((level: Level) => {
        return {
            id: level.id,
            name: level.name,
            members: level.courses,
            click: {
                delete: () => deleteLevelMutation.mutate(level.id),
                edit: (e: MouseEvent<HTMLElement>) => handleEditLevel(level.id, e),
            },
        };
    });
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
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Typography>المستويات</Typography>
                <Stack
                    direction={'row'}
                    gap={2}
                >
                    <IconButton
                        disableFocusRipple
                        disableRipple
                        disabled={selectedRows?.length === 0}
                        onClick={() => deleteLevelArray()}
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
                        title={'اضف مستوى جديد'}
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
                    <AddLevelForm
                        closeDialog={() => setOpen(false)}
                        selectedLevel={selectedLevel}
                        mutation={
                            selectedLevel
                                ? editLevelMutation.mutate
                                : levelMutation.mutate
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
