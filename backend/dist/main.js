"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const frontendUrl = configService.get("FRONTEND_URL", "http://localhost:3000,http://localhost:3001");
    const port = configService.get("PORT", 4000);
    app.setGlobalPrefix("api");
    app.enableCors({
        origin: frontendUrl.split(",").map((origin) => origin.trim()),
        credentials: true
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map