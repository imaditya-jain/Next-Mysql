'use client'

import React, { useState } from 'react'
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form'
import { IoEye, IoEyeOff } from 'react-icons/io5'

export type FieldConfig<T extends FieldValues> = {
  name: Path<T>
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  required?: boolean
  autoComplete?: string
  leftElement?: React.ReactNode
  helpText?: string
  /** Span both columns in a two-column field grid. */
  full?: boolean
}

interface InputProps<T extends FieldValues> {
  label: string
  name: Path<T>
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  required?: boolean
  register: UseFormRegister<T>
  errors?: FieldErrors<T>
  leftElement?: React.ReactNode
  helpText?: string
  autoComplete?: string
}

const Input = <T extends FieldValues>({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  register,
  errors,
  leftElement,
  helpText,
  autoComplete,
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)
  const fieldError = errors?.[name]
  const isPasswordField = type === 'password'
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[13px] font-medium text-foreground/85">
        {label}
        {required && <span className="ml-0.5 text-error">*</span>}
      </label>

      <div className="relative">
        {leftElement && (
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground">
            {leftElement}
          </span>
        )}

        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!fieldError}
          aria-describedby={
            fieldError ? `${name}-error` : helpText ? `${name}-help` : undefined
          }
          className={`h-11 w-full rounded-xl border bg-surface px-3.5 text-[15px] text-foreground outline-none transition-all duration-150 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary-light ${
            leftElement ? 'pl-11' : ''
          } ${isPasswordField ? 'pr-11' : ''} ${
            fieldError ? 'border-error focus:ring-error/10' : 'border-border'
          }`}
          {...register(name)}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3.5 flex items-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
          </button>
        )}
      </div>

      {fieldError ? (
        <p id={`${name}-error`} className="text-[13px] text-error">
          {fieldError.message as string}
        </p>
      ) : helpText ? (
        <p id={`${name}-help`} className="text-[13px] text-muted-foreground">
          {helpText}
        </p>
      ) : null}
    </div>
  )
}

export default Input
