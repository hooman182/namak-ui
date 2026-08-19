import { apiAxios, endpoints } from "@/utils/axios";

export default {
    list: () =>
        apiAxios.get(endpoints.letterImage.list),

    details: (id: string) =>
        apiAxios.get(endpoints.letterImage.details(id)),

    upload: (data: FormData) =>
        apiAxios.post(endpoints.letterImage.create, data, {
            headers: { "Content-Type": "multipart/form-data" },
        }),

    delete: (id: string) =>
        apiAxios.delete(endpoints.letterImage.delete(id)),
};
