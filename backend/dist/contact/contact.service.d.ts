import { CreateContactDto } from "./dto/create-contact.dto";
export declare class ContactService {
    create(payload: CreateContactDto): {
        message: string;
        data: {
            name: string;
            email: string | null;
            phone: string;
            age: number;
        };
        receivedAt: string;
    };
}
