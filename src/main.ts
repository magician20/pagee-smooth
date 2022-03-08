import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //get the config service
  const configservice = app.get(ConfigService);
  const port= configservice.get('PORT');    //overwrite if port taken ex: 3005 yarn start:dev
  ///Documentation
  //http://localhost:3000/api 
  const documentConfig = new DocumentBuilder()
   .setTitle('Pagee Smooth API')
   .setDescription('My Page list API description')
   .setVersion('1.0')
   .build();
 const document = SwaggerModule.createDocument(app, documentConfig);
 SwaggerModule.setup('api', app, document);

  //CORS configuration object
  if(process.env.NODE_ENV === 'development') {
    app.enableCors();
  }/*else{
    //app.enableCors({origin:});
  }
  */

  await app.listen(port);
 // console.log(`Application is running on: ${await app.getUrl()}`);//ERR_INVALID_REDIRECT cause of http-server Lib
}
bootstrap();
