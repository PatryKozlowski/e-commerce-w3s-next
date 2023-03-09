import { useUpdatePassword } from '@/hooks/api/useUpdatePassword'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GrPowerReset } from 'react-icons/gr'
import { toast } from 'react-toastify'
import Input from '../Input/Input'
import Spinner from '../Spinner/Spinner'
import type { UpdatePasswordForm } from './types'
import styles from './UserChangePassword.module.scss'

const UserChangePassword = (): JSX.Element => {
  const { mutateAsync, isLoading } = useUpdatePassword()
  const methods = useForm<UpdatePasswordForm>()
  const { register, handleSubmit, reset, watch, formState: { errors } } = methods

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

  const handleSubmitUpdate: SubmitHandler<UpdatePasswordForm> = useCallback(async (data) => {
    const response = await mutateAsync(data)

    if (response.status === 200) {
      toast.success(response.message)
      reset()
    } else {
      toast.info(response.message)
    }
  }, [mutateAsync, reset])

  return (
    <form
      className={styles.form_wrapper}
      onSubmit={handleSubmit(handleSubmitUpdate)}
    >
      <h2>Chnage password</h2>
      {
        isLoading ?
          <div className={styles.spinner_wrapper}>
            <Spinner />
          </div>
          :
          <>
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
            <button
              disabled={isLoading}
              className={styles.btn_change}
            >
              Recovery Password
              <GrPowerReset />
            </button>
          </>
      }
    </form>
  )
}

export default UserChangePassword
