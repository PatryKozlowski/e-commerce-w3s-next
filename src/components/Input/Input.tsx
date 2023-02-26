import { forwardRef, useCallback, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { BiError, BiHide, BiShow } from 'react-icons/bi'
import type { InputProps } from './types'
import styles from './Input.module.scss'

const Input = forwardRef<HTMLInputElement, InputProps>(({ isError, placeholder, errorMessage, maxlength, value, className, iconInput = false, containerStyle, search, password = false, type = 'text', ...restProps }, ref) => {
  const [isShowPassword, setShowPassword] = useState<boolean>(false)

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!isShowPassword)
  }, [isShowPassword])

  return (
    <>
      {
        iconInput ?
          <div className={containerStyle}>
            <input
              ref={ref}
              className={`${className as string} ${isError ? styles.error : ''}`}
              type={password ? `${isShowPassword ? 'text' : 'password'}` : type}
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              placeholder={`${search ? placeholder as string : !search ? placeholder as string : ''}`}
              value={value}
              maxLength={maxlength}
              {...restProps}
            />
            {
              search ?
                <MdSearch size={30} />
                :
                password ?
                  isShowPassword ?
                    <BiHide
                      size={30}
                      className={styles.password_btn}
                      onClick={toggleShowPassword}
                    />
                    :
                    <BiShow
                      size={30}
                      className={styles.password_btn}
                      onClick={toggleShowPassword}
                    />
                  :
                  null
            }
          </div>
          :
          <input
            ref={ref}
            className={`${isError ? styles.error : ''}`}
            placeholder={`${search ? placeholder as string : !search ? placeholder as string : ''}`}
            value={value}
            maxLength={maxlength}
            {...restProps}
          />
      }
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

Input.displayName = 'Input'
export default Input
