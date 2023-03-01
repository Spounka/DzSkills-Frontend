import { Typography, TextField } from '@mui/material'
import { MainButton } from '../../../../components/ui/MainButton'
import theme from '../../../../theme'


function PasswordForgottenEmailSection({ onNextButtonClick }: any) {
    return (
        <>
            <Typography textAlign={"center"} variant={'h5'} fontWeight={500} sx={{
                textDecoration: 'underline',
                padding: 0
            }}>
                نسيت كلمة السر
            </Typography>

            <Typography textAlign={"center"} variant={'body2'} fontWeight={300} color={'gray.main'} style={{
                whiteSpace: 'pre-wrap'
            }} >

                {"قم بإدخال بريدك الإلكتروني حتى يتم إرسال\n رابط لإعادة تعيين كلمة السر الخاصة بك"}

            </Typography>

            <TextField name="email" type={'email'} variant="outlined"
                fullWidth color="secondary" placeholder="البريد الإلكتروني" size="small"
                sx={{
                    'fieldset': {
                        borderRadius: '0.5rem',
                        // @ts-ignore
                        borderColor: `${theme.palette.gray.light}`,
                        borderWidth: '2px',
                    },
                    '&:hover': {
                        // @ts-ignore
                        borderColor: `${theme.palette.gray.light}`,
                    }
                }}
                InputProps={{
                    sx: {
                        p: 1,
                        fontSize: '.8rem',

                    }
                }} />

            { // @ts-ignore
                <MainButton onClick={onNextButtonClick} text={'ارسال التأكيد'} color={theme.palette.secondary.main} />
            }
        </>
    )
}

export default PasswordForgottenEmailSection