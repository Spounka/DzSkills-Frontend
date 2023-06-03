import { Stack, Typography } from '@mui/material';
import {
    QueryObserverIdleResult,
    QueryObserverSuccessResult,
} from 'react-query';
import { v4 as uuid } from 'uuid';
import { AdminConfig } from '../../../../types/AdminConfig';
import { ColoredInputStack } from './ColoredInputStack';
import { SettingSectionRow } from './SettingSectionRow';
import { SettingsSectionRowInput } from './SettingsSectionRowInput';
import { UploadImageInput } from './UploadImageInput';

interface FirstSectionProps {
    adminConfigQuery:
        | QueryObserverIdleResult<AdminConfig, unknown>
        | QueryObserverSuccessResult<AdminConfig, unknown>;
}
export function FirstSectionConfig({ adminConfigQuery }: FirstSectionProps) {
    const imagesWithUUID = adminConfigQuery.data?.images.map(image => {
        return { ...image, key: uuid() };
    });

    return (
        <Stack
            gap={3}
            justifyContent={'center'}
        >
            <SettingSectionRow>
                <SettingsSectionRowInput
                    inputLabel={'العنوان الرئيسي'}
                    titleInputName={'main_title_text.content'}
                    multiline={false}
                    defaultValue={
                        adminConfigQuery.data?.main_title_text.content || ''
                    }
                />

                <ColoredInputStack
                    inputName={'main_title_text.color'}
                    defaultValue={adminConfigQuery.data?.main_title_text.color}
                />
            </SettingSectionRow>
            <SettingSectionRow>
                <SettingsSectionRowInput
                    inputLabel={'النص الثانوي'}
                    titleInputName={'secondary_title_text.content'}
                    multiline={true}
                    defaultValue={
                        adminConfigQuery.data?.secondary_title_text.content
                    }
                />

                <ColoredInputStack
                    inputName={'secondary_title_text.color'}
                    defaultValue={
                        adminConfigQuery.data?.secondary_title_text.color
                    }
                />
            </SettingSectionRow>
            <>
                <Typography color="gray.main">الصور الرئيسية</Typography>
                <Stack
                    direction="row"
                    gap={4}
                    px={10}
                >
                    {imagesWithUUID?.map((image, index) => {
                        return (
                            <UploadImageInput
                                key={image.key}
                                src={image.image || ''}
                                name={`images[${index}].image`}
                            />
                        );
                    })}
                </Stack>
            </>
        </Stack>
    );
}
