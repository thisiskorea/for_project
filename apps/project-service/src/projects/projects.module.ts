import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from './project.entity'
import { ProjectsService } from './projects.service'
import { ProjectsController } from './projects.controller'
import { JwtStrategy } from '../common/jwt.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectsService, JwtStrategy],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
