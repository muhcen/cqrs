import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListByIdTaskQuery } from '../queries/list-by-id-task';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@QueryHandler(ListByIdTaskQuery)
export class ListByIdTaskHandler implements IQueryHandler<ListByIdTaskQuery> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  execute(query: ListByIdTaskQuery): Promise<Task> {
    const { id } = query;
    const objectId = new ObjectId(id); // Convert string to ObjectID

    return this.taskRepository.findOne({ where: { _id: objectId } });
  }
}
