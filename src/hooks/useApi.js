import axios from "axios";
import { useState, useCallback } from "react";

const postDefaultConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const deleteDefaultConfig = {
    headers: {}
}

export const usePost = (url, auth_required = true, config = postDefaultConfig) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setSuccess(false);
        setError(false);
    }, [])

    const perform_post = useCallback(async payload => {
        if (auth_required && config?.headers) {
            config.headers.Authorization = `Token ${localStorage.getItem('hifi_admin_t')}`;
        } else if (config?.headers?.Authorization) {
            delete config.headers.Authorization;
        }

        setLoading(true);
        try {
            let res = await axios.post(url, payload, config);
            setData(res.data);
            setSuccess(true);
            setError(null);
        } catch (error) {
            setSuccess(false);
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    }, [url, auth_required])
    return { data, loading, success, setSuccess, error, setError, perform_post, reset };
}

export const useGet = (initialUrl, auth_required = true, defaultData = null) => {
    const [url, setUrl] = useState(initialUrl);
    const [data, setData] = useState(defaultData);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);


    const perform_get = useCallback(async (params = {}) => {
        setLoading(true);
        let headers = {};
        if (auth_required) {
            headers.Authorization = `Token ${localStorage.getItem('hifi_admin_t')}`
        }
        
        try {
            let res = await axios.get(url, {
                params, headers
            });
            setData(res.data);
            setSuccess(true);
            setError(null);
        } catch (error) {
            setSuccess(false);
            setError(error?.response?.data ? error?.response?.data : "Error Occured");
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    }, [url, auth_required])

    const reset = useCallback(() => {
        setData(null);
        setLoaded(false);
        setLoading(false);
        setSuccess(false);
        setError(false);
    }, [])

    return { data, loaded, setLoaded, loading, success, error, perform_get, reset, url, setUrl };
}

export const useDelete = (initialUrl, config=deleteDefaultConfig, auth_required = true) => {
    const [url, setUrl] = useState(initialUrl);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const reset = useCallback(() => {
        setLoading(false);
        setSuccess(false);
        setError(false);
    }, [])

    const perform_delete = useCallback(async () => {
        if (auth_required) {
            config.headers.Authorization = `Token ${localStorage.getItem('hifi_admin_t')}`;
        }
        setLoading(true);
        try {
            await axios.delete(url, config);
            setSuccess(true);
            setError(null);
        } catch (error) {
            setSuccess(false);
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    }, [url, auth_required])
    return { loading, success, setSuccess, error, setError, perform_delete, reset, url, setUrl };
}