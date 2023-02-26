import { useCallback } from 'react'
import type { RemindPasswordForm } from './types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdSupervisorAccount } from 'react-icons/md'
import { FaCheckCircle } from 'react-icons/fa'
import Input from '../Input/Input'
import Spinner from '../Spinner/Spinner'
import { GrPowerReset } from 'react-icons/gr'
import { useRouter } from 'next/router'
import { useResetPassword } from '@/hooks/api/useResetPassword'
import styles from './RemindPassword.module.scss'

const RemindPassword = (): JSX.Element => {
  const { data: response, mutate: mutateResetPassword, isLoading, isSuccess } = useResetPassword()

  const methods = useForm<RemindPasswordForm>()
  const { register, handleSubmit, reset, watch, formState: { errors } } = methods

  const router = useRouter()
  const { query } = router
  const id = query.id as string
  const token = query.token as string

  const registeredPassword = register('password', {
    required: {
      value: true,
      message: 'You must specify a password'
    },
    minLength: {
      value: 8,
      message: 'Password must be longer than 8 characters'
    }
  })

  const registeredRepeatPassword = register('repeatPassword', {
    required: {
      value: true,
      message: 'You must specify a password'
    },
    minLength: {
      value: 8,
      message: 'Password must be longer than 8 characters'
    },
    validate: (repeatPassword) => repeatPassword === watch('password') || 'Passwords must be the same'
  })

  const handleSubmitResetPassword: SubmitHandler<RemindPasswordForm> = useCallback((data) => {
    const FormData = { ...data, id, token }
    mutateResetPassword(FormData)

    if (isSuccess) {
      reset()
    }
  }, [id, isSuccess, mutateResetPassword, reset, token])

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(handleSubmitResetPassword)}
        className={styles.form_wrapper}
      >
        <>
          <MdSupervisorAccount size={30}/>
        </>
        <p className={styles.title}>Recovery user password - new password</p>
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
                  containerStyle={`${errors.password ? styles.input_error_container : styles.input_container}`}
                  className={styles.input_password}
                  password
                  placeholder={'Password'}
                  isError={errors.password}
                  errorMessage={errors.password?.message}
                  iconInput={true}
                  {...registeredPassword}
                />
                <Input
                  containerStyle={`${errors.repeatPassword ? styles.input_error_container : styles.input_container}`}
                  password
                  className={styles.input_password}
                  placeholder={'Repeat password'}
                  isError={errors.repeatPassword}
                  errorMessage={errors.repeatPassword?.message}
                  iconInput={true}
                  {...registeredRepeatPassword}
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

export default RemindPassword
