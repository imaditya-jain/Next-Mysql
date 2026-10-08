'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HiOutlineLockClosed } from 'react-icons/hi2'
import Input, { type FieldConfig } from '@/app/components/fields/input'

const resetPasswordSchema = yup.object({
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

export type ResetPasswordFormValues = yup.InferType<typeof resetPasswordSchema>

const fields: FieldConfig<ResetPasswordFormValues>[] = [
  {
    name: 'password',
    label: 'New password',
    type: 'password',
    placeholder: 'Create a new password',
    required: true,
    autoComplete: 'new-password',
    leftElement: <HiOutlineLockClosed size={18} />,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm new password',
    type: 'password',
    placeholder: 'Re-enter your new password',
    required: true,
    autoComplete: 'new-password',
    leftElement: <HiOutlineLockClosed size={18} />,
  },
]

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onTouched',
  })

  const onSubmit = (values: ResetPasswordFormValues) => {
    // API integration handled separately
    console.log(values)
  }

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Reset password
        </h1>
        <p className="text-[15px] text-muted-foreground">
          Choose a new password for your account.
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

export default ResetPasswordForm
