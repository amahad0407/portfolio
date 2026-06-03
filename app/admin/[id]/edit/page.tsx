import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { findById } from '@/lib/projects'
import { ProjectForm } from '@/components/admin/ProjectForm'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = findById(id)
  if (!project) notFound()

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Edit Project</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Editing <span className="font-medium text-slate-700 dark:text-slate-200">{project.name}</span>
      </p>

      <ProjectForm project={project} />
    </div>
  )
}
