import type { LetterFormData } from "@/types/letter";

import { apiAxios, endpoints } from "@/utils/axios";

//---------------------------------------------------------------------------

export default {
    list: (params?: string) =>
        apiAxios.get(endpoints.places.list, { params }),

    details: (id: string) =>
        apiAxios.get(endpoints.places.details(id)),

    create: (data: LetterFormData) =>
        apiAxios.post(endpoints.places.create, data),

    update: (id: string, data: Partial<LetterFormData>) =>
        apiAxios.patch(endpoints.places.update(id), data),

    delete: (id: string) =>
        apiAxios.delete(endpoints.places.delete(id)),
};
