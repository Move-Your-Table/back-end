import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BookingsResolver } from './bookings.resolver';

@Module({
  imports: [UsersModule],
  providers: [BookingsResolver],
  exports: []
})
export class BookingsModule {}