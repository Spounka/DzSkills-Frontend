import {
    Box,
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TopNavigationBar from '../../../components/top-bar';
import useLogin from '../../authenticate/hooks/useLogin';
import { AdminContacts } from './AdminContacts';

export function ContactSupport() {
    const [user] = useLogin();

    return (
        <Grid
            container
            direction="column"
            spacing={5}
            id={'main-grid-container'}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100vw',
                width: '100%',
                boxSizing: 'border-box',
                maxHeight: '100%',
                px: '0 !important',
            }}
        >
            <Grid
                item
                pl={0}
                sx={{
                    px: '0 !important',
                }}
            >
                <TopNavigationBar />
            </Grid>

            <Grid
                item
                sx={{
                    backgroundColor: 'gray.secondary',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: '0 !important',
                }}
            >
                <ContactSupportPanels />
            </Grid>
        </Grid>
    );
}

function ContactSupportPanels() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                px: theme.spacing(26),
                width: '100%',
                height: '100%',
                maxHeight: '90vh',
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 2,
            }}
        >
            <SupportForm />
            <AdminContacts />
        </Box>
    );
}
function SupportForm() {
    return (
        <Card
            elevation={0}
            sx={{
                width: '100%',
                flexBasis: '60%',
                p: 4,
                px: 3,
            }}
        >
            <form
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0,
                }}
            >
                <FormControl
                    color="secondary"
                    sx={{ display: 'flex', width: '100%', gap: 2 }}
                >
                    <FormLabel>موضوع الطلب</FormLabel>
                    <RadioGroup
                        row
                        defaultValue={'issue'}
                        name={'type'}
                        sx={{ gap: 2 }}
                    >
                        <FormControlLabel
                            sx={{
                                px: 0,
                                mx: 0,
                                gap: 1,
                            }}
                            value="issue"
                            control={
                                <Radio
                                    size="small"
                                    color="purple"
                                    sx={{
                                        p: 0,
                                    }}
                                />
                            }
                            label={'مشاكل تقنية'}
                        />
                        <FormControlLabel
                            sx={{
                                px: 0,
                                mx: 0,
                                gap: 1,
                            }}
                            value="help"
                            control={
                                <Radio
                                    size="small"
                                    color="purple"
                                    sx={{
                                        p: 0,
                                    }}
                                />
                            }
                            label={'مساعدة'}
                        />
                        <FormControlLabel
                            sx={{
                                px: 0,
                                mx: 0,
                                gap: 1,
                            }}
                            value="report"
                            control={
                                <Radio
                                    size="small"
                                    color="purple"
                                    sx={{
                                        p: 0,
                                    }}
                                />
                            }
                            label={'إبلاغ عن مستخدم'}
                        />
                    </RadioGroup>
                </FormControl>
            </form>
        </Card>
    );
}

export default ContactSupport;
