import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import logo from '../../assets/svg/DzSkills.svg';
import IconFormPassword from '../../components/form/IconFormPassword';
import PasswordForgottenEmailSection from './components/email-validation';
import { useNavigate } from 'react-router-dom';

export function PasswordResetForm() {
    return (
        <>
            <Typography
                textAlign={'center'}
                variant={'h5'}
                fontWeight={500}
                sx={{
                    textDecoration: 'underline',
                    padding: 0,
                }}
            >
                نسيت كلمة السر
            </Typography>

            <Typography
                textAlign={'center'}
                variant={'body2'}
                fontWeight={300}
                color={'gray.main'}
                style={{
                    whiteSpace: 'pre-wrap',
                }}
            >
                {
                    'قم بإدخال بريدك الإلكتروني حتى يتم إرسال\n رابط لإعادة تعيين كلمة السر الخاصة بك'
                }
            </Typography>
            <IconFormPassword
                name="password1"
                placeholder={'هنا كلمة السر'}
            />
            <IconFormPassword
                name="password2"
                placeholder={'تأكيد كلمة السر'}
            />
        </>
    );
}

function getStageComponent(stage: number, moveNextStage: any) {
    switch (stage) {
        case 0:
            return (
                <PasswordForgottenEmailSection
                    onNextButtonClick={() => moveNextStage(1)}
                />
            );
        case 1:
            return <PasswordResetForm />;
    }
}

interface props {
    stage?: number;
}
function PasswordForgotten({ stage }: props) {
    const [currentStage, setCurrentStage] = useState(stage || 0);

    const redirect = useNavigate();
    const url = new URL(location.href);
    useEffect(() => {
        if (
            !url.searchParams.has('t') &&
            !url.searchParams.has('u') &&
            currentStage > 0
        ) {
            setCurrentStage(0);
            redirect('/password/reset/');
        }
    }, []);

    return (
        <Grid
            container
            direction="column"
            spacing={5}
            id={'main grid container'}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100%',
                height: '100%',
            }}
        >
            <Grid
                item
                xs={12}
                container
                p={0}
            >
                <Grid
                    item
                    xs={4}
                ></Grid>
                <Grid
                    item
                    xs={4}
                ></Grid>
                <Grid
                    item
                    xs={4}
                    sx={{
                        py: 4,
                        px: 4,
                    }}
                >
                    <img
                        src={logo}
                        alt=""
                        className="max-h-10 w-32"
                    />
                </Grid>
            </Grid>

            <Grid
                item
                xs={12}
                container
                sx={{
                    backgroundColor: 'gray.secondary',
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        width: '100%',
                        maxWidth: '100%',
                        marginBottom: '5rem',
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            gridColumnStart: 5,
                            gridColumnEnd: 9,
                            maxWidth: '100%',
                            minHeight: '70vh',
                            marginTop: 8,
                            py: 8,
                            px: 4,
                        }}
                    >
                        <Stack spacing={4}>
                            {getStageComponent(currentStage, setCurrentStage)}
                        </Stack>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}

export default PasswordForgotten;
