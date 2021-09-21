import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  ///Documentation
  //http://localhost:3000/api 
  const config = new DocumentBuilder()
   .setTitle('Pagee Smooth API')
   .setDescription('My Page list API description')
   .setVersion('1.0')
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

  //CORS configuration object 
  app.enableCors();

  await app.listen(port);
 // console.log(`Application is running on: ${await app.getUrl()}`);//ERR_INVALID_REDIRECT cause of http-server Lib
}
bootstrap();
