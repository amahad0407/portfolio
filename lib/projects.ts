/**
 * Data access layer — all reads/writes to data/projects.json go through here.
 * To switch to a database later, replace only the functions below.
 */
import fs from 'fs'
import path from 'path'
import { Project, ProjectInput } from '@/types'

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json')

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
    fs.writeFileSync(DATA_FILE, '[]')
  }
}

export function readProjects(): Project[] {
  ensureFile()
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as Project[]
}

export function writeProjects(projects: Project[]): void {
  ensureFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2))
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
