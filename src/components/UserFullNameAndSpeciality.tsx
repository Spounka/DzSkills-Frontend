import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { User } from '../types/user';

export function UserFullNameAndSpeciality({ user }: { user?: User }) {
    if (!user) return <></>;
    return (
        <Stack gap={1}>
            <Typography variant={'h6'}>
                {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography
                variant={'caption'}
                color={'gray.main'}
            >
                {user.speciality || 'speciality'}
            </Typography>
        </Stack>
    );
}
