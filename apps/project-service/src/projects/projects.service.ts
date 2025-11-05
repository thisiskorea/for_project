import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from './project.entity'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) {}

  async create(projectData: Partial<Project>, userId: string): Promise<Project> {
    const project = this.projectsRepository.create({
      ...projectData,
      ownerId: userId,
    })
    return this.projectsRepository.save(project)
  }

  async findAll(userId?: string, visibility?: string): Promise<Project[]> {
    const query = this.projectsRepository.createQueryBuilder('project')

    if (visibility === 'public') {
      query.where('project.visibility = :visibility', { visibility: 'public' })
    } else if (userId) {
      query.where(
        '(project.ownerId = :userId OR project.visibility = :visibility)',
        { userId, visibility: 'public' }
      )
    } else {
      query.where('project.visibility = :visibility', { visibility: 'public' })
    }

    query.orderBy('project.created_at', 'DESC')

    return query.getMany()
  }

  async findById(id: string, userId?: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } })

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    // Check access permissions
    if (
      project.visibility !== 'public' &&
      (!userId || project.ownerId !== userId)
    ) {
      throw new ForbiddenException('Access denied')
    }

    // Increment view count
    await this.projectsRepository.increment({ id }, 'view_count', 1)

    return project
  }

  async findByOwner(ownerId: string): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { ownerId },
      order: { created_at: 'DESC' },
    })
  }

  async update(
    id: string,
    updateData: Partial<Project>,
    userId: string
  ): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } })

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    if (project.ownerId !== userId) {
      throw new ForbiddenException('You can only update your own projects')
    }

    await this.projectsRepository.update(id, updateData)
    return this.findById(id, userId)
  }

  async delete(id: string, userId: string): Promise<void> {
    const project = await this.projectsRepository.findOne({ where: { id } })

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    if (project.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own projects')
    }

    await this.projectsRepository.delete(id)
  }

  async star(id: string): Promise<void> {
    await this.projectsRepository.increment({ id }, 'star_count', 1)
  }

  async unstar(id: string): Promise<void> {
    await this.projectsRepository.decrement({ id }, 'star_count', 1)
  }
}
