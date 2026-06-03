import Link from 'next/link'
import { Plus } from 'lucide-react'
import { readProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/portfolio/ProjectCard'
import { ProjectsShowcase } from '@/components/portfolio/ProjectsShowcase'

export default function Home() {
  const projects = readProjects()

  return (
    <>
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="mb-14 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Web Design{' '}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Portfolio
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          A curated collection of websites I&apos;ve built for clients across industries.
        </p>
      </div>

      {/* Project count + Admin shortcut */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </p>
        <Link
          href="/admin/new"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </Link>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-400 dark:text-slate-500 mb-4">No projects yet.</p>
          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add your first project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>

    <ProjectsShowcase />
    </>
  )
}
