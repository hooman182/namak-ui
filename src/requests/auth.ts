import { apiAxios, endpoints } from "@/utils/axios";

export default {
    login: (data: { username: string; password: string }) =>
        apiAxios.post(endpoints.auth.create, data),

    register: (data: { username: string; password: string; fullName?: string }) =>
        apiAxios.post(endpoints.userRegister.post, data),

    refreshToken: (refreshToken: string) =>
        apiAxios.post(endpoints.auth.refresh, { refreshToken }),

    profile: () =>
        apiAxios.get(endpoints.auth.me),
};
