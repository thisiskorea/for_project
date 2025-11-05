// User types
export interface User {
  id: string
  email: string
  username: string
  fullName?: string
  bio?: string
  avatarUrl?: string
  institution?: string
  position?: string
  researchInterests?: string[]
  skills?: string[]
  createdAt: Date
  updatedAt: Date
}

// Project types
export interface Project {
  id: string
  name: string
  description?: string
  ownerId: string
  visibility: 'private' | 'team' | 'public'
  status: 'active' | 'archived' | 'deleted'
  thumbnailUrl?: string
  tags?: string[]
  techStack?: string[]
  starCount: number
  forkCount: number
  viewCount: number
  createdAt: Date
  updatedAt: Date
}

// Experiment types
export interface Experiment {
  id: string
  projectId: string
  name: string
  description?: string
  status: 'running' | 'completed' | 'failed'
  metrics?: Record<string, number>
  params?: Record<string, any>
  artifacts?: Record<string, string>
  durationSeconds?: number
  gpuHours?: number
  cost?: number
  createdBy: string
  createdAt: Date
  completedAt?: Date
}

// Paper types
export interface Paper {
  id: string
  title: string
  authors: Author[]
  abstract?: string
  keywords?: string[]
  categories?: string[]
  arxivId?: string
  doi?: string
  pdfUrl?: string
  publishedDate?: Date
  venue?: string
  citationsCount: number
  viewCount: number
  downloadCount: number
  bookmarkCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Author {
  name: string
  affiliation?: string
  email?: string
}

// Dataset types
export interface Dataset {
  id: string
  name: string
  description?: string
  ownerId: string
  visibility: 'private' | 'team' | 'public'
  sizeBytes: number
  fileCount: number
  format?: string
  license?: string
  tags?: string[]
  downloadCount: number
  starCount: number
  version: string
  storagePath?: string
  createdAt: Date
  updatedAt: Date
}

// Model types
export interface Model {
  id: string
  name: string
  description?: string
  ownerId: string
  projectId?: string
  visibility: 'private' | 'team' | 'public'
  framework?: string
  task?: string
  architecture?: string
  sizeBytes: number
  parametersCount?: number
  license?: string
  tags?: string[]
  downloadCount: number
  starCount: number
  version: string
  storagePath?: string
  metrics?: Record<string, number>
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
