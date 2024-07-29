import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated, setData, setLoaded } from 'src/redux/accountReducer';
import { useGet } from './useApi';
import { useEffect, useCallback } from 'react';
import { api_host } from "src/utils/data";

export const useUser = () => {
    const userInfo = useSelector(state => state.account.data);
    const userIsAuthenticated = useSelector(state => state.account.isAuthenticated);
    const userIsLoaded = useSelector(state => state.account.isLoaded);
    const dispatch = useDispatch();
    const { data, loading, success, error, perform_get } = useGet(api_host + 'auth/users/me/')


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

    const reset = useCallback(() => {
        dispatch(setLoaded(false));
        dispatch(setAuthenticated(false));
    }, [])
    
    return {userInfo, userIsAuthenticated, userIsLoaded, error, loadingUser: loading, reset};
}