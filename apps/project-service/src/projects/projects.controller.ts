import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { JwtAuthGuard } from '../common/jwt-auth.guard'

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: any, @Request() req) {
    return this.projectsService.create(body, req.user.userId)
  }

  @Get()
  async findAll(@Query('visibility') visibility: string, @Request() req) {
    const userId = req.user?.userId
    return this.projectsService.findAll(userId, visibility)
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findMyProjects(@Request() req) {
    return this.projectsService.findByOwner(req.user.userId)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user?.userId
    return this.projectsService.findById(id, userId)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() body: any, @Request() req) {
    return this.projectsService.update(id, body, req.user.userId)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Request() req) {
    await this.projectsService.delete(id, req.user.userId)
    return { message: 'Project deleted successfully' }
  }

  @Post(':id/star')
  @UseGuards(JwtAuthGuard)
  async star(@Param('id') id: string) {
    await this.projectsService.star(id)
    return { message: 'Project starred' }
  }

  @Delete(':id/star')
  @UseGuards(JwtAuthGuard)
  async unstar(@Param('id') id: string) {
    await this.projectsService.unstar(id)
    return { message: 'Project unstarred' }
  }
}
