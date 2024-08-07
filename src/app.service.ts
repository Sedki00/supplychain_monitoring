import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor (@Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka)
  {}

  async onModuleInit() {
    this.kafkaService.subscribeToResponseOf('lear.public.product');
    await this.kafkaService.connect();  
  }

  @MessagePattern('lear.public.product')
  async handleMyTableUpdate(data: any){
    console.log(data);
    //Handle data change
  }

}
