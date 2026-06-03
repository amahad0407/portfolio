import { NextRequest, NextResponse } from 'next/server'
import { readProjects, createProject } from '@/lib/projects'
import { z } from 'zod'

const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Image is required'),
  link: z.string().min(1, 'Link is required'),
  tags: z.array(z.string()).default([]),
})

export async function GET() {
  try {
    const projects = readProjects()
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = projectSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
    }
    const project = createProject(result.data)
    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
