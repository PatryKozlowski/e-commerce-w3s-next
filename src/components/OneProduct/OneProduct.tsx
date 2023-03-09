import { useCallback } from 'react'
import Image from 'next/image'
import Size from '../Size/Size'
import { MdAddShoppingCart } from 'react-icons/md'
import NoProduct from '../NoProduct/NoProduct'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import type { OneProductProps, HandleProduct } from './types'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addItemToCart } from '@/redux/cartSlice'
import styles from './OneProduct.module.scss'

const OneProduct = ({ product, sizes }: OneProductProps): JSX.Element => {
  const methods = useForm({
    defaultValues: {
      id: product?.id as string,
      description: product?.description as string,
      image: product?.image as string,
      name: product?.name as string,
      price: product?.price as number,
      product: product?.product,
      jeansType: product?.jeansType,
      size: '',
      quantity: 0
    }
  })
  const { handleSubmit } = methods

  const dispatch = useAppDispatch()

  const handleProduct: SubmitHandler<HandleProduct> = useCallback((data) => {
    dispatch(addItemToCart(data))
  }, [dispatch])

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        <Image
          src={`${process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL as string}${product?.image as string}?alt=media`}
          alt={product?.name as string}
          width={'0'}
          height={'0'}
          sizes={'100vw'}
        />
        <div className={styles.wrapper}>
          <h2 className={styles.title}>{product?.name}</h2>
          <h3>Description</h3>
          <p className={styles.description}>
            {product?.description}
          </p>
          {
          sizes.length ?
            <>
              <h4>Sizes</h4>
              <form
                onSubmit={handleSubmit(handleProduct)}
                className={`${sizes.length >= 5 ? styles.form_wrapper_all_sizes : styles.form_wrapper}`}
              >
                {
                  sizes.map((size) => (
                    <Size
                      key={size.id}
                      {...size}
                    />
                  ))
                }
                <div className={styles.button_wrapper}>
                  <button className={styles.btn_add_cart}>
                    Add to cart &nbsp;
                    <span>
                      ${product?.price}
                    </span>
                    <MdAddShoppingCart size={30}/>
                  </button>
                </div>
              </form>
            </>
            :
            <NoProduct
              text={'No sizes'}
              center={false}
              productPage
            />
        }
        </div>
      </div>
    </FormProvider>
  )
}

export default OneProduct
