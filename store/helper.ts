import { toast } from 'react-toastify';

export const
    successToast = (message: string) => {
        toast.success(message, {
            position: 'top-center',
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },
    errorToast = (message: string) => {
        toast.error(message, {
            position: 'bottom-center',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },
    saveLocalstorage = (token: string, user: object): boolean => {
        if (typeof window !== 'undefined') {
            if (token && user) {
                window.localStorage.setItem(
                    '_simba',
                    encodeURIComponent(
                        JSON.stringify({
                            token,
                            user,
                        })
                    )
                );
                return true;
            }
        }
        return false;
    },
    fecthLocalstorage = () => {
        if (typeof window !== 'undefined') {
            const data: any = window.localStorage.getItem('_simba');
            return JSON.parse(decodeURIComponent(data)) ?? false;
        }
    };