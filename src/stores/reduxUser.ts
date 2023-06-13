import { useSelector } from 'react-redux';
import { RootState } from './store';

const useReduxData = () => {
    const reduxStore = {
        user: useSelector((state: RootState) => state.user),
    };
    return reduxStore;
};
export default useReduxData;
