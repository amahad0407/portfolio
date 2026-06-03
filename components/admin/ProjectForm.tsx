'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Upload, Link as LinkIcon, X, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Project } from '@/types'

const schema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  link: z.string().min(1, 'Link is required'),
  imageUrl: z.string().optional(),
  tags: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface ProjectFormProps {
  /** Pass an existing project to enable edit mode */
  project?: Project
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const isEdit = Boolean(project)

  const [imageMode, setImageMode] = useState<'upload' | 'url'>(
    project?.image && !project.image.startsWith('/uploads/') && project.image !== '/placeholder.svg'
      ? 'url'
      : 'upload'
  )
  const [uploadedImage, setUploadedImage] = useState<string>(
    project?.image && project.image.startsWith('/uploads/') ? project.image : ''
  )
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: project?.name ?? '',
      description: project?.description ?? '',
      link: project?.link ?? '',
      imageUrl: project?.image && !project.image.startsWith('/uploads/') && project.image !== '/placeholder.svg'
        ? project.image
        : '',
      tags: project?.tags.join(', ') ?? '',
    },
  })

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploadLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Upload failed')
      setUploadedImage(data.url)
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploadLoading(false)
    }
  }

  async function onSubmit(data: FormValues) {
    setSubmitError('')
    const image = imageMode === 'upload'
      ? (uploadedImage || '/placeholder.svg')
      : (data.imageUrl || '/placeholder.svg')

    const tags = data.tags
      ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const payload = { name: data.name, description: data.description, link: data.link, image, tags }

    setLoading(true)
    try {
      const url = isEdit ? `/api/projects/${project!.id}` : '/api/projects'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(JSON.stringify(err.error))
      }
      router.push('/admin')
      router.refresh()
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-colors',
      hasError
        ? 'border-rose-400 dark:border-rose-500'
        : 'border-slate-200 dark:border-slate-700 focus:border-violet-500 dark:focus:border-violet-400'
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Name</label>
        <input {...register('name')} placeholder="Sunrise Bakery" className={inputClass(!!errors.name)} />
        {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="A brief description of the project and what you built..."
          className={cn(inputClass(!!errors.description), 'resize-none')}
        />
        {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description.message}</p>}
      </div>

      {/* Live Link */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          <span className="flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> Live URL or File Path</span>
        </label>
        <input
          {...register('link')}
          placeholder="https://client-site.com"
          className={inputClass(!!errors.link)}
        />
        {errors.link && <p className="mt-1 text-xs text-rose-500">{errors.link.message}</p>}
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> Screenshot</span>
        </label>

        {/* Mode toggle */}
        <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden mb-3 w-fit">
          {(['upload', 'url'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setImageMode(mode)}
              className={cn(
                'px-4 py-1.5 text-xs font-medium transition-colors',
                imageMode === mode
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              {mode === 'upload' ? 'Upload File' : 'Enter URL'}
            </button>
          ))}
        </div>

        {imageMode === 'upload' ? (
          <div>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-violet-400 dark:hover:border-violet-600 transition-colors bg-slate-50 dark:bg-slate-800/50">
              {uploadedImage ? (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setUploadedImage('') }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Upload className="w-6 h-6" />
                  <span className="text-xs">{uploadLoading ? 'Uploading...' : 'Click to upload screenshot'}</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploadLoading}
                className="hidden"
              />
            </label>
            {uploadError && <p className="mt-1 text-xs text-rose-500">{uploadError}</p>}
          </div>
        ) : (
          <input
            {...register('imageUrl')}
            placeholder="https://example.com/screenshot.png"
            className={inputClass(false)}
          />
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Tags <span className="text-slate-400 font-normal">(comma separated)</span>
        </label>
        <input
          {...register('tags')}
          placeholder="Bakery, Small Business, E-commerce"
          className={inputClass(false)}
        />
      </div>

      {submitError && (
        <p className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg px-4 py-2">
          {submitError}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Project'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
