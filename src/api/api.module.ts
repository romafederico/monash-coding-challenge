import { Module } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { ContactService } from 'src/contact/contact.service';
import { ApiController } from './api.controller';

@Module({
  controllers: [ApiController],
  providers: [BookService, ContactService],
})
export class ApiModule {}
