'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HiOutlineAtSymbol } from 'react-icons/hi2'
import Input, { type FieldConfig } from '@/app/components/fields/input'

const forgotPasswordSchema = yup.object({
  loginId: yup
    .string()
    .trim()
    .required('Email or username is required'),
})

export type ForgotPasswordFormValues = yup.InferType<typeof forgotPasswordSchema>

const fields: FieldConfig<ForgotPasswordFormValues>[] = [
  {
    name: 'loginId',
    label: 'Email or username',
    placeholder: 'you@example.com',
    required: true,
    autoComplete: 'username',
    leftElement: <HiOutlineAtSymbol size={18} />,
    helpText: "We'll send a password reset link to your registered email.",
  },
]

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onTouched',
  })

  const onSubmit = (values: ForgotPasswordFormValues) => {
    // API integration handled separately
    console.log(values)
  }

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Forgot password?
        </h1>
        <p className="text-[15px] text-muted-foreground">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {fields.map((field) => (
          <Input key={field.name} {...field} register={register} errors={errors} />
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-primary text-[15px] font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Reset password
        </button>
      </form>

      <p className="text-center text-[14px] text-muted-foreground">
        Remembered your password?{' '}
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default ForgotPasswordForm
