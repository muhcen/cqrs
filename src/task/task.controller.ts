import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './cqrs/commands/create-task.command';
import { ListTaskQuery } from './cqrs/queries/list-task.query';
import { ListByIdTaskQuery } from './cqrs/queries/list-by-id-task';
import { UpdateByCompletedCommand } from './cqrs/commands/update-by-completed.command';
import { DeleteTaskCommand } from './cqrs/commands/delete-task.command';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({
    schema: { type: 'object', properties: { description: { type: 'string' } } },
  })
  async create(@Body('description') description: string) {
    return this.commandBus.execute(new CreateTaskCommand(description));
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of tasks' })
  async find() {
    return this.queryBus.execute(new ListTaskQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task' })
  async findById(@Param('id') id: any) {
    return this.queryBus.execute(new ListByIdTaskQuery(id));
  }

  @Patch(':id/completed/:completed')
  @ApiOperation({ summary: 'Update the completion status of a task' })
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the task' })
  @ApiParam({
    name: 'completed',
    type: 'boolean',
    description: 'The completion status of the task',
  })
  async updateByCompleted(
    @Param('id') id: number,
    @Param('completed') completed: boolean,
  ) {
    return this.commandBus.execute(new UpdateByCompletedCommand(id, completed));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the task' })
  async delete(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteTaskCommand(id));
  }
}
