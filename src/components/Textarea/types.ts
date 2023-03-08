import { FieldError } from 'react-hook-form'

export interface TextareaProps {
  isError?: FieldError
  errorMessage?: string
  className?: string
  maxlength?: number
}
