import { useSelector } from 'react-redux';
import { RootState } from './store';

const useReduxData = () => {
    return {
        user: useSelector((state: RootState) => state.user),
    };
};
export default useReduxData;
