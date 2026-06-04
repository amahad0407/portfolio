import fs from 'fs'
import path from 'path'
import { Project, ProjectInput } from '@/types'

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json')

function safeRead(): Project[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return []
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as Project[]
  } catch {
    return []
  }
}

function safeWrite(projects: Project[]): void {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2))
  } catch {
    // Vercel's serverless filesystem is read-only — writes are no-ops in production
  }
}

export function readProjects(): Project[] {
  return safeRead()
}

export function writeProjects(projects: Project[]): void {
  safeWrite(projects)
}

export function findById(id: string): Project | undefined {
  return readProjects().find((p) => p.id === id)
}

export function createProject(input: ProjectInput): Project {
  const projects = readProjects()
  const now = new Date().toISOString()
  const project: Project = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: now,
    updatedAt: now,
  }
  writeProjects([...projects, project])
  return project
}

export function updateProject(id: string, input: Partial<ProjectInput>): Project | null {
  const projects = readProjects()
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return null
  const updated: Project = { ...projects[index], ...input, updatedAt: new Date().toISOString() }
  projects[index] = updated
  writeProjects(projects)
  return updated
}

export function deleteProject(id: string): boolean {
  const projects = readProjects()
  const filtered = projects.filter((p) => p.id !== id)
  if (filtered.length === projects.length) return false
  writeProjects(filtered)
  return true
}
