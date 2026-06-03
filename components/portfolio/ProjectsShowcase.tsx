'use client'

import { ExternalLink, Globe } from 'lucide-react'

// Update liveUrl values after deployment with real Vercel URLs
const showcaseProjects = [
  {
    title: 'BrightSmile Dental',
    category: 'Healthcare',
    description: 'A modern dental clinic website with appointment booking, full services page, team profiles, and dark mode. Built for a real-world client demo.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'from-sky-400 to-blue-600',
    emoji: '🦷',
    liveUrl: 'https://bsd-dental.vercel.app/', 
  },
  {
    title: 'Maison Étoile',
    category: 'Restaurant',
    description: 'A Michelin-level fine dining website with a dark gold aesthetic, full menu, chef profiles, reservation form, and elegant typography.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'from-amber-500 to-yellow-700',
    emoji: '🍽️',
    liveUrl: '#',
  },
  {
    title: 'AirPro HVAC',
    category: 'Home Services',
    description: 'A high-conversion HVAC company site with emergency banner, 24/7 call button, service area map, reviews, and floating emergency CTA.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'from-blue-500 to-indigo-700',
    emoji: '❄️',
    liveUrl: '#',
  },
  {
    title: 'Luminary Clean Co.',
    category: 'Cleaning Services',
    description: 'A luxury cleaning company website with gold branding, interactive before/after gallery, FAQ accordion, and full quote request system.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'from-yellow-500 to-amber-700',
    emoji: '✨',
    liveUrl: '#',
  },
]

export function ProjectsShowcase() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-2">
              Demo Projects
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Client Website Demos
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-lg">
              Fully functional demo websites built to showcase web design capabilities across different industries.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showcaseProjects.map((project) => (
            <div
              key={project.title}
              className="group rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Visual header */}
              <div className={`h-40 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative text-center">
                  <p className="text-5xl mb-2">{project.emoji}</p>
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-900">
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                    project.liveUrl === '#'
                      ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                      : 'text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200'
                  }`}
                  onClick={project.liveUrl === '#' ? (e) => e.preventDefault() : undefined}
                >
                  {project.liveUrl === '#' ? (
                    <><Globe className="w-4 h-4" /> Coming soon</>
                  ) : (
                    <><ExternalLink className="w-4 h-4" /> View Live Site</>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-8">
          All demos include disclaimer: &ldquo;Demo website created by Dagmawi Amaha for portfolio purposes.&rdquo;
        </p>
      </div>
    </section>
  )
}
