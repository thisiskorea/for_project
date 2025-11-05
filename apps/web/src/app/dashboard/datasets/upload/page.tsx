'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Upload, FileText, X } from 'lucide-react'

export default function UploadDatasetPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    format: '',
    license: '',
    tags: '',
    visibility: 'private',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement actual upload logic
      console.log('Uploading dataset:', { file, formData })

      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000))

      router.push('/dashboard/datasets')
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Upload Dataset</h1>
        <p className="text-muted-foreground mt-1">
          Add a dataset to your collection
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div className="rounded-lg border bg-card p-6">
          <label className="block text-sm font-medium mb-2">Dataset File</label>
          {file ? (
            <div className="flex items-center justify-between p-4 rounded-md border bg-muted">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  CSV, JSON, Parquet, or ZIP files up to 500MB
                </p>
              </label>
            </div>
          )}
        </div>

        {/* Dataset Details */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h3 className="font-semibold">Dataset Details</h3>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Describe your dataset..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="format" className="text-sm font-medium">
                Format
              </label>
              <select
                id="format"
                value={formData.format}
                onChange={e => setFormData({ ...formData, format: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select format</option>
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
                <option value="parquet">Parquet</option>
                <option value="images">Images</option>
                <option value="text">Text</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="license" className="text-sm font-medium">
                License
              </label>
              <select
                id="license"
                value={formData.license}
                onChange={e => setFormData({ ...formData, license: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select license</option>
                <option value="MIT">MIT</option>
                <option value="Apache-2.0">Apache 2.0</option>
                <option value="GPL-3.0">GPL 3.0</option>
                <option value="CC-BY-4.0">CC BY 4.0</option>
                <option value="CC0-1.0">CC0 1.0 (Public Domain)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              placeholder="computer-vision, nlp, benchmark (comma separated)"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="visibility" className="text-sm font-medium">
              Visibility
            </label>
            <select
              id="visibility"
              value={formData.visibility}
              onChange={e => setFormData({ ...formData, visibility: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="private">Private</option>
              <option value="team">Team</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!file || !formData.name || isLoading}>
            {isLoading ? 'Uploading...' : 'Upload Dataset'}
          </Button>
        </div>
      </form>
    </div>
  )
}
