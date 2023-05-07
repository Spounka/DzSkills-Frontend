import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Course } from "../../types/course";

interface props {
    data: Course,
    index: number,
    currentCourseIndex: number
}

export function BestCourseCard({ data, index, currentCourseIndex }: props) {
    const theme = useTheme();
    function getTransformValue() {
        if (index === currentCourseIndex)
            return 'translate(0, 0)'
        if (index > currentCourseIndex) {
            return 'translate(200%, 0)'
        }
        if (index < currentCourseIndex) {
            return 'translate(-200%, 0)'
        }
    }
    return (
        <Card elevation={0} sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            borderRadius: 0,
            gap: 0,
            zIndex: 2,
            position: 'absolute',
            transition: 'all ease-in 200ms',
            transform: getTransformValue()
        }}>


            <Box sx={{
                flexBasis: '50%',
                flexShrink: '1',
                display: 'flex',
                flexDirection: 'column',
                py: 2,
                px: 4,
                gap: 2
            }}>
                <Typography color={'gray.main'}>
                    {data.title}
                </Typography>
                <Divider sx={{
                    mx: -4
                }} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    gap: 2,
                    py: 2,
                    px: 0
                }}>
                    <Typography color={'#707070'} variant={'h3'} fontWeight={600}>
                        {data.title}
                    </Typography>
                    <Typography color={'gray.main'} variant={'subtitle2'} fontWeight={400}>
                        {`${data.owner.first_name} ${data.owner.last_name}`}
                    </Typography>
                    <Typography
                        color={'#707070'}
                        maxWidth={'70%'}
                        variant={'caption'}
                        fontWeight={300}
                        flexGrow={1}
                    >
                        {data.description}
                    </Typography>
                    <Box display="flex" justifyContent={"space-between"} alignItems={'center'}>
                        <Typography color={'#707070'} variant={'h4'} fontWeight={600}>
                            {`DA ${data.price}`}
                        </Typography>
                        <NavLink to={'/courses/' + data.id} style={{
                            textAlign: 'center',
                            verticalAlign: 'center',
                            paddingLeft: theme.spacing(5),
                            paddingRight: theme.spacing(5)
                        }}>
                            <Typography variant={'subtitle1'} fontWeight={600} color={'#393939'} style={{
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                borderBottom: '3px solid #393939'
                            }}>
                                المزيد
                            </Typography>
                        </NavLink>
                    </Box>
                </Box>

            </Box>
            <Box sx={{
                zIndex: 3,
                flexGrow: '1',
                flexBasis: '50%',
                width: '100%',
                height: '100%',
                minHeight: '100%',
                bgcolor: 'white',
                backgroundImage: `url('${data.thumbnail}')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%'
            }}>
            </Box>
        </Card>);
}
