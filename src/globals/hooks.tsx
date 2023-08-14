import { useNavigate, useParams } from 'react-router-dom';

function useRouteID() {
    const params = useParams();
    const navigate = useNavigate();

    if (!params?.id) navigate('/not-found/');

    if (isNaN(Number(params.id))) navigate('/not-found/');

    return parseInt(params.id as string);
}

export { useRouteID };