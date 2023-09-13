import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledCard } from '../../components/StyledCard';

function NotFound() {
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '40dvh',
            py: 2,
        }}>
            <StyledCard sx={{
                textAlign: 'center',
                py: 4,
            }}>
                <Typography
                    fontFamily={'Montserrat Arabic'}
                    variant="h4"
                    fontWeight={300}
                >
                    404 Page Not found
                </Typography>
                <Link to={'/'}>
                    <Typography
                        color={'secondary'}
                        sx={{
                            textDecoration: 'underline',
                            mt: 2,
                        }}>
                        العودة إلى الصفحة الرئيسية
                    </Typography>
                </Link>

            </StyledCard>
        </Container>
    );
}

export default NotFound;
