import { useCallback, useEffect } from 'react'
import Spinner from '../Spinner/Spinner'
import Link from 'next/link'
import Input from '../Input/Input'
import { MdLogin, MdSupervisorAccount } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import isEmail from 'validator/lib/isEmail'
import { signIn } from 'next-auth/react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useSignUp } from '@/hooks/api/useSignUp'
import { useSignIn } from '@/hooks/api/useSignIn'
import type { AuthForm, AuthComponentType } from './types'
import styles from './Auth.module.scss'

const Auth = ({ type }: AuthComponentType): JSX.Element => {
  const { mutate: mutateSignUp, isLoading: isLoadingSignUp, isSuccess: isSuccessSignUp } = useSignUp()
  const { mutate: mutateSignIn, isLoading: isLoadingSignIn, isSuccess: isSuccessSignIn } = useSignIn()
  const methods = useForm<AuthForm>({ shouldUnregister: true })
  const { register, handleSubmit, watch, reset, unregister, formState: { errors } } = methods

  const registeredEmail = register('email', {
    required: {
      value: true,
      message: 'You must specify a email'
    },
    validate: (email) => isEmail(email) || 'Please type valid email'
  })
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
  let registeredRepeatPassword = null

  if (type === 'register') {
    registeredRepeatPassword = register('repeatPassword', {
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
  }

  const handleSignInGoogle = useCallback(async () => {
    await signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_API_URL })
  }, [])

  const handleSignIn: SubmitHandler<AuthForm> = useCallback((data) => {
    mutateSignIn(data)

    if (isSuccessSignIn) {
      reset()
    }
  }, [isSuccessSignIn, mutateSignIn, reset])

  const handleSignUp: SubmitHandler<AuthForm> = useCallback((data) => {
    mutateSignUp(data)

    if (isSuccessSignUp) {
      reset()
    }
  }, [isSuccessSignUp, mutateSignUp, reset])

  useEffect(() => {
    if (type === 'login') {
      return () => {
        unregister('repeatPassword')
      }
    }
  }, [type, unregister])

  return (
    <div className={styles.container}>
      <form
        onSubmit={type === 'login' ? handleSubmit(handleSignIn) : handleSubmit(handleSignUp)}
        className={styles.form_wrapper}
      >
        <div className={styles.text_wrapper}>
          <MdSupervisorAccount size={50}/>
          <p>{type === 'login' ? 'Sign in' : 'Create an account'}</p>
        </div>
        <div className={styles.input_wrapper}>
          <Input
            containerStyle={`${errors.email ? styles.input_error_container : styles.input_container}`}
            placeholder={'E-mail'}
            isError={errors.email}
            errorMessage={errors.email?.message}
            {...registeredEmail}
          />
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
          {
            type === 'register' ?
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
              :
              null
          }
        </div>
        <button
          className={styles.auth_btn}
          type={'submit'}
          disabled={isLoadingSignIn || isLoadingSignUp}
        >
          {
            isLoadingSignIn || isLoadingSignUp ?
              <Spinner />
              :
              <>
                {type === 'login' ? 'Sign in' : 'Create an account'}
                <MdLogin size={26}/>
              </>
          }
        </button>
        <div className={styles.links_wrapper}>
          <Link
            href={'/auth/forgot-password'}
            className={styles.link}
          >
            Password recovery
          </Link>
          {
            type === 'login' ?
              <Link
                href={'/auth/register'}
                className={styles.link}
              >
                Do you need an account?
              </Link>

              :
              <Link
                href={'/auth/login'}
                className={styles.link}
              >
                I want to log in
              </Link>
            }
        </div>
        <button
          className={styles.google_auth_btn}
          onClick={async (e) => {
            e.preventDefault()
            await handleSignInGoogle()
          }}
          disabled={isLoadingSignIn || isLoadingSignUp}
        >
          <FcGoogle size={30}/>
          Sign in With Google
        </button>
      </form>
    </div>
  )
}

export default Auth
