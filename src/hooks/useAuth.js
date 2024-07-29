import { api_host, auth_endpoints } from "src/utils/data";
import { usePost } from "./useApi";
import { useEffect } from "react";


export const useLogin = () => {
    const { data, loading, success, error, perform_post } = usePost(`${api_host}${auth_endpoints.login}`, false);
    useEffect(() => {
        if (data?.auth_token) {
            localStorage.setItem("hifi_admin_t", data.auth_token);
        }
    }, [data])
    return { success, loading, error, login: perform_post };
}

export const useLogout = () => {
    const { success, error, perform_post } = usePost(`${api_host}${auth_endpoints.logout}`, true);
    useEffect(() => {
        if (success) {
            localStorage.removeItem("hifi_admin_t")
        }
    }, [success])
    return { logout: perform_post, success, error }
}