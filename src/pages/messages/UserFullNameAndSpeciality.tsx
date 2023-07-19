import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

interface UserDetailsProps {
    first_name: string;
    last_name: string;
    speciality: string;
}
export function UserFullNameAndSpeciality({
    first_name,
    last_name,
    speciality,
}: UserDetailsProps) {
    return (
        <Stack gap={1}>
            <Typography variant={'h6'}>{`${first_name} ${last_name}`}</Typography>
            <Typography
                variant={'caption'}
                color={'gray.main'}
            >
                {speciality}
            </Typography>
        </Stack>
    );
}
