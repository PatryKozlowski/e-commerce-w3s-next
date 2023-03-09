import { useCallback, useState } from 'react'
import Image from 'next/image'
import { MdProductionQuantityLimits } from 'react-icons/md'
import ProductInfoList from './ProductInfo/ProductInfoList'
import { useRouter } from 'next/router'
import Spinner from '../Spinner/Spinner'
import type { ProductListProps } from './types'
import { useGetProductSizes } from '@/hooks/api/useGetProductSizes'
import { storage } from '@/lib/utils/firebase'
import { ref } from '@firebase/storage'
import { deleteObject } from 'firebase/storage'
import { useDeleteProduct } from '@/hooks/api/useDeleteProduct'
import { DeleteProductProps } from '@/lib/services/admin/product/deleteProduct'
import styles from './ProductList.module.scss'

const ProductList = ({ id, jeansType, name, product, info, price, image }: ProductListProps): JSX.Element => {
  const productId = id as unknown as DeleteProductProps
  const { data: productSize, isLoading: isLoadingProductSizes } = useGetProductSizes(id)
  const { mutate, isLoading: isLoadingDeleteProduct } = useDeleteProduct(productId)
  const [isLoadingDeleteImage, setLoadingDeleteImage] = useState<boolean>(false)

  const sizesStockSum = (): number | undefined => {
    return productSize?.map((p) => p.stock)?.reduce((acc, currentVal) => acc + currentVal, 0)
  }

  const isStockSumNull = sizesStockSum() === 0

  const router = useRouter()
  const upperCaseFirstLetter = useCallback((string: string | null): string => {
    return String(string?.at(0)?.toUpperCase()) + String(string?.slice(1))
  }, [])

  const goToProduct = useCallback(async () => {
    if (product === 'jeans') {
      await router.push(`/${product}/${jeansType as string}/${id}`)
    } else {
      await router.push(`/${product}/${id}`)
    }
  }, [id, jeansType, product, router])

  const goToProductEditPage = useCallback(async () => {
    await router.push(`/edit/product/${id}`)
  }, [id, router])

  const handleDeleteProduct = useCallback(async (productURL: string) => {
    setLoadingDeleteImage(true)
    const imageUrl = productURL?.replace('%2F', '/')
    const imageUrlReplaced = imageUrl?.replace('%2F', '/')
    const productImageUrl = `images/${imageUrlReplaced}`
    const imageRef = ref(storage, productImageUrl)
    const id = imageUrlReplaced?.split('/')[1]

    try {
      await deleteObject(imageRef).then(async () => {
        mutate(id)
      })
    } catch (error) {
      setLoadingDeleteImage(false)
      if (error instanceof Error) {
        return console.log(error.message)
      } else {
        console.log(error)
      }
    }
    setLoadingDeleteImage(false)
  }, [mutate])

  const productListInfo = [
    { label: 'Name:', value: name },
    { label: 'Product:', value: upperCaseFirstLetter(product) },
    { label: 'Info:', value: upperCaseFirstLetter(info as string) },
    { label: 'Price $:', value: price }

  ]

  return (
    <div className={styles.container}>
      {
        isLoadingDeleteProduct ?
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
          :
          <>
            <Image
              src={`${process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL as string}${image}?alt=media`}
              alt={'Product image'}
              width={205}
              height={260}
              className={styles.img}
            />
            <div className={styles.product_info_wrapper}>
              <h3>Product info</h3>
              <div className={styles.product_wrapper}>
                {
                  isLoadingProductSizes ?
                    <div className={styles.spinner_wrapper}>
                      <Spinner />
                    </div>
                    :
                    productListInfo.map((pInfo, index) => {
                      return (
                        <ProductInfoList
                          key={index}
                          label={pInfo.label}
                          name={pInfo.value}
                        />
                      )
                    })
                }
              </div>
              <div className={styles.sizes_wrapper}>
                <h3>Stock</h3>
                <div className={styles.inline_wrapper}>
                  {
                    isLoadingProductSizes ?
                      <div className={styles.spinner_wrapper}>
                        <Spinner />
                      </div>
                      :
                      productSize?.length === 0 || isStockSumNull ?
                        <div className={styles.empty_stock}>
                          <MdProductionQuantityLimits size={26}/>
                          <p className={styles.size_stock}>Out of stock</p>
                        </div> :
                        productSize?.map((size) => (
                          <div key={size.id}>
                            <p>{size.size}
                            </p>
                            <p className={styles.size_stock}>{size.stock}</p>
                          </div>
                        ))
                    }
                </div>
              </div>
            </div>
            <div className={styles.btn_wrapper}>
              <div
                className={`${styles.btn_container} ${styles.gray_color}`}
                onClick={goToProduct}
              >
                <button disabled={isLoadingDeleteImage || isLoadingDeleteProduct}>Show product</button>
              </div>
              <div
                className={`${styles.btn_container} ${styles.violet_color}`}
                onClick={goToProductEditPage}
              >
                <button disabled={isLoadingDeleteImage || isLoadingDeleteProduct}>Edit</button>
              </div>
              <div
                className={`${styles.btn_container} ${styles.red_color}`}
              >
                {
                  isLoadingDeleteImage || isLoadingDeleteProduct ?
                    <Spinner /> :
                    <button
                      onClick={async () => await handleDeleteProduct(image)}
                      disabled={isLoadingDeleteImage || isLoadingDeleteProduct}
                    >DELETE
                    </button>
                }
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default ProductList
