import { Button, Card, Stack, Typography, useTheme } from '@mui/material';
import Image from 'mui-image';
import { useQuery } from 'react-query';
import UploadSvgIcon from '../../../../components/ui/UploadSvgIcon';
import useLogin from '../../../authenticate/hooks/useLogin';
import AdminDashboardLayout from '../../layout';
import { ColoredInputStack } from './ColoredInputStack';
import { SettingSectionRow } from './SettingSectionRow';
import { SettingsSection } from './SettingsSection';
import { SettingsSectionRowInput } from './SettingsSectionRowInput';
import { getAdminConfigs } from './api/query';
import { FileUpload } from '@mui/icons-material';
import { useState } from 'react';

function LandingPageSettings() {
    const theme = useTheme();

    useLogin();

    const adminConfigQuery = useQuery({
        queryFn: () => getAdminConfigs(),
        queryKey: ['admin', 'configs'],
    });

    if (adminConfigQuery.isError) return <>Admin Config Error...</>;
    if (adminConfigQuery.isLoading) return <>admin config loading...</>;

    return (
        <AdminDashboardLayout topbar_title={'الإعدادت'}>
            <form>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: theme.spacing(),
                        height: '100%',
                        py: 2,
                        px: 4,
                    }}
                >
                    <SettingsSection title={'الواجهة الاولى'}>
                        <Stack
                            gap={3}
                            justifyContent={'center'}
                        >
                            <SettingSectionRow>
                                <SettingsSectionRowInput
                                    inputTitle={'العنوان الرئيسي'}
                                    titleInputName={'main_title_text.content'}
                                    multiline={false}
                                    defaultValue={
                                        adminConfigQuery.data?.main_title_text
                                            .content || ''
                                    }
                                />

                                <ColoredInputStack
                                    inputName={'main_title_text.color'}
                                    defaultValue={
                                        adminConfigQuery.data?.main_title_text
                                            .color
                                    }
                                />
                            </SettingSectionRow>
                            <SettingSectionRow>
                                <SettingsSectionRowInput
                                    inputTitle={'النص الثانوي'}
                                    titleInputName={
                                        'secondary_title_text.content'
                                    }
                                    multiline={true}
                                    defaultValue={
                                        adminConfigQuery.data
                                            ?.secondary_title_text.content
                                    }
                                />

                                <ColoredInputStack
                                    inputName={'secondary_title_text.color'}
                                    defaultValue={
                                        adminConfigQuery.data
                                            ?.secondary_title_text.color
                                    }
                                />
                            </SettingSectionRow>
                            <>
                                <Typography color="gray.main">
                                    الصور الرئيسية
                                </Typography>
                                <Stack
                                    direction="row"
                                    gap={4}
                                    px={10}
                                >
                                    {adminConfigQuery.data?.images.map(
                                        image => {
                                            return (
                                                <UploadImageInput
                                                    src={image.image || ''}
                                                />
                                            );
                                        }
                                    )}
                                </Stack>
                            </>
                        </Stack>
                    </SettingsSection>
                </Card>
            </form>
        </AdminDashboardLayout>
    );
}
function UploadImageInput({ src }: any) {
    const theme = useTheme();

    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('');
    function onSectionImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputElement = e.target;
        let files: FileList | null = inputElement.files;
        if (files) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(files[0]);
        }
    }

    return (
        <Stack
            gap={2}
            alignItems={'center'}
            alignContent={'center'}
            sx={{
                aspectRatio: '1/1',
                width: '100%',
            }}
        >
            <Image
                src={imageSrc?.toString() || src}
                fit="contain"
                style={{
                    height: 'auto',
                    aspectRatio: '1',
                }}
            />
            <Button
                variant={'outlined'}
                disableRipple
                component="label"
                sx={{
                    borderRadius: '100%',
                    height: theme.spacing(10),
                    width: theme.spacing(10),
                    aspectRatio: '1/1',
                    bgcolor: theme.palette.purple.main,
                    borderColor: theme.palette.purple.main,
                    borderWidth: '2px',
                    // p: 8,

                    '&:hover': {
                        bgcolor: 'white',
                        borderColor: theme.palette.purple.main,
                        borderWidth: '2px',

                        '.MuiButton-startIcon': {
                            color: theme.palette.purple.main,
                        },
                    },
                    '.MuiButton-startIcon': {
                        alignSelf: 'center',
                        justifySelf: 'center',
                        color: 'white',
                        m: 0,
                    },
                }}
                startIcon={
                    <FileUpload sx={{ width: '100%', height: '100%' }} />
                }
            >
                <input
                    type="file"
                    accept="image/*,image/svg+xml"
                    onChange={onSectionImageChange}
                    style={{
                        width: 1,
                        height: 1,
                    }}
                />
            </Button>
        </Stack>
    );
}

export default LandingPageSettings;
