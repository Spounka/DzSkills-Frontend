import Card from '@mui/material/Card';
import OutlinedInput, {
    OutlinedInputProps,
} from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

const StyledOutline = styled(OutlinedInput)<OutlinedInputProps>(
    ({ theme }) => ({
        input: {},
        '[type="file"]': {
            display: 'flex',
            border: 'purple 1px dashed',
            clip: 'rect(0, 0, 0, 0)',
            overflow: 'hidden',
            padding: 0,
            // position: "absolute!important",
            // whiteSpace: "nowrap",
        },
        '&.MuiInputBase-adornedEnd': {},
        '.the-dude': {
            width: 'full',
            height: 'full',
            backgroundImage:
                'linear-gradient(black 33%, rgba(255, 255, 255, 0) 0%)',
            backgroundPosition: 'right',
            backgroundSize: '1px 3px',
            backgroundRepeat: 'repeat-y',
        },
    })
);

function Playground() {
    const theme = useTheme();
    return (
        <Card
            elevation={0}
            sx={{
                width: '80vw',
                height: '80vh',
                alignSelf: 'center',
                justifySelf: 'center',
                boxShadow: '7px 20px 40px #00000014',
                borderRadius: theme.spacing(),
                border: '#88888829 0.5px solid',
                m: 5,
                p: 5,
            }}
        >
            <StyledOutline
                type={'file'}
                color={'warning'}
                placeholder={'hello'}
                endAdornment={
                    <div className="the-dude">
                        <button>Hello there</button>
                        <p>pewdipie you suck</p>
                    </div>
                }
            />
        </Card>
    );
}

export default Playground;
