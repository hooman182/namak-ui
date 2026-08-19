import { apiAxios, endpoints } from "@/utils/axios";

export default {
    list: (letterId: string) =>
        apiAxios.get(endpoints.letterAttachment.list(letterId)),

    details: (letterId: string, attachId: string) =>
        apiAxios.get(endpoints.letterAttachment.details(letterId, attachId)),

    create: (letterId: string, data: FormData) =>
        apiAxios.post(endpoints.letterAttachment.create(letterId), data, {
            headers: { "Content-Type": "multipart/form-data" },
        }),

    delete: (letterId: string, attachId: string) =>
        apiAxios.delete(endpoints.letterAttachment.delete(letterId, attachId)),
};
