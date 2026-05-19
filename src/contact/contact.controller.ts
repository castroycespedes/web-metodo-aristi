import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('contact')
  create(@Body() payload: CreateContactDto) {
    return this.contactService.create(payload);
  }

  @Post('api/contact')
  createFromFrontendProxy(@Body() payload: CreateContactDto) {
    return this.contactService.create(payload);
  }
}
