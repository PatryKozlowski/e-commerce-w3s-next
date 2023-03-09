import { useSendPin } from '@/hooks/api/useSendPin'
import { useCallback, useState } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import DeleteAccountPin from '../DeleteAccountPin/DeleteAccountPin'
import Spinner from '../Spinner/Spinner'
import styles from './DeleteAccount.module.scss'

const DeleteAccount = (): JSX.Element => {
  const [isShowDeleteAccountPin, setShowDeleteAccountPin] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const { data, mutateAsync, isLoading } = useSendPin()

  const handleSendPin = useCallback(async () => {
    const response = await mutateAsync()

    if (response.status === 200) {
      setMessage(response.message)
      setTimeout(() => {
        setShowDeleteAccountPin(true)
      }, 1000)
    }
  }, [mutateAsync])

  const handleReset = useCallback(() => {
    setShowDeleteAccountPin(false)
    setMessage('')
  }, [])

  return (
    <div
      className={styles.form_wrapper}
    >
      <div className={styles.wrapper}>
        <h2>Delete account</h2>
        <button
          className={styles.btn_reload}
          onClick={handleReset}
          disabled={isLoading || !isShowDeleteAccountPin}
        ><GrPowerReset />
        </button>
      </div>
      {
        isLoading ?
          <div className={styles.spinner_wrapper}>
            <Spinner />
          </div>
          :
          <>
            {
              data?.status === 200 ?
                isShowDeleteAccountPin ?
                  <DeleteAccountPin />
                  :
                  message ?
                    <p className={styles.response_message}>{message}</p>
                    :
                    <>
                      <p className={styles.info}>You will receive a pin to your email address that will allow you to delete your account.</p>
                      <button
                        className={styles.btn_send_pin}
                        onClick={handleSendPin}
                      >Send pin to delete account
                      </button>
                    </>
                :
                    <>
                      <p className={styles.info}>You will receive a pin to your email address that will allow you to delete your account.</p>
                      <button
                        className={styles.btn_send_pin}
                        onClick={handleSendPin}
                      >Send pin to delete account
                      </button>
                    </>
            }
          </>
    }
    </div>
  )
}

export default DeleteAccount
