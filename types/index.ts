export interface Project {
  id: string
  name: string
  description: string
  /** Relative path like /uploads/foo.png or an external URL */
  image: string
  /** Live site URL or local file path */
  link: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
