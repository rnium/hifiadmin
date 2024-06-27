import { api_host } from "src/utils/data";
import { usePost } from "./useApi";
import { useEffect } from "react";

export const useLogin = () => {
    const {data, loading, success, error, perform_post} = usePost(api_host + 'account/admin/token/login/', false)
    useEffect(() => {
        if (data?.auth_token) {
            localStorage.setItem("hifi_admin_t", data.auth_token);
        }
    }, [data])
    return {success, loading, error, login: perform_post};
}