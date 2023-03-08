import { useCallback, useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input/Input'
import Select from '../Select/Select'
import Spinner from '../Spinner/Spinner'
import Textarea from '../Textarea/Textarea'
import Upload from '../Upload/Upload'
import { useRouter } from 'next/router'
import type { CreateProductForm, JeansTypeProps, ProductInfoProps, ProductTypeProps } from './types'
import { useCreateProduct } from '@/hooks/api/useCreateProduct'
import styles from './CreateProduct.module.scss'

const CreateProduct = (): JSX.Element => {
  const { mutateAsync: mutateCreateProduct, isLoading } = useCreateProduct()
  const router = useRouter()
  const acceptFile = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg']
  }
  const methods = useForm<CreateProductForm>({
    defaultValues: {
      productSizeXS: 0,
      productSizeS: 0,
      productSizeM: 0,
      productSizeL: 0,
      productSizeXL: 0
    }
  })
  const { register, watch, reset, handleSubmit, unregister, formState: { errors } } = methods

  const registeredProductType = register('productType')
  const registeredProductInfo = register('productInfo')

  const registeredName = register('productName', {
    required: {
      value: true,
      message: 'Product name is required'
    },
    maxLength: {
      value: 29,
      message: 'Maximum length: 29 characters'
    }
  })

  const registeredDesc = register('productDesc', {
    required: {
      value: true,
      message: 'Product description is required'
    },
    maxLength: {
      value: 264,
      message: 'Maximum length: 264 characters'
    }
  })

  const registeredPrice = register('productPrice', {
    required: {
      value: true,
      message: 'Product price is required'
    }
  })

  let registeredJeansType = null

  const registeredSizeXS = register('productSizeXS', { required: true })

  const registeredSizeS = register('productSizeS', { required: true })

  const registeredSizeM = register('productSizeM', { required: true })

  const registeredSizeL = register('productSizeL', { required: true })

  const registeredSizeXL = register('productSizeXL', { required: true })

  const productType: ProductTypeProps[] = [
    { label: 'Shirts', value: 'shirts' },
    { label: 'Jeans', value: 'jeans' },
    { label: 'Jackets', value: 'jackets' },
    { label: 'Gymwear', value: 'gymwear' },
    { label: 'Blazers', value: 'blazers' },
    { label: 'Shoes', value: 'shoes' }
  ]

  const jeansType: JeansTypeProps[] = [
    { label: 'Normal', value: 'skinny' },
    { label: 'Skinny', value: 'skinny' },
    { label: 'Relaxed', value: 'relaxed' },
    { label: 'Bootcut', value: 'bootcut' },
    { label: 'Straight', value: 'straight' }
  ]

  const productSizes = [
    { name: 'XS', registeredInput: registeredSizeXS },
    { name: 'S', registeredInput: registeredSizeS },
    { name: 'M', registeredInput: registeredSizeM },
    { name: 'L', registeredInput: registeredSizeL },
    { name: 'XL', registeredInput: registeredSizeXL }
  ]

  const productInfo: ProductInfoProps[] = [
    { label: 'None', value: 'none' },
    { label: 'New', value: 'new' },
    { label: 'Sale', value: 'sale' }
  ]

  const isJeans = watch('productType') === 'jeans'
  const nameLength = watch('productName')?.length
  const descLength = watch('productDesc')?.length

  const isNotUrlImage = watch('imagesUrl') === undefined

  const handleCreate: SubmitHandler<CreateProductForm> = useCallback(async (FormData) => {
    const response = await mutateCreateProduct(FormData)

    if (response?.status === 200) {
      console.log('tutaj')
      reset()
      await router.push(`/${FormData.productType}`)
    }
  }, [mutateCreateProduct, reset, router])

  if (isJeans) {
    registeredJeansType = register('jeansType')
  }

  useEffect(() => {
    if (!isJeans) {
      return () => {
        unregister('jeansType')
      }
    }
  }, [isJeans, unregister])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleCreate)}
        className={styles.form_wrapper}
      >
        <h2>
          Create new product
        </h2>
        <div className={styles.grid_wrapper}>
          <Upload
            name={'images'}
            acceptFile={acceptFile}
          />
          <div className={styles.product_wrapper}>
            <div className={styles.input_wrapper}>
              <p className={styles.title}>Product name </p>
              <Input
                placeholder={''}
                isError={errors?.productName}
                errorMessage={errors?.productName?.message}
                maxlength={29}
                {...registeredName}
              />
              <span>{nameLength}/29</span>
            </div>
            <div className={styles.input_wrapper}>
              <p className={styles.title}>Product name </p>
              <Textarea
                className={styles.textarea}
                isError={errors?.productDesc}
                errorMessage={errors?.productDesc?.message}
                maxlength={269}
                {...registeredDesc}
              />
              <span>{descLength}/269</span>
            </div>
            <>
              <p className={styles.title}>Product sizes </p>
            </>
            <div className={styles.sizes_wrapper}>
              {
                  productSizes.map(({ name, registeredInput }, index) => (
                    <div
                      className={styles.wrapper}
                      key={index}
                    >
                      <p>{name}</p>
                      <Input
                        placeholder={''}
                        {...registeredInput}
                      />
                    </div>
                  ))
                }
            </div>
            <div className={styles.product_price}>
              <p className={styles.title}>Product price</p>
              <Input
                isError={errors?.productPrice}
                errorMessage={errors?.productPrice?.message}
                placeholder={''}
                {...registeredPrice}
              />
            </div>
            <div className={styles.select_wrapper}>
              <div className={styles.full_width}>
                <p className={styles.title}>Product type</p>
                <Select
                  option={productType}
                  className={styles.select}
                  {...registeredProductType}
                />
              </div>

              {
                isJeans ?
                  <div className={`${styles.full_width} ${styles.select_margin}`}>
                    <p className={`${styles.title}`}>Jeans type</p>
                    <Select
                      option={jeansType}
                      className={styles.select}
                      {...registeredJeansType}
                    />
                  </div>
                  :
                  null
              }

              <div className={`${styles.full_width} ${styles.select_margin}`}>
                <p className={styles.title}>Product info</p>
                <Select
                  option={productInfo}
                  className={styles.select}
                  {...registeredProductInfo}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className={`${styles.add_btn}`}
          disabled={isNotUrlImage || isLoading}
        >
          {isLoading ? <Spinner /> : 'Add Product'}
        </button>
      </form>
    </FormProvider>
  )
}

export default CreateProduct
