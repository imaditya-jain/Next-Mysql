import Link from 'next/link'
import {
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
  HiOutlineCube,
} from 'react-icons/hi2'

const features = [
  {
    icon: HiOutlineBolt,
    title: 'Fast by default',
    description:
      'Built on the Next.js App Router, so every page loads quick and feels instant.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Auth, ready to go',
    description:
      'Sign up and sign in flows already in place, so you can focus on your idea.',
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    title: 'Fully responsive',
    description:
      'Looks and works great on every screen, from phone to desktop.',
  },
  {
    icon: HiOutlineCube,
    title: 'Built to grow',
    description:
      'A clean, simple structure that adapts to whatever you end up building.',
  },
]

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-surface-muted/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
              N
            </span>
            Next SQL
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="rounded-lg px-4 py-2 text-[14px] font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-xl bg-primary px-4 py-2 text-[14px] font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.98]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 text-center sm:pt-28">
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1 text-[13px] font-medium text-muted-foreground">
            A fresh start
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
            Build something great.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            A clean, modern foundation that&apos;s ready for whatever you
            build next — a chat app, a shopping experience, or something new.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/register"
              className="h-11 w-full rounded-xl bg-primary px-6 text-[15px] font-medium leading-[44px] text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.98] sm:w-auto"
            >
              Create account
            </Link>
            <Link
              href="/auth/login"
              className="h-11 w-full rounded-xl border border-border bg-surface px-6 text-[15px] font-medium leading-[44px] text-foreground transition-colors hover:bg-primary-light sm:w-auto"
            >
              Sign in
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/60 bg-surface p-6 shadow-[0_8px_30px_rgba(17,12,34,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(17,12,34,0.08)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-[28px] bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 80%, white 0, transparent 40%)',
              }}
            />
            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to start building?
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-[15px] text-primary-foreground/75">
              Create an account and make this project yours.
            </p>
            <Link
              href="/auth/register"
              className="relative mt-8 inline-flex h-11 items-center rounded-xl bg-white px-6 text-[15px] font-medium text-primary transition-transform duration-150 hover:bg-white/90 active:scale-[0.98]"
            >
              Create account
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-[13px] text-muted-foreground sm:flex-row">
          <p>Built with Next.js.</p>
          <div className="flex items-center gap-5">
            <Link href="/auth/login" className="hover:text-foreground">
              Sign in
            </Link>
            <Link href="/auth/register" className="hover:text-foreground">
              Get started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
