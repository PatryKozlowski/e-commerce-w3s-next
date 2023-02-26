import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: FieldError
  errorMessage?: string
  type?: 'text' | 'number' | 'password' | 'radio'
  placeholder?: string
  containerStyle?: string
  search?: boolean
  password?: boolean
  value?: any
  maxlength?: number
  iconInput?: boolean
  className?: string
}
