'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Upload, FileText, X } from 'lucide-react'

export default function UploadPaperPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    abstract: '',
    keywords: '',
    categories: '',
    arxivId: '',
    doi: '',
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
      console.log('Uploading paper:', { file, formData })

      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000))

      router.push('/dashboard/papers')
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
        <h1 className="text-3xl font-bold">Upload Paper</h1>
        <p className="text-muted-foreground mt-1">
          Add a research paper to your library
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div className="rounded-lg border bg-card p-6">
          <label className="block text-sm font-medium mb-2">PDF File</label>
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
                accept=".pdf"
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
                  PDF files up to 50MB
                </p>
              </label>
            </div>
          )}
        </div>

        {/* Paper Details */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h3 className="font-semibold">Paper Details</h3>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="authors" className="text-sm font-medium">
              Authors (comma separated)
            </label>
            <input
              id="authors"
              type="text"
              placeholder="John Doe, Jane Smith"
              value={formData.authors}
              onChange={e => setFormData({ ...formData, authors: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="abstract" className="text-sm font-medium">
              Abstract
            </label>
            <textarea
              id="abstract"
              rows={5}
              placeholder="Enter paper abstract..."
              value={formData.abstract}
              onChange={e => setFormData({ ...formData, abstract: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="keywords" className="text-sm font-medium">
                Keywords
              </label>
              <input
                id="keywords"
                type="text"
                placeholder="machine learning, AI"
                value={formData.keywords}
                onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="categories" className="text-sm font-medium">
                Categories
              </label>
              <input
                id="categories"
                type="text"
                placeholder="cs.AI, cs.LG"
                value={formData.categories}
                onChange={e => setFormData({ ...formData, categories: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="arxivId" className="text-sm font-medium">
                arXiv ID
              </label>
              <input
                id="arxivId"
                type="text"
                placeholder="2301.12345"
                value={formData.arxivId}
                onChange={e => setFormData({ ...formData, arxivId: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="doi" className="text-sm font-medium">
                DOI
              </label>
              <input
                id="doi"
                type="text"
                placeholder="10.1234/example"
                value={formData.doi}
                onChange={e => setFormData({ ...formData, doi: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
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
          <Button type="submit" disabled={!file || !formData.title || isLoading}>
            {isLoading ? 'Uploading...' : 'Upload Paper'}
          </Button>
        </div>
      </form>
    </div>
  )
}
