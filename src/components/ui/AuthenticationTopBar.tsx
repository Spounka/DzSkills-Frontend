import { Grid } from '@mui/material';
import logo from '../../assets/svg/DzSkills.svg';

function AuthenticationTopBar() {
    return (
        <Grid item container xs={14} columns={13}>
            <Grid item xs={5}>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4} sx={{
                py: 4
            }}>
                <img src={logo} alt="" className="max-h-10 w-32" />
            </Grid>
        </Grid>
    )
}

export default AuthenticationTopBar