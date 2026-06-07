import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle();
  }
}
