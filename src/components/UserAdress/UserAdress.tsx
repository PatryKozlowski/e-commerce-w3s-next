import { useUpdateAdress } from '@/hooks/api/useUpdateAdress'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import Input from '../Input/Input'
import Spinner from '../Spinner/Spinner'
import type { enabledOptions, FormUserAdress, UserProps } from './types'
import styles from './UserAdress.module.scss'

const UserAdress = ({ user }: UserProps): JSX.Element => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isEnabled, setEnabled] = useState({
    userName: false,
    userStreet: false,
    userCity: false
  })

  const { mutateAsync, isLoading } = useUpdateAdress()

  const methods = useForm<FormUserAdress>()
  const { register, handleSubmit, getValues, setValue, formState: { errors } } = methods
  const registeredNameInput = register('name', {
    required: {
      value: true,
      message: 'Street is required'
    }
  })
  const registeredStreetInput = register('street', {
    required: {
      value: true,
      message: 'Name is required'
    }
  })
  const registeredCityInput = register('city', {
    required: {
      value: true,
      message: 'City is required'
    }
  })

  const handleUpdate: SubmitHandler<FormUserAdress> = useCallback(async (data) => {
    const response = await mutateAsync(data)

    if (response.status === 200) {
      router.reload()
    }
  }, [mutateAsync, router])

  const handleEnabled = useCallback((type: enabledOptions) => {
    const handleOption: enabledOptions = type
    switch (handleOption) {
      case 'userName':
        setEnabled({ ...isEnabled, userName: !isEnabled.userName })
        break

      case 'userStreet':
        setEnabled({ ...isEnabled, userStreet: !isEnabled.userStreet })
        break

      case 'userCity':
        setEnabled({ ...isEnabled, userCity: !isEnabled.userCity })
        break

      default:
        console.log(`Sorry, we are out of ${type}`)
    }
  }, [isEnabled])

  const isSameName = user?.name === getValues('name')
  const isSameStreet = user?.street === getValues('street')
  const isSameCity = user?.city === getValues('city')

  useEffect(() => {
    setValue('name', user?.name)
    setValue('city', user?.city)
    setValue('street', user?.street)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className={styles.form_wrapper}
    >
      <h2>Adress</h2>
      <div className={styles.input_wrapper}>
        <div className={styles.icon_wrapper}>
          <p className={styles.title_header}>Your name </p>
          <FiEdit
            className={`${isEnabled?.userName ? styles.enabled : ''}`}
            onClick={() => handleEnabled('userName')}
          />
        </div>
        {
          isEnabled?.userName ?
            <>
              <Input
                containerStyle={`${errors.name ? styles.input_error_container : styles.input_container}`}
                placeholder={''}
                isError={errors?.name}
                errorMessage={errors?.name?.message}
                {...registeredNameInput}
              />
            </>
            :
            <p className={`${styles.title} ${isSameName || getValues('name') === undefined ? '' : styles.changed}`}>{isSameName || getValues('name') === undefined ? user?.name ?? 'Type your name' : getValues('name')}</p>
        }
      </div>
      <div className={styles.input_wrapper}>
        <div className={styles.icon_wrapper}>
          <p className={styles.title_header}>Your adress </p>
          <FiEdit
            className={`${isEnabled?.userStreet ? styles.enabled : ''}`}
            onClick={() => handleEnabled('userStreet')}
          />
        </div>
        {
          isEnabled?.userStreet ?
            <>
              <Input
                containerStyle={`${errors.street ? styles.input_error_container : styles.input_container}`}
                placeholder={''}
                isError={errors.street}
                errorMessage={errors.street?.message}
                {...registeredStreetInput}
              />
            </>
            :
            <p className={`${styles.title} ${isSameStreet || getValues('street') === undefined ? '' : styles.changed}`}>{isSameStreet || getValues('street') === undefined ? user?.street ?? 'Type your street' : getValues('street')}</p>
        }
      </div>
      <div className={styles.input_wrapper}>
        <div className={styles.icon_wrapper}>
          <p className={styles.title_header}>Your city </p>
          <FiEdit
            className={`${isEnabled?.userCity ? styles.enabled : ''}`}
            onClick={() => handleEnabled('userCity')}
          />
        </div>
        {
          isEnabled?.userCity ?
            <>
              <Input
                containerStyle={`${errors.city ? styles.input_error_container : styles.input_container}`}
                placeholder={''}
                isError={errors.city}
                errorMessage={errors.city?.message}
                {...registeredCityInput}
              />
            </>
            :
            <p className={`${styles.title} ${isSameCity || getValues('city') === undefined ? '' : styles.changed}`}>{isSameCity || getValues('city') === undefined ? user?.city ?? 'Type your city' : getValues('city')}</p>
        }
      </div>
      <div className={styles.input_wrapper}>
        <p className={styles.title_header}>Your email </p>
        <p className={`${styles.title}`}>{session?.user?.email}</p>
      </div>
      <button
        className={styles.update_btn}
        disabled={isLoading}
      >
        {
          isLoading ?
            <Spinner />
            :
            <>Update</>
        }
      </button>
    </form>
  )
}

export default UserAdress
