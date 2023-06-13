import { Card, Stack, Typography, useTheme } from '@mui/material';
import { ReactComponent as CornerShape } from '../../../assets/svg/corner-shape-green.svg';
import { ReactComponent as EmailIconGreen } from '../../../assets/svg/email-green.svg';
import { ReactComponent as CallIconGreen } from '../../../assets/svg/phone-green.svg';
import { IconText } from './IconText';

export function AdminContacts() {
    const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                boxShadow: 'none',
                flexBasis: '40%',
                bgcolor: theme.palette.purple.light,
                width: '100%',
                py: theme.spacing(6),
                position: 'relative',
                height: '100%',
                color: 'white',
                display: 'flex',
            }}
        >
            <CornerShape
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                }}
            />
            <Stack
                gap={5}
                px={4}
                flexBasis={'80%'}
            >
                <Typography
                    variant={'h5'}
                    fontWeight={600}
                >
                    تواصل مع الدعم
                </Typography>

                <Typography
                    variant={'subtitle1'}
                    fontWeight={300}
                >
                    يمكنك التواصل معنا عبر الوسائط في الأسفل او كتابة انشغالك و سنتاكد من
                    الرد عليك في القريب العاجل
                </Typography>
                <Stack gap={2}>
                    <IconText
                        Icon={CallIconGreen}
                        text={'+213 555555555'}
                    />
                    <IconText
                        Icon={EmailIconGreen}
                        text={'slaxboude3la@gmail.com'}
                    />
                </Stack>
            </Stack>
        </Card>
    );
}
