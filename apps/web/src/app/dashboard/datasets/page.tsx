'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Search, Database, Download, Star, HardDrive } from 'lucide-react'

export default function DatasetsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Datasets</h1>
          <p className="text-muted-foreground mt-1">
            Manage and share your research datasets
          </p>
        </div>
        <Link href="/dashboard/datasets/upload">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Upload Dataset
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search datasets..."
            className="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select className="rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Datasets</option>
          <option>Public</option>
          <option>Private</option>
        </select>
        <select className="rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Formats</option>
          <option>CSV</option>
          <option>JSON</option>
          <option>Parquet</option>
          <option>Images</option>
        </select>
      </div>

      {/* Datasets Grid */}
      <div className="space-y-4">
        {/* Empty State */}
        <div className="rounded-lg border bg-card">
          <div className="text-center py-16 text-muted-foreground">
            <Database className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No datasets yet</p>
            <p className="text-sm mt-2">
              Upload your first dataset to get started
            </p>
            <Link href="/dashboard/datasets/upload" className="inline-block mt-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Upload Dataset
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
