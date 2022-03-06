import axios from "axios";
import { APIResponse } from "types";
import { errorToast, fecthLocalstorage } from "./helper";

const token = fecthLocalstorage()?.token ?? false;
export const
    redirectHome = () => {
        if (typeof window !== undefined) {
            window.localStorage.removeItem("_simba");
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        }
    },
    getAuth = async () => {
        try {
            const response = await axios.get(`/api/v1/user/auth`, {
                headers: {
                    token: `${token}`,
                }
            });
            const result = await response.data as APIResponse;
            console.log("API RESULT", result);
            if (!result.status) {
                errorToast(result.message);
                redirectHome();
            }
            return result;
        } catch (error: any) {
            if (error.response.status == 401) {
                errorToast("you have been logged out, please login again");
            } else {
                errorToast(error.message);
            }
            redirectHome();
        }
    },
    get = async (endpoint: string) => {
        try {
            const response = await axios.get(`/api/v1/${endpoint}`, {
                headers: {
                    token: `${token}`,
                }
            });
            const result = await response.data as APIResponse;
            if (!result.status) {
                errorToast(result.message);
            }
            return result;
        } catch (error: any) {
            errorToast(error.message);
            // redirectHome();
        }
    },
    post = async (endpoint: string, data: any) => {
        try {
            const response = await axios.post(`/api/v1/${endpoint}`, data, {
                headers: {
                    token: `${token}`,
                }
            });
            const result = response.data as APIResponse;
            if (!result.status) {
                errorToast(result.message);
            }
            return result;
        } catch (error: any) {
            errorToast(error.message);
        }
    };
