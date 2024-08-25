import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'todo',
      //      synchronize: true,
      logging: true,
      entities: [Task],
    }),
    TaskModule,
  ],
})
export class AppModule {}
