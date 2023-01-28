import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceBusModule } from './service-bus/service-bus.module';

@Module({
  imports: [ServiceBusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
