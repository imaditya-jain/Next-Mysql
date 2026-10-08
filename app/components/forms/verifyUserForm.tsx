'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HiOutlineEnvelope } from 'react-icons/hi2'

const VerifyUserForm = () => {
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)
    // API integration handled separately
    setIsVerifying(false)
  }

  return (
    <div className="space-y-7 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
        <HiOutlineEnvelope size={26} />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Verify your email
        </h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          We&apos;ve sent a verification link to your email address. Click the
          button below once you&apos;ve confirmed it to activate your account.
        </p>
      </div>

      <button
        type="button"
        onClick={handleVerify}
        disabled={isVerifying}
        className="h-11 w-full rounded-xl bg-primary text-[15px] font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Verify account
      </button>

      <p className="text-[14px] text-muted-foreground">
        Didn&apos;t get the email?{' '}
        <button type="button" className="font-medium text-primary hover:underline">
          Resend link
        </button>
      </p>

      <p className="text-[14px] text-muted-foreground">
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  )
}

export default VerifyUserForm
