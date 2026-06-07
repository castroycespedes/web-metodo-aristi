import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: Number(process.env.PORT ?? 4001),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
}));
