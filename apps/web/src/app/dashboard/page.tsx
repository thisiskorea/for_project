'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, FolderOpen, BookOpen, Database, TrendingUp } from 'lucide-react'
import { authService } from '@/lib/api-client'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back{user?.full_name ? `, ${user.full_name}` : ''}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your research today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Projects"
          value="0"
          icon={<FolderOpen className="h-5 w-5" />}
          href="/dashboard/projects"
        />
        <StatCard
          title="Papers"
          value="0"
          icon={<BookOpen className="h-5 w-5" />}
          href="/dashboard/papers"
        />
        <StatCard
          title="Datasets"
          value="0"
          icon={<Database className="h-5 w-5" />}
          href="/dashboard/datasets"
        />
        <StatCard
          title="Experiments"
          value="0"
          icon={<TrendingUp className="h-5 w-5" />}
          href="/dashboard/projects"
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/projects/new">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
          <Link href="/dashboard/papers/upload">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Upload Paper
            </Button>
          </Link>
          <Link href="/dashboard/datasets/upload">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Upload Dataset
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="text-center py-12 text-muted-foreground">
          <p>No recent activity</p>
          <p className="text-sm mt-2">Start by creating your first project!</p>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  href,
}: {
  title: string
  value: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Link href={href}>
      <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
          <div className="text-primary">{icon}</div>
        </div>
      </div>
    </Link>
  )
}
