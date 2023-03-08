import { forwardRef } from 'react'
import type { TextareaProps } from './types'
import styles from './Textarea.module.scss'
import { BiError } from 'react-icons/bi'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ maxlength, isError, errorMessage, className, ...restProps }, ref) => {
  return (
    <>
      <textarea
        ref={ref}
        className={`${className ?? ''}${isError ? styles.error : ''}`}
        maxLength={maxlength}
        {...restProps}
      />
      {
        errorMessage ?
          <p className={styles.text_error}>
            <BiError size={16}/>
            {errorMessage}
          </p>
          :
          null
      }
    </>
  )
})

Textarea.displayName = 'Textarea'
export default Textarea
