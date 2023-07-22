import Stack from '@mui/material/Stack';
import { ReactComponent as SupportIcon } from '../../../assets/svg/chatroom-black.svg';
import { ReactComponent as Envelope } from '../../../assets/svg/envelope-gray.svg';
import theme from '../../../theme';
import { SupportCard } from './SupportCard';

export function SupportSection() {
    return (
        <Stack
            direction={{ xs: 'column', md: 'row' }}
            bgcolor={theme.palette.gray.secondary}
            py={theme.spacing(12)}
            gap={2}
            alignItems={'center'}
            justifyContent={'flex-start'}
            px={{
                xs: theme.spacing(4),
                lg: theme.spacing(45),
            }}
        >
            <SupportCard
                title={'تواصل مع الدعم'}
                subtitle={'Contact support'}
                hoverColor={theme.palette.primary.main}
                href={'/support/contact/'}
                Icon={SupportIcon}
            />
            <SupportCard
                title={'أرسل بريد إلكــــــتروني'}
                subtitle={'support@dzskills.com'}
                hoverColor={theme.palette.secondary.main}
                href={'mailto:support@dzskills.com'}
                Icon={Envelope}
            />
        </Stack>
    );
}
