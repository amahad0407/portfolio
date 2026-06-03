import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProjectForm } from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Add New Project</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Fill in the details below. The project will appear on your portfolio immediately.
      </p>

      <ProjectForm />
    </div>
  )
}
