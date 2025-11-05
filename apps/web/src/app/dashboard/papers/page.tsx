'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Search, Upload, BookOpen, Download, Star, Eye } from 'lucide-react'

export default function PapersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Papers</h1>
          <p className="text-muted-foreground mt-1">
            Organize and search research papers
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/papers/search">
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Search arXiv
            </Button>
          </Link>
          <Link href="/dashboard/papers/upload">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Paper
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search papers by title, authors, or keywords..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select className="rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Categories</option>
          <option>cs.AI</option>
          <option>cs.CV</option>
          <option>cs.LG</option>
          <option>cs.CL</option>
        </select>
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        {/* Empty State */}
        <div className="rounded-lg border bg-card">
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No papers yet</p>
            <p className="text-sm mt-2">
              Upload your first paper or search arXiv to get started
            </p>
            <div className="flex gap-2 justify-center mt-6">
              <Link href="/dashboard/papers/search">
                <Button variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Search arXiv
                </Button>
              </Link>
              <Link href="/dashboard/papers/upload">
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Paper
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Example paper cards (will be populated with real data) */}
        {/* <PaperCard /> */}
      </div>
    </div>
  )
}

// Example paper card component
function PaperCard({
  title,
  authors,
  abstract,
  categories,
  viewCount,
  starCount,
}: {
  title: string
  authors: string[]
  abstract: string
  categories: string[]
  viewCount: number
  starCount: number
}) {
  return (
    <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {authors.join(', ')}
          </p>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {abstract}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {categories.map(cat => (
              <span
                key={cat}
                className="px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {cat}
              </span>
            ))}
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {viewCount}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {starCount}
            </span>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <Button size="sm" variant="ghost">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
