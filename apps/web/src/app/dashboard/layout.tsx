'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Beaker, Home, FolderOpen, BookOpen, Database, Cpu, Users, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { authService } from '@/lib/api-client'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authService.logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      router.push('/login')
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Beaker className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">AI Research</span>
          </Link>
        </div>

        <nav className="space-y-1 p-4">
          <NavLink href="/dashboard" icon={<Home className="h-5 w-5" />}>
            Dashboard
          </NavLink>
          <NavLink href="/dashboard/projects" icon={<FolderOpen className="h-5 w-5" />}>
            Projects
          </NavLink>
          <NavLink href="/dashboard/papers" icon={<BookOpen className="h-5 w-5" />}>
            Papers
          </NavLink>
          <NavLink href="/dashboard/datasets" icon={<Database className="h-5 w-5" />}>
            Datasets
          </NavLink>
          <NavLink href="/dashboard/compute" icon={<Cpu className="h-5 w-5" />}>
            Compute
          </NavLink>
          <NavLink href="/dashboard/community" icon={<Users className="h-5 w-5" />}>
            Community
          </NavLink>
          <NavLink href="/dashboard/settings" icon={<Settings className="h-5 w-5" />}>
            Settings
          </NavLink>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  )
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}
