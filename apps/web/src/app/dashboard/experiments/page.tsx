'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Search, TrendingUp, BarChart, Clock, CheckCircle, XCircle } from 'lucide-react'

export default function ExperimentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experiments</h1>
          <p className="text-muted-foreground mt-1">
            Track and compare ML experiments
          </p>
        </div>
        <Link href="/dashboard/experiments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Log Experiment
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Experiments"
          value="0"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          title="Running"
          value="0"
          icon={<Clock className="h-5 w-5 text-blue-500" />}
        />
        <StatCard
          title="Completed"
          value="0"
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
        />
        <StatCard
          title="Failed"
          value="0"
          icon={<XCircle className="h-5 w-5 text-red-500" />}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search experiments..."
            className="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select className="rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Status</option>
          <option>Running</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>
      </div>

      {/* Experiments List */}
      <div className="space-y-4">
        {/* Empty State */}
        <div className="rounded-lg border bg-card">
          <div className="text-center py-16 text-muted-foreground">
            <BarChart className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No experiments yet</p>
            <p className="text-sm mt-2">
              Start tracking your ML experiments with MLflow integration
            </p>
            <Link href="/dashboard/experiments/new" className="inline-block mt-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Log Experiment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-primary">{icon}</div>
      </div>
    </div>
  )
}
