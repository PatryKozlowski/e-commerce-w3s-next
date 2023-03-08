import { useCallback, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input/Input'
import Spinner from '../Spinner/Spinner'
import Textarea from '../Textarea/Textarea'
import { FiEdit } from 'react-icons/fi'
import Image from 'next/image'
import type { EditProdutForm, enabledOptions, ProductEditProps } from './types'
import { useUpdateProduct } from '@/hooks/api/useUpdateProduct'
import { useRouter } from 'next/router'
import styles from './EditProduct.module.scss'

const EditProduct = ({ product, sizes }: ProductEditProps): JSX.Element => {
  const productId = product?.id as string
  const { mutateAsync, isLoading } = useUpdateProduct(productId)
  const router = useRouter()
  const [isEnabled, setEnabled] = useState({
    productName: false,
    productDesc: false,
    productSize: false,
    productPrice: false
  })

  const isDisabed = Object.values(isEnabled).includes(true)

  const methods = useForm<EditProdutForm>({
    defaultValues: {
      productSizeXS: 0,
      productSizeS: 0,
      productSizeM: 0,
      productSizeL: 0,
      productSizeXL: 0
    }
  })
  const { register, watch, handleSubmit, setValue, getValues, formState: { errors } } = methods

  const registeredName = register('productName', {
    required: true,
    maxLength: {
      value: 29,
      message: 'Maximum length: 29 characters'
    }
  })

  const registeredDesc = register('productDesc', {
    required: true,
    maxLength: {
      value: 264,
      message: 'Maximum length: 264 characters'
    }
  })

  const registeredPrice = register('productPrice', { required: true })

  const registeredSizeXS = register('productSizeXS')

  const registeredSizeS = register('productSizeS')

  const registeredSizeM = register('productSizeM')

  const registeredSizeL = register('productSizeL')

  const registeredSizeXL = register('productSizeXL')

  const productSizes = [
    { name: 'XS', registeredInput: registeredSizeXS },
    { name: 'S', registeredInput: registeredSizeS },
    { name: 'M', registeredInput: registeredSizeM },
    { name: 'L', registeredInput: registeredSizeL },
    { name: 'XL', registeredInput: registeredSizeXL }
  ]

  const nameLength = watch('productName')?.length
  const descLength = watch('productDesc')?.length

  const handleCreate: SubmitHandler<EditProdutForm> = useCallback(async (FormData) => {
    const response = await mutateAsync(FormData)

    if (response.status === 200) {
      await router.push('/edit/product/')
    }
  }, [mutateAsync, router])

  const handleEnabled = useCallback((type: enabledOptions) => {
    const handleOption: enabledOptions = type
    switch (handleOption) {
      case 'productName':
        setEnabled({ ...isEnabled, productName: !isEnabled.productName })
        break

      case 'productDesc':
        setEnabled({ ...isEnabled, productDesc: !isEnabled.productDesc })
        break

      case 'productSize':
        setEnabled({ ...isEnabled, productSize: !isEnabled.productSize })
        break

      case 'productPrice':
        setEnabled({ ...isEnabled, productPrice: !isEnabled.productPrice })
        break

      default:
        console.log(`Sorry, we are out of ${type}`)
    }
  }, [isEnabled])

  const isSameName = product?.name === getValues('productName')
  const isSameDesc = product?.description === getValues('productDesc')
  const isSamePrice = product?.price === getValues('productPrice')
  const isSameSizeXS = product?.sizeXS[0]?.stock === getValues('productSizeXS')
  const isSameSizeS = product?.sizeS[0]?.stock === getValues('productSizeS')
  const isSameSizeM = product?.sizeM[0]?.stock === getValues('productSizeM')
  const isSameSizeL = product?.sizeL[0]?.stock === getValues('productSizeL')
  const isSameSizeXL = product?.sizeXL[0]?.stock === getValues('productSizeXL')

  const isSameSize = [isSameSizeXS, isSameSizeS, isSameSizeM, isSameSizeL, isSameSizeXL]
  const isSameSizeValue = [getValues('productSizeXS'), getValues('productSizeS'), getValues('productSizeM'), getValues('productSizeL'), getValues('productSizeXL')]

  useEffect(() => {
    setValue('productName', product?.name as string)
    setValue('productDesc', product?.description as string)
    setValue('productPrice', product?.price as number)
    setValue('productSizeXS', product?.sizeXS[0]?.stock as number ?? 0)
    setValue('productSizeS', product?.sizeS[0]?.stock as number ?? 0)
    setValue('productSizeM', product?.sizeM[0]?.stock as number ?? 0)
    setValue('productSizeL', product?.sizeL[0]?.stock as number ?? 0)
    setValue('productSizeXL', product?.sizeXL[0]?.stock as number ?? 0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleCreate)}
        className={styles.form_wrapper}
      >
        <h2>
          Edit product
        </h2>
        <div className={styles.grid_wrapper}>
          <Image
            src={`${process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL as string}${product?.image as string}?alt=media`}
            alt={product?.name as string}
            width={'0'}
            height={'0'}
            sizes={'100vw'}
          />
          <div className={styles.product_wrapper}>
            <div className={styles.input_wrapper}>
              <div className={styles.icon_wrapper}>
                <p className={styles.title_header}>Product name </p>
                <FiEdit
                  className={`${isEnabled?.productName ? styles.enabled : ''}`}
                  onClick={() => handleEnabled('productName')}
                />
              </div>
              {
                isEnabled?.productName ?
                  <>
                    <Input
                      placeholder={''}
                      isError={errors?.productName}
                      errorMessage={errors?.productName?.message}
                      maxlength={29}
                      {...registeredName}
                    />
                    <span>{nameLength}/29</span>
                  </>
                  :
                  <p className={`${styles.title} ${isSameName ? '' : styles.changed}`}>{isSameName ? product?.name : getValues('productName')}</p>
              }
            </div>
            <div className={styles.input_wrapper}>
              <div className={styles.icon_wrapper}>
                <p className={styles.title_header}>Product description</p>
                <FiEdit
                  className={`${isEnabled?.productDesc ? styles.enabled : ''}`}
                  onClick={() => handleEnabled('productDesc')}
                />
              </div>
              {
                isEnabled?.productDesc ?
                  <>
                    <Textarea
                      className={styles.textarea}
                      isError={errors?.productDesc}
                      errorMessage={errors?.productDesc?.message}
                      maxlength={264}
                      {...registeredDesc}
                    />
                    <span>{descLength}/264</span>
                  </>
                  :
                  <p className={`${styles.description} ${isSameDesc ? '' : styles.changed}`}>{isSameDesc ? product?.description : getValues('productDesc')}</p>
              }
            </div>
            <>
              <div className={styles.icon_wrapper}>
                <p className={styles.title_header}>Product sizes </p>
                <FiEdit
                  className={`${isEnabled?.productSize ? styles.enabled : ''}`}
                  onClick={() => handleEnabled('productSize')}
                />
              </div>
            </>
            <div className={styles.sizes_wrapper}>
              {
                  isEnabled?.productSize || sizes.length === 0 ?
                    productSizes.map(({ name, registeredInput }, index) => (
                      <div
                        className={styles.wrapper}
                        key={index}
                      >
                        <p className={`${isEnabled?.productSize ? styles.enabled : ''}`}>{name}</p>
                        <Input
                          placeholder={''}
                          {...registeredInput}
                        />
                      </div>
                    )) :
                    sizes.map((size, index) => (
                      <div
                        className={styles.wrapper}
                        key={index}
                      >
                        <p>{size.size}</p>
                        <p className={`${styles.box} ${isSameSize[index] ? '' : styles.changed}`}>{isSameSize[index] ? size.stock : isSameSizeValue[index]}</p>
                      </div>
                    ))
                }
            </div>
            <div className={styles.product_price}>
              <div className={styles.icon_wrapper}>
                <p className={styles.title_header}>Product price</p>
                <FiEdit
                  className={`${isEnabled?.productPrice ? styles.enabled : ''}`}
                  onClick={() => handleEnabled('productPrice')}
                />
              </div>
              {
                isEnabled?.productPrice ?
                  <Input
                    isError={errors?.productPrice}
                    errorMessage={errors?.productPrice?.message}
                    placeholder={''}
                    {...registeredPrice}
                  /> :
                  <p className={`${isSamePrice ? '' : styles.changed}`}>$ {isSamePrice ? product?.price : getValues('productPrice')}</p>
              }

            </div>
          </div>
        </div>
        <button
          className={`${styles.edit_btn}`}
          disabled={isDisabed || isLoading}
        >
          {isLoading ? <Spinner /> : 'Edit product'}
        </button>
      </form>
    </FormProvider>
  )
}

export default EditProduct
