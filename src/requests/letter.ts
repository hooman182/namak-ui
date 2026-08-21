import type { LetterFormData } from "@/types/letter";

import { apiAxios, endpoints } from "@/utils/axios";

//---------------------------------------------------------------------------

export default {
    list: (params?: string) =>
        apiAxios.get(endpoints.letter.list, { params }),

    details: (id: string) =>
        apiAxios.get(endpoints.letter.details(id)),

    create: (data: LetterFormData) =>
        apiAxios.post(endpoints.letter.create, data),

    update: (id: string, data: Partial<LetterFormData>) =>
        apiAxios.patch(endpoints.letter.update(id), data),

    delete: (id: string) =>
        apiAxios.delete(endpoints.letter.delete(id)),
};
