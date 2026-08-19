import axios from "axios";
import { toast } from "sonner";
import { CONFIG } from "@/config-global";

//---------------------------------------------------------------------------

export const apiAxios = axios.create({
    baseURL: CONFIG.serverUrl,
    withCredentials: true,
    headers: {
        "Accept-Language": "fa-IR, en-US;q=0.9",
        "Content-Type": "application/json",
    },
});

apiAxios.interceptors.request.use(
    (res) => res,
    (error) => {
        console.log(error);
        if (!error.response) {
            toast.error("خطایی هنگام اتصال به سرور رخ داده است");
        }
        if (error.response.status === 403 && !error?.response?.data) {
            toast.error("شما اجازه دسترسی به این بخش را ندارید");
        }
        if (error.response.status === 452) {
            toast.error(error?.response?.data?.error?.message);
        }
        if (error.response.status === 401) {
            localStorage.removeItem("Token");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error || "خطایی هنگام اتصال به سرور رخ داده است");
    },
);

//---------------------------------------------------------------------------

export const endpoints = {
    letter: {
        list: "letters/",
        details: (id: string) => `letters/${id}/`,
        create: "letters/",
        update: (id: string) => `letters/${id}/`,
        delete: (id: string) => `letters/${id}/`,
    },
    letterAttachment: {
        list: (letterId: string) => `letters/attachments/`,
        details: (letterId: string, attachId: string) => `letters/${letterId}/attachments/${attachId}/`,
        create: (letterId: string) => `letters/attachments/`,
        delete: (letterId: string, attachId: string) => `letters/${letterId}/attachments/${attachId}/`,
    },
    letterImage: {
        list: "letters/images/",
        details: (id: string) => `letters/images/images/${id}`,
        create: "letters/images/",
        delete: (id: string) => `letters/images/${id}/`,
    },
    places: {
        list: "places/",
        details: (id: string) => `places/${id}/`,
        create: "places/",
        update: (id: string) => `places/${id}/`,
        delete: (id: string) => `places/${id}/`,
    },
    terms: {
        list: "terms/",
        details: (id: string) => `terms/${id}/`,
        create: "terms/",
        update: (id: string) => `terms/${id}/`,
        delete: (id: string) => `terms/${id}/`,
    },
    auth: {
        create: "auth/jwt/create/",
        refresh: "auth/jwt/refresh/",
        verify: "auth/jwt/verify/",
        me: "auth/users/me/",
        update: "auth/users/me/",
        delete: "auth/users/me/",
    },
    userManagement: {
        list: "auth/users/",
        detail: (id: string) => `auth/users/${id}/`,
        update: (id: string) => `auth/users/${id}/`,
        delete: (id: string) => `auth/users/${id}/`,
    },
    userRegister: {
        post: "auth/users/",
    },
    passwordManagement: {

    },
    accountActivation: {}
};
