import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Beaker, Database, Cpu, Users, BookOpen, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Beaker className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AI Research Platform</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center gap-6 py-24 sm:py-32">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            The Ultimate Platform for
            <br />
            <span className="text-primary">AI Researchers</span>
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Manage papers, track experiments, collaborate with teams, and access powerful GPU
            computing - all in one place.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 sm:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center mb-16">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need for AI Research
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground">
            A comprehensive suite of tools designed specifically for AI researchers and teams.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<BookOpen className="h-10 w-10" />}
            title="Paper Management"
            description="Organize, search, and annotate papers. AI-powered summaries and recommendations."
          />
          <FeatureCard
            icon={<Beaker className="h-10 w-10" />}
            title="Experiment Tracking"
            description="Track all your experiments with MLflow integration. Compare results and reproduce findings."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="Team Collaboration"
            description="Work together in real-time. Share code, data, and insights with your team."
          />
          <FeatureCard
            icon={<Cpu className="h-10 w-10" />}
            title="GPU Computing"
            description="Access powerful GPU instances on-demand. From T4 to A100 and H100."
          />
          <FeatureCard
            icon={<Database className="h-10 w-10" />}
            title="Dataset Hub"
            description="Upload, version, and share datasets. Built-in data preview and statistics."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="Model Zoo"
            description="Share and deploy models with one click. Automatic API generation."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24 sm:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 rounded-lg border bg-muted/50 p-8 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl">
            Ready to Accelerate Your Research?
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground">
            Join thousands of researchers already using our platform. Get 10 free GPU hours every
            month.
          </p>
          <Link href="/signup" className="mt-4">
            <Button size="lg" className="gap-2">
              Get Started for Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 AI Research Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        <div className="text-primary">{icon}</div>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
