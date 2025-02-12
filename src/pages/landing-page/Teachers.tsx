import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../types/user';
import { getAllUsers } from '../admin-panel/user-management/api/getUsers';
import { TeacherComponent } from './TeacherComponent';

interface TeachersProps {}
export function Teachers({}: TeachersProps) {
    const theme = useTheme();
    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    });

    const teachers = query.data?.filter(user => user.is_favorite);
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            py={16}
            gap={8}
            alignItems={'center'}
        >
            <Box textAlign={'center'}>
                <Typography variant="h5">المدربون</Typography>
                <Typography
                    variant="subtitle2"
                    color={'gray.main'}
                    maxWidth={450}
                    textAlign={'center'}
                >
                    مجموعة من المبدعين و المحترفين يحرصون على ان تقديم افضل الدورات و
                    البرامج للطلبة في الموقع
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(1, minmax(0, 1fr))',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        md: 'repeat(3, minmax(0, 1fr))',
                    },
                    width: '100%',
                    px: theme.spacing(14),
                    alignItems: 'center',
                    pb: 5,
                }}
            >
                {teachers?.slice(0, 3).map((user: User) => {
                    return (
                        <TeacherComponent
                            key={uuidv4()}
                            user={user}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}
