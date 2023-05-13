import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { User } from "../../types/user";

export function TeacherComponent({ user }: { user: User; }) {
    const theme = useTheme();
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <Box display={'flex'} flexDirection={'column'} gap={6} alignItems={'center'} mb={4} width={'100%'}>
                <Avatar src={user.profile_image} sx={{
                    width: theme.spacing(25),
                    height: 'auto',
                    aspectRatio: '1/1'
                }} />
                <Box display={'flex'} flexDirection={'column'} gap={4} alignItems={'center'} justifyContent={'end'}>
                    <Typography variant="h6">
                        {`${user.first_name} ${user.last_name}`}
                    </Typography>
                    <Typography variant="subtitle2" color="gray.main" textAlign={'center'} maxWidth={250}>
                        {user.description || 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى'}
                    </Typography>

                </Box>
            </Box>
        </Box>);
}
