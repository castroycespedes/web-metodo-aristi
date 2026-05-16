import { Injectable } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactService {
  create(payload: CreateContactDto) {
    return {
      message: "Solicitud de contacto recibida",
      data: {
        name: payload.name,
        email: payload.email ?? null,
        phone: payload.phone,
        age: payload.age
      },
      receivedAt: new Date().toISOString()
    };
  }
}
