import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdSupervisorAccount } from 'react-icons/md'
import isEmail from 'validator/lib/isEmail'
import type { ForgotPasswordForm } from './types'
import { FaCheckCircle } from 'react-icons/fa'
import { GrPowerReset } from 'react-icons/gr'
import Input from '../Input/Input'
import Spinner from '../Spinner/Spinner'
import { useForgotPassword } from '@/hooks/api/useForgotPassword'
import styles from './ForgotPassword.module.scss'

const ForgotPassword = (): JSX.Element => {
  const { data: response, mutate: mutateForgotPassword, isLoading, isSuccess } = useForgotPassword()
  const methods = useForm<ForgotPasswordForm>()
  const { register, reset, handleSubmit, formState: { errors } } = methods
  const registeredEmail = register('email', {
    required: {
      value: true,
      message: 'You must specify a email'
    },
    validate: (email) => isEmail(email) || 'Please type valid email'
  })
  const handleSubmitRecoveryPassword: SubmitHandler<ForgotPasswordForm> = useCallback((data) => {
    mutateForgotPassword(data)

    if (isSuccess) {
      reset()
    }
  }, [isSuccess, mutateForgotPassword, reset])

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(handleSubmitRecoveryPassword)}
        className={styles.form_wrapper}
      >
        <>
          <MdSupervisorAccount size={30}/>
        </>
        <p className={styles.title}>Recovery user password</p>
        {
            response?.status === 200 ?
              <div className={styles.success_message}>
                <>
                  <FaCheckCircle className={styles.icon}/>
                </>
                <p className={'font-semibold'}>{response.message}</p>
              </div>
              :
              <div className={styles.input_wrapper}>
                <Input
                  containerStyle={`${errors.email ? styles.input_error_container : styles.input_container}`}
                  placeholder={'E-mail'}
                  isError={errors.email}
                  errorMessage={errors.email?.message}
                  {...registeredEmail}
                />
              </div>
        }
        {
            response?.status === 200 ?
              null
              :
              <button
                disabled={isLoading}
                className={styles.btn_recovery}
              >
                {
                isLoading ?
                  <Spinner />
                  :
                  <>
                    Recovery Password
                    <GrPowerReset />
                  </>
            }
              </button>
        }
      </form>
    </div>
  )
}

export default ForgotPassword
