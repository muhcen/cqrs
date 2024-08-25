import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListTaskQuery } from '../queries/list-task.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';

@QueryHandler(ListTaskQuery)
export class ListTaskHandler implements IQueryHandler<ListTaskQuery> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  execute(): Promise<Task[]> {
    return this.taskRepository.find();
  }
}
