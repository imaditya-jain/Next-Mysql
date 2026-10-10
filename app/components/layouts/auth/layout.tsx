import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="grid min-h-screen bg-surface-muted lg:grid-cols-2">
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-12 text-primary-foreground lg:flex"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 10%, rgba(255,255,255,0.10) 0, transparent 45%), radial-gradient(circle at 85% 85%, rgba(255,255,255,0.08) 0, transparent 45%), linear-gradient(160deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 45%, black) 100%)',
        }}
      >
        <div className="relative flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-sm font-semibold backdrop-blur">
            N
          </span>
          Next SQL
        </div>

        <div className="relative space-y-4">
          <h2 className="max-w-md text-[2.5rem] font-semibold leading-[1.15] tracking-tight">
            Build something great.
          </h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-primary-foreground/75">
            Sign in to pick up where you left off, or create an account to
            get started.
          </p>
        </div>

        <p className="relative text-[13px] text-primary-foreground/55">
          Built with Next.js.
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-[420px] rounded-[28px] border border-border/60 bg-surface/90 p-8 shadow-[0_8px_40px_rgba(17,12,34,0.06)] backdrop-blur-xl sm:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
