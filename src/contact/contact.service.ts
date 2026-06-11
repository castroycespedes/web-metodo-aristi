import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly configService: ConfigService) {}

  async create(payload: CreateContactDto) {
    try {
      const transporter = nodemailer.createTransport({
        host: this.configService.get<string>('SMTP_HOST'),
        port: this.configService.get<number>('SMTP_PORT', 587),
        secure: this.configService.get<string>('SMTP_SECURE') === 'true',
        auth: {
          user: this.configService.get<string>('SMTP_USER'),
          pass: this.configService.get<string>('SMTP_PASS'),
        },
      });

      await transporter.sendMail({
        from:
          this.configService.get<string>('SMTP_FROM') ??
          this.configService.get<string>('SMTP_USER'),
        to: this.configService.get<string>('CONTACT_TO'),
        subject: `Nueva solicitud Metodo Aristi - ${payload.name}`,
        text: this.buildText(payload),
        html: this.buildHtml(payload),
      });

      return {
        success: true,
        message: 'Solicitud enviada correctamente.',
      };
    } catch {
      throw new InternalServerErrorException({
        success: false,
        message: 'No se pudo enviar la solicitud.',
      });
    }
  }

  private buildText(payload: CreateContactDto) {
    return [
      'Nueva solicitud de contacto Metodo Aristi',
      '',
      `Nombre: ${payload.name}`,
      `Telefono: ${payload.phone}`,
      `Edad: ${payload.age}`,
      `Mensaje: ${payload.message}`,
    ].join('\n');
  }

  private buildHtml(payload: CreateContactDto) {
    return `
      <h1>Nueva solicitud Metodo Aristi</h1>
      <p><strong>Nombre:</strong> ${payload.name}</p>
      <p><strong>Telefono:</strong> ${payload.phone}</p>
      <p><strong>Edad:</strong> ${payload.age}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${payload.message}</p>
    `;
  }
}
