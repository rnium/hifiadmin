import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated, setData, setLoaded } from '@/redux/accountReducer';;
import { useGet } from './useApi';
import { useCallback, useEffect } from 'react';

export const useUser = () => {
    const userInfo = useSelector(state => state.account.data);
    const userIsAuthenticated = useSelector(state => state.account.isAuthenticated);
    const userIsLoaded = useSelector(state => state.account.isLoaded);
    const dispatch = useDispatch();
    const { data, loading, success, error, perform_get } = useGet(process.env.NEXT_PUBLIC_API_HOST + 'auth/users/me/')


    useEffect(() => {
        if (!userIsLoaded) {
            perform_get();
        }
    }, [])

    useEffect(() => {
        if ( !userIsLoaded && !loading && success && data) {
            dispatch(setData(data));
            dispatch(setLoaded(true));
            dispatch(setAuthenticated(true));
        } else if (error) {
            dispatch(setLoaded(true));
            dispatch(setAuthenticated(false));
        }
    }, [data, success, error])
    
    return {userInfo, userIsAuthenticated, userIsLoaded, loadingUser: loading};
}