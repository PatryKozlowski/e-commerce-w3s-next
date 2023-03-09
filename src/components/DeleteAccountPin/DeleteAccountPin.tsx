import { useDeleteAccount } from '@/hooks/api/useDeleteAccount'
import type { DeleteAccountPin as DeletePin } from '@/lib/services/user/deleteAccount'
import { useRouter } from 'next/router'
import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../Spinner/Spinner'
import styles from './DeleteAccountPin.module.scss'

let currOTPIndex: number = 0
const DeleteAccountPin = ({ ...restProps }): JSX.Element => {
  const router = useRouter()
  const { mutateAsync, isLoading } = useDeleteAccount()
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''))
  const [activeOTP, setActivOTP] = useState<number>(0)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    const newOTP: string[] = [...otp]
    newOTP[currOTPIndex] = value.substring(value.length - 1)

    if (!value) {
      setActivOTP(--currOTPIndex)
    } else {
      setActivOTP(++currOTPIndex)
    }
    setOtp(newOTP)
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    currOTPIndex = index
    if (e.key === 'Backspace') {
      setActivOTP(currOTPIndex - 1)
    }
  }

  const handleDelete = useCallback(async () => {
    const pin = otp.join('') as unknown as DeletePin
    const userPin = { pin } as unknown as DeletePin
    const response = await mutateAsync(userPin)

    if (response.status === 200) {
      router.reload()
    } else {
      toast.info(response.message)
    }
  }, [mutateAsync, otp, router])

  useEffect(() => {
    inputRef?.current?.focus()
  }, [activeOTP])

  if (isLoading) {
    return (
      <div className={styles.spinner_wrapper}>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <form className={styles.container}>
        {
        otp.map((_, index) => {
          return (
            <Fragment key={index}>
              <input
                className={styles.pin_input}
                ref={index === activeOTP ? inputRef : null}
                type={'number'}
                onChange={handleOnChange}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
                value={otp[index]}
                {...restProps}
              />
            </Fragment>
          )
        })
        }
      </form>
      <button
        className={styles.btn_delete}
        onClick={handleDelete}
      >
        DELETE
      </button>

    </>
  )
}

export default DeleteAccountPin
