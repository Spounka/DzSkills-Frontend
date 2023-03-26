import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import NotFound from '../not-found/NotFound'

function WatchCourse() {
    const params = useParams()

    if (!params || !params.id)
        return <Typography>Error</Typography>

    // @ts-ignore
    if (isNaN(params.id))
        return <NotFound />

    const id: number = parseInt(params.id)
    return (
        <div>WatchCourse</div>
    )
}

export default WatchCourse