import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(createContactDto: CreateContactDto): {
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
