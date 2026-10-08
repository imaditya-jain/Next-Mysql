'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HiOutlineAtSymbol, HiOutlineLockClosed } from 'react-icons/hi2'
import Input, { type FieldConfig } from '@/app/components/fields/input'

const loginSchema = yup.object({
  loginId: yup
    .string()
    .trim()
    .required('Email or username is required'),
  password: yup.string().required('Password is required'),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>

const fields: FieldConfig<LoginFormValues>[] = [
  {
    name: 'loginId',
    label: 'Email or username',
    placeholder: 'you@example.com',
    required: true,
    autoComplete: 'username',
    leftElement: <HiOutlineAtSymbol size={18} />,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    autoComplete: 'current-password',
    leftElement: <HiOutlineLockClosed size={18} />,
  },
]

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit = (values: LoginFormValues) => {
    // API integration handled separately
    console.log(values)
  }

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-[15px] text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {fields.map((field) => (
          <Input key={field.name} {...field} register={register} errors={errors} />
        ))}

        <div className="flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-[13px] font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-primary text-[15px] font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sign in
        </button>
      </form>

      <p className="text-center text-[14px] text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  )
}

export default LoginForm
