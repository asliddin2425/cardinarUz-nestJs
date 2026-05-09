// // import { NestFactory } from '@nestjs/core';
// // import { ValidationPipe } from '@nestjs/common';
// // import { AppModule } from './app.module';
// // import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);

// //   app.setGlobalPrefix('api');

// //   app.useGlobalPipes(
// //     new ValidationPipe({
// //       whitelist: true,
// //       forbidNonWhitelisted: true,
// //       transform: true,
// //     }),
// //   );

// //   app.useGlobalInterceptors(new ResponseInterceptor());

// //   app.enableCors();

// //   const port = process.env.PORT || 4000;
// //   await app.listen(port);
// //   console.log(`🚀 Server running on http://localhost:${port}/api`);
// // }

// // bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
// import { AppModule } from './app.module';
// import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.setGlobalPrefix('api');

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   app.useGlobalInterceptors(new ResponseInterceptor());

//   app.enableCors();

//   // =========================
//   // 🔥 SWAGGER SETUP
//   // =========================
//   const config = new DocumentBuilder()
//     .setTitle('UzCardinar Backend API')
//     .setDescription('Production NestJS API (CQRS + Vertical Slice)')
//     .setVersion('1.0')
//     .addBearerAuth(
//       {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//       },
//       'access-token',
//     )
//     .build();

//   const document = SwaggerModule.createDocument(app, config);

//   SwaggerModule.setup('docs', app, document, {
//     swaggerOptions: {
//       persistAuthorization: true,
//     },
//   });

//   const port = process.env.PORT || 4000;

//   await app.listen(port);

//   console.log(`🚀 Server running on http://localhost:${port}/api`);
//   console.log(`📚 Swagger docs: http://localhost:${port}/docs`);
// }

// bootstrap();


import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('CardinarUz API')
    .setDescription('CardinarUz backend API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'JWT', // <-- shu nom @ApiBearerAuth('JWT') bilan mos keladi
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // sahifa yangilansa ham token saqlanadi
    },
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}/api`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();
