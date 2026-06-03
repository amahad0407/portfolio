import Link from 'next/link'
import { Plus, Pencil, ExternalLink, LayoutDashboard } from 'lucide-react'
import { readProjects } from '@/lib/projects'
import { AdminDeleteButton } from '@/components/admin/AdminDeleteButton'
import { AdminLogoutButton } from '@/components/admin/AdminLogoutButton'

export default function AdminPage() {
  const projects = readProjects()

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Portfolio
          </Link>
          <Link
            href="/admin/new"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Project
          </Link>
        </div>
      </div>

      {/* Project list */}
      {projects.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-400 mb-4">No projects yet. Add your first one!</p>
          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="w-14 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                {project.image && project.image !== '/placeholder.svg' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 font-bold text-lg">
                    {project.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-white truncate">{project.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{project.link}</p>
              </div>

              {/* Tags */}
              <div className="hidden sm:flex gap-1.5 shrink-0">
                {project.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-900">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/admin/${project.id}/edit`}
                  className="p-2 rounded-lg text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <AdminDeleteButton projectId={project.id} projectName={project.name} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Logout */}
      <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
        <AdminLogoutButton />
      </div>
    </div>
  )
}
