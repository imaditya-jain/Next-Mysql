'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  HiOutlineAtSymbol,
  HiOutlineLockClosed,
  HiOutlinePhone,
  HiOutlineUser,
} from 'react-icons/hi2'
import Input, { type FieldConfig } from '@/app/components/fields/input'
import { useAppDispatch } from '@/lib/hooks'
import { registrationHandler, resendVerificationHandler } from '@/lib/features/auth.features'

const registrationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .min(2, 'Must be at least 2 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .min(2, 'Must be at least 2 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[0-9]/, 'Must contain a number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
})

export type RegistrationFormValues = yup.InferType<typeof registrationSchema>

const fields: FieldConfig<RegistrationFormValues>[] = [
  { name: 'firstName', label: 'First name', placeholder: 'John', required: true, autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last name', placeholder: 'Doe', required: true, autoComplete: 'family-name' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
    autoComplete: 'email',
    leftElement: <HiOutlineAtSymbol size={18} />,
    full: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Create a password',
    required: true,
    autoComplete: 'new-password',
    leftElement: <HiOutlineLockClosed size={18} />,
    full: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    placeholder: 'Re-enter your password',
    required: true,
    autoComplete: 'new-password',
    leftElement: <HiOutlineLockClosed size={18} />,
    full: true,
  },
]

const RegistrationForm = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
    mode: 'onTouched',
  })

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [pendingEmail, setPendingEmail] = useState<string | null>(null)
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  const onSubmit = async (values: RegistrationFormValues) => {
    setFeedback(null)
    setPendingEmail(null)
    setResendMessage(null)

    try {
      const result = await dispatch(registrationHandler(values)).unwrap()
      setFeedback({ type: 'success', message: result.message ?? 'Registration successful.' })

      if (result.emailSent === false) {
        setPendingEmail(values.email)
      }
    } catch (error) {
      const message = (error as { error?: string } | undefined)?.error ?? 'Something went wrong.'
      setFeedback({ type: 'error', message })
    }
  }

  const handleResend = async () => {
    if (!pendingEmail) return

    setIsResending(true)
    setResendMessage(null)

    try {
      const result = await dispatch(resendVerificationHandler({ email: pendingEmail })).unwrap()
      setResendMessage(result.message ?? 'Verification email sent.')
    } catch (error) {
      setResendMessage((error as { error?: string } | undefined)?.error ?? 'Failed to resend verification email.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-[15px] text-muted-foreground">
          Enter your details below to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map(({ full, ...field }) => (
            <div key={field.name} className={full ? 'sm:col-span-2' : undefined}>
              <Input {...field} register={register} errors={errors} />
            </div>
          ))}
        </div>

        {feedback && (
          <p className={`text-[14px] ${feedback.type === 'error' ? 'text-error' : 'text-foreground'}`}>
            {feedback.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-primary text-[15px] font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Create account
        </button>
      </form>

      {pendingEmail && (
        <div className="space-y-2 rounded-xl border border-border bg-surface-muted p-4 text-center">
          <p className="text-[13px] text-muted-foreground">
            {resendMessage ?? "Didn't get the email?"}
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="h-10 w-full rounded-xl border border-primary text-[14px] font-medium text-primary transition-all duration-150 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isResending ? 'Sending...' : 'Resend verification email'}
          </button>
        </div>
      )}

      <p className="text-center text-[14px] text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegistrationForm
